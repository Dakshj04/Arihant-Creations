"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin, Building, Calendar } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import StaggerChildren, { staggerChildVariants } from "@/components/motion/StaggerChildren";
import { SIGNATURE_PROJECTS, type SignatureProject } from "@/lib/constants";

export default function SignatureProjects() {
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Residential Villa", "Penthouse", "Commercial HQ"];

  const filteredProjects =
    filter === "All"
      ? SIGNATURE_PROJECTS
      : SIGNATURE_PROJECTS.filter((p) => p.category === filter);

  return (
    <section className="section-padding bg-white" id="signature-projects">
      <div className="container-custom">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="section-label">Architectural Portfolio</span>
            <h2 className="section-title">
              Signature <span className="text-[#C5161D]">Projects</span>
            </h2>
            <p className="section-subtitle mx-auto">
              A curated selection of luxury private residences, penthouses, and commercial headquarters engineered with our systems.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    filter === cat
                      ? "bg-[#081C4B] text-white shadow-md"
                      : "bg-[#EEF2F6] text-[#081C4B] hover:bg-[#081C4B]/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Projects Grid */}
        <StaggerChildren className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project: SignatureProject) => (
            <div
              key={project.id}
              className="card-base p-0 overflow-hidden bg-white border border-[#EEF2F6] group shadow-sm hover:shadow-xl transition-all"
            >
              {/* Architectural Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#EEF2F6]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081C4B]/80 via-[#081C4B]/20 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-white bg-[#C5161D] px-2.5 py-1 rounded-md shadow-sm">
                    {project.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h3 className="font-heading font-bold text-2xl text-white mb-1">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-white/80 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C5161D]" />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-[#C5161D]" />
                      {project.architect}
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Meta Bar */}
              <div className="p-5 flex items-center justify-between bg-white border-t border-[#EEF2F6]">
                <div>
                  <span className="text-[11px] uppercase font-bold text-[#6B7280] block">
                    Systems Installed
                  </span>
                  <span className="text-xs font-bold text-[#081C4B]">
                    {project.systemsUsed}
                  </span>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#081C4B] group-hover:text-[#C5161D] transition-colors"
                >
                  Consult Similar Project
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
