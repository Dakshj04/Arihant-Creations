"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import FadeIn from "@/components/motion/FadeIn";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-[#F8F9FB]" id="faq">
      <div className="container-custom max-w-3xl">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="section-label">Technical Clarity</span>
            <h2 className="section-title">
              Frequently Asked <span className="text-[#C5161D]">Questions</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Clear answers regarding specifications, site readiness, acoustic insulation, and system guarantees.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="space-y-3.5">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-[#EEF2F6] overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-[#EEF2F6]/40 transition-colors"
                    aria-expanded={isOpen}
                    id={`faq-trigger-${index}`}
                    aria-controls={`faq-content-${index}`}
                  >
                    <span className="font-heading font-bold text-base text-[#081C4B] pr-2">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0"
                    >
                      <ChevronDown className={`w-5 h-5 ${isOpen ? "text-[#C5161D]" : "text-[#6B7280]"}`} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-content-${index}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-[#6B7280] text-sm leading-relaxed border-t border-[#EEF2F6] pt-4">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
