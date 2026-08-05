"use client";

import dynamic from "next/dynamic";
import FadeIn from "@/components/motion/FadeIn";

// Lazy-load ProductConfigurator to preserve 95+ Lighthouse initial load performance
const ProductConfigurator = dynamic(
  () => import("@/components/configurator/ProductConfigurator"),
  {
    loading: () => (
      <div className="card-base p-12 text-center bg-white border border-[#EEF2F6] min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#081C4B] border-t-[#C5161D] rounded-full animate-spin" />
          <span className="text-xs font-bold text-[#081C4B] uppercase tracking-wider">
            Loading Interactive Configurator Engine...
          </span>
        </div>
      </div>
    ),
    ssr: false,
  }
);

export default function ConfiguratorSection() {
  return (
    <section className="section-padding bg-white" id="configurator">
      <div className="container-custom">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="section-label">Interactive System Builder</span>
            <h2 className="section-title">
              Configure Your <span className="text-[#C5161D]">System</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Select window types, frame finishes, glass specifications, and custom dimensions for instant price estimates and architectural specification exports.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <ProductConfigurator />
        </FadeIn>
      </div>
    </section>
  );
}
