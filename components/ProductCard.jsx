"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Assets from "@/assets/images/Assets";

export default function ProductCard({ product }) {
  return (
    <div className="group relative flex flex-col items-center">
      <Link href={`/products/${product.handle}`} className="block w-full">
        <div className="group relative aspect-[3/4] sm:aspect-auto h-[160px] sm:h-[280px] md:h-[45vh] w-full overflow-hidden bg-[#E5E5E5]">
          {/* Primary image */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover absolute top-0 left-0 object-center transition-opacity duration-500 ease-in-out opacity-100 group-hover:hidden"
          />

          {/* Secondary image (crossfades in on hover) */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover absolute top-0 translate-x-1/3 left-0 object-center transition-opacity duration-500 ease-in-out scale-[1.5] opacity-0 group-hover:opacity-100"
          />

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

        <div className="mt-3 text-center">
          <p className="text-[10px] md:text-[12.5px] tracking-wider text-gray-800 font-semibold">
            {product.name}
          </p>
          {product.brand && (
            <p className="mt-1.5 text-[11.5px] uppercase tracking-[0.2em] text-[#121212] font-medium">
              {product.brand}
            </p>
          )}
          {product.salePrice ? (
            <p className="mt-1 text-xs md:text-sm">
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
            <p className="mt-2 text-xs md:text-[12.5px] text-gray-800 font-semibold tracking-wider">
              {product.price}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}