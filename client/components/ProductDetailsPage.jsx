"use client";

import { useState, useRef, useEffect } from "react"; // add useRef, useEffect
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Assets from "@/assets/Assets";
import { useCart } from "@/context/CartContext";
import {
  Truck,
  CheckCircle,
  ChevronDown,
  Percent,
  Star,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Gift,
  Heart,
  Share2,
  Timer,
} from "lucide-react";
import HeaderBtn from "./buttons/HeaderBtn";
import HeaderBtnSmall from "./buttons/HeaderBtnSmall";
import HeadTagBtn from "./buttons/HeadTagBtn";
import AddToCart from "./buttons/AddToCart";
import { Icon } from "@iconify/react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExploreBtn from "./buttons/ExploreBtn";

gsap.registerPlugin(ScrollTrigger);

// ---- Demo FAQ data — replace with real content ----
const FAQS = [
  {
    question: "How does the bracelet help?",
    answer:
      "The bracelet is designed to complement your everyday style while bringing a positive and meaningful presence to your routine.",
  },
  {
    question: "How should I wear the bracelet?",
    answer:
      "Wear it comfortably on your wrist. You can use it throughout the day as part of your regular routine.",
  },
  {
    question: "Is the bracelet adjustable?",
    answer:
      "Yes, the bracelet is designed to provide a comfortable fit for most users.",
  },
  {
    question: "How do I take care of it?",
    answer:
      "Keep the bracelet away from excessive moisture, water and perfumes to maintain its finish and appearance.",
  },
];

const THUMBNAILS = [
  Assets.HeroImage1,
  Assets.HeroImage2,
  Assets.HeroImage3,
  Assets.MultiGridSectionImage1,
  Assets.MultiGridSectionImage2,
  Assets.Tooque1,
  Assets.Tooque2,
  Assets.Tooque3,
];

const SPECS = [
  "Double needle cover-stitch on collar to prevent stretch",
  "Garment dyed",
  "Pre-shrunk (except White tees)",
  "Slim straight fit. Size up for looser cut",
  "100% Cotton",
  "Made in USA for Oakland Surf Club",
  "Fabric: 20 singles / 5 oz per yd",
];

const COLORS = [
  { name: "Heather grey", swatch: "#A8A8A8" },
  { name: "Floral print", image: Assets.Tooque1 },
  { name: "Navy", swatch: "#1E3A5F" },
];

const SIZES = ["S", "M", "L", "XL"];

// ---- New static data for the added sections ----
const REVIEWS = [
  {
    name: "Anayaa Kapoor",
    verified: true,
    rating: 5,
    text: "Bracelet ka finish aur look bahut premium hai. Energy bhi kaafi achhi feel hoti hai aur overall ek positive vibe rehti hai.",
    avatar: Assets.HeroImage1,
  },
  {
    name: "Rohit Malhotra",
    verified: true,
    rating: 5,
    text: "Quality is genuinely great for the price. Delivery was quick and packaging felt premium.",
    avatar: Assets.HeroImage2,
  },
  {
    name: "Simran Kaur",
    verified: true,
    rating: 4,
    text: "Loved the fit and finish. Would definitely order again for family and friends.",
    avatar: Assets.HeroImage3,
  },
];

const RELATED_PRODUCTS = [
  {
    name: "Love & Peace Metal Bracelet",
    price: "₹899",
    mrp: "₹1,600",
    image: Assets.MultiGridSectionImage1,
  },
  {
    name: "Love & Peace Metal Bracelet",
    price: "₹899",
    mrp: "₹1,600",
    image: Assets.MultiGridSectionImage2,
  },
  {
    name: "Metal Dhan Yog Bracelet",
    price: "₹899",
    mrp: "₹1,600",
    image: Assets.Tooque1,
  },
];

const CUSTOMER_PHOTOS = [Assets.Tooque2, Assets.Tooque3];

const BENEFITS = [
  {
    title: "Attracts Wealth & Financial Growth",
    text: "Helps you invite money, stability, and new income opportunities.",
  },
  {
    title: "Builds Confidence & Inner Strength",
    text: "Supports you in feeling self-assured, focused, and in control of your goals.",
  },
  {
    title: "Brings Luck & Favourable Outcomes",
    text: "Invites good luck and opportunities in your favour.",
  },
  {
    title: "Promotes Emotional Balance",
    text: "Promotes a calm, positive mindset for everyday life.",
  },
  {
    title: "Supports Career Progress",
    text: "Keeps you motivated, driven, and aligned with your ambitions.",
  },
];

export default function ProductDetailsPage({ product }) {
  const router = useRouter();
  const { addItem, error: cartError } = useCart();

  // Derive product-specific values from the passed product prop (with fallbacks)
  const productId = product?.id || product?.handle || "unknown-product";
  const productName = product?.name || "Camping Hoodie - Heather Grey Quilt";
  const productBrand = product?.brand || "Muttonhead";
  const productPrice = product?.salePrice || product?.price || product?.regularPrice || "Rs. 12,500.00";
  const productImage = product?.image || Assets.Category3;
  const productSecondImage = product?.secondImage || product?.hoverImage || productImage;
  const productColors = product?.colors?.length ? product.colors : COLORS;

  const [mainImage, setMainImage] = useState(productImage);
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState(0);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [questionOpen, setQuestionOpen] = useState(false);
  const [specOpen, setSpecOpen] = useState(false); // new: "Product Specification" accordion (benefits)
  const [specOpen2, setSpecOpen2] = useState(false); // new: "Product Specification" accordion (materials)

  const rowRef = useRef(null);
  const imageColRef = useRef(null);
  const detailsColRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.innerWidth < 768) return;

      ScrollTrigger.create({
        trigger: rowRef.current,
        start: "5% top",
        endTrigger: detailsColRef.current,
        end: "bottom bottom",
        pin: imageColRef.current,
        pinSpacing: true,
        markers: true,
        invalidateOnRefresh: true,
      });

      ScrollTrigger.refresh();
    }, rowRef);

    return () => ctx.revert();
  }, []);

  const [askForm, setAskForm] = useState({ name: "", email: "", message: "" });

  const handleAskSubmit = (e) => {
    e.preventDefault();
    // wire up to your API route / email service here
    console.log(askForm);
  };

  // ---- New local state for the added interactive sections ----
  const [reviewIndex, setReviewIndex] = useState(0);
  const [relatedIndex, setRelatedIndex] = useState(0);
  const [pincode, setPincode] = useState("");
  const [deliveryEstimate, setDeliveryEstimate] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const goToReview = (dir) => {
    setReviewIndex((prev) => (prev + dir + REVIEWS.length) % REVIEWS.length);
  };

  const handlePincodeCheck = () => {
    if (!pincode || pincode.trim().length < 4) return;
    // Placeholder estimate logic — wire up to your actual serviceability API.
    setDeliveryEstimate("Usually delivered in 3-5 business days");
  };

  return (
    <section className="w-full min-h-screen pt-[120px] sm:pt-36 md:pt-44 pb-6 lg:pb-10">
      <div className="px-4 sm:px-8 lg:px-14 w-full">
        <div ref={rowRef} className="flex flex-col md:flex-row gap-10 lg:gap-12 items-start w-full min-w-0 lg:mt-12">
          {/* LEFT: Product image */}
          <div ref={imageColRef} className="w-full md:w-[60%] min-w-0 flex-shrink-0">
            {/* Main image */}
            <div className="relative -mx-4 sm:mx-0 w-auto sm:w-auto h-[450px] lg:h-[1000px] bg-sand overflow-hidden mb-5">
              <Image
                src={mainImage}
                alt="Camping Hoodie"
                fill
                className="object-cover object-center"
                priority
              />

              <div className="absolute sm:hidden bottom-4 right-4 p-3 bg-white/80 rounded-full border border-ink/20 flex items-center justify-center">
                <Icon
                  icon="lucide:search"
                  strokeWidth={1}
                  className="h-6 w-6"
                />
              </div>
            </div>

            {/* Thumbnail row */}
            <div className=" flex items-center gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
              {THUMBNAILS.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(src)}
                  className={`relative flex-shrink-0 w-[68px] h-[68px] sm:w-[80px] sm:h-[80px] overflow-hidden bg-sand transition-all duration-200 border-2 ${
                    mainImage === src
                      ? "border-ink"
                      : "border-transparent opacity-80 hover:opacity-100"
                  }`}
                  aria-label={`Thumbnail ${i + 1}`}
                >
                  <Image
                    src={src}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>
          {/* RIGHT: Product details */}
          <div ref={detailsColRef} className="w-full md:w-[40%] min-w-0 flex-1 md:py-2 flex flex-col items-center sm:items-start">
            {/* Breadcrumb */}
            <nav className="text-[11.5px] tracking-wide text-ink mb-3.5">
              <ol className="flex items-center gap-1 flex-wrap">
                <li>
                  <Link href="/" className="text-ink font-medium">
                    Home
                  </Link>
                </li>
                <li className="">/</li>
                <li>
                  <Link
                    href="/collections/all"
                    className="text-ink font-medium"
                  >
                    Collections
                  </Link>
                </li>
                <li className="">/</li>
                <li>
                  <Link
                    href="/collections/sweatshirts"
                    className="text-ink font-medium"
                  >
                    Sweatshirts
                  </Link>
                </li>
                {/* <li className="">/</li> */}
              </ol>
            </nav>
            <HeadTagBtn
              text={productBrand}
              className="!text-ink !font-medium tracking-[0.3em] mb-2 sm:mb-0"
            />

            <HeaderBtnSmall
              text={productName}
              className="w-full text-center sm:text-start !leading-[1.2]"
            />
            <p className=" sm:text-[14.5px] text-ink/80 font-normal mt-6 mb-6">
              {productPrice}
            </p>

            {/* Size */}
            <div className="mb-8 text-center flex flex-col items-center sm:items-start">
              <p className="mb-3 text-[13px] sm:text-[11.5px] tracking-[0.05em] text-ink/80 font-medium">
                <span className="tracking-[0.22em]">SIZE</span>
                &nbsp;— Size chart
              </p>
              <div className="flex gap-1.5 items-center justify-center">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-3 sm:py-2.5 sm:px-3.5 leading-none border text-[14px] sm:text-[13px] font-normal tracking-wide transition-all duration-200 w-fit h-fit ${
                      selectedSize === size
                        ? "border-ink/80 border-2"
                        : "border-ink/30"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mb-8 text-center flex flex-col items-center">
              <p className="mb-3 text-[13px] sm:text-[11.5px] tracking-[0.05em] text-ink/80 font-medium">
                <span className="tracking-[0.22em] text-[11.5px]">COLOR</span>
                &nbsp;— Heather grey
              </p>
              <div className="flex items-center gap-4">
                {COLORS.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    aria-label={c.name}
                    className={`relative w-10 h-10 rounded-full p-[2px] transition-all ${
                      selectedColor === i
                        ? "ring-2 ring-offset-2 ring-ink rounded-full"
                        : "ring-2 ring-offset-2 ring-ink/10 rounded-full"
                    }`}
                  >
                    {c.image ? (
                      <Image
                        src={c.image}
                        alt={c.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <span
                        className="block w-full h-full rounded-full border border-black/10"
                        style={{ backgroundColor: c.swatch }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Shipping + stock status */}
            <div className="space-y-2 mb-8">
              <div className="flex items-center gap-3 text-[12px] text-ink/70 font-medium">
                <Truck className="text-ink/70 h-6 w-6 sm:h-4 sm:w-4" />
                <span className="text-[14px] sm:text-[12px]">
                  Free worldwide shipping
                </span>
              </div>
              <div className="flex items-center gap-3 text-[13px] text-ink/70 font-medium">
                <CheckCircle className="text-green-600 h-6 w-6 sm:h-4 sm:w-4" />
                <span className="text-[14px] sm:text-[12px]">
                  In stock, ready to ship
                </span>
              </div>
            </div>

            {/* ===== NEW: Monsoon Special Sale Offer banner ===== */}
            <div className="w-full mb-6 rounded-2xl bg-[#E6DCD2] border border-ink/10 p-3.5">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center p-1.5 rounded-full bg-black">
                    <Percent className="h-3.5 w-3.5 text-white" />
                  </span>
                  <span className="text-[13px] sm:text-[15px] font-medium text-ink">
                    Monsoon Special Sale Offer
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-white bg-[#775C42] rounded-full px-3.5 py-1.5">
                  Save ₹500
                </span>
              </div>
              <button className="w-full py-3.5 rounded-full bg-ink text-cream text-[12px] uppercase tracking-[0.25em] font-bold hover:bg-ink/90 transition-all duration-300">
                View Offer
              </button>
            </div>

            {/* ===== NEW: Review carousel ===== */}
            <div className="w-full mb-4 relative rounded-2xl bg-linear-to-r from-white to-[#775C42] border border-ink/10 shadow-[0_1px_10px_rgba(0,0,0,0.04)] px-4 py-6">
              <button
                onClick={() => goToReview(-1)}
                aria-label="Previous review"
                className="absolute left-1 top-1/2 -translate-y-1/2 shadow-sm flex items-center justify-center z-10"
              >
                <ChevronLeft className="h-5 w-5 text-ink" />
              </button>
              <button
                onClick={() => goToReview(1)}
                aria-label="Next review"
                className="absolute right-1 top-1/2 -translate-y-1/2 shadow-sm flex items-center justify-center z-10"
              >
                <ChevronRight className="h-5 w-5 text-ink" />
              </button>

              <div className="px-7">
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={REVIEWS[reviewIndex].avatar}
                      alt={REVIEWS[reviewIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-medium text-ink">
                        {REVIEWS[reviewIndex].name}
                      </span>

                      <CheckCircle className="h-3.5 w-3.5 text-blue-500" />
                    </div>

                    <div className="flex items-start justify-start gap-0.5 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < REVIEWS[reviewIndex].rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-ink/20"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-[12.5px] text-ink/70 leading-relaxed">
                  {REVIEWS[reviewIndex].text}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1.5 mb-8 mx-auto">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewIndex(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === reviewIndex ? "w-4 bg-ink" : "w-1.5 bg-ink/25"
                  }`}
                />
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3 mb-8 w-full">
              {cartError && (
                <p className="text-[12px] text-red-600 text-center mb-1">{cartError}</p>
              )}
              <AddToCart
                product={{
                  id: productId,
                  name: productName,
                  size: selectedSize,
                  color: productColors[selectedColor]?.name || `Color ${selectedColor + 1}`,
                  price: productPrice,
                  image: productImage,
                }}
              />
              <button
                onClick={() => {
                  addItem({
                    id: productId,
                    name: productName,
                    size: selectedSize,
                    color: productColors[selectedColor]?.name || `Color ${selectedColor + 1}`,
                    price: productPrice,
                    image: productImage,
                  });
                  router.push("/cart");
                }}
                className="leading-none py-[18px] w-full bg-ink text-cream rounded-full text-[13px] uppercase tracking-[0.25em] font-bold hover:bg-ink/90 transition-all duration-300"
              >
                Buy it now
              </button>
            </div>

            {/* ===== NEW: Last units left banner ===== */}
            <div className="w-full mb-5 rounded-full bg-[#FBF1E1] border border-[#E9D2A8] py-2 text-center">
              <span className="text-[12.5px] font-semibold text-[#9A5B3B]">
                🛍️🛍️ Last 31 Units Left 🛍️🛍️
              </span>
            </div>

            {/* ===== NEW: Delivery estimate ===== */}
            <div className="w-full mb-5 rounded-2xl bg-gradient-to-br from-[#FCF4E7] to-[#F7E9D2] border border-[#E9D2A8] p-4 sm:p-5">
              <div className="flex items-start gap-3 mb-4">
                <Timer
                  className="h-7 w-7 text-[#D97757] flex-shrink-0 mt-0.5"
                  strokeWidth={1.75}
                />
                <div>
                  <p className="text-[14px] sm:text-[13.5px] font-semibold text-ink leading-tight">
                    Get estimated delivery date
                  </p>
                  <p className="text-[12px] text-ink/55 mt-0.5">
                    Prepaid orders are delivered on priority.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-5">
                <div className="flex-1 flex items-center gap-2 bg-white border border-ink/10 rounded-full px-4 py-3">
                  <MapPin className="h-4 w-4 text-ink/40 flex-shrink-0" />
                  <input
                    type="text"
                    inputMode="numeric"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter your pincode"
                    className="w-full bg-transparent text-[13px] text-ink placeholder:text-ink/40 focus:outline-none"
                  />
                </div>
                <button
                  onClick={handlePincodeCheck}
                  className="px-6 py-3 rounded-full bg-[#A9764F] text-white text-[13px] font-semibold hover:bg-[#96683F] transition-all duration-300 flex-shrink-0"
                >
                  Check
                </button>
              </div>

              {deliveryEstimate && (
                <p className="text-[12px] text-ink/70 mb-4">
                  {deliveryEstimate}
                </p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Gift
                    className="h-6 w-6 text-ink/80 flex-shrink-0"
                    strokeWidth={1.5}
                  />
                  <span className="text-[12px] leading-tight">
                    <span className="block font-semibold text-ink">
                      ₹500 Cashback
                    </span>
                    <span className="block text-ink/55">
                      on all prepaid orders (TnC)
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Truck
                    className="h-6 w-6 text-ink/80 flex-shrink-0"
                    strokeWidth={1.5}
                  />
                  <span className="text-[12px] leading-tight text-right">
                    <span className="block font-semibold text-ink">
                      FREE Shipping
                    </span>
                    <span className="block text-ink/55">on all orders</span>
                  </span>
                </div>
              </div>
            </div>

            {/* ===== NEW: Related products carousel ===== */}
            <div className="w-full min-w-0 mb-10 overflow-hidden">
              <div className="flex w-full min-w-0 gap-3 overflow-x-auto overscroll-x-contain snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {RELATED_PRODUCTS.map((p, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="flex w-[78%] sm:w-[260px] flex-shrink-0 snap-start items-center gap-3 rounded-2xl border border-ink/10 bg-white p-2.5"
                  >
                    <div className="relative h-[64px] w-[64px] flex-shrink-0 overflow-hidden rounded-xl bg-sand">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="64px"
                        className="object-cover object-center"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="mb-1 truncate text-[12.5px] leading-snug text-ink">
                        {p.name}
                      </p>

                      <p className="text-[12.5px] text-ink/80">
                        {p.price}{" "}
                        <span className="text-ink/40 line-through">
                          {p.mrp}
                        </span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-4 mb-6 flex items-center justify-center gap-1.5">
                {RELATED_PRODUCTS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-[6px] w-[6px] rounded-full transition-all ${
                      i === 0 ? "bg-ink" : "bg-ink/15"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              {/* Demo store notice */}
              <p className="text-[12.5px] text-ink/90 leading-relaxed mb-4 italic max-w-[520px]">
                This is a demonstration store. You can purchase products like
                this from{" "}
                <Link href="#" className="underline hover:text-ink">
                  Muttonhead
                </Link>
                .
              </p>

              {/* Specs list */}
              <ul className="space-y-0.5 pl-6 mb-10">
                {SPECS.map((spec, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[12.5px] text-ink"
                  >
                    <span className="mt-[7px] inline-block w-1 h-1 rounded-full bg-ink flex-shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Accordions */}
            <div className="border border-ink/25 w-full">
              {/* Shipping information */}
              <div className="border-b border-ink/15">
                <button
                  onClick={() => setShippingOpen((s) => !s)}
                  className="w-full flex relative items-center justify-center py-4 px-4 text-center"
                >
                  <span className="text-[12px] uppercase tracking-[0.25em] font-normal text-ink text-center">
                    Shipping information
                  </span>
                  <div className="absolute right-4">
                    <ChevronDown
                      size={18}
                      className={`text-ink/60 transition-transform duration-300 ${
                        shippingOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    shippingOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-5 px-4 text-[13px] text-ink/70 leading-relaxed space-y-3">
                      <p>
                        Use collapsible tabs for more detailed information that
                        will help customers make a purchasing decision.
                      </p>
                      <p>
                        Ex: Shipping and return policies, size guides, and other
                        common questions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ask a question */}
              <div className="border-b border-ink/15">
                <button
                  onClick={() => setQuestionOpen((s) => !s)}
                  className="w-full flex relative items-center justify-center py-4 px-4 text-center"
                >
                  <span className="text-[12px] uppercase tracking-[0.25em] font-normal text-ink text-center">
                    Ask a question
                  </span>
                  <div className="absolute right-4">
                    <ChevronDown
                      size={18}
                      className={`text-ink/60 transition-transform duration-300 ${
                        questionOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    questionOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <form onSubmit={handleAskSubmit} className="pb-6 px-4 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-ink/70 mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            value={askForm.name}
                            onChange={(e) =>
                              setAskForm((p) => ({
                                ...p,
                                name: e.target.value,
                              }))
                            }
                            className="w-full border border-ink/25 px-3 py-2.5 text-[13px] text-ink focus:outline-none focus:border-ink/60 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-ink/70 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={askForm.email}
                            onChange={(e) =>
                              setAskForm((p) => ({
                                ...p,
                                email: e.target.value,
                              }))
                            }
                            className="w-full border border-ink/25 px-3 py-2.5 text-[13px] text-ink focus:outline-none focus:border-ink/60 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="mb-5">
                        <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-ink/70 mb-2">
                          Message
                        </label>
                        <textarea
                          value={askForm.message}
                          onChange={(e) =>
                            setAskForm((p) => ({
                              ...p,
                              message: e.target.value,
                            }))
                          }
                          rows={5}
                          className="w-full border border-ink/25 px-3 py-2.5 text-[13px] text-ink resize-y focus:outline-none focus:border-ink/60 transition-colors"
                        />
                      </div>

                      <div className="flex justify-center mb-4">
                        <ExploreBtn text="Send" />
                      </div>

                      <p className="text-center text-[11px] text-ink/50 leading-relaxed">
                        This site is protected by hCaptcha and the hCaptcha{" "}
                        <a href="#" className="underline hover:text-ink/70">
                          Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a href="#" className="underline hover:text-ink/70">
                          Terms of Service
                        </a>{" "}
                        apply.
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 w-full flex items-center justify-center gap-7 text-[13px] text-ink/80 font-medium">
              <button className="flex items-center gap-2 hover:text-ink transition">
                <Icon icon="fa6-brands:facebook" className="h-5 w-5" />

                <span>Share</span>
              </button>
              <button className="flex items-center gap-2 hover:text-ink transition">
                <Icon icon="fa6-brands:twitter" className="h-5 w-5" />
                <span>Share</span>
              </button>
              <button className="flex items-center gap-2 hover:text-ink transition">
                <Icon icon="fa6-brands:pinterest" className="h-5 w-5" />

                <span>Pin it</span>
              </button>
            </div>

            {/* ===== NEW: Loved by customers photo grid ===== */}
            <div className="w-full mt-10">
              <p className="text-center text-[13px] text-ink font-medium mb-4">
                Loved by 15 lakh+ customers
              </p>
              <div className="grid grid-cols-2 gap-3">
                {CUSTOMER_PHOTOS.map((src, i) => (
                  <div
                    key={i}
                    className="relative w-full aspect-square bg-sand overflow-hidden"
                  >
                    <Image
                      src={src}
                      alt={`Customer photo ${i + 1}`}
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute bottom-2 right-2 flex items-center gap-1.5">
                      <button
                        aria-label="Like"
                        className="w-7 h-7 rounded-full bg-white/85 flex items-center justify-center"
                      >
                        <Heart className="h-3.5 w-3.5 text-ink" />
                      </button>
                      <button
                        aria-label="Share"
                        className="w-7 h-7 rounded-full bg-white/85 flex items-center justify-center"
                      >
                        <Share2 className="h-3.5 w-3.5 text-ink" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== NEW: Benefits list ===== */}
            <div className="w-full mt-10 ">
              <div className="w-full">
                {FAQS.map((faq, i) => {
                  const isOpen = openFaq === i;

                  return (
                    <div key={i} className="border-b border-ink/15">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-full flex items-center justify-between gap-4 py-4 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="text-[12.5px] font-semibold text-ink leading-relaxed">
                          {faq.question}
                        </span>

                        <ChevronDown
                          size={16}
                          className={`flex-shrink-0 text-ink/60 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-4 pr-8 text-[12.5px] text-ink/70 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
