"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import HeaderBtn from "@/components/buttons/HeaderBtn";
import ProductCard from "@/components/ProductCard";
import {
  toquesProducts,
  linenEdit,
  allNew,
  featuredSlides,
} from "@/data/products";
import ExploreBtn from "@/components/buttons/ExploreBtn";
import Assets from "@/assets/Assets";
import SubTextBtn from "@/components/buttons/SubTextBtn";
import HeaderBtnSmall from "@/components/buttons/HeaderBtnSmall";
import SavingsSection from "@/components/SavingsSection";

// Map category slug -> label
const CATEGORY_MAP = {
  hats: "Hats",
  jackets: "Jackets",
  sweatpants: "Sweatpants",
  apparel: "Apparel",
  outerwear: "Outerwear",
  accessories: "Accessories",
  homegoods: "Homegoods",
  "new-arrivals": "New Arrivals",
  sale: "Sale",
};

// Map category slug -> which product arrays to pull from
const CATEGORY_PRODUCTS = {
  hats: [...toquesProducts],
  jackets: [...allNew, ...linenEdit],
  sweatpants: [...allNew],
  apparel: [...linenEdit, ...featuredSlides],
  outerwear: [...allNew],
  accessories: [...toquesProducts],
  homegoods: [...linenEdit, ...allNew],
  "new-arrivals": [...allNew, ...featuredSlides],
  sale: [...linenEdit],
};

const PRODUCTS_PER_PAGE = 9;

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Alphabetically: A-Z" },
  { value: "name-desc", label: "Alphabetically: Z-A" },
];

// Reusable parsePrice for sorting
function parsePrice(price) {
  if (typeof price === "number") return price;
  if (typeof price === "string") {
    const noCommas = price.replace(/,/g, "");
    const cleaned = noCommas.replace(/[^0-9.]/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

export default function CollectionPage() {
  const params = useParams();
  const slug = params.slug;

  const categoryLabel =
    CATEGORY_MAP[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
  const allProducts = CATEGORY_PRODUCTS[slug] || [
    ...toquesProducts,
    ...linenEdit,
    ...allNew,
    ...featuredSlides,
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");

  // Reset to page 1 when slug changes
  useEffect(() => {
    setCurrentPage(1);
  }, [slug]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Price filter
    if (selectedPriceRange !== "all") {
      const [min, max] = selectedPriceRange.split("-").map(Number);
      result = result.filter((p) => {
        const price = parsePrice(p.salePrice || p.price || p.regularPrice);
        return price >= min && (max ? price <= max : true);
      });
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort(
          (a, b) =>
            parsePrice(a.salePrice || a.price || a.regularPrice) -
            parsePrice(b.salePrice || b.price || b.regularPrice),
        );
        break;
      case "price-desc":
        result.sort(
          (a, b) =>
            parsePrice(b.salePrice || b.price || b.regularPrice) -
            parsePrice(a.salePrice || a.price || a.regularPrice),
        );
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return result;
  }, [allProducts, sortBy, selectedPriceRange]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const PRICE_RANGES = [
    { value: "all", label: "All Prices" },
    { value: "0-100", label: "Under $100" },
    { value: "100-200", label: "$100 - $200" },
    { value: "200-500", label: "$200 - $500" },
    { value: "500-99999", label: "Over $500" },
  ];

  const SIZES = ["S", "M", "L", "XL"];

  return (
    <div className="min-h-screen bg-white text-ink">
      {/* Breadcrumbs + Heading */}
      <div className="w-full px-4 sm:px-8 lg:px-14 pt-[140px] sm:pt-36 md:pt-52 pb-8 md:pb-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center gap-1.5 text-[12px] text-ink/50 mb-6">
          <Link href="/" className="hover:text-ink transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/collections"
            className="hover:text-ink transition-colors"
          >
            Collections
          </Link>
          <span>/</span>
          <span className="text-ink font-medium">{categoryLabel}</span>
        </nav>

        {/* Header button with category name */}
        <div className="flex justify-center">
          <HeaderBtn text={categoryLabel} />
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-14  z-30 bg-white py-4 ">
      {/* Filter / Count / Sort bar */}
        <div className=" mx-auto flex items-center justify-between gap-4 ">
          {/* Filter button */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen((s) => !s)}
              className="flex items-center gap-2 text-[12px] uppercase tracking-[0.15em] border rounded-full px-4 py-2.5 font-medium text-ink hover:opacity-70 transition-opacity"
            >
              <SlidersHorizontal size={16} strokeWidth={1.5} />
              Filter
            </button>

            {/* Filter dropdown */}
            {filterOpen && (
              <div className="absolute top-full left-0 mt-2 w-[240px] bg-white border border-ink/15 shadow-lg p-5 z-40">
                {/* Price filter */}
                <div className="mb-4">
                  <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-ink/70 mb-3">
                    Price
                  </p>
                  <div className="space-y-2">
                    {PRICE_RANGES.map((range) => (
                      <label
                        key={range.value}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="priceRange"
                          value={range.value}
                          checked={selectedPriceRange === range.value}
                          onChange={(e) =>
                            setSelectedPriceRange(e.target.value)
                          }
                          className="accent-ink"
                        />
                        <span className="text-[13px] text-ink">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Size filter */}
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-ink/70 mb-3">
                    Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-3 py-1.5 text-[12px] border transition-colors ${
                          selectedSizes.includes(size)
                            ? "border-ink bg-ink text-white"
                            : "border-ink/30 text-ink hover:border-ink"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedPriceRange("all");
                    setSelectedSizes([]);
                  }}
                  className="mt-4 text-[12px] underline text-ink/60 hover:text-ink"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Product count */}
          <p className="text-[12px]  text-ink/60 font-medium">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "Product" : "Products"}
          </p>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen((s) => !s)}
              className="flex items-center gap-2 text-[12px] uppercase tracking-[0.15em] border rounded-full px-4 py-2.5 font-medium text-ink hover:opacity-70 transition-opacity"
            >
              Sort:{" "}
              {SORT_OPTIONS.find((o) => o.value === sortBy)?.label ||
                "Featured"}
              <ChevronDown
                size={14}
                strokeWidth={1.5}
                className={`transition-transform ${sortOpen ? "rotate-180" : ""}`}
              />
            </button>

            {sortOpen && (
              <div className="absolute top-full right-0 mt-2 w-[200px] bg-white border border-ink/15 shadow-lg py-2 z-40">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setSortOpen(false);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-4 py-2 text-[13px] transition-colors ${
                      sortBy === option.value
                        ? "bg-ink/5 font-medium text-ink"
                        : "text-ink/70 hover:bg-ink/5"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Products grid */}
        <div className="w-full py-10 md:py-6">
          <div className="max-w-[1600px] mx-auto">
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-sans text-[15px] text-ink/50">
                  No products found in this collection.
                </p>
                <Link
                  href="/"
                  className="inline-block mt-4 text-[14px] text-ink underline font-sans"
                >
                  Back to home
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id || product.handle}
                    product={product}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-16">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 flex items-center justify-center border border-ink/20 text-ink disabled:opacity-30 disabled:cursor-not-allowed hover:border-ink transition-colors text-[13px]"
                >
                  ‹
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 flex items-center justify-center border text-[13px] transition-colors ${
                        currentPage === page
                          ? "border-ink bg-ink text-white font-medium"
                          : "border-ink/20 text-ink hover:border-ink"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 flex items-center justify-center border border-ink/20 text-ink disabled:opacity-30 disabled:cursor-not-allowed hover:border-ink transition-colors text-[13px]"
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

       <SavingsSection />
    </div>
  );
}
