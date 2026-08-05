import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PRODUCTS, IMAGES } from "@/lib/constants";
import { generateProductSchema } from "@/lib/schema";
import BeforeAfter from "@/components/sections/BeforeAfter";
import MaterialComparison from "@/components/sections/MaterialComparison";
import ConfiguratorSection from "@/components/sections/ConfiguratorSection";

export const metadata: Metadata = {
  title: "Products Portfolio",
  description:
    "Explore our complete range of architectural aluminium sliding systems, thermal casement windows, acoustic partitions, and structural glass balustrades.",
};

export default function ProductsPage() {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 bg-[#F8F9FB]">
      <div className="container-custom">
        {/* Product JSON-LD Schemas */}
        {PRODUCTS.map((product) => {
          const schema = generateProductSchema(product);
          return (
            <script
              key={product.id}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
              }}
            />
          );
        })}

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#081C4B] hover:text-[#C5161D] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Homepage
        </Link>

        <span className="section-label">Architectural Systems</span>
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#081C4B] mb-4">
          Architectural <span className="text-[#C5161D]">Product Systems</span>
        </h1>
        <p className="text-[#6B7280] text-base sm:text-lg mb-12 max-w-3xl">
          Each system is custom-manufactured to micro-millimeter CAD tolerances using high-density architectural aluminium alloys.
        </p>

        {/* Product Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              id={product.id}
              className="card-base p-0 overflow-hidden bg-white border border-[#EEF2F6] group shadow-sm hover:shadow-xl transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EEF2F6]">
                <Image
                  src={
                    product.id === "sliding-doors"
                      ? IMAGES.slidingDoors
                      : product.id === "sliding-windows"
                      ? IMAGES.heroVilla
                      : product.id === "casement-windows"
                      ? IMAGES.casementWindows
                      : product.id === "office-partitions"
                      ? IMAGES.officePartitions
                      : product.id === "glass-railings"
                      ? IMAGES.glassRailings
                      : IMAGES.facadeCladding
                  }
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081C4B]/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h2 className="font-heading font-bold text-xl text-white">
                    {product.name}
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
                  {product.description}
                </p>

                <div className="space-y-2 mb-6 text-xs text-[#081C4B] font-semibold">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5161D]" />
                    <span>European Hardware & Thermal Break</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5161D]" />
                    <span>EPDM Weather Seals & Drainage Channels</span>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#081C4B] group-hover:text-[#C5161D] transition-colors"
                >
                  Request Technical Quotation
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phase 2: Before / After Slider */}
      <BeforeAfter />

      {/* Phase 2: Material Comparison Table */}
      <MaterialComparison />

      {/* Phase 3: Interactive Configurator */}
      <ConfiguratorSection />
    </div>
  );
}
