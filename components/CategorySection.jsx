import Assets from "@/assets/Assets";
import Image from "next/image";
import Link from "next/link";
import HeaderBtnSmall from "./buttons/HeaderBtnSmall";


// Every value here must appear literally (not interpolated) so Tailwind's
// build-time scanner picks it up. Extend as needed if you want > 10 cols,
// or different mobile/tablet breakpoints per column count.
const COLS_MAP = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  7: "grid-cols-2 md:grid-cols-4 lg:grid-cols-7",
  8: "grid-cols-2 md:grid-cols-4 lg:grid-cols-8",
  9: "grid-cols-2 md:grid-cols-4 lg:grid-cols-9",
  10: "grid-cols-2 md:grid-cols-5 lg:grid-cols-10",
};

export default function CategorySection({
  buttonText = "SHOP BY CATEGORY",
  categories = [],
  heading = "",
  columns = 4,
  itemsToShow = "all", // number (e.g. 4, 6) to cap items, or "all" / undefined to show everything
  viewAllHref = "",
  hasViewAllBtn = false,
  viewAllBtnText = "VIEW ALL",
  viewAllBtnClassName = "",
}) {
  const colsClass = COLS_MAP[columns] || COLS_MAP[4];

  const visibleCategories =
    itemsToShow === "all" || itemsToShow == null
      ? categories
      : categories.slice(0, Number(itemsToShow));

  return (
    <section className={`bg-white px-4 sm:px-8 lg:px-14 py-16 md:py-24`}>
      <div className="w-full mx-auto">
        {heading && (
          <div className="flex justify-center">
            <HeaderBtnSmall
              text={heading || "SHOP BY CATEGORY"}
              className="!text-stone-900"
            />
          </div>
        )}

        {hasViewAllBtn && (
          <div className="mt-4 flex justify-center">
            <Link
              href={viewAllHref || "/collections/all"}
              className={`flex items-center justify-center rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.25em] font-bold text-black transition-all duration-300 bg-transparent border border-ink/40 hover:border-ink hover:scale-102 cursor-pointer ${viewAllBtnClassName}`}
            >
              {viewAllBtnText}
            </Link>
          </div>
        )}

        <div className={`grid ${colsClass} gap-4 sm:gap-6 md:gap-8 mt-12`}>
          {visibleCategories.map((cat) => (
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
