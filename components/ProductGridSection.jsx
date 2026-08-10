"use client";

import { useRef } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";

export default function ProductGridSection({
  heading,
  products,
  viewAllHref,
  hasViewAllBtn,
  centeredHeading = true,
  columns = 4,
  containerPadding = "px-4 sm:px-8 lg:px-14",
  isCarousel = true,
}) {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -240, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 240, behavior: "smooth" });
    }
  };

  const colsClass =
    columns === 4
      ? "grid-cols-2 md:grid-cols-4"
      : columns === 3
        ? "grid-cols-2 md:grid-cols-3"
        : "grid-cols-2 md:grid-cols-3 lg:grid-cols-5";

  return (
    <section className={`w-full py-12 md:py-24 ${containerPadding} bg-[#fff]`}>
      <div className="mx-auto">
        <div
          className={`mb-8 md:mb-14 flex flex-col items-center text-center justify-center`}
        >
          <h2
            className={`font-dune text-[32px] sm:text-5xl tracking-wide uppercase text-ink font-normal text-center`}
          >
            {heading}
          </h2>
          {hasViewAllBtn && (
            <Link
              href={viewAllHref || "/collections/all"}
              className={`flex items-center justify-center rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.25em] font-bold text-black transition-all duration-300 bg-transparent border border-ink/40 hover:border-ink hover:scale-102 cursor-pointer mt-6`}
            >
              View All
            </Link>
          )}
        </div>

        {isCarousel ? (
          <div>
            <div
              ref={scrollRef}
              className="flex md:grid md:grid-cols-4 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory gap-4 md:gap-6 pb-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="w-[40vw] sm:w-[45vw] md:w-auto flex-shrink-0 snap-start md:flex-shrink"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Mobile Scrollbar Control Bar (matching Image 1) */}
            <div className="flex md:hidden items-center justify-between gap-3 mt-6 px-2">
              <button
                onClick={scrollLeft}
                aria-label="Scroll left"
                className="text-stone-500 hover:text-black p-1 text-xs font-bold"
              >
                ▲
              </button>
              <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                <div className="h-full bg-stone-700 w-1/3 rounded-full transition-all duration-300" />
              </div>
              <button
                onClick={scrollRight}
                aria-label="Scroll right"
                className="text-stone-500 hover:text-black p-1 text-xs font-bold"
              >
                ▼
              </button>
            </div>
          </div>
        ) : (
          <div className={`grid ${colsClass} gap-4 md:gap-6`}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
