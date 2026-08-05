"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { BUSINESS } from "@/lib/constants";

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    cityPincode: "",
    projectType: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    "Hi Arihant Creations, I would like to request a quotation for premium aluminium windows/doors."
  )}`;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          phone: "",
          cityPincode: "",
          projectType: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className="section-padding bg-white" id="contact">
        <div className="container-custom max-w-2xl text-center">
          <div className="card-base p-10 bg-white border border-[#EEF2F6]">
            <CheckCircle className="w-14 h-14 text-[#C5161D] mx-auto mb-4" />
            <h3 className="font-heading font-bold text-2xl text-[#081C4B] mb-2">
              Quotation Request Received
            </h3>
            <p className="text-[#6B7280] mb-6">
              Thank you for reaching out to Arihant Creations. Our engineering team will review your requirements and reach out within 24 hours.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-[#C5161D] font-bold text-sm hover:underline"
            >
              Submit another request
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-white" id="contact">
      <div className="container-custom">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="section-label">Consultation & Quote</span>
            <h2 className="section-title">
              Request a Technical <span className="text-[#C5161D]">Consultation</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Share your project dimensions or architectural drawings for a comprehensive quotation and technical proposal.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Direct WhatsApp CTA Box */}
          <FadeIn className="lg:col-span-2 order-1 lg:order-2">
            <div className="card-base p-8 bg-[#F8F9FB] border border-[#EEF2F6] text-center lg:sticky lg:top-28">
              <div className="w-14 h-14 rounded-2xl bg-[#081C4B] flex items-center justify-center mx-auto mb-5 shadow-sm">
                <MessageCircle className="w-7 h-7 text-[#C5161D]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#081C4B] mb-2">
                Need Immediate Assistance?
              </h3>
              <p className="text-[#6B7280] text-sm mb-6 leading-relaxed">
                Connect directly with our fenestration consultants on WhatsApp for drawing reviews and immediate answers.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta w-full py-3.5 px-6 text-sm font-bold justify-center"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                Chat on WhatsApp
              </a>
              <p className="text-[#6B7280] text-xs mt-4 font-semibold">
                Available {BUSINESS.hours}
              </p>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn className="lg:col-span-3 order-2 lg:order-1" delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="quote-name"
                  className="block text-xs font-bold text-[#081C4B] uppercase tracking-wider mb-2"
                >
                  Full Name <span className="text-[#C5161D]">*</span>
                </label>
                <input
                  id="quote-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  className="w-full px-4 py-3.5 rounded-xl border border-[#EEF2F6] bg-[#F8F9FB] text-[#111827] text-sm placeholder:text-[#6B7280]/60 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#081C4B]/20 focus:border-[#081C4B] transition-colors"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="quote-phone"
                  className="block text-xs font-bold text-[#081C4B] uppercase tracking-wider mb-2"
                >
                  Phone Number <span className="text-[#C5161D]">*</span>
                </label>
                <input
                  id="quote-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3.5 rounded-xl border border-[#EEF2F6] bg-[#F8F9FB] text-[#111827] text-sm placeholder:text-[#6B7280]/60 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#081C4B]/20 focus:border-[#081C4B] transition-colors"
                />
              </div>

              {/* City / Pincode */}
              <div>
                <label
                  htmlFor="quote-city"
                  className="block text-xs font-bold text-[#081C4B] uppercase tracking-wider mb-2"
                >
                  City / Pincode <span className="text-[#C5161D]">*</span>
                </label>
                <input
                  id="quote-city"
                  type="text"
                  required
                  value={formData.cityPincode}
                  onChange={(e) =>
                    setFormData({ ...formData, cityPincode: e.target.value })
                  }
                  placeholder="City or location pincode"
                  className="w-full px-4 py-3.5 rounded-xl border border-[#EEF2F6] bg-[#F8F9FB] text-[#111827] text-sm placeholder:text-[#6B7280]/60 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#081C4B]/20 focus:border-[#081C4B] transition-colors"
                />
              </div>

              {/* Project Type */}
              <div>
                <label
                  htmlFor="quote-project"
                  className="block text-xs font-bold text-[#081C4B] uppercase tracking-wider mb-2"
                >
                  Project Type <span className="text-[#C5161D]">*</span>
                </label>
                <select
                  id="quote-project"
                  required
                  value={formData.projectType}
                  onChange={(e) =>
                    setFormData({ ...formData, projectType: e.target.value })
                  }
                  className="w-full px-4 py-3.5 rounded-xl border border-[#EEF2F6] bg-[#F8F9FB] text-[#111827] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#081C4B]/20 focus:border-[#081C4B] transition-colors appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23081C4B' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundPosition: "right 1rem center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <option value="">Select project scope</option>
                  <option value="residential-villa">Luxury Villa / Private Residence</option>
                  <option value="apartment-renovation">High-Rise Apartment / Renovation</option>
                  <option value="commercial-office">Commercial Building / Office</option>
                  <option value="architectural-consultation">Architectural Firm Consultation</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="quote-message"
                  className="block text-xs font-bold text-[#081C4B] uppercase tracking-wider mb-2"
                >
                  Project Notes <span className="text-[#6B7280] font-normal">(Optional)</span>
                </label>
                <textarea
                  id="quote-message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Mention window quantities, glass types, or specific requirements..."
                  className="w-full px-4 py-3.5 rounded-xl border border-[#EEF2F6] bg-[#F8F9FB] text-[#111827] text-sm placeholder:text-[#6B7280]/60 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#081C4B]/20 focus:border-[#081C4B] transition-colors resize-none"
                />
              </div>

              {/* Error State */}
              {status === "error" && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Submission error. Please try again or reach out directly on WhatsApp.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-cta w-full py-4 px-6 text-sm font-bold justify-center"
              >
                {status === "loading" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing Request...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Request Technical Proposal
                  </>
                )}
              </button>

              <p className="text-[#6B7280] text-xs text-center">
                We respect your privacy. View our{" "}
                <a href="/privacy-policy" className="underline hover:text-[#C5161D]">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
