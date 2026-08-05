"use client";

import { motion } from "motion/react";
import { Award, Target, Palette, CloudRain, Sparkles, Ruler, ShieldCheck } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import StaggerChildren, { staggerChildVariants } from "@/components/motion/StaggerChildren";
import { WHY_CHOOSE_CARDS } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  Target,
  Palette,
  CloudRain,
  Sparkles,
  Ruler,
};

export default function WhyChoose() {
  return (
    <section className="section-padding bg-[#F8F9FB]" id="why-choose">
      <div className="container-custom">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="section-label">Engineering Superiority</span>
            <h2 className="section-title">
              Why Choose <span className="text-[#C5161D]">Arihant Creations</span>
            </h2>
            <p className="section-subtitle mx-auto">
              We combine European profile engineering, acoustic sealing, and master craftsmanship to elevate modern living spaces.
            </p>
          </div>
        </FadeIn>

        {/* Asymmetric Alternating Cards Grid */}
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_CARDS.map((card, idx) => {
            const Icon = iconMap[card.icon] || Award;
            const isFeatured = idx === 0 || idx === 3;

            return (
              <motion.div
                key={card.title}
                variants={staggerChildVariants}
                className={`card-base group cursor-default p-8 transition-all duration-300 ${
                  isFeatured
                    ? "bg-[#081C4B] text-white border-[#081C4B] shadow-xl"
                    : "bg-white text-[#111827] border-[#EEF2F6] shadow-sm hover:shadow-lg"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                    isFeatured
                      ? "bg-white/10 text-white"
                      : "bg-[#081C4B]/5 text-[#081C4B] group-hover:bg-[#081C4B] group-hover:text-white"
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isFeatured ? "text-[#C5161D]" : ""}`} />
                </div>

                <h3
                  className={`font-heading font-bold text-xl mb-3 transition-colors ${
                    isFeatured ? "text-white" : "text-[#081C4B] group-hover:text-[#C5161D]"
                  }`}
                >
                  {card.title}
                </h3>

                <p
                  className={`text-sm leading-relaxed ${
                    isFeatured ? "text-white/70" : "text-[#6B7280]"
                  }`}
                >
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
