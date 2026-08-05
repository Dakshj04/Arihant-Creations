"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Shield, Layers, Sliders, CheckCircle2 } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { PRODUCTS, IMAGES } from "@/lib/constants";

export default function ProductShowcase() {
  const featuredProduct = PRODUCTS.find((p) => p.id === "sliding-doors") || PRODUCTS[0];
  const supportingProducts = PRODUCTS.filter((p) => p.id === "sliding-windows" || p.id === "casement-windows");
  const highlightProducts = PRODUCTS.filter((p) => p.id === "office-partitions" || p.id === "glass-railings");

  return (
    <section className="section-padding bg-[#F8F9FB]" id="products">
      <div className="container-custom">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="section-label">Curated Systems</span>
            <h2 className="section-title">
              Architectural Systems for <span className="text-[#C5161D]">Modern Spaces</span>
            </h2>
            <p className="section-subtitle mx-auto">
              From panoramic patio elevations to acoustic partitions — explore our precision systems.
            </p>
          </div>
        </FadeIn>

        {/* 1. Large Featured Product Card (Lift & Slide Doors) */}
        <FadeIn className="mb-12">
          <div className="card-base p-0 overflow-hidden bg-white border border-[#EEF2F6] grid lg:grid-cols-12 shadow-lg">
            {/* Image Side */}
            <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[460px]">
              <Image
                src={IMAGES.slidingDoors}
                alt="Lift and slide aluminium patio doors for luxury villas"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081C4B]/60 via-transparent to-transparent" />
              <div className="absolute top-5 left-5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5161D] bg-white px-3 py-1 rounded-md shadow-sm">
                  Flagship System
                </span>
              </div>
            </div>

            {/* Editorial Content Side */}
            <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C5161D] mb-2 block">
                  Panoramic Glass Elevation
                </span>
                <h3 className="font-heading font-extrabold text-2xl lg:text-3xl text-[#081C4B] mb-4">
                  {featuredProduct.name}
                </h3>
                <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed mb-6">
                  {featuredProduct.description}
                </p>

                {/* Specs List */}
                <div className="space-y-3 mb-8 pt-4 border-t border-[#EEF2F6]">
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-[#081C4B]">
                    <Sliders className="w-4 h-4 text-[#C5161D]" />
                    <span>Up to 400kg glass panel weight capacity</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-[#081C4B]">
                    <Layers className="w-4 h-4 text-[#C5161D]" />
                    <span>Double or triple acoustic glazed options</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-[#081C4B]">
                    <Shield className="w-4 h-4 text-[#C5161D]" />
                    <span>Multi-point stainless steel locking track</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a href="#contact" className="btn-cta text-sm py-3.5 px-6">
                  Book a Site Visit
                </a>
                <Link href={featuredProduct.href} className="text-sm font-bold text-[#081C4B] hover:text-[#C5161D] transition-colors">
                  View Specs →
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 2. Supporting Pair Layout */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {supportingProducts.map((product, idx) => (
            <FadeIn key={product.id} delay={idx * 0.1}>
              <div className="card-base p-0 overflow-hidden bg-white border border-[#EEF2F6] h-full flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={product.id === "sliding-windows" ? IMAGES.heroVilla : IMAGES.casementWindows}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081C4B]/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="font-heading font-bold text-xl text-white">
                      {product.name}
                    </h4>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <Link
                    href={product.href}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#081C4B] group-hover:text-[#C5161D] transition-colors"
                  >
                    Learn Technical Specifications
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* 3. Dark Navy Highlight Band (Partitions & Balustrades) */}
        <FadeIn>
          <div className="rounded-2xl bg-[#081C4B] text-white p-8 lg:p-12 border border-[#081C4B] shadow-2xl relative overflow-hidden">
            <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6">
                <span className="text-xs font-bold text-[#C5161D] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-md inline-block mb-3">
                  Interior & Exterior Glazing
                </span>
                <h3 className="font-heading font-extrabold text-2xl lg:text-3xl text-white mb-4">
                  Acoustic Glass Partitions & Structural Balustrades
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  Sleek interior acoustic glass walls for corporate boardrooms paired with frameless structural balustrades for open balcony elevations.
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-semibold text-white/80 mb-6">
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-[#C5161D]" />
                    <span>Concealed Aluminium Profiles</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-[#C5161D]" />
                    <span>Laminated Toughened Glass</span>
                  </div>
                </div>
                <a href="#contact" className="btn-cta text-sm py-3 px-6">
                  Get a Custom Estimate
                </a>
              </div>

              {/* Highlight Image Grid */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
                  <Image
                    src={IMAGES.officePartitions}
                    alt="Acoustic office glass partition"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
                  <Image
                    src={IMAGES.glassRailings}
                    alt="Frameless glass balustrade"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
