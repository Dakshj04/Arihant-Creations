"use client";

import { motion } from "motion/react";
import {
  MessageSquare,
  Ruler,
  PenTool,
  Factory,
  Hammer,
  Headphones,
} from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import StaggerChildren, { staggerChildVariants } from "@/components/motion/StaggerChildren";
import { PROCESS_STEPS } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Ruler,
  PenTool,
  Factory,
  Hammer,
  HeadphonesIcon: Headphones,
};

export default function ProcessTimeline() {
  return (
    <section className="section-padding bg-[#F8F9FB]" id="process">
      <div className="container-custom">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="section-label">Seamless Execution</span>
            <h2 className="section-title">
              Our Execution <span className="text-[#C5161D]">Process</span>
            </h2>
            <p className="section-subtitle mx-auto">
              From preliminary CAD drawings to final acoustic weather sealing, we execute every phase with white-glove precision.
            </p>
          </div>
        </FadeIn>

        {/* Desktop Timeline */}
        <StaggerChildren className="hidden lg:grid grid-cols-6 gap-0 relative">
          {/* Connecting line */}
          <div className="absolute top-[3.25rem] left-[8.33%] right-[8.33%] h-[2px] bg-[#EEF2F6] z-0" />

          {PROCESS_STEPS.map((step) => {
            const Icon = iconMap[step.icon] || MessageSquare;
            return (
              <motion.div
                key={step.number}
                variants={staggerChildVariants}
                className="relative z-10 flex flex-col items-center text-center px-2"
              >
                {/* Step Circle */}
                <div className="w-[4.5rem] h-[4.5rem] rounded-2xl bg-white border-2 border-[#081C4B] flex items-center justify-center mb-4 shadow-sm group">
                  <Icon className="w-6 h-6 text-[#081C4B]" />
                </div>

                {/* Step Number Badge */}
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#C5161D] text-white text-xs font-extrabold mb-3 shadow-sm">
                  {step.number}
                </span>

                <h3 className="font-heading font-bold text-sm text-[#081C4B] mb-1.5">
                  {step.title}
                </h3>
                <p className="text-[#6B7280] text-xs leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </StaggerChildren>

        {/* Mobile Timeline */}
        <StaggerChildren className="lg:hidden space-y-0">
          {PROCESS_STEPS.map((step, index) => {
            const Icon = iconMap[step.icon] || MessageSquare;
            const isLast = index === PROCESS_STEPS.length - 1;
            return (
              <motion.div
                key={step.number}
                variants={staggerChildVariants}
                className="flex gap-5"
              >
                {/* Line + Circle */}
                <div className="flex flex-col items-center">
                  <div className="w-11 h-11 rounded-xl bg-[#081C4B] flex items-center justify-center shrink-0 shadow-sm">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  {!isLast && (
                    <div className="w-[2px] h-full min-h-[3.5rem] bg-[#EEF2F6]" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8">
                  <span className="text-xs font-bold text-[#C5161D] uppercase tracking-wider">
                    Phase {step.number}
                  </span>
                  <h3 className="font-heading font-bold text-base text-[#081C4B] mt-0.5 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
