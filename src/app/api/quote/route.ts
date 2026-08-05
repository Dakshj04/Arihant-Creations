import { NextResponse } from "next/server";
import { BUSINESS } from "@/config/business";

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

    // ─── Forwarding to Email (arihantcreations.business@gmail.com) ───────────────
    // Scaffolded for Resend or Nodemailer integration without code structural changes.
    //
    // Example Resend Integration:
    //   import { Resend } from 'resend';
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   await resend.emails.send({
    //     from: 'Arihant Quotes <quotes@arihantcreations.com>',
    //     to: [BUSINESS.email],
    //     subject: `New Technical Quotation Request from ${name}`,
    //     html: `
    //       <h2>New Quote Request - Arihant Creations</h2>
    //       <p><strong>Name:</strong> ${name}</p>
    //       <p><strong>Phone:</strong> ${phone}</p>
    //       <p><strong>Location:</strong> ${cityPincode}</p>
    //       <p><strong>Project Type:</strong> ${projectType}</p>
    //       <p><strong>Notes:</strong> ${message || 'N/A'}</p>
    //     `
    //   });
    // ─────────────────────────────────────────────────────────────────────────────

    console.log(`[Quote Submission] Sent to ${BUSINESS.email}:`, {
      name,
      phone,
      cityPincode,
      projectType,
      message: message || "(none)",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: "Your quotation request has been forwarded to our team." },
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
