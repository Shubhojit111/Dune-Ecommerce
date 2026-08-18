"use client";

import { useState, useRef, useEffect } from "react"; // add useRef, useEffect
import Image from "next/image";
import Link from "next/link";
import Assets from "@/assets/images/Assets";
import { Truck, CheckCircle, ChevronDown } from "lucide-react";
import HeaderBtn from "./buttons/HeaderBtn";
import HeaderBtnSmall from "./buttons/HeaderBtnSmall";
import HeadTagBtn from "./buttons/HeadTagBtn";
import { Icon } from "@iconify/react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExploreBtn from "./buttons/ExploreBtn";

gsap.registerPlugin(ScrollTrigger);

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

export default function ProductDetailsPage() {
  const [mainImage, setMainImage] = useState(Assets.Category3);
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState(0);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [questionOpen, setQuestionOpen] = useState(false);

  const rowRef = useRef(null); // wraps the flex row containing both columns
  const imageColRef = useRef(null); // the right-side image column

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: rowRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: imageColRef.current,
        pinSpacing: false,
        // markers: true,
      });
    }, rowRef);

    return () => ctx.revert();
  }, []);

  const [askForm, setAskForm] = useState({ name: "", email: "", message: "" });

  const handleAskSubmit = (e) => {
    e.preventDefault();
    // wire up to your API route / email service here
    console.log(askForm);
  };

  return (
    <section className="w-full  min-h-screen pt-32 sm:pt-36 md:pt-40 pb-20">
      <div className="px-4 sm:px-8 lg:px-14 w-full">
        <div className="flex gap-10 lg:gap-12 items-start  mt-12">
          {/* LEFT: Product image */}
          <div className="w-full min-w-[60%]">
            {/* Main image */}
            <div className="relative w-auto h-[1000px] bg-sand overflow-hidden mb-5">
              <Image
                src={mainImage}
                alt="Camping Hoodie"
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Thumbnail row */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
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
          <div className="w-full py-2 ">
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
                <li className="">/</li>
              </ol>
            </nav>
            <HeadTagBtn
              text="Muttonhead"
              className="!text-ink !font-medium tracking-[0.3em]"
            />

            <HeaderBtnSmall
              text={
                <>
                  Camping Hoodie - Heather
                  <br />
                  Grey Quilt
                </>
              }
              className="w-full !leading-[1.2]"
            />
            <p className="text-[14.5px] text-ink/80 font-normal mt-6 mb-8">
              Rs. 12,500.00
            </p>

            {/* Size */}
            <div className="mb-8">
              <p className="mb-3 text-[11.5px] tracking-[0.05em] text-ink/80 font-medium">
                <span className="tracking-[0.22em] text-[11.5px]">SIZE</span>{" "}
                &nbsp;— Size chart
              </p>
              <div className="flex gap-1.5">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 px-3.5 leading-none border text-[13px] font-normal tracking-wide transition-all duration-200 w-fit h-fit ${
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
            <div className="mb-8">
              <p className="mb-3 text-[11.5px] tracking-[0.05em] text-ink/80 font-medium">
                <span className="tracking-[0.22em] text-[11.5px]">COLOR</span>{" "}
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
                <Truck size={17} className="text-ink/70" />
                <span>Free worldwide shipping</span>
              </div>
              <div className="flex items-center gap-3 text-[13px] text-ink/70 font-medium">
                <CheckCircle size={17} className="text-green-600" />
                <span>In stock, ready to ship</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3 mb-8 max-w-full">
              <button className="leading-none py-[18px] w-full border border-ink rounded-full text-[13px] uppercase tracking-[0.25em] font-bold text-ink hover:bg-ink hover:text-cream transition-all duration-300">
                Add to cart
              </button>
              <button className="leading-none py-[18px] w-full bg-ink text-cream rounded-full text-[13px] uppercase tracking-[0.25em] font-bold hover:bg-ink/90 transition-all duration-300">
                Buy it now
              </button>
            </div>

            {/* Demo store notice */}
            <p className="text-[12.5px] text-ink/90 leading-relaxed mb-6 italic max-w-[520px]">
              This is a demonstration store. You can purchase products like this
              from{" "}
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
          </div>
        </div>
      </div>
    </section>
  );
}
