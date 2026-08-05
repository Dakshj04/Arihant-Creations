"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Sparkles, Lock, Eye } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";

/* ──────────────────────────────────────────────────────────────
   CONSTANTS – Reduced ~22% for slimline premium sightlines
   ────────────────────────────────────────────────────────────── */
const FRAME_THICKNESS = 14; // px – was 18
const MULLION_WIDTH = 5;    // px – was 6
const RAIL_HEIGHT = 15;     // px – was 20

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const [slideX, setSlideX] = useState(0);
  const [maxSlide, setMaxSlide] = useState(500);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Track which callouts have already appeared (animate only once)
  const [revealedCallouts, setRevealedCallouts] = useState<Set<number>>(new Set());

  // Refs for smooth pointer-captured drag
  const isPointerDown = useRef(false);
  const dragStartX = useRef(0);
  const initialSlideX = useRef(0);

  /* ── Dimensions ── */
  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const w = containerRef.current.offsetWidth;
      const panelWidth = (w - FRAME_THICKNESS * 2 - MULLION_WIDTH) / 2;
      setMaxSlide(Math.max(100, panelWidth));
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  /* ── Pointer handlers (UNCHANGED) ── */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    isPointerDown.current = true;
    dragStartX.current = e.clientX;
    initialSlideX.current = slideX;
    setIsDragging(true);
    if (!hasInteracted) setHasInteracted(true);
    handleRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDown.current) return;
    e.preventDefault();
    const delta = e.clientX - dragStartX.current;
    const raw = initialSlideX.current + delta;
    setSlideX(Math.max(0, Math.min(raw, maxSlide)));
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    setIsDragging(false);
    handleRef.current?.releasePointerCapture(e.pointerId);
  };

  /* ── Derived values ── */
  const pct = maxSlide > 0 ? slideX / maxSlide : 0;
  const percentOpen = Math.round(pct * 100);

  // Update revealed callouts (once revealed, they stay)
  useEffect(() => {
    const thresholds = [25, 50, 75, 100];
    const next = new Set(revealedCallouts);
    let changed = false;
    for (const t of thresholds) {
      if (percentOpen >= t && !next.has(t)) {
        next.add(t);
        changed = true;
      }
    }
    if (changed) setRevealedCallouts(next);
  }, [percentOpen, revealedCallouts]);

  /* ── Inner dimensions ── */
  const innerLeft = FRAME_THICKNESS;
  const innerTop = RAIL_HEIGHT;
  const innerRight = FRAME_THICKNESS;
  const innerBottom = RAIL_HEIGHT;

  /* ── Shared aluminium material ── */
  const brushedOverlay = {
    opacity: 0.04,
    background: "repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.15) 1px, transparent 2px)",
  };
  const brushedOverlayV = {
    opacity: 0.04,
    background: "repeating-linear-gradient(180deg, transparent, transparent 1px, rgba(255,255,255,0.15) 1px, transparent 2px)",
  };

  /* ── Callout card style (Apple spec-card) ── */
  const calloutStyle = {
    background: "rgba(255,255,255,0.72)",
    backdropFilter: "blur(24px) saturate(1.8)",
    WebkitBackdropFilter: "blur(24px) saturate(1.8)",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.04)",
    borderRadius: 12,
    padding: "8px 14px",
  } as const;

  return (
    <section className="section-padding bg-white overflow-hidden relative" id="interactive-window">
      <div className="container-custom">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="section-label">Tactile Demonstration</span>
            <h2 className="section-title">
              Experience the <span className="text-[#C5161D]">Slimline Glide</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Drag the architectural aluminium handle to operate our ultra-slim sliding elevation.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="max-w-6xl mx-auto">

            {/* ═══════════════════════════════════════════════════════
                WINDOW ASSEMBLY
                ═══════════════════════════════════════════════════════ */}
            <div
              ref={containerRef}
              className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden select-none"
              style={{ cursor: isDragging ? "grabbing" : "default" }}
            >

              {/* ───── LAYER 0: Background scenery (Udaipur / Aravalli) ───── */}
              <div className="absolute inset-0" style={{ zIndex: 0 }}>
                <Image
                  src="/Background_Image.png"
                  alt="Udaipur Lake and Aravalli Hills panorama"
                  fill
                  className="object-cover"
                  style={{
                    filter: `brightness(${1 + pct * 0.10}) saturate(${1 + pct * 0.06})`,
                    willChange: "filter",
                  }}
                  priority
                />
              </div>

              {/* ───── INTERIOR FOREGROUND ELEMENTS (CSS-only) ───── */}

              {/* Warm oak wooden flooring — bottom strip */}
              <div
                className="absolute left-0 right-0 bottom-0 pointer-events-none"
                style={{
                  zIndex: 1,
                  height: "18%",
                  background: `linear-gradient(0deg, 
                    rgba(160,120,70,0.55) 0%, 
                    rgba(170,130,80,0.35) 40%, 
                    rgba(180,140,90,0.15) 70%, 
                    transparent 100%)`,
                }}
              >
                {/* Wood grain texture */}
                <div
                  className="absolute inset-0"
                  style={{
                    opacity: 0.06,
                    background: "repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(100,60,20,0.3) 40px, transparent 42px)",
                  }}
                />
              </div>

              {/* Beige sofa edge — bottom-left */}
              <div
                className="absolute pointer-events-none"
                style={{
                  zIndex: 2,
                  bottom: 0,
                  left: 0,
                  width: "22%",
                  height: "28%",
                  background: `radial-gradient(ellipse at 0% 100%, 
                    rgba(210,195,170,0.5) 0%, 
                    rgba(210,195,170,0.25) 40%, 
                    transparent 70%)`,
                  borderRadius: "0 40% 0 0",
                }}
              />

              {/* Indoor plant — bottom-right */}
              <div
                className="absolute pointer-events-none"
                style={{
                  zIndex: 2,
                  bottom: 0,
                  right: 0,
                  width: "12%",
                  height: "25%",
                  background: `radial-gradient(ellipse at 100% 100%, 
                    rgba(60,100,50,0.3) 0%, 
                    rgba(80,120,60,0.15) 50%, 
                    transparent 80%)`,
                }}
              />

              {/* Sheer white curtain — left edge, very subtle */}
              <div
                className="absolute top-0 bottom-0 left-0 pointer-events-none"
                style={{
                  zIndex: 3,
                  width: "6%",
                  background: `linear-gradient(90deg, 
                    rgba(255,255,255,0.25) 0%, 
                    rgba(255,255,255,0.08) 60%, 
                    transparent 100%)`,
                  transform: `skewX(${pct * -2}deg)`,
                }}
              />

              {/* ───── LAYER 1: FIXED PANEL (left half, stationary) ───── */}
              <div
                className="absolute pointer-events-none"
                style={{
                  zIndex: 5,
                  top: innerTop,
                  bottom: innerBottom,
                  left: innerLeft,
                  right: `calc(50% + ${MULLION_WIDTH / 2}px)`,
                }}
              >
                {/* Architectural glass – grey-blue tint */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(180deg, rgba(100,120,150,0.06) 0%, rgba(80,100,130,0.09) 100%)",
                  }}
                />
                {/* Specular highlight — top edge */}
                <div
                  className="absolute top-0 left-0 right-0"
                  style={{
                    height: 1,
                    background: "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.12) 70%, transparent 95%)",
                  }}
                />
                {/* Broad diagonal reflection */}
                <div
                  className="absolute inset-0"
                  style={{
                    opacity: 0.035,
                    background: "linear-gradient(130deg, rgba(255,255,255,0.9) 0%, transparent 30%, transparent 55%, rgba(255,255,255,0.4) 80%, transparent 100%)",
                  }}
                />
                {/* Soft secondary reflection */}
                <div
                  className="absolute inset-0"
                  style={{
                    opacity: 0.02,
                    background: "linear-gradient(240deg, rgba(255,255,255,0.5) 0%, transparent 40%)",
                  }}
                />
                {/* Green glass edge (left) */}
                <div
                  className="absolute top-0 bottom-0 left-0"
                  style={{
                    width: 2,
                    background: "linear-gradient(180deg, rgba(130,190,150,0.25) 0%, rgba(100,160,120,0.12) 100%)",
                  }}
                />
              </div>

              {/* ───── LAYER 2: SLIDING SASH (right panel, moves) ───── */}
              <div
                className="absolute"
                style={{
                  zIndex: 10,
                  top: innerTop,
                  bottom: innerBottom,
                  left: `calc(50% - ${MULLION_WIDTH / 2}px)`,
                  width: `calc(50% - ${innerRight}px + ${MULLION_WIDTH / 2}px)`,
                  transform: `translate3d(${slideX}px, 0, 0)`,
                  willChange: "transform",
                  pointerEvents: "none",
                }}
              >
                {/* ── Sash aluminium stile (leading edge) ── */}
                <div
                  className="absolute top-0 bottom-0 left-0"
                  style={{
                    width: MULLION_WIDTH,
                    zIndex: 3,
                    background: `linear-gradient(90deg, 
                      #161616 0%, 
                      #252525 15%, 
                      #3a3a3a 35%, 
                      #444 50%, 
                      #3a3a3a 65%, 
                      #252525 85%, 
                      #161616 100%)`,
                    boxShadow: "-3px 0 10px rgba(0,0,0,0.35), inset 1px 0 0 rgba(255,255,255,0.08), inset -1px 0 0 rgba(0,0,0,0.4)",
                  }}
                >
                  {/* Brushed metal highlight */}
                  <div
                    className="absolute top-0 bottom-0"
                    style={{
                      left: "40%",
                      width: 1,
                      background: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 40%, rgba(255,255,255,0.07) 100%)",
                    }}
                  />
                </div>

                {/* ── Architectural glass surface ── */}
                <div
                  className="absolute"
                  style={{
                    top: 0,
                    bottom: 0,
                    left: MULLION_WIDTH,
                    right: 0,
                  }}
                >
                  {/* Base glass — grey-blue tint */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(180deg, rgba(100,120,150,0.07) 0%, rgba(80,100,130,0.10) 100%)",
                    }}
                  />
                  {/* Primary dynamic reflection (shifts as panel moves) */}
                  <div
                    className="absolute inset-0"
                    style={{
                      opacity: Math.max(0.015, 0.04 - pct * 0.025),
                      background: `linear-gradient(${125 + pct * 25}deg, rgba(255,255,255,0.7) 0%, transparent 28%, transparent 60%, rgba(255,255,255,0.25) 85%, transparent 100%)`,
                      transform: `translate3d(${slideX * 0.12}px, 0, 0)`,
                      willChange: "transform, opacity",
                    }}
                  />
                  {/* Secondary soft reflection */}
                  <div
                    className="absolute inset-0"
                    style={{
                      opacity: 0.02,
                      background: `linear-gradient(${250 - pct * 15}deg, rgba(255,255,255,0.4) 0%, transparent 35%)`,
                      transform: `translate3d(${slideX * 0.06}px, 0, 0)`,
                    }}
                  />
                  {/* Specular top edge */}
                  <div
                    className="absolute top-0 left-0 right-0"
                    style={{
                      height: 1,
                      background: "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.1) 70%, transparent 95%)",
                    }}
                  />
                  {/* Fresnel edge — right */}
                  <div
                    className="absolute top-0 bottom-0 right-0"
                    style={{
                      width: 1,
                      background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.06) 100%)",
                    }}
                  />
                  {/* Green glass edge (right) */}
                  <div
                    className="absolute top-0 bottom-0 right-0"
                    style={{
                      width: 2,
                      background: "linear-gradient(180deg, rgba(130,190,150,0.18) 0%, rgba(100,160,120,0.08) 100%)",
                    }}
                  />
                </div>

                {/* ── Contact shadow (overlap zone) ── */}
                <div
                  className="absolute top-0 bottom-0"
                  style={{
                    left: -12,
                    width: 12,
                    zIndex: 2,
                    background: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.06) 40%, rgba(0,0,0,0.18) 100%)",
                    opacity: Math.max(0, 1 - pct * 1.1),
                  }}
                />

                {/* ═══ RECESSED ARCHITECTURAL HANDLE ═══
                    Inspired by Reynaers CP 155-LS / Schüco ASS 77 PD
                    Flush-mounted, physically attached to sash stile. */}
                <div
                  ref={handleRef}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                  onPointerEnter={() => setIsHovering(true)}
                  onPointerLeave={() => { if (!isDragging) setIsHovering(false); }}
                  className="absolute"
                  style={{
                    zIndex: 20,
                    top: "50%",
                    left: -1,
                    transform: "translateY(-50%)",
                    width: 32,
                    height: 100,
                    cursor: isDragging ? "grabbing" : "grab",
                    touchAction: "none",
                    padding: "16px 10px",
                    margin: "-16px -10px",
                    pointerEvents: "auto",
                  }}
                >
                  {/* Handle outer housing — recessed into stile */}
                  <div
                    style={{
                      width: 12,
                      height: 68,
                      borderRadius: 4,
                      position: "relative",
                      overflow: "hidden",
                      background: `linear-gradient(180deg, 
                        #1a1a1a 0%, 
                        #0f0f0f 100%)`,
                      boxShadow: `
                        inset 0 1px 3px rgba(0,0,0,0.7),
                        inset 0 -1px 2px rgba(0,0,0,0.5),
                        ${isDragging
                          ? "0 0 14px rgba(197,22,29,0.25), 0 2px 8px rgba(0,0,0,0.5)"
                          : isHovering
                            ? "0 2px 10px rgba(0,0,0,0.5), 0 0 6px rgba(255,255,255,0.04)"
                            : "0 1px 6px rgba(0,0,0,0.4)"
                        }`,
                      transition: "box-shadow 0.2s ease",
                    }}
                  >
                    {/* Raised pull bar inside recess */}
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        bottom: 10,
                        left: 3,
                        right: 3,
                        borderRadius: 3,
                        background: `linear-gradient(180deg, 
                          #3a3a3a 0%, 
                          #2e2e2e 20%, 
                          #353535 50%, 
                          #2e2e2e 80%, 
                          #282828 100%)`,
                        boxShadow: "0 1px 2px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
                      }}
                    >
                      {/* Brushed grain on pull bar */}
                      <div
                        className="absolute inset-0"
                        style={{
                          borderRadius: 3,
                          opacity: 0.06,
                          background: "repeating-linear-gradient(180deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, transparent 3px)",
                        }}
                      />
                      {/* Left highlight bevel */}
                      <div
                        style={{
                          position: "absolute",
                          top: 4,
                          bottom: 4,
                          left: 0,
                          width: 1,
                          borderRadius: 1,
                          background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.08) 100%)",
                        }}
                      />
                    </div>
                    {/* Top recess shadow */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: "linear-gradient(180deg, rgba(0,0,0,0.4), transparent)",
                      }}
                    />
                    {/* Bottom recess shadow */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        background: "linear-gradient(0deg, rgba(0,0,0,0.3), transparent)",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* ───── LAYER 3: Warm sunlight (increases with opening) ───── */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  zIndex: 12,
                  opacity: pct * 0.12,
                  background: `radial-gradient(ellipse at ${55 + pct * 10}% 35%, rgba(255,240,210,0.4), transparent 65%)`,
                  willChange: "opacity",
                }}
              />
              {/* Subtle golden rim light on right side as window opens */}
              <div
                className="absolute top-0 bottom-0 pointer-events-none"
                style={{
                  zIndex: 13,
                  right: "30%",
                  width: "20%",
                  opacity: pct * 0.06,
                  background: "linear-gradient(90deg, transparent, rgba(255,220,160,0.2), transparent)",
                }}
              />

              {/* ═══════════════════════════════════════════════════════
                  OUTER ALUMINIUM FRAME — Slimline extruded profile
                  Matte black anodized, brushed finish, beveled edges
                  ═══════════════════════════════════════════════════════ */}

              {/* ── Top rail ── */}
              <div
                className="absolute left-0 right-0 top-0 pointer-events-none"
                style={{
                  zIndex: 30,
                  height: RAIL_HEIGHT,
                  background: `linear-gradient(180deg, 
                    #222 0%, 
                    #2d2d2d 10%, 
                    #383838 30%, 
                    #333 50%, 
                    #2a2a2a 70%, 
                    #1e1e1e 90%, 
                    #161616 100%)`,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.4)",
                }}
              >
                <div className="absolute bottom-0 left-0 right-0" style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
                <div className="absolute inset-0" style={brushedOverlay} />
                {/* Ambient specular on top surface */}
                <div
                  className="absolute inset-0"
                  style={{
                    opacity: 0.03,
                    background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.3) 50%, transparent 90%)",
                  }}
                />
              </div>

              {/* ── Bottom rail ── */}
              <div
                className="absolute left-0 right-0 bottom-0 pointer-events-none"
                style={{
                  zIndex: 30,
                  height: RAIL_HEIGHT,
                  background: `linear-gradient(0deg, 
                    #222 0%, 
                    #2d2d2d 10%, 
                    #383838 30%, 
                    #333 50%, 
                    #2a2a2a 70%, 
                    #1e1e1e 90%, 
                    #161616 100%)`,
                  boxShadow: "0 -2px 6px rgba(0,0,0,0.35), inset 0 -1px 0 rgba(255,255,255,0.07), inset 0 1px 0 rgba(0,0,0,0.4)",
                }}
              >
                {/* Track groove */}
                <div className="absolute left-0 right-0" style={{ top: 2, height: 1.5, background: "linear-gradient(180deg, rgba(0,0,0,0.5), rgba(0,0,0,0.15))" }} />
                <div className="absolute top-0 left-0 right-0" style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
                <div className="absolute inset-0" style={brushedOverlay} />
              </div>

              {/* ── Left stile ── */}
              <div
                className="absolute top-0 bottom-0 left-0 pointer-events-none"
                style={{
                  zIndex: 30,
                  width: FRAME_THICKNESS,
                  background: `linear-gradient(90deg, 
                    #222 0%, 
                    #2d2d2d 10%, 
                    #3a3a3a 30%, 
                    #404040 50%, 
                    #3a3a3a 70%, 
                    #2a2a2a 90%, 
                    #1e1e1e 100%)`,
                  boxShadow: "2px 0 6px rgba(0,0,0,0.25), inset -1px 0 0 rgba(255,255,255,0.06), inset 1px 0 0 rgba(0,0,0,0.3)",
                }}
              >
                <div className="absolute top-0 bottom-0 right-0" style={{ width: 1, background: "rgba(255,255,255,0.05)" }} />
                <div className="absolute inset-0" style={brushedOverlayV} />
              </div>

              {/* ── Right stile ── */}
              <div
                className="absolute top-0 bottom-0 right-0 pointer-events-none"
                style={{
                  zIndex: 30,
                  width: FRAME_THICKNESS,
                  background: `linear-gradient(270deg, 
                    #222 0%, 
                    #2d2d2d 10%, 
                    #3a3a3a 30%, 
                    #404040 50%, 
                    #3a3a3a 70%, 
                    #2a2a2a 90%, 
                    #1e1e1e 100%)`,
                  boxShadow: "-2px 0 6px rgba(0,0,0,0.25), inset 1px 0 0 rgba(255,255,255,0.06), inset -1px 0 0 rgba(0,0,0,0.3)",
                }}
              >
                <div className="absolute top-0 bottom-0 left-0" style={{ width: 1, background: "rgba(255,255,255,0.05)" }} />
                <div className="absolute inset-0" style={brushedOverlayV} />
              </div>

              {/* ── Central mullion (fixed divider) ── */}
              <div
                className="absolute pointer-events-none"
                style={{
                  zIndex: 8,
                  top: RAIL_HEIGHT,
                  bottom: RAIL_HEIGHT,
                  left: `calc(50% - ${MULLION_WIDTH / 2}px)`,
                  width: MULLION_WIDTH,
                  background: `linear-gradient(90deg, 
                    #1a1a1a 0%, 
                    #303030 25%, 
                    #3e3e3e 50%, 
                    #303030 75%, 
                    #1a1a1a 100%)`,
                  boxShadow: "0 0 4px rgba(0,0,0,0.3), inset 0 0 1px rgba(255,255,255,0.06)",
                }}
              />

              {/* ── Inner frame shadow ── */}
              <div
                className="absolute pointer-events-none"
                style={{
                  zIndex: 29,
                  top: RAIL_HEIGHT,
                  bottom: RAIL_HEIGHT,
                  left: FRAME_THICKNESS,
                  right: FRAME_THICKNESS,
                  boxShadow: "inset 0 3px 10px rgba(0,0,0,0.12), inset 0 -3px 10px rgba(0,0,0,0.08), inset 3px 0 6px rgba(0,0,0,0.06), inset -3px 0 6px rgba(0,0,0,0.06)",
                }}
              />

              {/* ── Corner blocks (mitered joints) ── */}
              {[
                { top: 0, left: 0, bg: "135deg" },
                { top: 0, right: 0, bg: "225deg" },
                { bottom: 0, left: 0, bg: "45deg" },
                { bottom: 0, right: 0, bg: "315deg" },
              ].map((corner, i) => (
                <div
                  key={`corner-${i}`}
                  className="absolute pointer-events-none"
                  style={{
                    zIndex: 31,
                    ...corner,
                    width: FRAME_THICKNESS + 1,
                    height: RAIL_HEIGHT + 1,
                    background: `linear-gradient(${corner.bg}, #282828 0%, #1e1e1e 100%)`,
                  }}
                />
              ))}

              {/* ═══ PROGRESSIVE CALLOUTS — Apple-style spec cards ═══ */}
              <div
                className="absolute pointer-events-none"
                style={{
                  zIndex: 40,
                  top: RAIL_HEIGHT + 14,
                  left: FRAME_THICKNESS + 14,
                }}
              >
                <div className="flex flex-col gap-2.5">
                  <AnimatePresence>
                    {revealedCallouts.has(25) && (
                      <motion.div
                        key="callout-25"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center gap-3"
                        style={calloutStyle}
                      >
                        <Shield className="w-3.5 h-3.5 text-[#C5161D] shrink-0" style={{ opacity: 0.85 }} />
                        <span className="text-[11px] font-medium tracking-wide text-[#1d1d1f]">42dB Acoustic Noise Reduction</span>
                      </motion.div>
                    )}
                    {revealedCallouts.has(50) && (
                      <motion.div
                        key="callout-50"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
                        className="flex items-center gap-3"
                        style={calloutStyle}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#C5161D] shrink-0" style={{ opacity: 0.85 }} />
                        <span className="text-[11px] font-medium tracking-wide text-[#1d1d1f]">Low-E Triple Glazing</span>
                      </motion.div>
                    )}
                    {revealedCallouts.has(75) && (
                      <motion.div
                        key="callout-75"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
                        className="flex items-center gap-3"
                        style={calloutStyle}
                      >
                        <Lock className="w-3.5 h-3.5 text-[#C5161D] shrink-0" style={{ opacity: 0.85 }} />
                        <span className="text-[11px] font-medium tracking-wide text-[#1d1d1f]">Concealed Multi-point Locking</span>
                      </motion.div>
                    )}
                    {revealedCallouts.has(100) && (
                      <motion.div
                        key="callout-100"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
                        className="flex items-center gap-3"
                        style={{
                          ...calloutStyle,
                          background: "rgba(8,28,75,0.88)",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.12), 0 0 0 0.5px rgba(255,255,255,0.06)",
                        }}
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C5161D] shrink-0" style={{ opacity: 0.9 }} />
                        <span className="text-[11px] font-medium tracking-wide text-white/90">Ultra Slim 18mm Sightline</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* ═══ FLOATING HINT ═══ */}
              <AnimatePresence>
                {!hasInteracted && (
                  <motion.div
                    key="hint-badge"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="absolute pointer-events-none flex items-center gap-3"
                    style={{
                      zIndex: 40,
                      bottom: RAIL_HEIGHT + 14,
                      left: "50%",
                      transform: "translateX(-50%)",
                      ...calloutStyle,
                      padding: "10px 20px",
                      borderRadius: 100,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.10), 0 0 0 0.5px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div
                      className="flex items-center justify-center animate-pulse"
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "#C5161D",
                        color: "white",
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      ➔
                    </div>
                    <span className="text-[11px] sm:text-xs font-medium text-[#1d1d1f] whitespace-nowrap tracking-wide">
                      Drag the handle to experience our Slimline Sliding System
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Ambient frame top-surface reflection ── */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  zIndex: 32,
                  background: "linear-gradient(180deg, rgba(255,255,255,0.015) 0%, transparent 15%, transparent 85%, rgba(255,255,255,0.008) 100%)",
                }}
              />

            </div>

            {/* ── Bottom aperture indicator ── */}
            <div className="flex items-center justify-between mt-4 text-[11px] font-medium tracking-wider text-[#9CA3AF] uppercase">
              <span>Sealed</span>
              <span className="text-[#1d1d1f] font-heading font-semibold text-xs normal-case tracking-normal">
                {percentOpen === 0 ? "System Sealed" : `${percentOpen}% Open`}
              </span>
              <span>Fully Open</span>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
