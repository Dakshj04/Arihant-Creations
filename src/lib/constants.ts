import { BUSINESS, NAV_LINKS } from "@/config/business";
import type { Product, Stat, ProcessStep, Testimonial, FAQItem, WhyChooseCard } from "@/types";

export { BUSINESS, NAV_LINKS };

export interface SignatureProject {
  id: string;
  title: string;
  category: "Residential Villa" | "Penthouse" | "Commercial HQ";
  location: string;
  architect: string;
  systemsUsed: string;
  image: string;
  completionTime: string;
}

// ─── High-Res Architectural Photography Asset Mapping ───────────────────────
export const IMAGES = {
  heroVilla: "/ChatGPT Image Aug 5, 2026, 03_05_05 PM.png",
  heroDetail: "/ChatGPT Image Aug 5, 2026, 03_02_30 PM.png",
  brandCraftsmanship: "/ChatGPT Image Aug 5, 2026, 03_14_08 PM.png",
  slidingDoors: "/ChatGPT Image Aug 5, 2026, 03_05_05 PM.png",
  casementWindows: "/ChatGPT Image Aug 5, 2026, 03_02_30 PM.png",
  officePartitions: "/ChatGPT Image Aug 5, 2026, 03_14_08 PM.png",
  glassRailings: "/ChatGPT Image Aug 5, 2026, 03_19_22 PM.png",
  facadeCladding: "/ChatGPT Image Aug 5, 2026, 03_14_08 PM.png",
  projectAlibaug: "/ChatGPT Image Aug 5, 2026, 03_05_05 PM.png",
  projectWorli: "/ChatGPT Image Aug 5, 2026, 03_19_22 PM.png",
  projectBKC: "/ChatGPT Image Aug 5, 2026, 03_14_08 PM.png",
  projectJuhu: "/ChatGPT Image Aug 5, 2026, 03_02_30 PM.png",
  backgroundImage: "/Background_Image.png",
  logo: "/logo.png",
};

// ─── Trust Badges ────────────────────────────────────────────────────────────
export const TRUST_BADGES = [
  { icon: "ShieldCheck", label: "German Profile Standards" },
  { icon: "Award", label: "Acoustic 42dB Rating" },
  { icon: "Wind", label: "High Wind-Pressure Certified" },
  { icon: "Wrench", label: "Master Craftsmen Fitting" },
] as const;

// ─── Stats ───────────────────────────────────────────────────────────────────
export const STATS: Stat[] = [
  { value: 15, suffix: "+", label: "Years of Engineering" },
  { value: 1200, suffix: "+", label: "Luxury Projects Delivered" },
  { value: 100, suffix: "%", label: "Custom Fabrication" },
  { value: 10, suffix: " Yrs", label: "System Warranty" },
];

// ─── Why Choose Us ───────────────────────────────────────────────────────────
export const WHY_CHOOSE_CARDS: WhyChooseCard[] = [
  {
    title: "European Profile Standards",
    description: "High-density thermal & structural alloy profiles designed for high-wind loads and sleek minimalist sightlines.",
    icon: "Award",
  },
  {
    title: "Master Craftsmen Fitting",
    description: "Laser-aligned fitting by certified specialists ensuring airtight, watertight, and noise-insulated seal.",
    icon: "Target",
  },
  {
    title: "Ultra-Slim Sightlines",
    description: "Concealed hinges and minimalist interlocking frames designed for expansive panoramic views.",
    icon: "Palette",
  },
  {
    title: "Monsoon & Extreme Weather Proof",
    description: "Engineered with internal drainage channels and multi-point locking to withstand heavy coastal rainstorms.",
    icon: "CloudRain",
  },
  {
    title: "Zero-Maintenance Anodized Coating",
    description: "Anodized and powder-coated surface treatments that resist fading, corrosion, and salt mist.",
    icon: "Sparkles",
  },
  {
    title: "Micro-Millimeter CAD Tolerance",
    description: "Custom manufactured to exact structural tolerances based on your architect's elevation drawings.",
    icon: "Ruler",
  },
];

// ─── Products ────────────────────────────────────────────────────────────────
export const PRODUCTS: Product[] = [
  {
    id: "sliding-doors",
    name: "Lift & Slide Systems",
    description: "Whisper-quiet multi-track sliding patio doors engineered to effortlessly glide heavy glass panels up to 400kg each.",
    href: "/products#sliding-doors",
  },
  {
    id: "sliding-windows",
    name: "Slimline Sliding Windows",
    description: "Ultra-slim interlocking stiles maximizing natural light and ventilation with uninterrupted architectural sightlines.",
    href: "/products#sliding-windows",
  },
  {
    id: "casement-windows",
    name: "Thermal Break Casement Systems",
    description: "High-compression sealing casement windows offering maximum acoustic attenuation and air infiltration resistance.",
    href: "/products#casement-windows",
  },
  {
    id: "office-partitions",
    name: "Acoustic Glass Partitions",
    description: "Minimalist glass walls and concealed aluminium framework tailored for corporate boardrooms and executive suites.",
    href: "/products#office-partitions",
  },
  {
    id: "glass-railings",
    name: "Frameless Balustrade Systems",
    description: "Structural glass railing systems engineered for balconies and open terraces without visual obstruction.",
    href: "/products#glass-railings",
  },
  {
    id: "acp-cladding",
    name: "Facade & Architectural Cladding",
    description: "Exterior aluminium paneling engineered for thermal efficiency, solar shading, and striking building facades.",
    href: "/products#acp-cladding",
  },
];

// ─── Signature Projects ──────────────────────────────────────────────────────
export const SIGNATURE_PROJECTS: SignatureProject[] = [
  {
    id: "alibaug-villa",
    title: "The Coastal Villa",
    category: "Residential Villa",
    location: "Alibaug, Maharashtra",
    architect: "Studio Minimal",
    systemsUsed: "Lift & Slide Doors, Slimline Windows",
    image: IMAGES.projectAlibaug,
    completionTime: "2024",
  },
  {
    id: "worli-penthouse",
    title: "Sea-Facing Sky Penthouse",
    category: "Penthouse",
    location: "Worli, Mumbai",
    architect: "Kothari & Associates",
    systemsUsed: "Thermal Break Casement, Frameless Railings",
    image: IMAGES.projectWorli,
    completionTime: "2024",
  },
  {
    id: "bkc-headquarters",
    title: "Fintech Corporate HQ",
    category: "Commercial HQ",
    location: "BKC, Mumbai",
    architect: "Urban Form Lab",
    systemsUsed: "Acoustic Glass Partitions, ACP Facade",
    image: IMAGES.projectBKC,
    completionTime: "2023",
  },
  {
    id: "juhu-bungalow",
    title: "Modern Minimalist Residence",
    category: "Residential Villa",
    location: "Juhu, Mumbai",
    architect: "Design Workshop India",
    systemsUsed: "Panoramic Sliding Systems, Glass Railings",
    image: IMAGES.projectJuhu,
    completionTime: "2024",
  },
];

// ─── Process Steps ───────────────────────────────────────────────────────────
export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: 1,
    title: "Architectural Consultation",
    description: "We review structural drawings, wind-load requirements, and aesthetic preferences with your design team.",
    icon: "MessageSquare",
  },
  {
    number: 2,
    title: "3D Laser Site Survey",
    description: "Precision 3D laser measurement to capture exact aperture dimensions down to sub-millimeter tolerances.",
    icon: "Ruler",
  },
  {
    number: 3,
    title: "CAD & Engineering Shop Drawings",
    description: "Detailed elevation shop drawings, glass specifications, and hardware selection sign-off.",
    icon: "PenTool",
  },
  {
    number: 4,
    title: "CNC Precision Fabrication",
    description: "CNC machining and assembly in our specialized aluminium fabrication facility.",
    icon: "Factory",
  },
  {
    number: 5,
    title: "White-Glove Installation",
    description: "Master installation by certified specialists using structural silicone and EPDM weather seals.",
    icon: "Hammer",
  },
  {
    number: 6,
    title: "Acoustic & Weather Handover",
    description: "Comprehensive operation, acoustic, and water-resistance testing prior to formal handover.",
    icon: "HeadphonesIcon",
  },
];

// ─── Testimonials ────────────────────────────────────────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote: "Arihant Creations delivered the continuous sliding glass elevations for our 5,000 sq ft sea-facing villa in Alibaug. The glide is effortless and monsoon sealing is 100% watertight.",
    name: "Rajesh Malhotra",
    projectType: "Owner, Alibaug Coastal Villa",
  },
  {
    id: "2",
    quote: "As an architect, I demand exact tolerances and clean sightlines. Arihant's engineering support and thermal casement windows were instrumental for our penthouse project.",
    name: "Ar. Priya Sundaram",
    projectType: "Principal Architect, Studio Sundaram",
  },
  {
    id: "3",
    quote: "The 42dB acoustic glass partitions installed in our executive boardrooms completely eliminated city traffic noise. World-class finish and punctual execution.",
    name: "Vikram Mehta",
    projectType: "Managing Director, BKC Corporate HQ",
  },
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────
export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What differentiates Arihant Creations from typical fabrication shops?",
    answer: "We engineer architectural-grade aluminium systems with CNC precision tolerances, multi-point locking mechanisms, structural thermal breaks, and specialized EPDM gasket seals. Every window is custom-manufactured to architectural specifications rather than assembled using standard off-the-shelf sections.",
  },
  {
    question: "How do your aluminium systems perform during heavy Indian monsoons?",
    answer: "Our systems feature double-sealed EPDM weather gaskets, dedicated internal drainage channels, and high wind-pressure resistance ratings. They are tested to prevent water ingress even under severe driving rain conditions.",
  },
  {
    question: "What finishes and color options are available for the frames?",
    answer: "We offer anodized finishes, premium powder coating in standard RAL shades, metallic brush finishes, and authentic wood-grain textures with long-term UV resistance.",
  },
  {
    question: "What is the typical lead time from measurement to installation?",
    answer: "For custom residential projects, fabrication typically takes 2–3 weeks following final CAD approval, with installation completed in 3–5 days depending on project scale.",
  },
  {
    question: "Do you collaborate directly with architects and interior designers?",
    answer: "Yes. Over 70% of our projects are architect-led. We provide CAD drawings, wind-load assessments, material samples, and on-site technical coordination.",
  },
  {
    question: "How do I request a site consultation and quotation?",
    answer: "You can submit your project details via our online form, call our engineering team directly, or request a consultation on WhatsApp. A technical consultant will review your drawings and schedule a 3D site survey.",
  },
];
