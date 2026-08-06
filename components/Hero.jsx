import Image from "next/image";
import Link from "next/link";
import ExploreBtn from "./buttons/ExploreBtn";

export default function Hero() {
  return (
    <section className="relative ">
      <div className="relative h-screen min-h-[680px] w-full overflow-hidden bg-[#5C4A3A]">
        <Image
          src="/images/hero.png"
          alt="Premium essentials - where quality meets comfort"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Subtle Overlay to ensure crisp readability */}
        <div className="absolute inset-0 bg-black/15" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white pt-16">
          <p className="text-[12px] md:text-[13px] uppercase tracking-[0.25em] font-semibold text-white/90">
            Season 2024
          </p>
          <h1 className="mt-2.5 mb-4 font-dune text-5xl sm:text-6xl md:text-[75px] tracking-tight uppercase leading-none font-normal text-white drop-shadow-sm">
            COZY UP IN STYLE
          </h1>
          <p className="mb-8 text-sm md:text-base text-white/90 max-w-md font-semibold tracking-[0.08em]">
            Premium essentials in six new colorways
          </p>
          <div className="flex gap-4">
            <ExploreBtn text="Shop Tops" />
            <ExploreBtn text="View All" />
          </div>
        </div>
      </div>
    </section>
  );
}
