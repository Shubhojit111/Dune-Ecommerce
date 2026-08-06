import Image from "next/image";
import Link from "next/link";
import ExploreBtn from "./buttons/ExploreBtn";
import HeaderBtn from "./buttons/HeaderBtn";
import SubTextBtn from "./buttons/SubTextBtn";
import HeadTagBtn from "./buttons/HeadTagBtn";

export default function FeaturedMultiSection() {
  return (
    <section className="bg-white px-6 md:px-12 lg:px-6 py-16 ">
      <div className="w-full mx-auto space-y-6 md:space-y-6">
        {/* Row 1: Two promo boxes side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6">
          {/* Top Left: Iconic Basics */}
          <Link
            href="/collections/iconic-basics"
            className="group relative block lg:min-h-[500px] w-full overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop"
              alt="The Original - Iconic Basics"
              fill
              priority
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
              <HeadTagBtn 
              text="ICONIC BASICS"
              className="text-white"
              />
              <HeaderBtn 
              text="THE ORIGINAL" 
              className="text-white"
              />

              <SubTextBtn 
              text="Timeless pieces that define your wardrobe."
              className="mb-4"
              />
              
              <ExploreBtn text="Discover" />
            </div>
          </Link>

          {/* Top Right: Premium Denim */}
          <Link
            href="/collections/premium-denim"
            className="group relative block lg:min-h-[500px] w-full overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop"
              alt="Crafted Quality - Premium Denim"
              fill
              priority
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute flex flex-col items-end justify-center right-0 bottom-0 px-4 md:px-8 py-8">
              <HeadTagBtn 
              text="PREMIUM DENIM"
              className="text-white"
              />
              <HeaderBtn 
              text="CRAFTED QUALITY" 
              className="text-white"/>
              <SubTextBtn 
              text="Expertly made denim for the discerning customer."
              className="mb-4"
              />
              <ExploreBtn text="Shop now" />
            </div>
          </Link>
        </div>

        {/* Row 2: Full-width store location promo box */}
        <Link
          href="/pages/store-location"
          className="group relative block min-h-[350px] md:min-h-[400px] w-full overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop"
            alt="Experience Our Store"
            fill
            priority
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col items-start justify-end px-4 md:px-6 pb-8 md:p-10 text-left text-white border border-red-600">
            <HeadTagBtn 
            text="VISIT US"
            className="text-white"
            />
            <HeaderBtn text="EXPERIENCE OUR STORE" />
            <SubTextBtn text="337 Roncesvalles Ave, Toronto" className="mb-4" />
            <ExploreBtn text={"GET DIRECTIONS"} />
          </div>
        </Link>
      </div>
    </section>
  );
}
