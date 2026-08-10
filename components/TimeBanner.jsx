"use client";

import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";
import HeaderBtn from "./buttons/HeaderBtn";
import SubTextBtn from "./buttons/SubTextBtn";
import HeaderBtnSmall from "./buttons/HeaderBtnSmall";

function TimeBlock({ value, label, isLast }) {
  return (
    <div
      className={`flex items-center justify-center w-full px-[16px] sm:px-[22px] ${isLast ? "" : "border-r border-[#1a1a1a]/85"}`}
    >
      <div className="text-center">
        <div className="text-[2px] leading-none font-dune font-normal text-[#1c1c1c] mb-2.5 tabular-nums">
          <p className="text-[36px] sm:text-[48px]">{String(value)}</p>
        </div>
        <div className="text-[10px] sm:text-[11px] tracking-[1.5px] text-[#121212] font-bold">
          {label}
        </div>
      </div>
    </div>
  );
}

export function TimeBanner({
  headline = "BLACK FRIDAY SALE",
  subcopy = "Only this weekend get an additional 30% Off all Fall & Winter collections.",
  targetDate,
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
    <div className="w-full px-4 sm:px-14 bg-white">
      <div className="w-full bg-[#c3b5a2] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between flex-nowrap gap-10 px-0 sm:px-[140px] py-12">
        {/* Left: headline */}  
        <div className="flex flex-col gap-5 px-10 sm:px-0">
          <HeaderBtn
            text="BLACK FRIDAY SALE"
            className="leading-none sm:max-w-full"
          />
          <SubTextBtn text={subcopy} className="!text-black" />
        </div>

        <div className=" w-full sm:w-fit">
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
      </div>
    </div>
  );
}
