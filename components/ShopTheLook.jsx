"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import Assets from "@/public/images/Assets";
import HeaderBtn from "./buttons/HeaderBtn";

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
          className={`absolute top-[38px] w-[200px] bg-white shadow-xl p-3.5 flex gap-3 items-center z-10 ${
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
  featured = DEFAULT_HOTSPOTS[0].product,
  hotspots = DEFAULT_HOTSPOTS,
}) {
  const [activeId, setActiveId] = useState(null);
  const featuredImage = featured.image || heroImage;

  return (
    <div className="w-full bg-white px-4 sm:px-8 lg:px-14 my-14">
      <HeaderBtn text={title} />

      <div className="w-full mt-10 flex flex-col lg:flex-row gap-8 lg:gap-14 justify-between">
        <div className="w-full lg:w-[30%]  flex flex-col items-center justify-center">
          <div className="group relative h-[50vh] w-full overflow-hidden bg-[#E5E5E5]">
            <Image
              src={Assets.PanelMain}
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
          className="relative h-[140vh] w-full lg:w-[70%] overflow-hidden bg-[#e5e5e5] flex-shrink-0"
        >
          <Image
            src={heroImage}
            alt={title}
            fill
            className="h-full w-full object-cover"
          />
          {/* {hotspots.map((spot) => (
            <Hotspot
              key={spot.id}
              spot={spot}
              active={activeId === spot.id}
              onToggle={(id) => setActiveId((cur) => (cur === id ? null : id))}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
}
