"use client";

import { useState, useMemo } from "react";
import { MessageCircle, Check, Sparkles, Sliders, Shield, ArrowRight, RotateCcw } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

// Configuration Options Data
const PRODUCT_TYPES = [
  { id: "lift-slide", name: "Lift & Slide Patio Door", basePricePerSqFt: 650, icon: "Sliders" },
  { id: "slimline-sliding", name: "Slimline Sliding Window", basePricePerSqFt: 520, icon: "Layers" },
  { id: "thermal-casement", name: "Thermal Break Casement Window", basePricePerSqFt: 580, icon: "Shield" },
  { id: "acoustic-partition", name: "Acoustic Glass Partition", basePricePerSqFt: 480, icon: "Sparkles" },
];

const FRAME_COLORS = [
  { id: "navy", name: "Anthracite Navy", hex: "#081C4B", border: "#040E26" },
  { id: "matte-black", name: "Matte Black", hex: "#111827", border: "#000000" },
  { id: "anodized-silver", name: "Anodized Silver", hex: "#9CA3AF", border: "#6B7280" },
  { id: "bronze-copper", name: "Bronze Copper", hex: "#854D0E", border: "#713F12" },
  { id: "wood-grain", name: "Warm Teak Wood", hex: "#78350F", border: "#451A03" },
];

const GLASS_SPECS = [
  { id: "double-acoustic", name: "Double Glazed Acoustic (42dB)", multiplier: 1.2, fill: "rgba(224, 242, 254, 0.4)", stroke: "#38BDF8" },
  { id: "solar-low-e", name: "Solar Low-E Reflective Tint", multiplier: 1.25, fill: "rgba(186, 230, 253, 0.5)", stroke: "#0284C7" },
  { id: "triple-thermal", name: "Triple Glazed Thermal Break", multiplier: 1.35, fill: "rgba(207, 250, 254, 0.45)", stroke: "#06B6D4" },
  { id: "clear-toughened", name: "Single Clear Toughened", multiplier: 1.0, fill: "rgba(240, 249, 255, 0.3)", stroke: "#BAE6FD" },
];

const HANDLE_FINISHES = [
  { id: "flush-pull", name: "Minimalist Flush Pull" },
  { id: "architectural-lever", name: "Architectural Lever Handle" },
  { id: "matte-black-handle", name: "Matte Black Handle" },
  { id: "brass-accent", name: "Brushed Brass Handle" },
];

export default function ProductConfigurator() {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCT_TYPES[0]);
  const [selectedColor, setSelectedColor] = useState(FRAME_COLORS[0]);
  const [selectedGlass, setSelectedGlass] = useState(GLASS_SPECS[0]);
  const [selectedHandle, setSelectedHandle] = useState(HANDLE_FINISHES[0]);
  const [widthFt, setWidthFt] = useState(10);
  const [heightFt, setHeightFt] = useState(8);
  const [panelCount, setPanelCount] = useState(3);

  // Price Range Calculation
  const estimatedPrice = useMemo(() => {
    const sqFt = widthFt * heightFt;
    const base = sqFt * selectedProduct.basePricePerSqFt * selectedGlass.multiplier;
    const min = Math.round(base * 0.95);
    const max = Math.round(base * 1.15);
    return { sqFt, min, max };
  }, [widthFt, heightFt, selectedProduct, selectedGlass]);

  // WhatsApp Pre-filled Quote URL
  const whatsappConfigUrl = useMemo(() => {
    const text = `Hi Arihant Creations, I configured a custom system on your site:
• System: ${selectedProduct.name}
• Dimensions: ${widthFt}ft (W) x ${heightFt}ft (H) (${estimatedPrice.sqFt} sq ft)
• Frame Finish: ${selectedColor.name}
• Glass: ${selectedGlass.name}
• Handle: ${selectedHandle.name}
• Panels: ${panelCount}-Panel Track
• Estimated Price: ₹${estimatedPrice.min.toLocaleString('en-IN')} – ₹${estimatedPrice.max.toLocaleString('en-IN')}

Please provide a formal engineering quotation.`;
    return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`;
  }, [selectedProduct, selectedColor, selectedGlass, selectedHandle, widthFt, heightFt, panelCount, estimatedPrice]);

  return (
    <div className="card-base p-6 sm:p-10 bg-white border border-[#EEF2F6] shadow-xl rounded-2xl">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Live SVG Architectural Preview */}
        <div className="lg:col-span-6 bg-[#F8F9FB] border border-[#EEF2F6] rounded-2xl p-6 flex flex-col items-center justify-between min-h-[440px] lg:sticky lg:top-28">
          <div className="w-full flex items-center justify-between text-xs font-bold text-[#081C4B] mb-4">
            <span className="flex items-center gap-1.5 uppercase tracking-wider text-[#C5161D]">
              <Sparkles className="w-4 h-4" /> Live Interactive CAD Rendering
            </span>
            <button
              onClick={() => {
                setSelectedProduct(PRODUCT_TYPES[0]);
                setSelectedColor(FRAME_COLORS[0]);
                setSelectedGlass(GLASS_SPECS[0]);
                setWidthFt(10);
                setHeightFt(8);
              }}
              className="flex items-center gap-1 text-[#6B7280] hover:text-[#081C4B] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          {/* Dynamic SVG Visual Window Rendering */}
          <div className="w-full flex-1 flex items-center justify-center py-4">
            <svg
              viewBox="0 0 400 280"
              className="w-full max-w-[360px] h-auto drop-shadow-xl transition-all duration-300"
            >
              {/* Outer Wall Aperture */}
              <rect x="10" y="10" width="380" height="260" fill="#E5E7EB" rx="4" />
              <rect x="22" y="22" width="356" height="236" fill="#FFFFFF" rx="2" />

              {/* Main Aluminium Frame Outer Border */}
              <rect
                x="26"
                y="26"
                width="348"
                height="228"
                fill="none"
                stroke={selectedColor.hex}
                strokeWidth="14"
                rx="4"
              />

              {/* Dynamic Glass Panels */}
              {Array.from({ length: panelCount }).map((_, i) => {
                const innerW = 348 - 14;
                const pWidth = innerW / panelCount;
                const pX = 33 + i * pWidth;
                return (
                  <g key={i}>
                    {/* Glass Surface */}
                    <rect
                      x={pX + 2}
                      y="33"
                      width={pWidth - 4}
                      height="214"
                      fill={selectedGlass.fill}
                      stroke={selectedGlass.stroke}
                      strokeWidth="1"
                    />
                    {/* Glass Reflection Accent Line */}
                    <line
                      x1={pX + 10}
                      y1="45"
                      x2={pX + pWidth - 25}
                      y2="180"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeOpacity="0.6"
                    />
                    {/* Individual Panel Inner Frame */}
                    <rect
                      x={pX}
                      y="33"
                      width={pWidth}
                      height="214"
                      fill="none"
                      stroke={selectedColor.hex}
                      strokeWidth="7"
                    />
                    {/* Handle Accent */}
                    {i === Math.floor(panelCount / 2) && (
                      <rect
                        x={pX + 10}
                        y="130"
                        width="5"
                        height="30"
                        fill="#111827"
                        rx="2"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Configuration Summary Pill */}
          <div className="w-full bg-white border border-[#EEF2F6] p-4 rounded-xl shadow-sm text-center">
            <div className="text-xs font-semibold text-[#6B7280] mb-1">
              Estimated Investment Range
            </div>
            <div className="font-heading font-extrabold text-2xl text-[#081C4B]">
              ₹{estimatedPrice.min.toLocaleString("en-IN")} – ₹{estimatedPrice.max.toLocaleString("en-IN")}
            </div>
            <div className="text-[11px] text-[#6B7280] mt-0.5">
              Based on {widthFt}ft × {heightFt}ft ({estimatedPrice.sqFt} sq ft) system specifications
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Configuration Controls */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Step 1: System Category */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#081C4B] mb-2.5">
              1. Select System Type
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {PRODUCT_TYPES.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                    selectedProduct.id === prod.id
                      ? "border-[#081C4B] bg-[#081C4B] text-white shadow-md"
                      : "border-[#EEF2F6] bg-white text-[#081C4B] hover:border-[#081C4B]/40"
                  }`}
                >
                  {prod.name}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Dimensions Sliders */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#081C4B] mb-2.5">
              2. Dimensions (Width & Height)
            </label>
            <div className="grid grid-cols-2 gap-4 bg-[#F8F9FB] p-4 rounded-xl border border-[#EEF2F6]">
              <div>
                <div className="flex justify-between text-xs font-bold text-[#081C4B] mb-1">
                  <span>Width</span>
                  <span className="text-[#C5161D]">{widthFt} ft</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="24"
                  value={widthFt}
                  onChange={(e) => setWidthFt(Number(e.target.value))}
                  className="w-full accent-[#081C4B]"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-[#081C4B] mb-1">
                  <span>Height</span>
                  <span className="text-[#C5161D]">{heightFt} ft</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="12"
                  value={heightFt}
                  onChange={(e) => setHeightFt(Number(e.target.value))}
                  className="w-full accent-[#081C4B]"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Frame Color Selection */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#081C4B] mb-2.5">
              3. Frame Finish & Powder Coating
            </label>
            <div className="flex flex-wrap gap-2.5">
              {FRAME_COLORS.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
                    selectedColor.id === color.id
                      ? "border-[#081C4B] bg-[#081C4B] text-white shadow-md"
                      : "border-[#EEF2F6] bg-white text-[#081C4B] hover:border-[#081C4B]/30"
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border shadow-inner"
                    style={{ backgroundColor: color.hex, borderColor: color.border }}
                  />
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Glass Specification */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#081C4B] mb-2.5">
              4. Glass Performance Package
            </label>
            <div className="space-y-2">
              {GLASS_SPECS.map((glass) => (
                <button
                  key={glass.id}
                  onClick={() => setSelectedGlass(glass)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all ${
                    selectedGlass.id === glass.id
                      ? "border-[#081C4B] bg-[#081C4B] text-white shadow-sm"
                      : "border-[#EEF2F6] bg-white text-[#081C4B] hover:border-[#081C4B]/30"
                  }`}
                >
                  <span>{glass.name}</span>
                  {selectedGlass.id === glass.id && <Check className="w-4 h-4 text-[#C5161D]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Step 5: Panel Count */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#081C4B] mb-2.5">
              5. Opening Tracks / Panels
            </label>
            <div className="flex gap-2">
              {[2, 3, 4, 6].map((count) => (
                <button
                  key={count}
                  onClick={() => setPanelCount(count)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    panelCount === count
                      ? "border-[#081C4B] bg-[#081C4B] text-white shadow-md"
                      : "border-[#EEF2F6] bg-white text-[#081C4B] hover:bg-[#EEF2F6]"
                  }`}
                >
                  {count} Panels
                </button>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="pt-4 border-t border-[#EEF2F6] space-y-3">
            <a
              href={whatsappConfigUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta w-full py-4 text-sm font-bold justify-center"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              Send Configuration to WhatsApp
            </a>
            <a
              href="#contact"
              className="btn-secondary w-full py-3.5 text-sm font-bold justify-center"
            >
              Book Site Survey With This System <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
