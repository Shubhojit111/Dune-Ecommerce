"use client";

import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";
import HeaderBtn from "./buttons/HeaderBtn";
import SubTextBtn from "./buttons/SubTextBtn";
import HeaderBtnSmall from "./buttons/HeaderBtnSmall";
import HeadTagBtn from "./buttons/HeadTagBtn";
import ExploreBtn from "./buttons/ExploreBtn";
import Image from "next/image";
import Assets from "@/assets/images/Assets";

function TimeBlock({ value, label, isLast }) {
  return (
    <div
      className={`flex items-center justify-center w-full px-[16px] sm:px-[22px] ${isLast ? "" : "border-r border-white/85"}`}
    >
      <div className="text-center">
        <div className="text-[2px] leading-none font-dune font-normal text-white mb-2.5 tabular-nums">
          <p className="text-[36px] sm:text-[48px] text-white">{String(value)}</p>
        </div>
        <div className="text-[10px] sm:text-[11px] tracking-[1.5px] text-white font-bold">
          {label}
        </div>
      </div>
    </div>
  );
}

export function TimeBannerFullScreen({
  headline = "BLACK FRIDAY SALE",
  subcopy = "Hurry up! Only this weekend, get an additional 30% off your entire order if you spend 120$ or more!",
  targetDate,
  Isbtn = true,
}) {
  const [target, setTarget] = useState(null);

  useEffect(() => {
    setTarget(
      targetDate ||
        new Date(Date.now() + ((1 * 24 + 23) * 60 * 60 + 14 * 60 + 30) * 1000),
    );
  }, [targetDate]);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="relative w-full bg-white mb-8">
      <Image
        src={Assets.TimeBannerProductsBg}
        fill
        alt="Time Banner"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className="relative w-full mx-auto grid grid-cols-1 sm:grid-cols-3 items-center sm:items-center justify-center gap-10 p-10 sm:px-20 py-12 ">
        {/* Left: headline */}
        <div className="flex flex-col gap-5">
          <HeaderBtn
            text="BLACK FRIDAY SALE"
            className="leading-none sm:max-w-full text-white"
          />
          <SubTextBtn text={subcopy} className="" />
        </div>

        <div className="">
          {target ? (
            <Countdown
              date={target}
              renderer={({ days, hours, minutes, seconds, completed }) => (
                <div className="flex items-stretch">
                  <TimeBlock value={completed ? 0 : days} label="DAYS" />
                  <TimeBlock value={pad(completed ? 0 : hours)} label="HOURS" />
                  <TimeBlock
                    value={pad(completed ? 0 : minutes)}
                    label="MINUTES"
                  />
                  <TimeBlock
                    value={pad(completed ? 0 : seconds)}
                    label="SECONDS"
                    isLast
                  />
                </div>
              )}
            />
          ) : (
            <div className="flex items-stretch">
              <TimeBlock value="0" label="DAYS" />
              <TimeBlock value="00" label="HOURS" />
              <TimeBlock value="00" label="MINUTES" />
              <TimeBlock value="00" label="SECONDS" isLast />
            </div>
          )}
        </div>

        <div className="w-full mx-auto text-center"><ExploreBtn text="Shop Collection" /></div>
      </div>
    </div>
  );
}
