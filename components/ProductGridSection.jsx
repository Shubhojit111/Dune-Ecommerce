"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Literal class strings so Tailwind's JIT can statically detect them
const COLS_MAP = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
};

export default function ProductGridSection({
  heading,
  products,
  viewAllHref,
  hasViewAllBtn,
  centeredHeading = true,
  columns = 4,
  itemsToShow,
}) {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mobile-only entrance: cards slide in from the right (staggered) when
  // the section scrolls into view
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px)", () => {
      const cards = cardsRef.current.filter(Boolean);
      if (!cards.length || !sectionRef.current) return;

      const tween = gsap.fromTo(
        cards,
        { autoAlpha: 0, x: 80 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            once: true,
          },
        },
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [products]);

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

  const updateScrollProgress = () => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll > 0) {
        setScrollProgress((el.scrollLeft / maxScroll) * 100);
      }
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollProgress();
    el.addEventListener("scroll", updateScrollProgress);
    return () => el.removeEventListener("scroll", updateScrollProgress);
  }, [products]);

  const colsClass = COLS_MAP[columns] || COLS_MAP[4];
  const visibleProducts =
    itemsToShow == null ? products : products.slice(0, Number(itemsToShow));

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 sm:px-8 lg:px-14 py-12 md:py-24 bg-white"
    >
      <div className="w-full mx-auto">
        {/* Heading + View All */}
        <div
          className={`mb-8 md:mb-14 flex flex-col items-center text-center justify-center ${
            centeredHeading ? "" : "items-start text-left"
          }`}
        >
          <h2 className="font-dune text-[32px] sm:text-5xl tracking-wide uppercase text-ink font-normal text-center">
            {heading}
          </h2>
          {hasViewAllBtn && (
            <Link
              href={viewAllHref || "/collections/all"}
              className="flex items-center justify-center rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.25em] font-normal text-black transition-all duration-300 bg-transparent border border-ink/40 hover:border-ink hover:scale-102 cursor-pointer mt-6"
            >
              View All
            </Link>
          )}
        </div>

        {/* Mobile: horizontal scroll carousel / Desktop: grid */}
        <div
          ref={scrollRef}
          className={`flex items-start justify-start overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:overflow-x-visible md:gap-6 md:pb-0 ${colsClass} [&::-webkit-scrollbar]:hidden`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {visibleProducts.map((product, i) => (
            <div
              key={product.id}
              className="w-[40vw] sm:w-[45vw] md:w-auto flex-shrink-0 snap-start md:flex-shrink"
            >
              {/* Inner wrapper gets animated — transforming the snap-aligned
                  element itself makes the scroller re-snap mid-animation,
                  which made the first card sweep past the padding */}
              <div ref={(el) => (cardsRef.current[i] = el)}>
                <ProductCard product={product} />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Scrollbar Control Bar */}
        <div className="flex md:hidden items-center justify-between gap-3 mt-4 px-2">
          <button
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="text-stone-500 hover:text-black p-1 text-xs font-bold"
          >
            ◀
          </button>
          <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-stone-700 rounded-full transition-all duration-300"
              style={{
                width: `${Math.max(20, Math.min(100, 33 + scrollProgress * 0.5))}%`,
                marginLeft: `${scrollProgress * 0.5}%`,
              }}
            />
          </div>
          <button
            onClick={scrollRight}
            aria-label="Scroll right"
            className="text-stone-500 hover:text-black p-1 text-xs font-bold"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
}
