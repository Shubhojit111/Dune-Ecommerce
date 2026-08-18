import Image from "next/image";
import Link from "next/link";
import Assets from "@/assets/images/Assets";
import HeadTagBtnSmall from "./buttons/HeadTagBtnSmall";
import HeadTagBtn from "./buttons/HeadTagBtn";
import HeaderBtn from "./buttons/HeaderBtn";
import HeaderBtnSmall from "./buttons/HeaderBtnSmall";
import ExploreBtn from "./buttons/ExploreBtn";

export default function FlagshipStoreSection() {
  return (
    <section className="w-full h-fit bg-white py-16 sm:py-20 md:py-18">
      <div className="px-4 sm:px-8 lg:px-14 w-full h-[450px]">
        {" "}
        {/* give this an explicit height */}
        <div className="flex gap-10 lg:gap-10 items-center justify-between w-full h-full">
          {/* LEFT: Image */}
          <div className="relative px-36 h-full w-1/2">
            <div className="h-full relative ">
              <Image
                src={Assets.MultiGridSectionImage3}
                alt="Our Toronto Flagship Store"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* RIGHT: Copy */}
          <div className="w-1/2 p-10">
            <HeadTagBtn text="Visit us" className="!text-black" />
            <HeaderBtnSmall
              text={
                <>
                  Our Toronto Flagship
                  <br />
                  Store
                </>
              }
              className="!leading-[1.15em]"
            />
            <p className="mt-4 text-[15px] sm:text-[13px] text-ink leading-relaxed mb-6 ">
              Come get cozy at our Roncesvalles flagship store and browse
              what&apos;s in style <br /> and in stock.
            </p>
            <div className="space-y-1 mb-6">
              <p className="text-[12.5px] text-ink leading-relaxed">
                Mon—Fri, 10am—8pm
              </p>
              <p className="text-[12.5px] text-ink leading-relaxed">
                Sat—Sun, 10am—9pm
              </p>
            </div>
            <ExploreBtn text="View map" />
          </div>
        </div>
      </div>
    </section>
  );
}
