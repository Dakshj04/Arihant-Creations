"use client";

import { Check, X, Sparkles } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";

const COMPARISON_DATA = [
  {
    feature: "Max Glass Aperture Size",
    aluminium: "Up to 12ft (Ultra-Slim)",
    wood: "Limited to 7ft",
    steel: "Up to 10ft (Heavy)",
    upvc: "Limited to 6ft (Thick)",
  },
  {
    feature: "Frame Sightline Thickness",
    aluminium: "Ultra-Minimal (18mm–35mm)",
    wood: "Bulky (75mm+)",
    steel: "Minimal (30mm)",
    upvc: "Very Thick (80mm+)",
  },
  {
    feature: "Maintenance Required",
    aluminium: "Zero (Anodized Wipe)",
    wood: "High (Varnish & Sanding)",
    steel: "High (Anti-Rust Paint)",
    upvc: "Moderate (Yellowing)",
  },
  {
    feature: "Monsoon & Weather Seal",
    aluminium: "100% Water & Wind Tight",
    wood: "Warps & Expands with Humidity",
    steel: "Corrodes in Salt/Coastal Air",
    upvc: "Brittle in Sun & UV Rays",
  },
  {
    feature: "Lifespan Expectancy",
    aluminium: "45+ Years",
    wood: "15–20 Years",
    steel: "20–25 Years",
    upvc: "10–15 Years",
  },
  {
    feature: "Acoustic Attenuation",
    aluminium: "Up to 42dB Double-Sealed",
    wood: "Moderate (30dB)",
    steel: "Low (Vibration Noise)",
    upvc: "Moderate (32dB)",
  },
  {
    feature: "Recyclability & Eco Rating",
    aluminium: "100% Infinitely Recyclable",
    wood: "Deforestation Impact",
    steel: "High Energy Smelting",
    upvc: "Non-Biodegradable Plastic",
  },
];

export default function MaterialComparison() {
  return (
    <section className="section-padding bg-[#F8F9FB]" id="why-aluminium">
      <div className="container-custom">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="section-label">Material Science</span>
            <h2 className="section-title">
              Why Architectural <span className="text-[#C5161D]">Aluminium</span> Wins
            </h2>
            <p className="section-subtitle mx-auto">
              Compare architectural aluminium against traditional wood, steel, and uPVC across durability, maintenance, weather tightness, and structural lifespan.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="card-base p-0 bg-white border border-[#EEF2F6] overflow-x-auto shadow-lg rounded-2xl">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#081C4B] text-white">
                  <th className="py-5 px-6 font-heading font-extrabold text-sm uppercase tracking-wider w-1/4">
                    Performance Metric
                  </th>
                  <th className="py-5 px-6 font-heading font-extrabold text-sm uppercase tracking-wider w-1/4 bg-[#C5161D] text-white flex-1">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      Arihant Aluminium
                    </div>
                  </th>
                  <th className="py-5 px-6 font-heading font-bold text-sm uppercase tracking-wider text-white/70 w-1/6">
                    Hardwood
                  </th>
                  <th className="py-5 px-6 font-heading font-bold text-sm uppercase tracking-wider text-white/70 w-1/6">
                    Steel
                  </th>
                  <th className="py-5 px-6 font-heading font-bold text-sm uppercase tracking-wider text-white/70 w-1/6">
                    uPVC
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF2F6] text-sm">
                {COMPARISON_DATA.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#F8F9FB]/50"}
                  >
                    <td className="py-4 px-6 font-bold text-[#081C4B]">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 font-extrabold text-[#081C4B] bg-[#C5161D]/5 border-x border-[#C5161D]/20">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#C5161D] shrink-0" />
                        <span>{row.aluminium}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[#6B7280]">
                      <div className="flex items-center gap-1.5">
                        <X className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{row.wood}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[#6B7280]">
                      <div className="flex items-center gap-1.5">
                        <X className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{row.steel}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[#6B7280]">
                      <div className="flex items-center gap-1.5">
                        <X className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{row.upvc}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
