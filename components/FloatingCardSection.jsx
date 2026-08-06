import Image from "next/image";
import Link from "next/link";
import ExploreBtn from "./buttons/ExploreBtn";
import HeadTagBtn from "./buttons/HeadTagBtn";
import HeaderBtn from "./buttons/HeaderBtn";
import SubTextBtn from "./buttons/SubTextBtn";
import Assets from "@/assets/images/Assets";

export default function FloatingCardSection() {
  return (
    <section className="relative ">
      <div className="relative h-screen min-h-[690px] w-full overflow-hidden -z-10">
        <Image
          src={Assets.Image2}
          alt="Premium essentials - where quality meets comfort"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Subtle Overlay to ensure crisp readability */}
        <div className="absolute inset-0 bg-black/15" />

        <div className="absolute left-14 top-12 p-8 h-fit w-fit  max-w-[380px] items-start justify-center flex bg-white flex-col z-10 ">
          <HeadTagBtn
            text="Timeless Craftsmanship"
            className="!text-black !mb-0 !tracking-[0.3em]"
          />
          <HeaderBtn
            text={
              <>
                Wildwood <br /> Essentials
              </>
            }
            className="!leading-[60px] !mt-2.5 mb-3"
          />
          <SubTextBtn
            text="Fierce elegance is about authenticity, refinement, and grace. It's a powerful presence with sophisticated style that creates a commanding aesthetic. Our Wildwood collection embodies timeless craftsmanship and modern sensibility."
            className="!text-black !leading-[21px] !tracking-[0.9px] !mb-7 "
          />
          <ExploreBtn text="Explore Collection" />
        </div>
      </div>
    </section>
  );
}
