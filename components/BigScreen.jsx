import Image from "next/image";
import Assets from "@/assets/images/Assets";
import React from "react";
import HeadTagBtn from "./buttons/HeadTagBtn";
import HeaderBtn from "./buttons/HeaderBtn";
import SubTextBtn from "./buttons/SubTextBtn";

const BigScreen = () => {
  return (
    <section className="relative w-full mb-12 md:mb-24">
      {/* Container: Stacked on mobile, overlay on desktop */}
      <div className="relative w-full md:h-[800px] lg:h-[1200px] xl:h-[1500px]">
        {/* Image wrapper */}
        <div className="relative aspect-[4.5/5] sm:aspect-square md:absolute md:inset-0 w-full overflow-hidden">
          <Image
            src={Assets.BigScreenImage}
            alt="Shop the look"
            fill
            className="h-full w-full object-cover"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Hotspot buttons on image */}
          <div className="absolute top-[35%] right-[40%] z-20">
            <button
              aria-label="Shop hotspot 1"
              className="w-10 h-10 rounded-full bg-stone-800/60 backdrop-blur-md text-white border border-white/40 flex items-center justify-center shadow-lg hover:scale-110 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </button>
          </div>

          <div className="absolute top-[52%] right-[25%] z-20">
            <button
              aria-label="Shop hotspot 2"
              className="w-10 h-10 rounded-full bg-stone-800/60 backdrop-blur-md text-white border border-white/40 flex items-center justify-center shadow-lg hover:scale-110 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Text content block: stacked below on mobile, overlay on md+ */}
        <div className="relative md:absolute md:inset-0 flex flex-col gap-1.5 sm:gap-3 justify-center items-start px-4 sm:px-8 lg:px-14 py-8 md:py-0 bg-white md:bg-transparent z-10">
          <HeadTagBtn text="SHOP THE LOOK" className="!text-stone-600 md:!text-white" />
          <HeaderBtn
            text="MADE TO GO TOGETHER"
            className="!text-stone-900 md:!text-white"
          />
          <SubTextBtn
            text="Pieces that elevate each other, no matter how you style them. Designed to feel effortless every time."
            className="!text-stone-900 md:!text-white"
          />
        </div>
      </div>
    </section>
  );
};

export default BigScreen;
