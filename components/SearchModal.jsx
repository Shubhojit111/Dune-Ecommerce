"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, Search } from "lucide-react";
import {
  socksProducts,
  toquesProducts,
  linenEdit,
  allNew,
  featuredSlides,
} from "@/data/products";

const ALL_PRODUCTS = [
  ...socksProducts,
  ...toquesProducts,
  ...linenEdit,
  ...allNew,
  ...featuredSlides,
];

// Rotating placeholder texts
const PLACEHOLDER_TEXTS = ["socks", "tshirts", "hats", "pants", "sweatshirts"];

// Helper mock suggestions & collections mapping
const GET_SUGGESTIONS = (q) => {
  const query = q.trim().toLowerCase();
  if (!query) return [];

  if (query.includes("sock")) {
    return ["socks", "merino mountain hiking socks", "zero socks red"];
  }
  if (
    query.includes("toque") ||
    query.includes("hat") ||
    query.includes("cap")
  ) {
    return ["chunky toque", "toque fawn", "toque black"];
  }
  if (
    query.includes("shirt") ||
    query.includes("linen") ||
    query.includes("coat")
  ) {
    return ["linen shirt", "brisa overshirt", "wren coat"];
  }

  return [query, `merino ${query}`, `custom ${query}`];
};

const GET_COLLECTIONS = (q) => {
  const query = q.trim().toLowerCase();
  if (!query) return [];

  if (query.includes("sock")) return ["Socks"];
  if (query.includes("toque") || query.includes("hat"))
    return ["Hats & Toques"];
  if (query.includes("linen")) return ["Linen Collection"];
  if (query.includes("coat") || query.includes("jacket")) return ["Outerwear"];

  return ["New Arrivals", "All Products"];
};

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const inputRef = useRef(null);
  const router = useRouter();

  // Mount/unmount with smooth transition
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const raf = requestAnimationFrame(() => setIsVisible(true));
      setTimeout(() => inputRef.current?.focus(), 100);
      return () => cancelAnimationFrame(raf);
    } else {
      setIsVisible(false);
      const timeout = setTimeout(() => {
        setShouldRender(false);
        setQuery("");
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Rotating placeholder texts
  useEffect(() => {
    if (!shouldRender) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDER_TEXTS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [shouldRender]);

  // Lock body scroll when open
  useEffect(() => {
    if (shouldRender) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [shouldRender]);

  // Close on Escape key
  useEffect(() => {
    if (!shouldRender) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [shouldRender, onClose]);

  const hasQuery = query.trim().length > 0;

  // Filter products matching query
  const matchingProducts = useMemo(() => {
    if (!hasQuery) return [];
    const q = query.toLowerCase();

    if (q.includes("sock")) {
      return socksProducts.slice(0, 5);
    }

    const filtered = ALL_PRODUCTS.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.handle?.toLowerCase().includes(q),
    );

    return filtered.slice(0, 5);
  }, [query, hasQuery]);

  const suggestions = useMemo(() => {
    if (!hasQuery) return [];
    return GET_SUGGESTIONS(query);
  }, [query, hasQuery]);

  const collections = useMemo(() => {
    if (!hasQuery) return [];
    return GET_COLLECTIONS(query);
  }, [query, hasQuery]);

  // Handle Enter key -> go to search page
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && hasQuery) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  // Handle "View more" click
  const handleViewMore = (e) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    onClose();
  };

  if (!shouldRender) return null;

  return (
    <div
      className="absolute top-full left-0 w-full z-[999999] pointer-events-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop blur & dark overlay extending below the navbar */}
      <div
        onClick={onClose}
        className={`fixed inset-0 top-0 bg-black/40 backdrop-blur-sm z-[-1] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Search Container Positioned Right After Navbar with Highest Z-Index */}
      <div className="relative bg-[#EDECE9] z-[999999] w-full max-h-[calc(100vh-120px)] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Search Bar Section - no extra padding, sits flush at top */}
        <div className="w-full shadow-md z-[999999] px-3 py-4 sm:py-4 flex-shrink-0">
          <div className="max-w-[950px] border mx-auto flex items-center gap-3 sm:gap-5">
            {/* White Search Input Box with Border & Search Lens Icon on Right */}
            <div className="flex-1 bg-white border border-[#C5C0B7] shadow-sm flex items-center py-1.5 overflow-hidden transition-all focus-within:border-stone-600">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={"search " + PLACEHOLDER_TEXTS[placeholderIndex]}
                className="flex-1 h-full px-4 sm:px-3 bg-transparent text-[15px] sm:text-[14px] text-[#1E1B17]  placeholder:text-stone-400 outline-none"
              />
              <button
                type="button"
                onClick={() =>
                  hasQuery && handleViewMore({ preventDefault: () => {} })
                }
                className="h-full px-3 border-l border-[#C5C0B7] flex items-center justify-center text-stone-600 bg-white hover:bg-stone-50 transition-colors"
                aria-label="Search submit"
              >
                <Search size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Close Modal X Button */}
            <button
              onClick={onClose}
              aria-label="Close search"
              className="text-stone-600 hover:text-stone-950 transition-colors p-1 flex-shrink-0"
            >
              <X size={26} strokeWidth={1.3} />
            </button>
          </div>
        </div>

        {/* Bottom Search Results Modal Section - only visible when typing */}
        {hasQuery && (
          <div className="w-full h-screen px-0 sm:px-8 lg:px-14 py-0 flex flex-col justify-center items-center pb-12 bg-black/10 backdrop-blur-md z-[999999] overflow-y-auto ">
            <div className="flex flex-col w-full h-full items-center shadow-2xl max-w-[950px]">
              <div className="w-full bg-[#F7F7F7] border border-[#E2DDD5] p-4 sm:p-10 text-[#1E1B17] z-[999999] ">
                {matchingProducts.length === 0 &&
                suggestions.length === 0 &&
                collections.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-[14px] text-[#2C2A29] font-dune">
                      No results found for &ldquo;{query}&rdquo;
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row w-full h-full  items-start gap-8 md:gap-20 mt-0 sm:pt-0">
                    {/* Left Column: SUGGESTIONS & COLLECTIONS */}
                    <div className="w-full md:w-[30%] flex flex-col gap-8">
                      {/* Suggestions Section */}
                      {suggestions.length > 0 && (
                        <div>
                          <h3 className="text-[12px] uppercase font-serif tracking-[0.2em] text-[#8C765C] font-dune border-b border-[#DCD7CD] pb-1.5 mb-4">
                            SUGGESTIONS
                          </h3>
                          <ul className="flex flex-col pl-2 gap-4">
                            {suggestions.map((item, idx) => {
                              const lowerItem = item.toLowerCase();
                              const q = query.trim().toLowerCase();
                              const matchIdx = lowerItem.indexOf(q);
                              return (
                                <li key={idx}>
                                  <button
                                    type="button"
                                    onClick={() => setQuery(item)}
                                    className="text-[13px] text-[#2C2A29] hover:text-black font-normal text-left transition-colors cursor-pointer"
                                  >
                                    {matchIdx >= 0 ? (
                                      <>
                                        {item.slice(0, matchIdx)}
                                        <span className="font-bold">
                                          {item.slice(
                                            matchIdx,
                                            matchIdx + q.length,
                                          )}
                                        </span>
                                        {item.slice(matchIdx + q.length)}
                                      </>
                                    ) : (
                                      item
                                    )}
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}

                      {/* Collections Section */}
                      {collections.length > 0 && (
                        <div>
                          <h3 className="text-[12px] uppercase font-serif tracking-[0.2em] text-[#8C765C] font-dune border-b border-[#DCD7CD] pb-1.5 mb-4">
                            COLLECTIONS:
                          </h3>
                          <ul className="flex flex-col pl-2 gap-4">
                            {collections.map((item, idx) => (
                              <li key={idx}>
                                <button
                                  type="button"
                                  onClick={() => setQuery(item.toLowerCase())}
                                  className="text-[13px] text-[#2C2A29] hover:text-black font-normal transition-colors cursor-pointer"
                                >
                                  {item}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Right Column: PRODUCTS */}
                    <div className="w-full md:w-[70%] flex flex-col gap-6">
                      {matchingProducts.length > 0 ? (
                        <>
                          <h3 className="text-[12px] uppercase font-serif tracking-[0.2em] text-[#8C765C] font-dune border-b border-[#DCD7CD] pb-1.5 ">
                            PRODUCTS
                          </h3>

                          <div className="flex flex-col pl-2 gap-2">
                            {matchingProducts.map((product) => (
                              <Link
                                key={product.id || product.handle}
                                href={`/products/${product.handle || product.id}`}
                                onClick={onClose}
                                className="group flex items-center gap-4 py-1"
                              >
                                {/* Product Square Thumbnail */}
                                <div className="w-32 h-28 sm:w-20 sm:h-20 bg-[#E5E2DA] flex-shrink-0 relative overflow-hidden border border-[#DCD7CD]">
                                  {product.image ? (
                                    <Image
                                      src={product.image}
                                      alt={product.name}
                                      fill
                                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                                      Product
                                    </div>
                                  )}
                                </div>

                                {/* Product Title */}
                                <span className="text-[13px] sm:text-[13px] text-[#2C2A29] group-hover:text-black font-normal transition-colors leading-snug">
                                  {product.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-[14px] text-[#2C2A29]/60 font-dune">
                            No products match your search.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* Bottom Card Footer: View more */}
              <div className="w-full bg-[#F7F7F7] border border-[#E2DDD5] shadow-2xl mt-0 px-10 py-2 text-[#1E1B17]  flex items-start justify-start">
                <Link
                  href={`/search?q=${encodeURIComponent(query.trim())}`}
                  onClick={handleViewMore}
                  className="text-[12px] font-normal text-[#2C2A29] hover:opacity-75 transition-opacity flex items-start gap-1.5"
                >
                  View more &rarr;
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
