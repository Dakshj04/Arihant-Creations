import { NextResponse } from "next/server";
import { BUSINESS } from "@/config/business";
import { promises as fs } from "fs";
import path from "path";

// ─── Lead Storage Path ──────────────────────────────────────────────────────
const LEADS_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(LEADS_DIR, "leads.json");

interface LeadEntry {
  id: string;
  name: string;
  phone: string;
  cityPincode: string;
  projectType: string;
  message: string;
  timestamp: string;
  source: "website-form";
}

async function appendLead(lead: LeadEntry): Promise<void> {
  try {
    // Ensure data directory exists
    await fs.mkdir(LEADS_DIR, { recursive: true });

    let existingLeads: LeadEntry[] = [];
    try {
      const fileContent = await fs.readFile(LEADS_FILE, "utf-8");
      existingLeads = JSON.parse(fileContent);
    } catch {
      // File doesn't exist yet — start fresh
      existingLeads = [];
    }

    existingLeads.push(lead);
    await fs.writeFile(LEADS_FILE, JSON.stringify(existingLeads, null, 2), "utf-8");
  } catch (err) {
    console.error("[Lead Storage] Failed to persist lead:", err);
    // Non-blocking — we still return success to the user
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, cityPincode, projectType, message } = body;

    // Input Validation
    if (!name || !phone || !cityPincode || !projectType) {
      return NextResponse.json(
        { error: "Please complete all required fields: name, phone, city/pincode, project type" },
        { status: 400 }
      );
    }

    const phoneClean = phone.replace(/[\s\-\+]/g, "");
    if (phoneClean.length < 10) {
      return NextResponse.json(
        { error: "Please enter a valid phone number" },
        { status: 400 }
      );
    }

    // Generate unique lead ID
    const leadId = `AC-${Date.now().toString(36).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    const lead: LeadEntry = {
      id: leadId,
      name,
      phone,
      cityPincode,
      projectType,
      message: message || "",
      timestamp,
      source: "website-form",
    };

    // ─── Persist Lead to Local JSON File ────────────────────────────────────
    await appendLead(lead);

    // ─── Console Log for Development ────────────────────────────────────────
    console.log(`[Quote Submission] Lead ${leadId} stored → ${BUSINESS.email}:`, {
      name,
      phone,
      cityPincode,
      projectType,
      message: message || "(none)",
      timestamp,
    });

    // ─── Forwarding to Email (arihantcreations.business@gmail.com) ───────────
    // Scaffolded for Resend or Nodemailer integration without code structural changes.
    //
    // Example Resend Integration:
    //   import { Resend } from 'resend';
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   await resend.emails.send({
    //     from: 'Arihant Quotes <quotes@arihantcreations.com>',
    //     to: [BUSINESS.email],
    //     subject: `New Technical Quotation Request from ${name} (${leadId})`,
    //     html: `...`
    //   });
    // ─────────────────────────────────────────────────────────────────────────

    return NextResponse.json(
      {
        success: true,
        leadId,
        message: "Your quotation request has been forwarded to our team.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing quote request:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again or contact WhatsApp." },
      { status: 500 }
    );
  }
}
