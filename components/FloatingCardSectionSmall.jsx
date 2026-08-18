import Image from "next/image";
import Link from "next/link";
import ExploreBtn from "./buttons/ExploreBtn";
import HeadTagBtn from "./buttons/HeadTagBtn";
import HeaderBtn from "./buttons/HeaderBtn";
import SubTextBtn from "./buttons/SubTextBtn";
import Assets from "@/assets/images/Assets";
import HeaderBtnSmall from "./buttons/HeaderBtnSmall";
import HeadTagBtnSmall from "./buttons/HeadTagBtnSmall";

export default function FloatingCardSectionSmall({
  bgImage,
  headerbtnText,
  titleText,
  descriptionText,
  btnText,
}) {
  return (
    <section className="relative w-full mb-12 md:mb-0">
      <div className="relative w-full md:h-screen md:max-h-[700px]">
        {/* Background Image */}
        <div className="sm:absolute inset-0 relative h-[400px] items-center md:h-full  overflow-hidden">
          <Image
            src={bgImage || Assets.Image2}
            alt="Premium essentials - where quality meets comfort"
            fill
            priority
            className="object-cover w-full h-full "
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Card Block: Stacked below on mobile, absolute floating on md+ */}
        <div className="relative md:absolute md:left-14 md:top-12 p-6 sm:p-8 h-fit w-full md:max-w-[380px] items-start justify-center gap-2 sm:gap-1.5 flex bg-white flex-col z-10">
          {headerbtnText && (
            <HeadTagBtnSmall
              text={headerbtnText || "Timeless Craftsmanship"}
              className=""
            />
          )}
          {titleText && (
            <HeaderBtnSmall
              text={titleText || "WILDWOOD ESSENTIALS"}
              className=""
            />
          )}
          {descriptionText && (
            <SubTextBtn
              text={
                descriptionText ||
                "Fierce elegance is about authenticity, refinement, and grace. It's a powerful presence with sophisticated style that creates a commanding aesthetic. Our Wildwood collection embodies timeless craftsmanship and modern sensibility."
              }
              className="!text-stone-700 !leading-relaxed sm:!mb-6 max-w-[90%] sm:max-w-full"
            />
          )}
          {btnText && (
            <ExploreBtn text={btnText || "EXPLORE COLLECTION"} />
          )}
        </div>
      </div>
    </section>
  );
}
