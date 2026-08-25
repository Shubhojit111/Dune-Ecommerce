import Image from "next/image";
import Link from "next/link";
import Assets from "@/assets/Assets";
import HeaderBtnSmall from "./buttons/HeaderBtnSmall";
import SubTextBtn from "./buttons/SubTextBtn";

const CARDS = [
  {
    image: Assets.JournalImage1,
    title: "Fall 2021 Capsule",
    copy:
      "Our latest cozy looks just in time for fall. Released in time for more trips in the trees.",
    cta: "Shop now",
    href: "/collections/fall-2021",
  },
  {
    image: Assets.JournalImage2,
    title: "Personalize Your Hat",
    copy:
      "You asked and we delivered — we put together a collection of our personalized Muttonhead products.",
    cta: "The Journal",
    href: "/blogs/journal",
  },
  {
    image: Assets.JournalImage3,
    title: "Wildwood Essentials",
    copy:
      "Part of our fall homegoods collection, Wildwood's products are made locally in Ontario.",
    cta: "Shop Homegoods",
    href: "/collections/homegoods",
  },
];

export default function JournalSection() {
  return (
    <section className="w-full bg-white pb-10 sm:py-20 md:py-24">
      <div className="px-4 sm:px-8 lg:px-14 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {CARDS.map((card) => (
            <article key={card.title} className="flex flex-col">
              {/* Image */}
              <Link
                href={card.href}
                className="group relative w-full aspect-[4/5] overflow-hidden block max-h-[350px] md:max-h-[450px]"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </Link>

              {/* Copy */}
              <div className="flex flex-col items-center text-center pt-8 sm:pt-9 pb-2">
                <HeaderBtnSmall text={card.title} className="text-center !text-[36px]" />
                <SubTextBtn text={card.copy} className="text-center !text-ink/80 py-2" />
                <Link
                  href={card.href}
                  className="inline-flex items-center justify-center h-[44px] px-7 border border-ink/40 rounded-full text-[11.5px] uppercase tracking-[0.25em] font-semibold text-ink/80 hover:border-ink hover:bg-ink hover:text-cream transition-all duration-300"
                >
                  {card.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
