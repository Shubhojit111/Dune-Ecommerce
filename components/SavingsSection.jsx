import React from "react";
import HeaderBtnSmall from "./buttons/HeaderBtnSmall";
import Image from "next/image";
import Assets from "@/assets/Assets";

const SavingsSection = () => {
  return (
    <div className="w-full h-full px-4 sm:px-8 lg:px-14 z-30 bg-white py-4 ">
      <div className="border-2 border-ink h-[250px] w-full flex items-center justify-center  sm:gap-8">
        <div className="left h-full w-auto min-w-[1/2]">
          <Image
            src={Assets.ShopTheLook}
            alt="Shop The Look"
            width={100}
            height={100}
            className="w-auto h-full object-cover rounded-md"
          />
        </div>
        <div className="right w-[1/2] flex flex-col items-center justify-center gap-3">
          <HeaderBtnSmall text="18% IN Savings" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <p
              className={`text-[14px] sm:text-[12px] tracking-wider text-ink leading-relaxed font-normal text-center sm:text-left`}
            >
              Save an additional 18% on all clearance
            </p>
            <button
              className={` text-[11px] md:text-[11.5px] uppercase tracking-[0.2em] text-ink/80  w-fit cursor-pointer`}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsSection;
