"use client";

import React, { useMemo } from "react";
import { ProductType, FrameColor, GlassSpec, HandleFinish } from "./types";

interface CadRendererProps {
  product: ProductType;
  color: FrameColor;
  glass: GlassSpec;
  handle: HandleFinish;
  widthFt: number;
  heightFt: number;
  panelCount: number;
}

export default function CadRenderer({
  product,
  color,
  glass,
  handle,
  widthFt,
  heightFt,
  panelCount,
}: CadRendererProps) {
  // Convert dimensions to CAD aspect ratio and pixel dimensions
  const mmWidth = Math.round(widthFt * 304.8);
  const mmHeight = Math.round(heightFt * 304.8);

  // SVG viewBox bounds
  const viewBoxW = 500;
  const viewBoxH = 340;

  // Margin for CAD dimension arrows
  const cadMarginX = 50;
  const cadMarginY = 45;

  const frameX = cadMarginX;
  const frameY = cadMarginY;
  const frameW = viewBoxW - cadMarginX * 2; // 400
  const frameH = viewBoxH - cadMarginY * 2; // 250

  // System-specific profile sightline thickness scaling (in SVG pixels)
  const profileThickness = useMemo(() => {
    switch (product.id) {
      case "slimline-sliding":
        return 10;
      case "lift-slide":
        return 18;
      case "thermal-casement":
        return 16;
      case "acoustic-partition":
        return 6;
      default:
        return 14;
    }
  }, [product.id]);

  // Mullion width scaling
  const mullionW = useMemo(() => {
    switch (product.id) {
      case "slimline-sliding":
        return 4;
      case "lift-slide":
        return 8;
      case "thermal-casement":
        return 10;
      case "acoustic-partition":
        return 2; // frameless butt joint
      default:
        return 6;
    }
  }, [product.id]);

  // Frame fill styling based on texture type
  const frameFillStyle = useMemo(() => {
    switch (color.textureType) {
      case "wood":
        return "url(#cadWoodPattern)";
      case "brushed":
        return "url(#cadBrushedPattern)";
      default:
        return color.hex;
    }
  }, [color]);

  // Glass fill styling based on glass pattern
  const glassFillStyle = useMemo(() => {
    switch (glass.pattern) {
      case "frosted":
        return "url(#cadFrostedPattern)";
      case "reeded":
        return "url(#cadReededPattern)";
      case "mirror":
        return "url(#cadMirrorGradient)";
      case "smart":
        return "url(#cadSmartGradient)";
      default:
        return glass.fill;
    }
  }, [glass]);

  return (
    <div className="w-full relative flex flex-col items-center justify-center select-none">
      
      {/* CAD SVG Canvas */}
      <svg
        viewBox={`0 0 ${viewBoxW} ${viewBoxH}`}
        className="w-full h-auto max-h-[380px] drop-shadow-2xl overflow-visible transition-all duration-300"
      >
        <defs>
          {/* Wood Grain Texture Pattern */}
          <pattern
            id="cadWoodPattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <rect width="40" height="40" fill={color.hex} />
            <path
              d="M0 8 C 10 4, 30 12, 40 8 M0 20 C 15 16, 25 24, 40 20 M0 32 C 8 28, 32 36, 40 32"
              fill="none"
              stroke={color.secondaryHex}
              strokeWidth="2.5"
              strokeOpacity="0.6"
            />
          </pattern>

          {/* Brushed Metal Texture Pattern */}
          <pattern
            id="cadBrushedPattern"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect width="20" height="20" fill={color.hex} />
            <line x1="0" y1="2" x2="20" y2="2" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.25" />
            <line x1="0" y1="7" x2="20" y2="7" stroke="#000000" strokeWidth="0.8" strokeOpacity="0.2" />
            <line x1="0" y1="12" x2="20" y2="12" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.2" />
            <line x1="0" y1="17" x2="20" y2="17" stroke="#000000" strokeWidth="0.8" strokeOpacity="0.2" />
          </pattern>

          {/* Reeded / Fluted Glass Pattern */}
          <pattern
            id="cadReededPattern"
            width="12"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect width="12" height="20" fill={glass.fill} />
            <line x1="6" y1="0" x2="6" y2="20" stroke={glass.stroke} strokeWidth="2" strokeOpacity="0.4" />
            <line x1="1" y1="0" x2="1" y2="20" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.3" />
          </pattern>

          {/* Frosted Glass Pattern */}
          <pattern
            id="cadFrostedPattern"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <rect width="16" height="16" fill="rgba(241, 245, 249, 0.9)" />
            <circle cx="4" cy="4" r="1.5" fill="#CBD5E1" opacity="0.5" />
            <circle cx="12" cy="10" r="1.5" fill="#94A3B8" opacity="0.5" />
            <circle cx="8" cy="14" r="1" fill="#CBD5E1" opacity="0.4" />
          </pattern>

          {/* Reflective Mirror Glass Gradient */}
          <linearGradient id="cadMirrorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#94A3B8" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#64748B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.9" />
          </linearGradient>

          {/* Smart Switchable Glass Gradient */}
          <linearGradient id="cadSmartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(224, 242, 254, 0.6)" />
            <stop offset="50%" stopColor="rgba(186, 230, 253, 0.4)" />
            <stop offset="100%" stopColor="rgba(224, 242, 254, 0.6)" />
          </linearGradient>
        </defs>

        {/* ── CAD DIMENSION LINE (TOP - WIDTH) ── */}
        <g className="text-[#081C4B] font-mono text-[10px] font-bold select-none">
          <line
            x1={frameX}
            y1={frameY - 18}
            x2={frameX + frameW}
            y2={frameY - 18}
            stroke="#081C4B"
            strokeWidth="1.2"
          />
          {/* Left tick */}
          <line x1={frameX} y1={frameY - 24} x2={frameX} y2={frameY - 12} stroke="#081C4B" strokeWidth="1.5" />
          {/* Right tick */}
          <line x1={frameX + frameW} y1={frameY - 24} x2={frameX + frameW} y2={frameY - 12} stroke="#081C4B" strokeWidth="1.5" />
          {/* Arrowheads */}
          <polygon points={`${frameX},${frameY - 18} ${frameX + 6},${frameY - 21} ${frameX + 6},${frameY - 15}`} fill="#081C4B" />
          <polygon points={`${frameX + frameW},${frameY - 18} ${frameX + frameW - 6},${frameY - 21} ${frameX + frameW - 6},${frameY - 15}`} fill="#081C4B" />
          {/* Dimension Text Pill */}
          <rect
            x={frameX + frameW / 2 - 55}
            y={frameY - 29}
            width="110"
            height="18"
            fill="#FFFFFF"
            stroke="#EEF2F6"
            rx="4"
          />
          <text
            x={frameX + frameW / 2}
            y={frameY - 16}
            textAnchor="middle"
            fill="#081C4B"
            fontSize="10"
            fontWeight="bold"
          >
            W: {widthFt} ft ({mmWidth} mm)
          </text>
        </g>

        {/* ── CAD DIMENSION LINE (LEFT - HEIGHT) ── */}
        <g className="text-[#081C4B] font-mono text-[10px] font-bold select-none">
          <line
            x1={frameX - 18}
            y1={frameY}
            x2={frameX - 18}
            y2={frameY + frameH}
            stroke="#081C4B"
            strokeWidth="1.2"
          />
          {/* Top tick */}
          <line x1={frameX - 24} y1={frameY} x2={frameX - 12} y2={frameY} stroke="#081C4B" strokeWidth="1.5" />
          {/* Bottom tick */}
          <line x1={frameX - 24} y1={frameY + frameH} x2={frameX - 12} y2={frameY + frameH} stroke="#081C4B" strokeWidth="1.5" />
          {/* Arrowheads */}
          <polygon points={`${frameX - 18},${frameY} ${frameX - 21},${frameY + 6} ${frameX - 15},${frameY + 6}`} fill="#081C4B" />
          <polygon points={`${frameX - 18},${frameY + frameH} ${frameX - 21},${frameY + frameH - 6} ${frameX - 15},${frameY + frameH - 6}`} fill="#081C4B" />
          {/* Dimension Text Pill (rotated) */}
          <g transform={`rotate(-90, ${frameX - 22}, ${frameY + frameH / 2})`}>
            <rect
              x={frameX - 22 - 45}
              y={frameY + frameH / 2 - 9}
              width="90"
              height="18"
              fill="#FFFFFF"
              stroke="#EEF2F6"
              rx="4"
            />
            <text
              x={frameX - 22}
              y={frameY + frameH / 2 + 4}
              textAnchor="middle"
              fill="#081C4B"
              fontSize="10"
              fontWeight="bold"
            >
              H: {heightFt} ft ({mmHeight} mm)
            </text>
          </g>
        </g>

        {/* ── STRUCTURAL MASONRY APERTURE ── */}
        <rect
          x={frameX - 12}
          y={frameY - 12}
          width={frameW + 24}
          height={frameH + 24}
          fill="#E5E7EB"
          stroke="#D1D5DB"
          strokeWidth="1"
          rx="6"
        />
        {/* Wall Hatch Pattern Line Details */}
        <line x1={frameX - 12} y1={frameY - 12} x2={frameX - 4} y2={frameY - 4} stroke="#9CA3AF" strokeWidth="1" />
        <line x1={frameX + frameW + 4} y1={frameY - 12} x2={frameX + frameW + 12} y2={frameY - 4} stroke="#9CA3AF" strokeWidth="1" />
        <line x1={frameX - 12} y1={frameY + frameH + 4} x2={frameX - 4} y2={frameY + frameH + 12} stroke="#9CA3AF" strokeWidth="1" />

        {/* ── OUTER ALUMINIUM PERIMETER FRAME ── */}
        <rect
          x={frameX}
          y={frameY}
          width={frameW}
          height={frameH}
          fill={frameFillStyle}
          stroke={color.border}
          strokeWidth="1.5"
          rx="2"
          className="transition-all duration-300"
        />
        <rect
          x={frameX + profileThickness}
          y={frameY + profileThickness}
          width={frameW - profileThickness * 2}
          height={frameH - profileThickness * 2}
          fill="#F8F9FB"
          stroke={color.border}
          strokeWidth="1"
          className="transition-all duration-300"
        />

        {/* ── SPECIALTY: Thermal Break Insulation Layer (For thermal-casement) ── */}
        {product.id === "thermal-casement" && (
          <rect
            x={frameX + profileThickness * 0.5}
            y={frameY + profileThickness * 0.5}
            width={frameW - profileThickness}
            height={frameH - profileThickness}
            fill="none"
            stroke="#1E293B"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
        )}

        {/* ── SPECIALTY: Heavy Bottom Sill & Roller Track (For Lift & Slide) ── */}
        {product.id === "lift-slide" && (
          <g>
            {/* Reinforced Bottom Sill Track */}
            <rect
              x={frameX}
              y={frameY + frameH - profileThickness - 6}
              width={frameW}
              height="8"
              fill="#374151"
              stroke="#111827"
              strokeWidth="1"
            />
            {/* Stainless Roller Track Rail */}
            <line
              x1={frameX + profileThickness}
              y1={frameY + frameH - profileThickness - 2}
              x2={frameX + frameW - profileThickness}
              y2={frameY + frameH - profileThickness - 2}
              stroke="#D1D5DB"
              strokeWidth="2"
            />
          </g>
        )}

        {/* ── PANELS & GLASS MULLIONS ── */}
        {Array.from({ length: panelCount }).map((_, i) => {
          const innerX = frameX + profileThickness;
          const innerY = frameY + profileThickness;
          const innerW = frameW - profileThickness * 2;
          const innerH = frameH - profileThickness * 2;

          const panelW = (innerW - (panelCount - 1) * mullionW) / panelCount;
          const pX = innerX + i * (panelW + mullionW);

          const isSlidingActive = i === Math.floor(panelCount / 2);

          return (
            <g key={i} className="transition-all duration-300">
              
              {/* GLASS PANEL SURFACE */}
              <rect
                x={pX + 2}
                y={innerY + 2}
                width={panelW - 4}
                height={innerH - 4}
                fill={glassFillStyle}
                stroke={glass.stroke}
                strokeWidth="1"
                className="transition-all duration-300"
              />

              {/* Rubber EPDM Weather Seal Gasket Inset */}
              <rect
                x={pX + 4}
                y={innerY + 4}
                width={panelW - 8}
                height={innerH - 8}
                fill="none"
                stroke="#1E293B"
                strokeWidth="1"
                strokeOpacity="0.4"
              />

              {/* Double / Triple Glazing Secondary Perimeter Line */}
              {glass.doubleEdge && (
                <rect
                  x={pX + 7}
                  y={innerY + 7}
                  width={panelW - 14}
                  height={innerH - 14}
                  fill="none"
                  stroke={glass.edgeTint}
                  strokeWidth="0.8"
                  strokeOpacity="0.5"
                />
              )}

              {/* Glass Diagonal Reflection Highlight */}
              {glass.pattern !== "frosted" && (
                <g opacity={glass.reflectionOpacity}>
                  <line
                    x1={pX + 8}
                    y1={innerY + 12}
                    x2={pX + panelW - 20}
                    y2={innerY + innerH * 0.65}
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1={pX + 16}
                    y1={innerY + 12}
                    x2={pX + panelW - 12}
                    y2={innerY + innerH * 0.65 + 10}
                    stroke="#FFFFFF"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </g>
              )}

              {/* Panel Frame/Stile (Skip heavy frame for acoustic glass partition frameless joints) */}
              {product.id !== "acoustic-partition" && (
                <rect
                  x={pX}
                  y={innerY}
                  width={panelW}
                  height={innerH}
                  fill="none"
                  stroke={color.border}
                  strokeWidth={isSlidingActive ? "3.5" : "2.5"}
                />
              )}

              {/* Acoustic Partition Silicone Joint Indicator */}
              {product.id === "acoustic-partition" && i < panelCount - 1 && (
                <line
                  x1={pX + panelW + mullionW / 2}
                  y1={innerY}
                  x2={pX + panelW + mullionW / 2}
                  y2={innerY + innerH}
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              )}

              {/* Vertical Mullion Extrusion Profile (between panels) */}
              {product.id !== "acoustic-partition" && i < panelCount - 1 && (
                <rect
                  x={pX + panelW}
                  y={innerY}
                  width={mullionW}
                  height={innerH}
                  fill={frameFillStyle}
                  stroke={color.border}
                  strokeWidth="1"
                />
              )}

              {/* ── CASEMENT WINDOW OUTWARD SWING ARC (For thermal-casement) ── */}
              {product.id === "thermal-casement" && (
                <g opacity="0.6">
                  {/* Friction Stay Hinge Markers */}
                  <rect x={pX + 2} y={innerY + 8} width="4" height="14" fill="#475569" rx="1" />
                  <rect x={pX + 2} y={innerY + innerH - 22} width="4" height="14" fill="#475569" rx="1" />
                  {/* Dotted Trajectory Arc */}
                  <path
                    d={`M ${pX + panelW - 4} ${innerY + 12} L ${pX + 12} ${innerY + innerH / 2} L ${pX + panelW - 4} ${innerY + innerH - 12}`}
                    fill="none"
                    stroke="#C5161D"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                </g>
              )}

              {/* ── HARDWARE & HANDLES (Attached to active panel) ── */}
              {isSlidingActive && (
                <g>
                  {product.id === "lift-slide" ? (
                    /* Reynaers/Schüco Style Bold Lift-Slide Lever */
                    <g transform={`translate(${pX + 12}, ${innerY + innerH / 2 - 25})`}>
                      <rect x="0" y="0" width="6" height="50" fill={handle.hex} rx="2" stroke="#000000" strokeWidth="0.5" />
                      <circle cx="3" cy="10" r="2.5" fill="#9CA3AF" />
                      <rect x="1" y="20" width="4" height="25" fill="#6B7280" rx="1" />
                    </g>
                  ) : product.id === "thermal-casement" ? (
                    /* European Window Lever Handle */
                    <g transform={`translate(${pX + panelW - 14}, ${innerY + innerH / 2 - 12})`}>
                      <rect x="0" y="0" width="5" height="24" fill={handle.hex} rx="2.5" />
                      <rect x="-8" y="8" width="12" height="4" fill={handle.hex} rx="1" />
                    </g>
                  ) : (
                    /* Minimal Flush Recessed Handle */
                    <g transform={`translate(${pX + 8}, ${innerY + innerH / 2 - 18})`}>
                      <rect x="0" y="0" width="5" height="36" fill="#111827" rx="2.5" />
                      <rect x="1.5" y="6" width="2" height="24" fill={handle.hex} rx="1" />
                    </g>
                  )}
                </g>
              )}

            </g>
          );
        })}

        {/* ── DRAINAGE CAPS (Bottom outer frame sill detail) ── */}
        <rect x={frameX + frameW * 0.25} y={frameY + frameH - 4} width="10" height="3" fill="#1E293B" rx="1" />
        <rect x={frameX + frameW * 0.75} y={frameY + frameH - 4} width="10" height="3" fill="#1E293B" rx="1" />

        {/* ── CAD ELEVATION TITLE & SCALE BAR (BOTTOM) ── */}
        <g transform={`translate(0, ${viewBoxH - 12})`}>
          <text
            x={viewBoxW / 2}
            y="0"
            textAnchor="middle"
            fill="#081C4B"
            fontSize="9"
            fontWeight="bold"
            letterSpacing="1"
            className="uppercase font-mono"
          >
            ARCHITECTURAL ELEVATION DIAGRAM — SCALE 1:20
          </text>
        </g>
      </svg>

    </div>
  );
}
