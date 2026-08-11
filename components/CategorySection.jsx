import Assets from "@/assets/images/Assets";
import Image from "next/image";
import Link from "next/link";
import HeaderBtnSmall from "./buttons/HeaderBtnSmall";

const defaultCategories = [
  {
    id: "hats",
    label: "HATS",
    image: Assets.Category1,
    href: "/collections/hats",
  },
  {
    id: "jackets",
    label: "JACKETS",
    image: Assets.Category2,
    href: "/collections/jackets",
  },
  {
    id: "sweatpants",
    label: "SWEATPANTS",
    image: Assets.Category3,
    href: "/collections/sweatpants",
  },
  {
    id: "homegoods",
    label: "HOMEGOODS",
    image: Assets.Category1,
    href: "/collections/homegoods",
  },
];

export default function CategorySection({
  buttonText = "SHOP BY CATEGORY",
  categories = defaultCategories,
  containerPadding = "px-4 sm:px-8 lg:px-14",
  sectionPadding = "py-16 md:py-24",
}) {
  return (
    <section className={`bg-white ${containerPadding} ${sectionPadding}`}>
      <div className="w-full mx-auto">
        <div className="mb-12 flex justify-center">
          <HeaderBtnSmall text={buttonText || "SHOP BY CATEGORY"} className="!text-stone-900" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="flex flex-col items-center"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-[#EAEAEA]">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover object-center hover:scale-[1.05] transition-transform duration-500 ease-in-out "
                />
              </div>
              <h3 className="mt-2 sm:mt-4 font-dune text-[30px] sm:text-xl md:text-3xl tracking-wide uppercase text-ink font-normal text-center">
                {cat.label}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
