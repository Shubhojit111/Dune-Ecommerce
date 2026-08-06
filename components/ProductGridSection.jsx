import Link from "next/link";
import ProductCard from "./ProductCard";

export default function ProductGridSection({
  heading,
  products,
  viewAllHref,
  hasViewAllBtn,
  centeredHeading = true,
  columns = 4,
}) {
  const colsClass =
    columns === 4
      ? "grid-cols-2 md:grid-cols-4"
      : columns === 3
        ? "grid-cols-1 md:grid-cols-3"
        : "grid-cols-2 md:grid-cols-3 lg:grid-cols-5";

  return (
    <section className={`w-full py-16 md:py-24 px-14 bg-[#fff]`}>
      <div className="mx-auto">
        <div
          className={`mb-14 flex flex-col items-center text-center justify-center`}
        >
          <h2
            className={`font-dune text-3xl md:text-5xl tracking-wide uppercase text-ink font-normal text-center`}
          >
            {heading}
          </h2>
          {hasViewAllBtn && (
            <div
              className={`flex items-center justify-center rounded-full px-4 py-2 text-[18px] md:text-[11px] uppercase tracking-[0.25em] font-bold text-black transition-all duration-300 bg-transparent border border-ink/40 hover:border-ink hover:scale-102 cursor-pointer mt-6`}
            >
              View All
            </div>
          )}
        </div>
        <div className={`grid ${colsClass} gap-6 md:gap-6`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
