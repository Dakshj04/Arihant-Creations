"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDown, MessageCircle, ShieldCheck, Sparkles, Building2, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { BUSINESS, IMAGES } from "@/lib/constants";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacityGrid = useTransform(scrollYProgress, [0, 0.8], [0.06, 0]);

  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    "Hi Arihant Creations, I would like to book a design consultation for premium aluminium fenestration."
  )}`;

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Blueprint Grid Background (6% Opacity fading on scroll) */}
      <motion.div
        style={{ opacity: opacityGrid }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #081C4B 1px, transparent 1px),
              linear-gradient(to bottom, #081C4B 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </motion.div>

      {/* Subtle Radial Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.05] blur-3xl bg-[#081C4B] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full opacity-[0.04] blur-3xl bg-[#C5161D] pointer-events-none" />

      <div className="relative z-10 container-custom">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2F6] border border-[#081C4B]/10 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#C5161D]" />
                <span className="text-[#081C4B] text-xs font-bold tracking-wider uppercase">
                  Architectural Fenestration Systems
                </span>
              </div>

              {/* Editorial Headline */}
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#081C4B] leading-[1.08] tracking-tight mb-6">
                Architectural Aluminium Systems Built for{" "}
                <span className="text-[#C5161D]">Modern Living</span>
              </h1>

              {/* Subheadline */}
              <p className="text-[#6B7280] text-lg sm:text-xl font-normal leading-relaxed max-w-2xl mb-8">
                Precision-engineered thermal break windows, panoramic sliding elevations, and acoustic partitions for luxury residences.
              </p>

              {/* Premium CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
                <a
                  href="#contact"
                  className="btn-cta text-base py-4 px-7 shadow-lg justify-center text-center"
                >
                  Book a Design Consultation
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-base py-4 px-7 justify-center text-center"
                >
                  <MessageCircle className="w-5 h-5 text-[#C5161D]" />
                  Get a Custom Estimate
                </a>
              </div>

              {/* Trust Metrics Row */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#EEF2F6]">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#081C4B] font-heading">
                    15<span className="text-[#C5161D]">+</span> Yrs
                  </div>
                  <div className="text-xs font-semibold text-[#6B7280]">
                    German Engineering
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#081C4B] font-heading">
                    1,200<span className="text-[#C5161D]">+</span>
                  </div>
                  <div className="text-xs font-semibold text-[#6B7280]">
                    Luxury Residences
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#081C4B] font-heading">
                    42<span className="text-[#C5161D]">dB</span>
                  </div>
                  <div className="text-xs font-semibold text-[#6B7280]">
                    Acoustic Rating
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Layered Parallax Villa Imagery */}
          <div className="lg:col-span-5 relative">
            <motion.div
              style={{ y: yImage }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Primary Architectural Villa Image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-[#EEF2F6]">
                <Image
                  src={IMAGES.heroVilla}
                  alt="Modern luxury villa with expansive aluminium sliding doors"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081C4B]/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#C5161D] bg-white px-2.5 py-1 rounded-md inline-block mb-1 shadow-sm">
                    Signature System
                  </span>
                  <div className="font-heading font-bold text-xl text-white">
                    Slimline Panoramic Sliding Doors
                  </div>
                </div>
              </div>

              {/* Floating Overlapping Detail Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white border border-[#EEF2F6] p-4 rounded-xl shadow-xl max-w-[220px] hidden sm:flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-lg bg-[#081C4B] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#C5161D]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#081C4B]">
                    Monsoon Certified
                  </div>
                  <div className="text-[11px] text-[#6B7280]">
                    Double EPDM Weather Seals
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll Down */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <a
          href="#trust"
          className="flex flex-col items-center gap-1 text-[#6B7280] hover:text-[#081C4B] transition-colors"
          aria-label="Scroll to explore"
        >
          <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#081C4B]">Explore Systems</span>
          <ArrowDown className="w-4 h-4 text-[#C5161D] animate-bounce" />
        </a>
      </div>
    </section>
  );
}
