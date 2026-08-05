"use client";

import { Star, Quote } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  return (
    <section className="section-padding bg-white" id="testimonials">
      <div className="container-custom">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="section-label">Client Endorsements</span>
            <h2 className="section-title">
              What Architects & Clients <span className="text-[#C5161D]">Say</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Read how our bespoke fenestration solutions perform in luxury private residences and corporate spaces.
            </p>
          </div>
        </FadeIn>

        {/* Scrollable Cards Grid */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-5 px-5 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {TESTIMONIALS.map((testimonial, index) => (
            <FadeIn
              key={testimonial.id}
              delay={index * 0.12}
              className="snap-start shrink-0 w-[85%] sm:w-[70%] lg:w-auto"
            >
              <div className="card-base p-8 bg-white border border-[#EEF2F6] h-full flex flex-col justify-between">
                <div>
                  {/* Quote Icon */}
                  <div className="w-10 h-10 rounded-xl bg-[#081C4B]/5 flex items-center justify-center mb-6">
                    <Quote className="w-5 h-5 text-[#C5161D]" />
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#C5161D] text-[#C5161D]"
                      />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <blockquote className="text-[#111827] text-sm leading-relaxed mb-6 font-medium">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#EEF2F6]">
                  <div className="w-10 h-10 rounded-full bg-[#081C4B] flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#081C4B]">
                      {testimonial.name}
                    </p>
                    <p className="text-[#6B7280] text-xs font-semibold">
                      {testimonial.projectType}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
