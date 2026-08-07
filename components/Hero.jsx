"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import ExploreBtn from "./buttons/ExploreBtn";
import Assets from "@/assets/images/Assets";

const SLIDES = [
  {
    id: "slide-1",
    image: Assets.HeroImage1,
    alt: "Hero slide 1",
    eyebrow: "WHERE QUALITY ",
    heading: "MEETS COMFORT",
    subtext: "Premium Essentials In Six New Colorways",
    buttons: [{ text: "Explore Now" }],
  },
  {
    id: "slide-2",
    image: Assets.HeroImage2,
    alt: "Every thread tells a story",
    eyebrow: "EVERY THREAD",
    heading: "TELLS A STORY",
    subtext: "Premium Essentials In Six New Colorways",
    buttons: [{ text: "Shop Collection" }],
  },
  {
    id: "slide-3",
    image: Assets.HeroImage3,
    alt: "Premium essentials - where quality meets comfort",
    eyebrow: "Season 2024",
    heading: "COZY UP IN STYLE",
    subtext: "Premium essentials in six new colorways",
    buttons: [{ text: "Shop Tops" }, { text: "View All" }],
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const slideRefs = useRef([]);
  const timelineRef = useRef(null);
  const autoplayRef = useRef(null);

  const SLIDE_DURATION = 6;

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateSlide(0, true);
    }, sectionRef);

    return () => {
      ctx.revert();
      clearAutoplay();
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, []);

  const clearAutoplay = () => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const startAutoplay = () => {
    clearAutoplay();
    autoplayRef.current = setTimeout(() => {
      goToNext();
    }, SLIDE_DURATION * 1000);
  };

  const goToNext = () => {
    setActive((prev) => {
      const next = (prev + 1) % SLIDES.length;
      animateSlide(next, false);
      return next;
    });
  };

  const animateSlide = (index, isFirst) => {
    const el = slideRefs.current[index];
    if (!el) return;

    const imageWrap = el.querySelector("[data-hero-image]");
    const eyebrow = el.querySelector("[data-hero-eyebrow]");
    const heading = el.querySelector("[data-hero-heading]");
    const subtext = el.querySelector("[data-hero-subtext]");
    const buttons = el.querySelector("[data-hero-buttons]");

    if (timelineRef.current) timelineRef.current.kill();

    // bring incoming slide to front, push others back
    gsap.set(el, { zIndex: 10 });
    slideRefs.current.forEach((otherEl, i) => {
      if (otherEl && i !== index) gsap.set(otherEl, { zIndex: 1 });
    });

    const tl = gsap.timeline();
    timelineRef.current = tl;

    gsap.set(el, { autoAlpha: 1 });

    if (isFirst) {
      gsap.set(imageWrap, { x: "0vw", autoAlpha: 1 });
    } else {
      // starts 30% in from the left edge of the viewport, slides to fill the screen
      gsap.set(imageWrap, { x: "25vw", autoAlpha: 0 });
      tl.to(imageWrap, {
        x: "0vw",
        autoAlpha: 1,
        duration: 0.8,
        ease: "power2.out",
      });
    }

    gsap.set([eyebrow, heading, subtext, buttons].filter(Boolean), {
      autoAlpha: 0,
    });
    gsap.set([eyebrow, subtext].filter(Boolean), { y: 20 });
    if (heading) gsap.set(heading, { y: 40 });

    // strictly sequential: each element waits for the previous to finish
    tl.to(heading, {
      y: 0,
      autoAlpha: 1,
      duration: 1,
      delay:0,
      ease: "power2.out",
    })
      .to([eyebrow, subtext].filter(Boolean), {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        delay:0,
        ease: "power2.out",
      })
      .to(buttons, {
        autoAlpha: 1,
        duration: 0.9,
        delay:0,
        ease: "power2.out",
        stagger: 1,
      });

    startAutoplay();
  };

  return (
    <section ref={sectionRef} className="relative">
      <div className="relative h-screen min-h-[680px] w-full overflow-hidden bg-white">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            ref={(node) => (slideRefs.current[index] = node)}
            className="absolute inset-0"
            style={{ visibility: index === 0 ? "visible" : "hidden" }}
          >
            <div data-hero-image className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/15" />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white pt-16 borderr">
              {slide.eyebrow && (
                <p
                  data-hero-eyebrow
                  className="text-[12px] md:text-[13px] uppercase tracking-[0.25em] font-semibold text-white/90 "
                >
                  {slide.eyebrow}
                </p>
              )}
              {slide.heading && (
                <h1
                  data-hero-heading
                  className="mt-2.5 mb-4 font-dune text-5xl sm:text-6xl md:text-[75px] tracking-tight uppercase leading-none font-normal text-white drop-shadow-sm"
                >
                  {slide.heading}
                </h1>
              )}
              {slide.subtext && (
                <p
                  data-hero-subtext
                  className="mb-8 text-sm md:text-base text-white/90 max-w-md font-semibold tracking-[0.08em]"
                >
                  {slide.subtext}
                </p>
              )}
              <div data-hero-buttons className="flex gap-4">
                {slide.buttons.map((btn, i) => (
                  <ExploreBtn key={i} text={btn.text} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
