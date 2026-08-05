"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BUSINESS } from "@/lib/constants";

export default function MobileBottomBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY < 100);
      
      if (currentScrollY < 100) {
        setIsVisible(false);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(true);
      } else if (lastScrollY - currentScrollY > 10) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    "Hi Arihant Creations, I would like to request a quotation for premium aluminium windows/doors."
  )}`;

  return (
    <AnimatePresence>
      {isVisible && !isAtTop && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        >
          <div className="bg-white/95 backdrop-blur-md border-t border-[#EEF2F6] shadow-[0_-4px_16px_rgba(8,28,75,0.08)] px-4 py-3">
            <div className="flex gap-3">
              <a
                href={`tel:${BUSINESS.phone}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#081C4B] text-white text-sm font-bold shadow-sm transition-colors hover:bg-[#0E2E78]"
                aria-label="Call Arihant Creations"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#C5161D] text-white text-sm font-bold shadow-sm transition-colors hover:bg-[#A31016]"
                aria-label="WhatsApp Quote Request"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Quote
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
