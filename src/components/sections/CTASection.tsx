import { Phone, MessageCircle } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { BUSINESS } from "@/lib/constants";

export default function CTASection() {
  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    "Hi Arihant Creations, I would like to request a quotation for premium aluminium windows/doors."
  )}`;

  return (
    <section className="relative py-20 md:py-24 overflow-hidden bg-[#081C4B]">
      {/* Subtle Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.5) 40px,
            rgba(255,255,255,0.5) 41px
          )`,
        }}
      />

      <div className="relative z-10 container-custom text-center">
        <FadeIn>
          <div className="flex justify-center mb-4">
            <span className="inline-block text-[#C5161D] text-xs font-extrabold uppercase tracking-[0.2em] bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
              Book Site Survey
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mb-4 max-w-3xl mx-auto leading-tight text-center">
            <span className="block sm:inline text-white">Elevate Your Residence With </span>
            <span className="text-[#C5161D] block sm:inline mt-1 sm:mt-0">Arihant Creations</span>
          </h2>

          <p className="text-white/80 text-base sm:text-lg md:text-xl mb-10 max-w-xl mx-auto font-normal text-center">
            Schedule a free site survey & technical evaluation today with our master engineers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md sm:max-w-none mx-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta text-base py-4 px-8 w-full sm:w-auto shadow-xl justify-center"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              WhatsApp Us
            </a>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="btn-secondary text-base py-4 px-8 w-full sm:w-auto border-white text-[#081C4B] bg-white hover:bg-[#EEF2F6] justify-center"
            >
              <Phone className="w-5 h-5 text-[#081C4B]" />
              Call Engineering Team
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
