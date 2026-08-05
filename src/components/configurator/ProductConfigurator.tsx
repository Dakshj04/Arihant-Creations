"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { MessageCircle, Check, Sparkles, Sliders, Shield, ArrowRight, RotateCcw, Info, Layers, Lock, Eye } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { PRODUCT_TYPES, FRAME_COLORS, GLASS_SPECS, HANDLE_FINISHES } from "./configuratorData";
import { ProductType, FrameColor, GlassSpec, HandleFinish } from "./types";
import CadRenderer from "./CadRenderer";

export default function ProductConfigurator() {
  const [selectedProduct, setSelectedProduct] = useState<ProductType>(PRODUCT_TYPES[0]);
  const [selectedColor, setSelectedColor] = useState<FrameColor>(FRAME_COLORS[0]);
  const [selectedGlass, setSelectedGlass] = useState<GlassSpec>(GLASS_SPECS[0]);
  const [selectedHandle, setSelectedHandle] = useState<HandleFinish>(HANDLE_FINISHES[0]);
  const [widthFt, setWidthFt] = useState<number>(10);
  const [heightFt, setHeightFt] = useState<number>(8);
  const [panelCount, setPanelCount] = useState<number>(3);

  // Animated Display Price State
  const [displayMinPrice, setDisplayMinPrice] = useState<number>(0);
  const [displayMaxPrice, setDisplayMaxPrice] = useState<number>(0);

  // Exact price calculations based on dimensions, system, finish & glass package
  const priceCalc = useMemo(() => {
    const sqFt = widthFt * heightFt;
    const baseRate = selectedProduct.basePricePerSqFt * selectedColor.priceMultiplier * selectedGlass.multiplier;
    const totalBase = sqFt * baseRate + selectedHandle.priceAdd;
    const min = Math.round(totalBase * 0.95);
    const max = Math.round(totalBase * 1.12);
    return { sqFt, min, max };
  }, [widthFt, heightFt, selectedProduct, selectedColor, selectedGlass, selectedHandle]);

  // Smooth counter animation effect for price range
  const animFrameId = useRef<number | null>(null);
  useEffect(() => {
    const startMin = displayMinPrice || priceCalc.min;
    const startMax = displayMaxPrice || priceCalc.max;
    const targetMin = priceCalc.min;
    const targetMax = priceCalc.max;

    const startTime = performance.now();
    const duration = 400; // ms

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      setDisplayMinPrice(Math.round(startMin + (targetMin - startMin) * ease));
      setDisplayMaxPrice(Math.round(startMax + (targetMax - startMax) * ease));

      if (progress < 1) {
        animFrameId.current = requestAnimationFrame(animate);
      }
    };

    animFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [priceCalc.min, priceCalc.max]);

  // Handle Reset to Default Configuration
  const handleReset = () => {
    setSelectedProduct(PRODUCT_TYPES[0]);
    setSelectedColor(FRAME_COLORS[0]);
    setSelectedGlass(GLASS_SPECS[0]);
    setSelectedHandle(HANDLE_FINISHES[0]);
    setWidthFt(10);
    setHeightFt(8);
    setPanelCount(3);
  };

  // WhatsApp Pre-filled Quote Message URL
  const whatsappConfigUrl = useMemo(() => {
    const text = `Hi Arihant Creations, I configured a custom system on your website configurator:

• System Type: ${selectedProduct.name}
• Dimensions: ${widthFt} ft (W) × ${heightFt} ft (H) (${priceCalc.sqFt} sq ft)
• Panels Layout: ${panelCount}-Panel Configuration
• Frame Finish: ${selectedColor.name}
• Glass Specification: ${selectedGlass.name}
• Handle Hardware: ${selectedHandle.name}
• Estimated Investment: ₹${priceCalc.min.toLocaleString('en-IN')} – ₹${priceCalc.max.toLocaleString('en-IN')}

Please share a formal architectural engineering quotation and profile catalog.`;
    return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`;
  }, [selectedProduct, selectedColor, selectedGlass, selectedHandle, widthFt, heightFt, panelCount, priceCalc]);

  return (
    <div className="card-base p-6 sm:p-10 bg-white border border-[#EEF2F6] shadow-2xl rounded-3xl">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Live Architectural CAD Elevation Renderer */}
        <div className="lg:col-span-6 bg-[#F8F9FB] border border-[#EEF2F6] rounded-2xl p-6 flex flex-col items-center justify-between min-h-[480px] lg:sticky lg:top-28">
          
          {/* Header & Reset Action */}
          <div className="w-full flex items-center justify-between text-xs font-bold text-[#081C4B] mb-2">
            <span className="flex items-center gap-1.5 uppercase tracking-wider text-[#C5161D]">
              <Sparkles className="w-4 h-4" /> Live Vector CAD Renderer
            </span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-[#6B7280] hover:text-[#081C4B] transition-colors py-1 px-2.5 rounded-lg hover:bg-white border border-transparent hover:border-[#EEF2F6]"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Default
            </button>
          </div>

          {/* Dynamic CAD Elevation Renderer */}
          <div className="w-full flex-1 flex items-center justify-center py-2">
            <CadRenderer
              product={selectedProduct}
              color={selectedColor}
              glass={selectedGlass}
              handle={selectedHandle}
              widthFt={widthFt}
              heightFt={heightFt}
              panelCount={panelCount}
            />
          </div>

          {/* Configuration Estimate Summary Box */}
          <div className="w-full bg-white border border-[#EEF2F6] p-5 rounded-2xl shadow-sm text-center mt-2">
            <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1">
              Estimated Investment Range
            </div>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#081C4B] transition-all">
              ₹{displayMinPrice.toLocaleString("en-IN")} – ₹{displayMaxPrice.toLocaleString("en-IN")}
            </div>
            <div className="text-xs text-[#6B7280] mt-1 flex items-center justify-center gap-2 flex-wrap">
              <span>{widthFt}ft × {heightFt}ft ({priceCalc.sqFt} sq ft)</span>
              <span>•</span>
              <span className="text-[#C5161D] font-semibold">{selectedProduct.name}</span>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive System Options & Controls */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Step 1: System Selection */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#081C4B] mb-2.5 flex items-center justify-between">
              <span>1. Select Architectural System</span>
              <span className="text-[11px] text-[#6B7280] font-normal lowercase">({selectedProduct.defaultSightlineMm}mm sightline)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PRODUCT_TYPES.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedProduct.id === prod.id
                      ? "border-[#081C4B] bg-[#081C4B] text-white shadow-md"
                      : "border-[#EEF2F6] bg-white text-[#081C4B] hover:border-[#081C4B]/40"
                  }`}
                >
                  <div className="text-xs font-bold">{prod.name}</div>
                  <div className={`text-[11px] mt-1 line-clamp-1 ${selectedProduct.id === prod.id ? "text-white/80" : "text-[#6B7280]"}`}>
                    {prod.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Custom Dimensions Sliders */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#081C4B] mb-2.5">
              2. System Dimensions
            </label>
            <div className="grid sm:grid-cols-2 gap-4 bg-[#F8F9FB] p-4.5 rounded-2xl border border-[#EEF2F6]">
              <div>
                <div className="flex justify-between text-xs font-bold text-[#081C4B] mb-1.5">
                  <span>Width</span>
                  <span className="text-[#C5161D] font-mono">{widthFt} ft ({Math.round(widthFt * 304.8)} mm)</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="24"
                  step="1"
                  value={widthFt}
                  onChange={(e) => setWidthFt(Number(e.target.value))}
                  className="w-full accent-[#081C4B] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#9CA3AF] mt-1 font-mono">
                  <span>4 ft</span>
                  <span>24 ft</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-[#081C4B] mb-1.5">
                  <span>Height</span>
                  <span className="text-[#C5161D] font-mono">{heightFt} ft ({Math.round(heightFt * 304.8)} mm)</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="12"
                  step="1"
                  value={heightFt}
                  onChange={(e) => setHeightFt(Number(e.target.value))}
                  className="w-full accent-[#081C4B] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#9CA3AF] mt-1 font-mono">
                  <span>4 ft</span>
                  <span>12 ft</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Frame Finish & Powder Coating */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#081C4B] mb-2.5">
              3. Frame Finish & Powder Coating
            </label>
            <div className="flex flex-wrap gap-2">
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
                    className="w-4 h-4 rounded-full border shadow-inner shrink-0"
                    style={{ backgroundColor: color.hex, borderColor: color.border }}
                  />
                  <span>{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Glass Performance Package */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#081C4B] mb-2.5">
              4. Glass Performance Package
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
              {GLASS_SPECS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGlass(g)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedGlass.id === g.id
                      ? "border-[#081C4B] bg-[#081C4B] text-white shadow-sm"
                      : "border-[#EEF2F6] bg-white text-[#081C4B] hover:border-[#081C4B]/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{g.name}</span>
                    {selectedGlass.id === g.id && <Check className="w-3.5 h-3.5 text-[#C5161D] shrink-0" />}
                  </div>
                  <div className={`text-[10px] mt-0.5 line-clamp-1 ${selectedGlass.id === g.id ? "text-white/80" : "text-[#6B7280]"}`}>
                    {g.shortDesc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 5: Panel Count Selection */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#081C4B] mb-2.5">
              5. Number of Panels / Tracks
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

          {/* Step 6: Handle Hardware Selection */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#081C4B] mb-2.5">
              6. Architectural Handle Hardware
            </label>
            <div className="grid grid-cols-2 gap-2">
              {HANDLE_FINISHES.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setSelectedHandle(h)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                    selectedHandle.id === h.id
                      ? "border-[#081C4B] bg-[#081C4B] text-white shadow-sm"
                      : "border-[#EEF2F6] bg-white text-[#081C4B] hover:border-[#081C4B]/30"
                  }`}
                >
                  {h.name}
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-[#EEF2F6] space-y-3">
            <a
              href={whatsappConfigUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta w-full py-4 text-sm font-bold justify-center rounded-xl shadow-lg"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              Send Configuration to WhatsApp
            </a>
            <a
              href="#contact"
              className="btn-secondary w-full py-3.5 text-sm font-bold justify-center rounded-xl"
            >
              Book Site Survey With This System <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
