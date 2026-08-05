"use client";

import Image from "next/image";
import { CheckCircle2, ShieldCheck, Award, Ruler } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { IMAGES } from "@/lib/constants";

export default function BrandStory() {
  return (
    <section className="section-padding bg-white overflow-hidden" id="brand-story">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Layered Architectural Photography */}
          <div className="lg:col-span-6 relative">
            <FadeIn>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[#EEF2F6]">
                <Image
                  src={IMAGES.brandCraftsmanship}
                  alt="Modern architectural glass facade engineered by Arihant Creations"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081C4B]/40 via-transparent to-transparent" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#081C4B] text-white p-6 rounded-2xl shadow-xl max-w-[260px] border-2 border-white">
                <div className="text-3xl font-extrabold font-heading text-[#C5161D] mb-1">
                  100%
                </div>
                <div className="text-sm font-bold leading-snug text-white">
                  Precision CNC Engineered Systems
                </div>
                <p className="text-white/60 text-xs mt-1">
                  Crafted to sub-millimeter tolerances.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6">
            <FadeIn delay={0.1}>
              <span className="section-label">Engineering Standards</span>
              <h2 className="section-title mb-6">
                Crafted for India&apos;s Most Demanding <span className="text-[#C5161D]">Residences</span>
              </h2>

              <p className="text-[#111827] text-base sm:text-lg leading-relaxed mb-6 font-medium">
                Arihant Creations engineers world-class aluminium fenestration systems that marry sleek European aesthetics with extreme weather resistance.
              </p>

              <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed mb-8">
                From high-rise coastal developments in Mumbai to luxury villas in Alibaug, our thermal break windows and Lift & Slide patio doors are built to withstand driving monsoon rains, high wind pressures, and harsh coastal humidity without losing structural integrity.
              </p>

              {/* Feature Points */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C5161D] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#081C4B]">Thermal Insulation</h4>
                    <p className="text-xs text-[#6B7280]">Polyamide thermal break profiles for solar heat reduction.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C5161D] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#081C4B]">Acoustic Attenuation</h4>
                    <p className="text-xs text-[#6B7280]">Double-glazed acoustic seals reducing traffic noise up to 42dB.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C5161D] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#081C4B]">Anodized Durability</h4>
                    <p className="text-xs text-[#6B7280]">UV-resistant powder coating & anodized finishes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C5161D] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#081C4B]">Multi-Point Security</h4>
                    <p className="text-xs text-[#6B7280]">Concealed multi-point locks and anti-lift hardware.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EEF2F6] flex items-center gap-6">
                <a href="#contact" className="btn-cta text-sm py-3.5 px-6">
                  Schedule a Free Site Visit
                </a>
                <a href="#products" className="text-sm font-bold text-[#081C4B] hover:text-[#C5161D] transition-colors">
                  Explore Systems →
                </a>
              </div>

            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
