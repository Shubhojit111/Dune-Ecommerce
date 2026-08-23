import Image from "next/image";
import Assets from "@/assets/images/Assets";
import HeadTagBtn from "./buttons/HeadTagBtn";
import HeaderBtnSmall from "./buttons/HeaderBtnSmall";
import ExploreBtn from "./buttons/ExploreBtn";

export default function FlagshipStoreSection() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 md:py-18">
      <div className="w-full px-4 sm:px-8 lg:px-14">
        <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-10">

          {/* LEFT: Image */}
          <div className="relative h-[320px] w-full sm:h-[400px] lg:h-[450px] lg:w-1/2 lg:px-36">
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={Assets.MultiGridSectionImage3}
                alt="Our Toronto Flagship Store"
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* RIGHT: Copy */}
          <div className="w-full lg:w-1/2 lg:p-10">
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

            <p className="mt-4 mb-6 text-[15px] leading-relaxed text-ink sm:text-[13px]">
              Come get cozy at our Roncesvalles flagship store and browse
              what&apos;s in style and in stock.
            </p>

            <div className="mb-6 space-y-1">
              <p className="text-[12.5px] leading-relaxed text-ink">
                Mon—Fri, 10am—8pm
              </p>

              <p className="text-[12.5px] leading-relaxed text-ink">
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