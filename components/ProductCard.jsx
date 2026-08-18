"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Assets from "@/assets/images/Assets";

export default function ProductCard({ product }) {
  const DEFAULT_COLORS = [
    { swatch: "#C4A37B" },
    { swatch: "#4A5D3B" },
    { swatch: "#1A1A1A" },
    { swatch: "#5C2A35" },
  ];
  const [selectedColor, setSelectedColor] = useState(0);
  const hoverImg =
    product.hoverImage || product.secondImage || Assets.BigScreenImage;
  const colors = product.colors?.length ? product.colors : DEFAULT_COLORS;
  const hasColors = product.colors?.length > 0;

  return (
    <div className="group relative flex flex-col items-center">
      <Link
        href={`/products/${product.handle || product.id}`}
        className="block w-full"
      >
        <div className="group relative aspect-square  w-full overflow-hidden bg-[#E5E5E5]">
          {/* Primary image */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover absolute top-0 left-0 object-center transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0"
          />

          {/* Secondary image (crossfades in on hover) */}
          <Image
            src={hoverImg}
            alt={product.name}
            fill
            className="object-cover absolute top-0 left-0 object-center transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
          />

          {/* Quick View — slides up from bottom */}
          <div className="absolute bottom-0 left-0 z-50 p-2 w-full overflow-hidden">
            <button
              className="w-full py-1.5 bg-[#2a2a28] text-white text-[12px] font-medium tracking-wider
                         transition-all duration-500 ease-in-out
                         translate-y-full opacity-0
                         group-hover:translate-y-0 group-hover:opacity-100"
            >
              Quick View
            </button>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 text-center w-full">
          <p className="text-[10px] md:text-[12.5px] tracking-wider text-gray-800 font-normal">
            {product.name}
          </p>
          {product.brand && (
            <p className="mt-1.5 text-[11.5px] uppercase tracking-[0.2em] text-[#121212] font-light">
              {product.brand}
            </p>
          )}
          {product.salePrice ? (
            <p className="mt-1 text-xs md:text-[12.5px] text-gray-800 flex items-center justify-center gap-2.5 flex-wrap">
              <span className="text-taupe line-through">
                {product.regularPrice}
              </span>
              <span className="text-camel font-medium">
                {product.salePrice}
              </span>
              {product.saveLabel && (
                <span className="text-xs text-sage">{product.saveLabel}</span>
              )}
            </p>
          ) : (
            <p className="mt-2 text-xs md:text-[12.5px] text-gray-800 font-normal tracking-wider">
              {product.price}
            </p>
          )}

          {/* Color swatches — only if product has colors */}
          {hasColors && (
            <div className="mt-3 flex items-center justify-center gap-2">
              {colors.slice(0, 4).map((c, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColor(i);
                  }}
                  aria-label={`Color ${i + 1}`}
                  className={`w-4 h-4 sm:w-[18px] sm:h-[18px] rounded-full flex-shrink-0 p-[2px] transition-all ${
                    selectedColor === i
                      ? "ring-1 ring-ink/80 ring-offset"
                      : "ring-0 border border-black/10"
                  }`}
                >
                  <span
                    className="block w-full h-full rounded-full"
                    style={{ backgroundColor: c.swatch || c }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
