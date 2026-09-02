"use client";

import Image from "next/image";
import Assets from "@/assets/Assets";
import React, { useState } from "react";
import HeadTagBtn from "./buttons/HeadTagBtn";
import HeaderBtn from "./buttons/HeaderBtn";
import SubTextBtn from "./buttons/SubTextBtn";

const HOTSPOT_PRODUCTS = [
  {
    name: "Cotton Crewneck Sweatshirt",
    price: "₹2,499",
  },
  {
    name: "Relaxed Fit Denim Jacket",
    price: "₹3,999",
  },
];

const HotspotButton = ({ index, active, onClick }) => (
  <button
    onClick={onClick}
    aria-label={`Shop hotspot ${index + 1}`}
    className="w-10 h-10 rounded-full bg-stone-800/60 backdrop-blur-md text-white border border-white/40 flex items-center justify-center shadow-lg hover:scale-110 transition"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  </button>
);

const ProductCard = ({ product, onClose }) => (
  <div className="absolute left-1/2 -translate-x-1/2 top-12 z-30 bg-white rounded-lg shadow-xl border border-ink/10 overflow-hidden">
    <div className="p-3.5">
      <p className="text-[13px] font-medium text-ink leading-snug mb-1 whitespace-nowrap">
        {product.name}
      </p>
      <p className="text-[13px] text-ink/80 mb-3">{product.price}</p>
      <div className="border-b border-ink/15 mb-3" />
      
      <button className="w-full flex items-center justify-between text-[11px] uppercase tracking-[0.2em] font-semibold text-ink py-1 hover:text-ink/70 transition-colors">
        <span>Check product</span>
        <span>&gt;</span>
      </button>
    </div>
  </div>
);

const BigScreen = () => {
  const [activeHotspot, setActiveHotspot] = useState(null);

  const handleHotspotClick = (index) => {
    setActiveHotspot((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative w-full mb-6 md:mb-24">
      {/* Container: Stacked on mobile, overlay on desktop */}
      <div className="relative w-full md:h-[800px] lg:h-[1200px] xl:h-[1500px]">
        {/* Image wrapper */}
        <div className="relative aspect-[4.5/5] sm:aspect-square md:absolute md:inset-0 w-full overflow-hidden">
          <Image
            src={Assets.BigScreenImage}
            alt="Shop the look"
            fill
            className="h-full w-full object-cover"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Hotspot buttons on image */}
          <div className="absolute top-[35%] right-[40%] z-20">
            <div className="relative">
              <HotspotButton
                index={0}
                active={activeHotspot === 0}
                onClick={() => handleHotspotClick(0)}
              />
              {activeHotspot === 0 && (
                <ProductCard
                  product={HOTSPOT_PRODUCTS[0]}
                  onClose={() => setActiveHotspot(null)}
                />
              )}
            </div>
          </div>

          <div className="absolute top-[52%] right-[25%] z-20">
            <div className="relative">
              <HotspotButton
                index={1}
                active={activeHotspot === 1}
                onClick={() => handleHotspotClick(1)}
              />
              {activeHotspot === 1 && (
                <ProductCard
                  product={HOTSPOT_PRODUCTS[1]}
                  onClose={() => setActiveHotspot(null)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Text content block: stacked below on mobile, overlay on md+ */}
        <div className="relative md:absolute md:inset-0 flex flex-col gap-1.5 sm:gap-3 justify-center items-start px-4 sm:px-8 lg:px-14 py-8 md:py-0 bg-white md:bg-transparent z-10">
          <HeadTagBtn text="SHOP THE LOOK" className="!text-stone-600 md:!text-white" />
          <HeaderBtn
            text="MADE TO GO TOGETHER"
            className="!text-stone-900 md:!text-white !max-w-[3/4] !sm:w-full"
          />
          <SubTextBtn
            text="Pieces that elevate each other, no matter how you style them. Designed to feel effortless every time."
            className="!text-stone-900 md:!text-white"
          />
        </div>
      </div>
    </section>
  );
};

export default BigScreen;