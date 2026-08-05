import { Ruler, ShieldCheck, Award, Wrench } from "lucide-react";
import { TRUST_BADGES } from "@/lib/constants";

const iconMap = {
  Ruler,
  ShieldCheck,
  Award,
  Wrench,
};

export default function TrustBar() {
  return (
    <section id="trust" className="bg-[#EEF2F6] border-y border-[#EEF2F6]">
      <div className="container-custom py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {TRUST_BADGES.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || Award;
            return (
              <div
                key={item.label}
                className="flex items-center justify-center gap-3 bg-white py-4 px-5 rounded-xl border border-[#EEF2F6] shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-[#081C4B]/5 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#C5161D]" />
                </div>
                <span className="text-sm font-bold text-[#081C4B]">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
