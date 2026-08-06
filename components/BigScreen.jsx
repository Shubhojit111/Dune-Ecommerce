import Image from "next/image";
import Assets from "@/assets/images/Assets";
import React from "react";
import HeadTagBtn from "./buttons/HeadTagBtn";
import HeaderBtn from "./buttons/HeaderBtn";
import SubTextBtn from "./buttons/SubTextBtn";

const BigScreen = () => {
  return (
    <div className="relative h-[1606px] w-full mb-24">
      <div className="absolute inset-0 -z-10 h-full">
        <Image
          src={Assets.BigScreenImage}
          alt="BigScreen"
          fill
          className="h-full w-full object-contain"
        />
        <div className="absolute inset-0 bg-black/15" />
      </div>

      <div className="h-full w-full flex flex-col justify-center items-start px-14 z-99">
        <HeadTagBtn text="Shop the look" />
        <HeaderBtn
          text="Made to go together"
          className="text-white !text-[56px] !mb-5"
        />
        <SubTextBtn
          text="Pieces that elevate each other, no matter how you style them. Designed to feel effortless every time."
          className="text-white "
        />
      </div>
    </div>
  );
};

export default BigScreen;
