"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, X, ChevronDown } from "lucide-react";
import HeaderBtn from "@/components/buttons/HeaderBtn";
import ProductCard from "@/components/ProductCard";
import {
  socksProducts,
  toquesProducts,
  linenEdit,
  allNew,
  featuredSlides,
} from "@/data/products";
import SavingsSection from "@/components/SavingsSection";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ALL_PRODUCTS = [
  ...socksProducts,
  ...toquesProducts,
  ...linenEdit,
  ...allNew,
  ...featuredSlides,
];

function parsePrice(price) {
  if (typeof price === "number") return price;
  if (typeof price === "string") {
    const cleaned = price.replace(/[^0-9.]/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Alphabetically: A-Z" },
  { value: "name-desc", label: "Alphabetically: Z-A" },
];

// Derive product type from product data
function getProductType(product) {
  const name = (product.name || "").toLowerCase();
  const handle = (product.handle || "").toLowerCase();
  if (name.includes("sock") || handle.includes("sock")) return "Socks";
  if (name.includes("toque") || handle.includes("toque")) return "Toques";
  if (name.includes("scarf") || handle.includes("scarf")) return "Scarf";
  if (name.includes("coat") || handle.includes("coat")) return "Coats";
  if (name.includes("jacket") || handle.includes("jacket")) return "Jackets";
  if (name.includes("cardigan") || handle.includes("cardigan"))
    return "Cardigans";
  if (name.includes("knit") || handle.includes("knit")) return "Knits";
  if (name.includes("shirt") || handle.includes("shirt")) return "Shirts";
  if (name.includes("short") || handle.includes("short")) return "Shorts";
  if (name.includes("skirt") || handle.includes("skirt")) return "Skirts";
  if (name.includes("tank") || handle.includes("tank")) return "Tanks";
  if (name.includes("midi") || handle.includes("midi")) return "Dresses";
  if (name.includes("cami") || handle.includes("cami")) return "Tops";
  return "Other";
}

// Derive brand from product data
function getBrand(product) {
  if (product.brand) return product.brand;
  // Linen products and allNew -> "Cotton Country" (mock)
  const isLinen = linenEdit.some((p) => p.id === product.id);
  const isNew = allNew.some((p) => p.id === product.id);
  const isFeatured = featuredSlides.some((p) => p.id === product.id);
  if (isLinen || isNew || isFeatured) return "Cotton Country";
  return "Unknown";
}

// Accordion component
function Accordion({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-ink/15">
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between py-3 text-left"
      >
        <span className="text-[13px] uppercase tracking-[0.1em] text-ink/80">
          {title}
        </span>
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className={`text-ink/60 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

export default function SearchPage() {

  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(urlQuery);
  const [sortBy, setSortBy] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);

  // Filter states
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  // Sync local query when URL changes
  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  // Build filter facet counts from search-matched products
  const facets = useMemo(() => {
    if (!query.trim()) return { sizes: [], types: [], brands: [] };
    const q = query.toLowerCase();
    const baseMatch = ALL_PRODUCTS.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.handle?.toLowerCase().includes(q),
    );

    // Sizes (static mock counts since products don't have size data)
    const sizeCounts = ["S", "M", "L", "XL"].map((size) => ({
      label: size,
      count: baseMatch.length,
    }));

    // Product types
    const typeMap = {};
    baseMatch.forEach((p) => {
      const type = getProductType(p);
      typeMap[type] = (typeMap[type] || 0) + 1;
    });
    const typeCounts = Object.entries(typeMap)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count);

    // Brands
    const brandMap = {};
    baseMatch.forEach((p) => {
      const brand = getBrand(p);
      brandMap[brand] = (brandMap[brand] || 0) + 1;
    });
    const brandCounts = Object.entries(brandMap)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count);

    return { sizes: sizeCounts, types: typeCounts, brands: brandCounts };
  }, [query]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    let result = ALL_PRODUCTS.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.handle?.toLowerCase().includes(q),
    );

    // Filter by product type
    if (selectedTypes.length > 0) {
      result = result.filter((p) => selectedTypes.includes(getProductType(p)));
    }

    // Filter by brand
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(getBrand(p)));
    }

    // Filter by size (mock - no size data on products, so no actual filtering)
    // If we had size data we'd filter here

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
  }, [query, sortBy, selectedTypes, selectedBrands, selectedSizes]);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const clearAll = () => {
    setSelectedSizes([]);
    setSelectedTypes([]);
    setSelectedBrands([]);
  };

  
  const sidebarRef = useRef(null);
  const resultsRef = useRef(null);
  const layoutRowRef = useRef(null); // the flex row wrapping both columns

  // Pin the sidebar while scrolling through the results (lg+ only)
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (!sidebarRef.current || !layoutRowRef.current || !resultsRef.current)
        return;

      const NAVBAR_OFFSET = 140; // match your fixed navbar's real height

      ScrollTrigger.create({
        trigger: layoutRowRef.current,
        start: `top ${NAVBAR_OFFSET}px`, // pin when row top reaches navbar offset
        endTrigger: resultsRef.current,
        end: "bottom bottom", // release when results bottom hits viewport bottom
        pin: sidebarRef.current,
        pinSpacing: false, // outer flex child keeps its space; only inner wrapper pins
        invalidateOnRefresh: true,
      });
    });

    // Recalc after layout settles (fonts, images) and on full load
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 200);
    window.addEventListener("load", refresh);

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  // results list height changes (filters, sort, search) -> recalc pin bounds
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 50);
    return () => clearTimeout(t);
  }, [filteredProducts]);

  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <div className="min-h-screen bg-white text-ink">
        {/* Breadcrumbs + Heading */}
        <div className="w-full px-4 sm:px-8 lg:px-14 pt-[140px] sm:pt-36 md:pt-52 pb-8 md:pb-12">
          <nav className="flex items-center justify-center gap-1.5 text-[12px] text-ink/50 mb-6">
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-ink font-medium">Search</span>
          </nav>

          <div className="flex justify-center">
            <HeaderBtn text="Search" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full px-4 sm:px-8 lg:px-14 py-6">
          <div className="max-w-[700px] mx-auto">
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white border border-[#C5C0B7] shadow-sm flex items-center h-12 overflow-hidden transition-all focus-within:border-stone-600">
                <div className="pl-4 text-stone-400">
                  <Search size={20} strokeWidth={1.5} />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="flex-1 h-full px-3 bg-transparent text-[15px] sm:text-[16px] text-[#1E1B17] font-dune placeholder:text-stone-400 outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="px-3 text-stone-400 hover:text-stone-600 transition-colors"
                    aria-label="Clear search"
                  >
                    <X size={18} strokeWidth={1.5} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout: Sidebar + Results */}
        <div className="w-full px-4 sm:px-8 lg:px-14 py-4">
          <div ref={layoutRowRef} className="max-w-[1600px] mx-auto flex gap-8">
            {/* Left Sidebar - Accordion Filters */}
            <div className="w-[240px] flex-shrink-0 hidden lg:block">
              <div ref={sidebarRef}>
              {/* Clear all */}
              {(selectedSizes.length > 0 ||
                selectedTypes.length > 0 ||
                selectedBrands.length > 0) && (
                <button
                  onClick={clearAll}
                  className="text-[12px] underline text-ink/60 hover:text-ink mb-4"
                >
                  Clear all
                </button>
              )}

              {/* Size Accordion */}
              <Accordion title="Size">
                <ul className="flex flex-col gap-2.5">
                  {facets.sizes.map((size) => (
                    <li key={size.label}>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedSizes.includes(size.label)}
                          onChange={() => toggleSize(size.label)}
                          className="accent-ink w-4 h-4"
                        />
                        <span className="text-[13px] text-ink group-hover:text-ink transition-colors flex items-center gap-1.5">
                          {size.label}
                          <span className="text-ink text-[12px]">
                            ({size.count})
                          </span>
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </Accordion>

              {/* Product type Accordion */}
              <Accordion title="Product type">
                <ul className="flex flex-col gap-2.5">
                  {facets.types.map((type) => (
                    <li key={type.label}>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type.label)}
                          onChange={() => toggleType(type.label)}
                          className="accent-ink w-4 h-4"
                        />
                        <span className="text-[13px] text-ink/80 group-hover:text-ink transition-colors flex items-center gap-1.5 capitalize">
                          {type.label.toLowerCase()}
                          <span className="text-ink/40 text-[12px]">
                            ({type.count})
                          </span>
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </Accordion>

              {/* Brand Accordion */}
              <Accordion title="Brand" defaultOpen={true}>
                <ul className="flex flex-col gap-2.5">
                  {facets.brands.map((brand) => (
                    <li key={brand.label}>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand.label)}
                          onChange={() => toggleBrand(brand.label)}
                          className="accent-ink w-4 h-4"
                        />
                        <span className="text-[13px] text-ink/80 group-hover:text-ink transition-colors flex items-center gap-1.5">
                          {brand.label}
                          <span className="text-ink text-[12px]">
                            ({brand.count})
                          </span>
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </Accordion>
              </div>
            </div>

            {/* Right Content - Results */}
            <div ref={resultsRef} className="flex-1 min-w-0">
              {/* Sort + Count bar */}
              <div className="flex items-center justify-between gap-4 mb-8">
                <p className="text-[12px] text-ink/60 font-medium">
                  {query.trim()
                    ? `${filteredProducts.length} ${filteredProducts.length === 1 ? "result" : "results"} for "${query}"`
                    : "Type to search"}
                </p>

                {filteredProducts.length > 0 && (
                  <div className="relative">
                    <button
                      onClick={() => setSortOpen((s) => !s)}
                      className="flex items-center gap-2 text-[12px] uppercase tracking-[0.15em] border rounded-full px-4 py-2.5 font-medium text-ink hover:opacity-70 transition-opacity"
                    >
                      Sort:{" "}
                      {SORT_OPTIONS.find((o) => o.value === sortBy)?.label ||
                        "Featured"}
                    </button>

                    {sortOpen && (
                      <div className="absolute top-full right-0 mt-2 w-[200px] bg-white border border-ink/15 shadow-lg py-2 z-40">
                        {SORT_OPTIONS.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value);
                              setSortOpen(false);
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
                )}
              </div>

              {/* Products grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-sans text-[15px] text-ink/50">
                    {query.trim()
                      ? `No products found for "${query}".`
                      : "Start typing to search for products."}
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
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id || product.handle}
                      product={product}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* <SavingsSection /> */}
      </div>
    </Suspense>
  );
}
