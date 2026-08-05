"use client";

import AnimatedCounter from "@/components/motion/AnimatedCounter";
import FadeIn from "@/components/motion/FadeIn";
import { STATS } from "@/lib/constants";
import { Calendar, FolderCheck, ShieldCheck, Award } from "lucide-react";

const statIcons = [Calendar, FolderCheck, ShieldCheck, Award];

export default function Stats() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="section-label">Proven Performance</span>
            <h2 className="section-title">
              Engineered for <span className="text-[#C5161D]">Excellence</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Our track record reflects decades of commitment to architectural precision and customer satisfaction.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STATS.map((stat, index) => {
            const Icon = statIcons[index];
            return (
              <FadeIn key={stat.label} delay={index * 0.1}>
                <div className="card-base text-center p-8 bg-white border border-[#EEF2F6]">
                  <div className="w-12 h-12 rounded-xl bg-[#081C4B]/5 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-[#C5161D]" />
                  </div>
                  <div className="font-heading font-extrabold text-3xl md:text-4xl text-[#081C4B] mb-2 tracking-tight">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                    />
                  </div>
                  <p className="text-[#6B7280] text-sm font-semibold">
                    {stat.label}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
