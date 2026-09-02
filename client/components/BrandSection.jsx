"use client";

import Image from "next/image";
import Assets from "@/assets/Assets";
import HeaderBtn from "./buttons/HeaderBtn";

const brands = [
  {
    image: Assets.BrandLogo1,
    name: "Vanity Fair",
  },
  {
    image: Assets.BrandLogo2,
    name: "Refinery29",
  },
  {
    image: Assets.BrandLogo3,
    name: "Vogue",
  },
  {
    image: Assets.BrandLogo4,
    name: "Marie Claire",
  },
  {
    image: Assets.BrandLogo5,
    name: "Elle",
  },
];

export default function BrandSection() {
  return (
    <section className="bg-white sm:my-24 ">
      <div className="mx-auto w-full px-4 sm:px-8 lg:px-14">
        <div className="grid grid-cols-2 md:flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-14 gap-y-2 sm:gap-y-12 lg:gap-x-16">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className={`group flex items-center justify-center ${
                index === 4 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <Image
                src={brand.image}
                alt={brand.name}
                className="h-[80px] sm:h-[84px] w-auto object-contain opacity-60 transition-all duration-500 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
