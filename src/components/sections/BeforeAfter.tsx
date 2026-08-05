"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { Sparkles, MoveRight, Volume2, VolumeX, ShieldCheck, Wind, Sliders } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { IMAGES } from "@/lib/constants";

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1000);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Motion Value for horizontal slide (0 to maxSlide)
  const xRaw = useMotionValue(0);
  
  // Spring physics for realistic momentum and gentle easing
  const x = useSpring(xRaw, {
    stiffness: 220,
    damping: 28,
    mass: 0.8,
  });

  // Calculate container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Max slide distance is 72% of frame width
  const maxSlide = Math.max(280, containerWidth * 0.68);

  // Derived transforms for realistic visual effects as handle slides:
  // 1. Slide percentage (0 to 1)
  const slideProgress = useTransform(x, [0, maxSlide], [0, 1]);
  
  // 2. Outdoor landscape clarity & brightness shift
  const outdoorBrightness = useTransform(slideProgress, [0, 1], [0.9, 1.15]);
  const outdoorSaturate = useTransform(slideProgress, [0, 1], [0.95, 1.1]);

  // 3. Interior room ambient light brightening
  const roomLightOpacity = useTransform(slideProgress, [0, 1], [0.2, 0.45]);

  // 4. Glass reflection translation & fading
  const reflectionX = useTransform(x, [0, maxSlide], [0, maxSlide * 1.3]);
  const reflectionOpacity = useTransform(slideProgress, [0, 1], [0.45, 0.1]);

  // 5. Soft sash shadow shift
  const shadowX = useTransform(x, [0, maxSlide], [0, 24]);
  const shadowSpread = useTransform(slideProgress, [0, 1], [12, 32]);

  // 6. Percentage open (0% to 100%)
  const [percentOpen, setPercentOpen] = useState(0);

  useEffect(() => {
    const unsubscribe = slideProgress.on("change", (latest) => {
      setPercentOpen(Math.round(latest * 100));
    });
    return unsubscribe;
  }, [slideProgress]);

  // Handle Dragging
  const handleDrag = (_: any, info: { point: { x: number } }) => {
    if (!containerRef.current) return;
    if (!hasInteracted) setHasInteracted(true);
    const rect = containerRef.current.getBoundingClientRect();
    let currentX = info.point.x - rect.left - 60; // offset for handle position
    if (currentX < 0) currentX = 0;
    if (currentX > maxSlide) currentX = maxSlide;
    xRaw.set(currentX);
  };

  // Optional Web Audio API sliding sound generator
  const playSlidingSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // Audio context fallback
    }
  }, [soundEnabled]);

  const handlePointerDown = () => {
    setIsDragging(true);
    if (!hasInteracted) setHasInteracted(true);
    playSlidingSound();
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <section className="section-padding bg-[#040E26] text-white overflow-hidden relative" id="interactive-window">
      <div className="container-custom">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="text-[#C5161D] text-xs font-extrabold uppercase tracking-[0.2em] bg-white/10 px-4 py-1.5 rounded-full inline-block mb-3 border border-white/10">
              Interactive Product Demo
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
              Experience the <span className="text-[#C5161D]">Slimline Glide</span>
            </h2>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto font-normal">
              Drag the architectural aluminium handle below to experience the whisper-quiet momentum, acoustic sealing, and panoramic elevation of our sliding systems.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="max-w-6xl mx-auto">
            
            {/* Top Toolbar / Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#081C4B] border border-white/10 px-6 py-3.5 rounded-t-2xl text-xs font-semibold">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C5161D] animate-pulse" />
                  <span className="text-white font-bold uppercase tracking-wider">
                    {percentOpen === 0 ? "Airtight Acoustic Seal Active (42dB)" : percentOpen === 100 ? "Fully Open Panoramic View" : `Aperture ${percentOpen}% Open`}
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-white/60">
                  <ShieldCheck className="w-4 h-4 text-[#C5161D]" />
                  <span>Double EPDM Weather Gasket</span>
                </div>
              </div>

              {/* Sound & Reset Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white/80"
                  title="Toggle sliding sound effect"
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#C5161D]" /> : <VolumeX className="w-3.5 h-3.5 text-white/50" />}
                  <span>{soundEnabled ? "Sound On" : "Sound Off"}</span>
                </button>

                <button
                  onClick={() => {
                    xRaw.set(0);
                    playSlidingSound();
                  }}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white/80"
                >
                  Close Window
                </button>
              </div>
            </div>

            {/* Interactive Full-Width Window Scene Frame */}
            <div
              ref={containerRef}
              className="relative aspect-[16/9] sm:aspect-[21/9] bg-black overflow-hidden border-x-4 border-b-4 border-[#081C4B] rounded-b-2xl shadow-2xl select-none"
            >
              
              {/* Layer 1: Pristine Outdoor Landscape Background */}
              <motion.div
                style={{
                  filter: `brightness(${outdoorBrightness.get()}) saturate(${outdoorSaturate.get()})`,
                }}
                className="absolute inset-0 z-0"
              >
                <Image
                  src={IMAGES.heroVilla}
                  alt="Outdoor luxury villa landscape and infinity pool"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Layer 2: Fixed Left Glass Panel & Stationary Frame */}
              <div className="absolute top-0 bottom-0 left-0 w-1/2 z-10 border-r-2 border-white/20 pointer-events-none">
                {/* Stationary Tinted Glass Overlay */}
                <div className="absolute inset-0 bg-[#081C4B]/20 backdrop-blur-[0.5px]" />
                {/* Glass Reflection Highlight */}
                <div className="absolute inset-0 opacity-30 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded text-[11px] font-bold text-white border border-white/15">
                  Fixed Architectural Panel
                </div>
              </div>

              {/* Layer 3: Dynamic Interior Ambient Lighting Glow */}
              <motion.div
                style={{ opacity: roomLightOpacity }}
                className="absolute inset-0 z-15 bg-gradient-to-t from-amber-100/30 via-transparent to-transparent pointer-events-none"
              />

              {/* Layer 4: SLIDING GLASS PANEL & ALUMINIUM SASH (Moves horizontally) */}
              <motion.div
                style={{ x }}
                className="absolute top-0 bottom-0 left-1/2 w-1/2 z-20 shadow-2xl border-l-8 border-[#081C4B]"
              >
                {/* Sliding Glass Surface Tint & Acoustic Filter */}
                <div className="absolute inset-0 bg-[#081C4B]/25 backdrop-blur-[0.5px]" />

                {/* Shifting Glass Reflection Layer */}
                <motion.div
                  style={{
                    x: reflectionX,
                    opacity: reflectionOpacity,
                  }}
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/35 to-transparent pointer-events-none"
                />

                {/* Panel Stile Edge Highlight */}
                <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-r from-[#A8B2B8] to-[#081C4B]" />

                {/* Panel Label */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded text-[11px] font-bold text-white border border-white/15">
                  Active Sliding Sash
                </div>

                {/* ─── REAL ALUMINIUM HANDLE (Draggable Target) ─── */}
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: maxSlide }}
                  dragElastic={0.05}
                  dragMomentum={true}
                  onDrag={handleDrag}
                  onPointerDown={handlePointerDown}
                  onPointerUp={handlePointerUp}
                  className="absolute top-1/2 -translate-y-1/2 -left-6 z-30 cursor-grab active:cursor-grabbing group"
                >
                  {/* Heavy Architectural Aluminium Handle Body */}
                  <div
                    className={`relative w-9 h-44 rounded-xl bg-gradient-to-b from-[#111827] via-[#081C4B] to-[#040E26] border-2 border-[#A8B2B8]/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col items-center justify-between py-3 transition-transform duration-200 ${
                      isDragging ? "scale-105 border-[#C5161D] shadow-[0_0_20px_rgba(197,22,29,0.5)]" : "group-hover:scale-102 group-hover:border-white"
                    }`}
                  >
                    {/* Metallic Bevel Texture */}
                    <div className="w-1.5 h-10 rounded-full bg-gradient-to-b from-[#A8B2B8] to-transparent opacity-80" />
                    
                    {/* Red Accent Indicator Line on Handle */}
                    <div className={`w-2 h-8 rounded-full transition-colors ${isDragging ? "bg-[#C5161D] shadow-[0_0_10px_#C5161D]" : "bg-[#C5161D]/70 group-hover:bg-[#C5161D]"}`} />
                    
                    <div className="w-1.5 h-10 rounded-full bg-gradient-to-t from-[#A8B2B8] to-transparent opacity-80" />
                  </div>

                  {/* Handle Drag Grip Cue */}
                  <div className="absolute top-1/2 -translate-y-1/2 -left-12 bg-[#C5161D] text-white px-2 py-1 rounded text-[10px] font-extrabold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                    DRAG
                  </div>
                </motion.div>

              </motion.div>

              {/* Layer 5: Floating Invitation Hint (Fades out after first interaction) */}
              <AnimatePresence>
                {!hasInteracted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 bg-[#081C4B]/95 backdrop-blur-md border border-[#C5161D]/50 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 pointer-events-none"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#C5161D] flex items-center justify-center animate-bounce">
                      <MoveRight className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold">
                      Drag the aluminium handle to experience our Slimline Sliding System
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Outer Architectural Border Overlays */}
              <div className="absolute inset-0 border-[10px] border-[#081C4B] pointer-events-none rounded-b-xl" />
            </div>

            {/* Bottom Tech Specifications Callout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-[#081C4B]/60 border border-white/10 p-4 rounded-xl text-center">
                <div className="text-xs font-bold text-[#C5161D] uppercase">Sightline</div>
                <div className="text-lg font-extrabold font-heading text-white">18mm Ultra-Slim</div>
              </div>
              <div className="bg-[#081C4B]/60 border border-white/10 p-4 rounded-xl text-center">
                <div className="text-xs font-bold text-[#C5161D] uppercase">Acoustic Attenuation</div>
                <div className="text-lg font-extrabold font-heading text-white">42dB Double-Sealed</div>
              </div>
              <div className="bg-[#081C4B]/60 border border-white/10 p-4 rounded-xl text-center">
                <div className="text-xs font-bold text-[#C5161D] uppercase">Max Panel Weight</div>
                <div className="text-lg font-extrabold font-heading text-white">400 kg Capacity</div>
              </div>
              <div className="bg-[#081C4B]/60 border border-white/10 p-4 rounded-xl text-center">
                <div className="text-xs font-bold text-[#C5161D] uppercase">Weather Rating</div>
                <div className="text-lg font-extrabold font-heading text-white">100% Monsoon Tight</div>
              </div>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
