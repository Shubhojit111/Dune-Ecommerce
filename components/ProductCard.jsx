"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="group relative flex flex-col items-center">
      <Link href={`/products/${product.handle}`} className="block w-full">
        <div className="group relative aspect-[3/4] sm:aspect-auto h-[160px] sm:h-[280px] md:h-[45vh] w-full overflow-hidden bg-[#E5E5E5] transition-all duration-300 group-hover:opacity-95">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover absolute top-0 left-0 object-center transition-all duration-500 group-hover:scale-105 `}
          />

          <div className="absolute bottom-0 left-0 z-50 p-2 w-full">
            <button className="w-full py-1.5 bg-[#2a2a28] text-white text-[12px] font-medium tracking-wider hidden group-hover:block duration-500 transition-all ease-in-out ">
              Quick View
            </button>
          </div>
        </div>

        <div className="mt-3 text-center">
          <p className="text-[10px] md:text-[12.5px] tracking-wider text-[#121212] font-semibold">
            {product.name}
          </p>
          {product.brand && (
            <p className="mt-1 text-[11.5px] uppercase tracking-[0.15em] text-[#121212] font-medium">
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
            <p className="mt-1.5 text-xs md:text-[13px] text-ink font-semibold">
              {product.price}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
