// ─── Business Configuration ──────────────────────────────────────────────────
// Update values here to configure company details across the entire application.

export const BUSINESS = {
  name: "Arihant Creations",
  tagline: "Premium Aluminium Windows & Doors Built for Modern Living",
  subTagline: "Precision-engineered for luxury Indian residences and modern architectural spaces.",
  
  // Contact details — editable without code changes
  phone: "+91-9876543210",              // TODO: Replace with official phone number
  whatsapp: "919876543210",             // TODO: Replace with official WhatsApp number (digits only, with country code)
  email: "arihantcreations.business@gmail.com", // Recipient for quote requests
  
  address: {
    street: "Industrial Area, Sector 5",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    country: "India",
  },
  
  hours: "Mon–Sat: 9:00 AM – 7:00 PM",
  yearEstablished: "2010",
  
  // Interactive Google Maps Embed URL (placeholder until Google Business Profile verification)
  googleMapsEmbed: "",
  
  // Social Links
  socialLinks: {
    instagram: "https://instagram.com/arihantcreations",
    facebook: "https://facebook.com/arihantcreations",
    youtube: "https://youtube.com/arihantcreations",
  },
} as const;

// ─── Navigation ──────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "#products" },
  { label: "Process", href: "#process" },
  { label: "Why Us", href: "#why-choose" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];
