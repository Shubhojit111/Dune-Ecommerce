'use client';

import React, { useState } from "react";
import { Plus, X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Fonts                                                              */
/* ------------------------------------------------------------------ */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Jost:wght@400;500;600&display=swap');
    .pfd { font-family: 'Playfair Display', Georgia, serif; }
    .jst { font-family: 'Jost', 'Helvetica Neue', Arial, sans-serif; }
  `}</style>
);

/* ------------------------------------------------------------------ */
/*  Image components — every <img> gets its own component              */
/* ------------------------------------------------------------------ */
function ProductMainImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover object-[center_30%] block"
    />
  );
}

function ProductDetailImage({ src, alt }) {
  return (
    <img src={src} alt={alt} className="w-full h-full object-cover block" />
  );
}

function FeaturedProductImage({ src, alt }) {
  return (
    <img src={src} alt={alt} className="w-full h-full object-cover block" />
  );
}

function LookHeroImage({ src, alt }) {
  return (
    <img src={src} alt={alt} className="w-full h-full object-cover block" />
  );
}

function HotspotProductImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-14 h-14 object-cover flex-shrink-0 block"
    />
  );
}

const DEFAULT_HOTSPOTS = [
  {
    id: 1,
    x: 73,
    y: 43,
    product: {
      name: "Bear Pocket Tee - Black",
      brand: "MUTTONHEAD",
      price: "Rs. 4,700.00",
      image: "https://placehold.co/300x300/1c1c1c/ffffff?text=Bear+Pocket+Tee",
    },
  },
  {
    id: 2,
    x: 84,
    y: 55,
    product: {
      name: "Wool Shirt Jacket - Forest",
      brand: "MUTTONHEAD",
      price: "Rs. 12,900.00",
      image: "https://placehold.co/300x300/33402f/ffffff?text=Shirt+Jacket",
    },
  },
  {
    id: 3,
    x: 76,
    y: 84,
    product: {
      name: "Merino Turtleneck - Ivory",
      brand: "NAKED AND FAMOUS",
      price: "Rs. 6,200.00",
      image: "https://placehold.co/300x300/e8e2d6/1c1c1c?text=Turtleneck",
    },
  },
];

export default function Hotspot({ spot, active, onToggle }) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
    >
      <button
        onClick={() => onToggle(spot.id)}
        aria-label="Show product"
        className="relative w-7 h-7 rounded-full bg-white border-none flex items-center justify-center cursor-pointer shadow-[0_0_0_8px_rgba(255,255,255,0.25)]"
      >
        {active ? (
          <X size={14} className="text-[#1c1c1c]" />
        ) : (
          <Plus size={14} className="text-[#1c1c1c]" />
        )}
        {!active && (
          <span className="absolute inset-0 rounded-full animate-ping bg-white/40" />
        )}
      </button>

      {active && (
        <div
          className={`jst absolute top-[38px] w-[200px] bg-white shadow-xl p-3.5 flex gap-3 items-center z-10 ${
            spot.x > 60 ? "right-0" : "left-0"
          }`}
        >
          <HotspotProductImage
            src={spot.product.image}
            alt={spot.product.name}
          />
          <div>
            <div className="text-[12.5px] text-[#1c1c1c] leading-[1.3]">
              {spot.product.name}
            </div>
            <div className="text-[10.5px] tracking-[0.5px] text-[#8a8a8a] my-1">
              {spot.product.brand}
            </div>
            <div className="text-[12.5px] text-[#1c1c1c]">
              {spot.product.price}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ShopTheLook({
  title = "SHOP THE LOOK",
  heroImage = "https://placehold.co/1400x1000/9a9a94/ffffff?text=Model+Image",
  featured = DEFAULT_HOTSPOTS[0].product,
  hotspots = DEFAULT_HOTSPOTS,
  sectionHeight = 860,
}) {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="w-full bg-[#f6f6f4]">
      <FontLoader />

      {/* Fixed-height section — intentionally taller than the viewport */}
      <div
        className="max-w-[1440px] mx-auto pt-10 grid grid-cols-[300px_1fr] gap-0"
        style={{ height: sectionHeight }}
      >
        {/* Left column: title + featured product card */}
        <div className="px-8">
          <h2 className="pfd m-0 mb-[60px] text-[32px] font-normal text-[#1a1a1a]">
            {title}
          </h2>

          <div className="w-full">
            <div className="w-full aspect-square bg-[#e2e2e0] overflow-hidden">
              <FeaturedProductImage src={featured.image} alt={featured.name} />
            </div>
            <div className="jst mt-3.5 text-[13.5px] text-[#1c1c1c]">
              {featured.name}
            </div>
            <div className="jst text-[11px] tracking-[1px] text-[#8a8a8a] my-1">
              {featured.brand}
            </div>
            <div className="jst text-[13.5px] text-[#1c1c1c]">
              {featured.price}
            </div>
          </div>
        </div>

        {/* Right column: full-bleed hero image with hotspots, fills remaining fixed height */}
        <div className="relative h-full overflow-hidden">
          <LookHeroImage src={heroImage} alt="Shop the look" />
          {hotspots.map((spot) => (
            <Hotspot
              key={spot.id}
              spot={spot}
              active={activeId === spot.id}
              onToggle={(id) => setActiveId((cur) => (cur === id ? null : id))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
