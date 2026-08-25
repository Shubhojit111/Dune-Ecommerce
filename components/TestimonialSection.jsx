"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Assets from "@/assets/Assets";
import HeaderBtn from "./buttons/HeaderBtn";
import HeaderBtnSmall from "./buttons/HeaderBtnSmall";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sharon S.",
    location: "New Orleans, LA",
    avatar: Assets.Tooque1,
    quote: "Arrived fast and beautifully boxed. They even let me model on their site :)",
    rating: 5,
  },
  {
    id: 2,
    name: "Matt C.",
    location: "Montreal, QC",
    avatar: Assets.Tooque2,
    quote: "Couldn't be happier with the service I received from this company.",
    rating: 5,
  },
  {
    id: 3,
    name: "Leslie M.",
    location: "Toronto, ON",
    avatar: Assets.Tooque3,
    quote: "Couldn't be happier with the service I received from this company.",
    rating: 5,
  },
  {
    id: 4,
    name: "Rachel K.",
    location: "Brooklyn, NY",
    avatar: Assets.Tooque4,
    quote: "The quality is unreal. Washes like new after three months of wear.",
    rating: 5,
  },
  {
    id: 5,
    name: "Daniel P.",
    location: "Vancouver, BC",
    avatar: Assets.Category1,
    quote: "Best customer support I've ever experienced. Thank you!",
    rating: 5,
  },
];

const AUTO_SPEED = 0.6;
const CARD_WIDTH = 480; // must match the fixed width used in TestimonialCard below
const GAP = 16;
const STEP = CARD_WIDTH + GAP;

function Star({ filled }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "#1E1B17" : "none"}
      stroke="#1E1B17"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
      className="inline-block mx-0.5"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function TestimonialSection() {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const offsetRef = useRef(0);
  const rafRef = useRef(null);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const lastTsRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [, forceRender] = useState(0);

  const testimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
  const setWidth = TESTIMONIALS.length * STEP;

  const applyTransform = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
    }

    // figure out which real testimonial is nearest center
    if (containerRef.current) {
      const containerCenter = containerRef.current.getBoundingClientRect().width / 2;
      // position of card i (within the tripled array) relative to track start
      let nearest = { dist: Infinity, idx: 0 };
      for (let i = 0; i < testimonials.length; i++) {
        const cardLeft = i * STEP - offsetRef.current;
        const cardCenter = cardLeft + CARD_WIDTH / 2;
        const dist = Math.abs(cardCenter - containerCenter);
        if (dist < nearest.dist) {
          nearest = { dist, idx: i % TESTIMONIALS.length };
        }
      }
      setActiveIndex((prev) => (prev !== nearest.idx ? nearest.idx : prev));
    }
  }, [testimonials.length]);

  useEffect(() => {
    // start centered in the middle copy so we can wrap seamlessly both directions
    offsetRef.current = setWidth;

    const loop = (ts) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (!draggingRef.current) {
        offsetRef.current += AUTO_SPEED * 60 * dt;
        if (offsetRef.current >= setWidth * 2) offsetRef.current -= setWidth;
        if (offsetRef.current < setWidth) offsetRef.current += setWidth;
      }

      applyTransform();
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [applyTransform, setWidth]);

  const onDown = (e) => {
    draggingRef.current = true;
    const px = e.touches ? e.touches[0].clientX : e.clientX;
    startXRef.current = px;
    startOffsetRef.current = offsetRef.current;
  };

  const onMove = (e) => {
    if (!draggingRef.current) return;
    const px = e.touches ? e.touches[0].clientX : e.clientX;
    const delta = startXRef.current - px;
    let next = startOffsetRef.current + delta;
    if (next >= setWidth * 2) next -= setWidth;
    if (next < setWidth) next += setWidth;
    offsetRef.current = next;
    applyTransform();
  };

  const onUp = () => {
    draggingRef.current = false;
    lastTsRef.current = 0;
  };

  return (
    <section className="w-full bg-gray-200 py-20 sm:py-24 md:py-20 overflow-hidden">
      <div className="px-4 sm:px-8 lg:px-14 w-full text-center mb-16">
        <HeaderBtnSmall text="Hear It From Them" className="text-center" />
      </div>

      {/* Mask */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none touch-pan-y"
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={onUp}
        onMouseLeave={onUp}
        onTouchStart={onDown}
        onTouchMove={onMove}
        onTouchEnd={onUp}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className="flex items-stretch will-change-transform"
          style={{ width: "max-content", gap: `${GAP}px` }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={`${t.id}-${i}`}
              testimonial={t}
              cardIndex={i}
              containerRef={containerRef}
              offsetRef={offsetRef}
            />
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-12">
        {TESTIMONIALS.map((t, i) => (
          <span
            key={t.id}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i === activeIndex ? "bg-ink" : "bg-ink/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, cardIndex, containerRef, offsetRef }) {
  const cardRef = useRef(null);
  const [scale, setScale] = useState(0.86);
  const [opacity, setOpacity] = useState(0.6);
  const rafRef = useRef(null);

  useEffect(() => {
    const update = () => {
      if (cardRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const cardRect = cardRef.current.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        const maxDist = STEP * 1.4;
        const progress = Math.max(0, 1 - distance / maxDist);

        setScale(0.86 + progress * 0.18);
        setOpacity(0.55 + progress * 0.45);
      }
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [containerRef]);

  return (
    <div
      ref={cardRef}
      className="relative flex-shrink-0 w-[85vw] sm:w-[420px] md:w-[600px] rounded-[2px] bg-white p-8 sm:p-10 transition-transform duration-150 ease-out"
      style={{
        transform: `scale(${scale})`,
        opacity,
        zIndex: Math.round(scale * 100),
        boxShadow: `0 ${(scale - 0.86) * 60}px ${(scale - 0.86) * 90}px ${(scale - 0.86) * 30}px rgba(0,0,0,0.1)`,
      }}
    >
      {/* Stars */}
      <div className="text-center mb-5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} filled />
        ))}
      </div>

      {/* Quote */}
      <p className="text-center text-[15px] sm:text-[17px] text-ink/80 leading-relaxed font-medium mb-8">
        {testimonial.quote}
      </p>

      {/* Author */}
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="relative w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] rounded-full overflow-hidden">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover object-center rounded-full"
          />
        </div>
        <div className="text-center">
          <p className="text-[14px] font-bold text-ink">{testimonial.name}</p>
          <p className="text-[12px] text-ink/60 mt-1">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
}