import Image from "next/image";
import Link from "next/link";
import ExploreBtn from "./buttons/ExploreBtn";
import Assets from "@/assets/Assets";

export default function FullBleedSplit() {
  return (
    <section className="w-full bg-white py-0 px-0 my-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-5">
        {/* Left Screen: ELEVATED COMFORT */}
        <Link
          href="/collections/elevated-comfort"
          className="group relative block aspect-[4/5] sm:aspect-auto sm:min-h-[650px] max-h-[750px] w-full overflow-hidden"
        >
          <Image
            src={Assets.FullBleedSplitImage1}
            alt="Elevated Comfort"
            fill
            priority
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/15 group-hover:bg-black/10 transition-colors duration-300" />

          <div className="absolute inset-0 flex flex-col items-start justify-end px-4 md:px-6 pb-8 md:pb-9 text-left text-white">
            <h3 className="font-dune text-4xl sm:text-5xl lg:text-[50px] tracking-tight uppercase font-normal leading-tight drop-shadow-sm">
              ELEVATED COMFORT
            </h3>
            <div className="mt-4">
              <ExploreBtn text="explore" />
            </div>
          </div>
        </Link>

        {/* Right Screen: PREMIUM FLANNEL */}
        <Link
          href="/collections/premium-flannel"
          className="group relative block aspect-[4/5] sm:aspect-auto sm:min-h-[650px] max-h-[750px] w-full overflow-hidden"
        >
          <Image
            src={Assets.FullBleedSplitImage2}
            alt="Premium Flannel"
            fill
            priority
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/15 transition-colors duration-300" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
            <h3 className="font-dune text-4xl sm:text-5xl lg:text-[50px] tracking-tight uppercase font-normal leading-tight drop-shadow-sm">
              PREMIUM FLANNEL
            </h3>
            <p className="mt-3.5 mb-3 text-[12px] text-white/90 font-bold tracking-wider">
              Shop comfy winter essentials
            </p>
            <div className="">
              <ExploreBtn text="shop now" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
