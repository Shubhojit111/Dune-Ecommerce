"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import Assets from "@/assets/images/Assets";
import HeaderBtn from "./buttons/HeaderBtn";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_HOTSPOTS = [
  {
    id: 1,
    x: 63, // ← change this to move left/right
    y: 43, // ← change this to move up/down
    product: {
      name: "Bear Pocket Tee - Black",
      brand: "MUTTONHEAD",
      price: "Rs. 4,700.00",
      image: Assets.Category2,
    },
  },
  {
    id: 2,
    x: 74,
    y: 62,
    product: {
      name: "Wool Shirt Jacket - Forest",
      brand: "MUTTONHEAD",
      price: "Rs. 12,900.00",
      image: Assets.Category1,
    },
  },
  {
    id: 3,
    x: 66,
    y: 84,
    product: {
      name: "Merino Turtleneck - Ivory",
      brand: "NAKED AND FAMOUS",
      price: "Rs. 6,200.00",
      image: Assets.Category3,
    },
  },
];

function Hotspot({ spot, active, onToggle }) {
  const { product } = spot;

  return (
    <div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
    >
      <button
        onClick={() => onToggle(spot.id)}
        aria-label="Show product"
        className="relative w-4 h-4 rounded-full bg-white border-none flex items-center justify-center cursor-pointer shadow-[0_0_0_8px_rgba(0,0,0,0.25)]"
      >
        {!active && (
          <span className="absolute inset-0 rounded-full animate-ping bg-[white]/80" />
        )}
      </button>

      {active && (
        <div
          className={`absolute top-[26px] w-[200px] bg-white shadow-xl p-3 flex gap-3 items-center z-10 ${
            spot.x > 60 ? "right-0" : "left-0"
          }`}
        >
          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden bg-[#e2e2e0]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-[12.5px] text-[#1c1c1c] leading-[1.3]">
              {product.name}
            </div>
            <div className="text-[10.5px] tracking-[0.5px] text-[#8a8a8a] my-1">
              {product.brand}
            </div>
            <div className="text-[12.5px] text-[#1c1c1c]">{product.price}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopTheLook({
  title = "SHOP THE LOOK",
  heroImage = Assets.Image1,
  hotspots = DEFAULT_HOTSPOTS,
}) {
  const [activeId, setActiveId] = useState(null);

  // NEW: track which product is selected for the left panel.
  // Defaults to the first hotspot's product so something shows initially.
  const [selectedId, setSelectedId] = useState(hotspots[0]?.id ?? null);
  const selectedSpot = hotspots.find((h) => h.id === selectedId) ?? hotspots[0];
  const featured = selectedSpot?.product ?? {};
  const featuredImage = featured.image || heroImage;

  const handleToggle = (id) => {
    setActiveId((cur) => (cur === id ? null : id)); // existing behavior, unchanged
    setSelectedId(id); // NEW: also update the left panel item
  };

  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: leftRef.current, // 👈 watch left element
        start: "top 20%", // 👈 when it hits top → pin
        endTrigger: rightRef.current, // 👈 use right section height
        end: "bottom bottom-=20%", // 👈 unpin at section end
        pin: leftRef.current,
        pinSpacing: false,
        // markers: true,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full bg-white px-4 sm:px-8 lg:px-14 my-14"
    >
      <HeaderBtn text={title} />

      <div className="w-full mt-10 flex flex-col lg:flex-row gap-8 lg:gap-14 justify-between h-full items-center">
        <div 
            ref={leftRef} className="w-full lg:w-[30%] h-fit flex flex-col items-center justify-center">
          <div
            className="group relative h-[50vh] w-full overflow-hidden bg-[#E5E5E5]"
          >
            <Image
              src={featuredImage}
              alt={featured.name || title}
              fill
              sizes="300px"
              className="object-cover transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 z-50 p-2 w-full">
              <button className="w-full py-1.5 bg-[#2a2a28] text-white text-[12px] font-medium tracking-wider hidden group-hover:block duration-500 transition-all">
                Quick View
              </button>
            </div>
          </div>

          <div className="mt-3 text-center">
            <p className="text-[10px] md:text-[12.5px] tracking-wider text-[#121212] font-semibold">
              {featured.name || "Product Name"}
            </p>
            {featured.brand && (
              <p className="mt-1 text-[11.5px] uppercase tracking-[0.15em] text-[#121212] font-medium">
                {featured.brand}
              </p>
            )}
            <p className="mt-1.5 text-xs md:text-[13px] text-ink font-semibold">
              {featured.price}
            </p>
          </div>
        </div>

        <div
          ref={rightRef}
          className="relative h-[140vh] w-full lg:w-[70%] overflow-hidden bg-[#e5e5e5] flex-shrink-0"
        >
          <Image
            src={heroImage}
            alt={title}
            fill
            className="h-full w-full object-cover"
          />
          {hotspots.map((spot) => (
            <Hotspot
              key={spot.id}
              spot={spot}
              active={activeId === spot.id}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
