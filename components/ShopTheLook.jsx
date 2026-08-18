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
          className={`hidden lg:flex absolute top-[26px] w-[200px] bg-white shadow-xl p-3 gap-3 items-center z-10 ${
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
  heroImage,
  hotspots = DEFAULT_HOTSPOTS,
}) {
  const [activeId, setActiveId] = useState(null);

  const [selectedId, setSelectedId] = useState(hotspots[0]?.id ?? null);
  const selectedSpot = hotspots.find((h) => h.id === selectedId) ?? hotspots[0];
  const featured = selectedSpot?.product ?? {};
  const featuredImage = featured.image || heroImage;

  const handleToggle = (id) => {
    setActiveId((cur) => (cur === id ? null : id)); 
    setSelectedId(id); 
  };

  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: leftRef.current, 
        start: "top 20%", 
        endTrigger: rightRef.current, 
        end: "bottom bottom-=20%",
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

      <div className="w-full mt-4 sm:mt-10 flex flex-col lg:flex-row gap-4 lg:gap-14 justify-between h-full items-center">
        {/* Main Hero Image with hotspots (order 1 on mobile, order 2 on desktop) */}
        <div
          ref={rightRef}
          className="order-1 lg:order-2 relative h-[45vh] sm:h-[60vh] lg:h-[140vh] w-full lg:w-[70%] overflow-hidden bg-[#e5e5e5] flex-shrink-0"
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

        {/* Selected Product Panel – hidden on mobile, visible on desktop */}
        <div 
          ref={leftRef} className="flex order-2 lg:order-1 w-full lg:w-[30%] h-[100px] sm:h-fit flex-col items-start lg:items-center justify-center">
          {/* On Mobile: Horizontal card; On Desktop: Vertical stacked card */}
          <div className="flex lg:flex-col items-center gap-4 lg:gap-0 w-full bg-transparent p-0 rounded-sm">
            <div className="group relative h-24 w-24 lg:h-[50vh] lg:w-full flex-shrink-0 overflow-hidden bg-[#E5E5E5]">
              <Image
                src={featuredImage}
                alt={featured.name || title}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 z-50 p-2 w-full hidden lg:block">
                <button className="w-full py-1.5 bg-[#2a2a28] text-white text-[12px] font-medium tracking-wider hidden group-hover:block duration-500 transition-all">
                  Quick View
                </button>
              </div>
            </div>

            <div className="mt-0 lg:mt-3 text-left lg:text-center">
              <p className="text-[13px] lg:text-[12.5px] tracking-wider text-ink/90 font-normal">
                {featured.name || "Product Name"}
              </p>
              {featured.brand && (
                <p className="mt-1 lg:mt-1 text-[11px] lg:text-[11.5px] uppercase tracking-[0.15em] text-ink/50 font-normal">
                  {featured.brand}
                </p>
              )}
              <p className="mt-1.5 lg:mt-1.5 text-xs lg:text-[13px] text-ink/90 font-normal">
                {featured.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
