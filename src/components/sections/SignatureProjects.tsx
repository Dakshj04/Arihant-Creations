"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin, Building, Calendar, X, ChevronRight, Ruler, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import FadeIn from "@/components/motion/FadeIn";
import StaggerChildren from "@/components/motion/StaggerChildren";
import { SIGNATURE_PROJECTS, type SignatureProject } from "@/lib/constants";

export default function SignatureProjects() {
  const [filter, setFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<SignatureProject | null>(null);

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
              className="card-base p-0 overflow-hidden bg-white border border-[#EEF2F6] group shadow-sm hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Architectural Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#EEF2F6]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
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

                <span
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#081C4B] group-hover:text-[#C5161D] transition-colors"
                >
                  View Details
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </StaggerChildren>
      </div>

      {/* ═══ PROJECT DETAIL MODAL ═══ */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Content */}
            <motion.div
              className="relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#EEF2F6]"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-[#081C4B] hover:bg-[#C5161D] hover:text-white transition-colors"
                aria-label="Close project details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Hero Image */}
              <div className="relative aspect-[16/9] bg-[#EEF2F6]">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081C4B]/70 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-16 text-white">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-white bg-[#C5161D] px-2.5 py-1 rounded-md shadow-sm inline-block mb-2">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Details Content */}
              <div className="p-6 sm:p-8">
                {/* Meta Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 pb-6 border-b border-[#EEF2F6]">
                  <div>
                    <div className="flex items-center gap-1.5 text-[#C5161D] mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Location</span>
                    </div>
                    <span className="text-sm font-bold text-[#081C4B]">{selectedProject.location}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-[#C5161D] mb-1">
                      <Building className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Architect</span>
                    </div>
                    <span className="text-sm font-bold text-[#081C4B]">{selectedProject.architect}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-[#C5161D] mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Completed</span>
                    </div>
                    <span className="text-sm font-bold text-[#081C4B]">{selectedProject.completionTime}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-[#C5161D] mb-1">
                      <Layers className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Systems</span>
                    </div>
                    <span className="text-sm font-bold text-[#081C4B]">{selectedProject.systemsUsed}</span>
                  </div>
                </div>

                {/* Engineering Highlights */}
                <div className="mb-6">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#081C4B] mb-3">
                    Engineering Highlights
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2.5 bg-[#F8F9FB] p-3 rounded-xl border border-[#EEF2F6]">
                      <Ruler className="w-4 h-4 text-[#C5161D] mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-[#081C4B] block">CNC Precision Fabrication</span>
                        <span className="text-[11px] text-[#6B7280]">Sub-millimeter CAD tolerances</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 bg-[#F8F9FB] p-3 rounded-xl border border-[#EEF2F6]">
                      <Layers className="w-4 h-4 text-[#C5161D] mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-[#081C4B] block">Double EPDM Sealing</span>
                        <span className="text-[11px] text-[#6B7280]">100% weather-tight certification</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/#contact"
                    onClick={() => setSelectedProject(null)}
                    className="btn-cta text-sm py-3.5 px-6 justify-center flex-1"
                  >
                    Consult a Similar Project
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                  <a
                    href="/#products"
                    onClick={() => setSelectedProject(null)}
                    className="btn-secondary text-sm py-3.5 px-6 justify-center flex-1"
                  >
                    View Systems Used
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
