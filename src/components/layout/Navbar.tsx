"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NAV_LINKS, BUSINESS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSegment, setActiveSegment] = useState("/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    "Hi Arihant Creations, I would like to request a quotation for premium aluminium windows/doors."
  )}`;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-white border-b border-[#EEF2F6]",
          isScrolled ? "shadow-md py-2.5" : "shadow-sm py-3.5"
        )}
      >
        <nav className="container-custom flex items-center justify-between">
          {/* Official Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Arihant Creations — Home"
          >
            <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-slate-100 shadow-sm bg-white p-0.5">
              <Image
                src="/logo.png"
                alt="Arihant Creations Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl leading-tight text-[#081C4B] tracking-tight">
                ARIHANT
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold leading-tight text-[#C5161D]">
                CREATIONS
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSegment === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveSegment(link.href)}
                  className="relative text-sm font-semibold text-[#081C4B] hover:text-[#C5161D] transition-colors py-1"
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5161D] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${BUSINESS.phone}`}
              className="flex items-center gap-2 text-sm font-semibold text-[#081C4B] hover:text-[#C5161D] transition-colors"
              aria-label="Call Arihant Creations"
            >
              <div className="w-8 h-8 rounded-full bg-[#EEF2F6] flex items-center justify-center">
                <Phone className="w-4 h-4 text-[#081C4B]" />
              </div>
              <span className="hidden xl:inline">{BUSINESS.phone}</span>
            </a>
            <a
              href="#contact"
              className="btn-cta text-sm py-2.5 px-5"
            >
              Get Quote
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#081C4B] hover:bg-[#EEF2F6] transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              className="absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="flex flex-col h-full pt-24 px-6 pb-8">
                {/* Nav Links */}
                <div className="flex flex-col gap-1">
                  {NAV_LINKS.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => {
                          setActiveSegment(link.href);
                          setIsMobileMenuOpen(false);
                        }}
                        className="block py-3 px-4 text-base font-bold text-[#081C4B] hover:text-[#C5161D] hover:bg-[#EEF2F6] rounded-xl transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-[#EEF2F6] my-6" />

                {/* Mobile CTAs */}
                <div className="flex flex-col gap-3 mt-auto">
                  <a
                    href={`tel:${BUSINESS.phone}`}
                    className="btn-secondary w-full py-3 text-sm font-semibold justify-center"
                  >
                    <Phone className="w-4 h-4 text-[#081C4B]" />
                    Call Now
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cta w-full py-3 text-sm font-semibold justify-center"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    WhatsApp Quote
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
