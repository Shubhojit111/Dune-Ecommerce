"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import Assets from "@/assets/Assets";
import Image from "next/image";
import HeaderBtn from "./buttons/HeaderBtn";
import HeadTagBtn from "./buttons/HeadTagBtn";
import SubTextBtn from "./buttons/SubTextBtn";
import ExploreBtn from "./buttons/ExploreBtn";
export default function PanelSection({
  eyebrow = "",
  title = "",
  copy = "Back in time to save the day. Now available in our signature forest green.",
  ctaLabel = "VIEW COLORS",
  price = "Rs. 15,500.00",
  badge = "New",
  mainImage = "https://placehold.co/900x820/e5e5e3/1c1c1c?text=Product+Image",
  detailImage = "https://placehold.co/300x300/dcdcda/1c1c1c?text=Detail",
  onCtaClick,
}) {
  return (
    <div className="w-full bg-white px-4 sm:px-6">
      <div className="flex flex-col-reverse md:flex-row w-full justify-between items-center gap-8">
        {/* Left copy block */}
        <div className="w-full md:w-[50%] text-black flex flex-col gap-2">
          <HeadTagBtn text="IT'S BACK" className="!text-black" />
          <HeaderBtn text="THE 5-PANEL HAT" />
          <SubTextBtn
            text="Back in time to save the day. Now available in our signature forest green."
            className="!text-black"
          />
          <ExploreBtn text="VIEW COLORS" className="" />
        </div>

        {/* Right image block */}
        <div className="relative w-full md:w-[50%] h-[320px] sm:h-[450px] md:h-[560px] p-2 md:p-4">
          <div className="relative aspect-square w-[70%] sm:w-[75%] ">
            <Image
              src={Assets.PanelMain}
              alt={title || "5-Panel Hat"}
              fill
              className="h-full w-full object-cover"
            />

            {/* New badge */}
            <div className="jst absolute -top-3 -right-3 bg-[#1c1c1c] text-white font-normal text-[11px] sm:text-[12.5px] px-2.5 sm:px-[13px] tracking-wider py-1 z-10">
              {badge}
            </div>

            {/* Price tag */}
            <div className="jst absolute top-4 -right-2 bg-white text-[#1c1c1c] font-normal text-[11px] sm:text-[12.5px] px-2.5 sm:px-[13px] tracking-wider py-1 shadow-md z-10">
              {price}
            </div>
          </div>

          {/* Overlapping detail inset beside main image */}
          <div className="absolute right-0 sm:right-0 top-[60%] sm:top-[25%] md:top-auto md:bottom-14 aspect-square h-[120px] sm:h-[180px] md:h-[220px] shadow-xl overflow-hidden border-4 border-[#f6f6f4] z-20">
            <Image
              src={Assets.PanelSide}
              alt="Detail"
              fill
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
