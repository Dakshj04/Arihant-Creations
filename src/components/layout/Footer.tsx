import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { BUSINESS, NAV_LINKS, PRODUCTS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#081C4B] text-white border-t-4 border-[#C5161D]">
      {/* Main Footer Container */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-white p-0.5 shadow-md">
                <Image
                  src="/logo.png"
                  alt="Arihant Creations Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-lg leading-tight text-white tracking-tight">
                  ARIHANT
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] font-semibold leading-tight text-[#C5161D]">
                  CREATIONS
                </span>
              </div>
            </div>
            
            <div className="w-12 h-[2px] bg-[#C5161D] mb-5" />

            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Precision architectural aluminium windows, doors, facades, and acoustic glass systems for luxury residences and modern developments across India.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={BUSINESS.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#C5161D] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </a>
              <a
                href={BUSINESS.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#C5161D] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </a>
              <a
                href={BUSINESS.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#C5161D] flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-heading font-bold text-[#C5161D] text-xs uppercase tracking-widest mb-5">
              Navigation
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors font-medium flex items-center gap-1.5"
                  >
                    <span className="text-[#C5161D] text-xs">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-white/70 hover:text-white text-sm transition-colors font-medium flex items-center gap-1.5"
                >
                  <span className="text-[#C5161D] text-xs">›</span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-white/70 hover:text-white text-sm transition-colors font-medium flex items-center gap-1.5"
                >
                  <span className="text-[#C5161D] text-xs">›</span>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="font-heading font-bold text-[#C5161D] text-xs uppercase tracking-widest mb-5">
              Product Portfolio
            </h3>
            <ul className="space-y-3">
              {PRODUCTS.map((product) => (
                <li key={product.id}>
                  <Link
                    href={product.href}
                    className="text-white/70 hover:text-white text-sm transition-colors font-medium flex items-center gap-1.5"
                  >
                    <span className="text-[#C5161D] text-xs">›</span>
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Map Embed Column */}
          <div>
            <h3 className="font-heading font-bold text-[#C5161D] text-xs uppercase tracking-widest mb-5">
              Contact & Location
            </h3>
            <ul className="space-y-3.5 mb-6">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-[#C5161D] shrink-0" />
                <span className="text-white/70 text-sm">
                  {BUSINESS.address.street}, {BUSINESS.address.city},{" "}
                  {BUSINESS.address.state} {BUSINESS.address.pincode}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C5161D] shrink-0" />
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C5161D] shrink-0" />
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C5161D] shrink-0" />
                <span className="text-white/70 text-sm">{BUSINESS.hours}</span>
              </li>
            </ul>

            {/* Google Maps Embed Placeholder / Iframe */}
            {BUSINESS.googleMapsEmbed ? (
              <div className="rounded-xl overflow-hidden border border-white/15 shadow-sm">
                <iframe
                  src={BUSINESS.googleMapsEmbed}
                  width="100%"
                  height="140"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Arihant Creations Location"
                />
              </div>
            ) : (
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
                <MapPin className="w-5 h-5 text-[#C5161D] mx-auto mb-1.5" />
                <p className="text-white/50 text-xs font-medium">
                  Interactive Google Maps Location
                </p>
                <p className="text-white/30 text-[11px]">
                  (Embed URL will activate upon Google Business Profile verification)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 bg-[#040E26]">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs font-medium">
            © {currentYear} {BUSINESS.name}. All Rights Reserved.
          </p>
          <p className="text-white/40 text-xs">
            Precision Aluminium Fenestration • India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
