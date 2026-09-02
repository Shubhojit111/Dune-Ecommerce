"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react"; // swap for your icon set if different

export default function QuickViewModal({ isOpen, onClose, children }) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mount immediately on open, but delay the "visible" class one tick
  // so the enter transition actually animates from its initial state.
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const raf = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setIsVisible(false);
      const timeout = setTimeout(() => setShouldRender(false), 300); // match duration below
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Lock body scroll while open
  useEffect(() => {
    if (shouldRender) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [shouldRender]);

  // Close on Escape
  useEffect(() => {
    if (!shouldRender) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [shouldRender, onClose]);

  if (!shouldRender) return null;

  return (
    <div
      className="fixed inset-0 z-[1000000] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        className={`relative w-full h-[80vh] w-[75vw] bg-white shadow-2xl transition-all duration-300 ease-out flex flex-col ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-[0.97] translate-y-2"
        }`}
      >
        {/* Close button — fixed at top-right, always visible */}
        <button
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
