import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: "tshirts",
    label: "T-SHIRTS",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
    href: "/collections/t-shirts",
  },
  {
    id: "jackets",
    label: "JACKETS",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop",
    href: "/collections/jackets",
  },
  {
    id: "sweatshirts",
    label: "SWEATSHIRTS",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop",
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
