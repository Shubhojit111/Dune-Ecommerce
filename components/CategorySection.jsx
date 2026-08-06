import Assets from "@/assets/images/Assets";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: "tshirts",
    label: "T-SHIRTS",
    image: Assets.Category1,
    href: "/collections/t-shirts",
  },
  {
    id: "jackets",
    label: "JACKETS",
    image: Assets.Category2,
    href: "/collections/jackets",
  },
  {
    id: "sweatshirts",
    label: "SWEATSHIRTS",
    image: Assets.Category3,
    href: "/collections/sweatshirts",
  },
];

export default function CategorySection() {
  return (
    <section className="bg-white px-6 md:px-12 lg:px-14 py-16 md:py-24">
      <div className="w-full mx-auto">
        <div className="mb-12 flex justify-center">
          <h2 className="font-dune text-3xl md:text-5xl tracking-tight uppercase text-ink font-normal text-center">
            SHOP BY CATEGORY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="flex flex-col items-center"
            >
              <div className="hover:scale-y-[1.03] transition-transform duration-500 ease-in-out  relative aspect-square w-full overflow-hidden bg-[#EAEAEA] ">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover object-center "
                />
              </div>
              <h3 className="mt-3 font-dune text-2xl md:text-3xl tracking-wide uppercase text-ink font-normal text-center">
                {cat.label}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
