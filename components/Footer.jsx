"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ChevronDown } from "lucide-react";
import Countdown from "react-countdown";
import HeadTagBtn from "./buttons/HeadTagBtn";
import Assets from "@/assets/Assets";

import Image from "next/image";
import { Icon } from "@iconify/react";

/* ------------------------------------------------------------------ */
/*  2. FOOTER (Shopify-style)                                         */
/* ------------------------------------------------------------------ */
const shopLinks = [
  { label: "Apparel", href: "/collections/apparel" },
  { label: "Outerwear", href: "/collections/outerwear" },
  { label: "Accessories", href: "/collections/accessories" },
  { label: "Homegoods", href: "/collections/homegoods" },
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Sale", href: "/collections/sale" },
];
const brandLinks = [
  { label: "Muttonhead", href: "/brands/muttonhead" },
  { label: "Naked and Famous", href: "/brands/naked-and-famous" },
  { label: "Juniper Ridge", href: "/brands/juniper-ridge" },
  { label: "Bather", href: "/brands/bather" },
  { label: "Beside", href: "/brands/beside" },
];
const aboutLinks = [
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const accordionSections = [
    { title: "SHOP", links: shopLinks },
    { title: "BRANDS", links: brandLinks },
    { title: "ABOUT", links: aboutLinks },
  ];

  return (
    <footer className="w-full bg-[#e9e8e6] text-[#1c1c1c]">
      <div className="w-full px-4 sm:px-8 lg:px-14 pt-0 pb-12 md:py-16">
        {/* MOBILE LAYOUT (< lg): Accordions + Centered Logo & Form (Matches Image 4 & 5) */}
        <div className="flex flex-col lg:hidden w-full">
          {/* Accordion List */}
          <div className="w-full border-t border-b border-stone-300">
            {accordionSections.map((sec) => {
              const isOpen = openSection === sec.title;
              return (
                <div
                  key={sec.title}
                  className="border-b border-stone-300 last:border-b-0"
                >
                  <button
                    onClick={() => toggleSection(sec.title)}
                    className="w-full py-4 flex items-center justify-between text-xs tracking-[0.2em] font-semibold text-center uppercase text-[#1c1c1c] transition hover:opacity-70"
                  >
                    <span className="mx-auto pl-5 text-[14px]">
                      {sec.title}
                    </span>
                    {isOpen ? (
                      <ChevronDown
                        className="rotate-180 transition-transform"
                        size={16}
                      />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>

                  {isOpen && (
                    <div className="pb-6 flex flex-col items-center gap-3">
                      {sec.links.map((link, idx) => (
                        <Link
                          key={idx}
                          href={link.href}
                          className="text-[13px] text-[#333333] hover:opacity-70 font-medium tracking-wide transition"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mountains Logo */}
          <div className="flex flex-col items-center justify-center mt-6 mb-6">
            <div className="relative w-[150px] h-[130px]">
              <Image
                src={Assets.FooterLogo}
                alt="Store logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Newsletter Sign up */}
          <div className="w-full text-center max-w-sm mx-auto px-2">
            <h2 className="m-0 text-3xl sm:text-4xl font-dune text-[#1a1a1a] tracking-wide uppercase font-normal">
              SIGN UP &amp; SAVE 15%
            </h2>
            <p className="text-[13px] text-[#1c1c1c] leading-[1.6] mt-4 mb-6 tracking-[0.1px]">
              Be the first to know about our biggest and best sales. We'll never
              send more than one email a month.
            </p>

            <div className="flex items-center justify-between border-b border-[#1c1c1c] pb-2.5 w-full mx-auto my-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="border-none outline-none bg-transparent text-[14px] placeholder:text-[13.5px] placeholder:text-[#333333] text-[#1c1c1c] w-full text-left"
              />
              <button
                aria-label="Subscribe"
                className="bg-transparent border-none cursor-pointer text-[#1c1c1c] p-0 flex-shrink-0"
              >
                <Mail size={22} strokeWidth={1} />
              </button>
            </div>

            <div className="flex justify-center items-center gap-5 mt-6 mb-8">
              <Icon icon="fa6-brands:instagram" className="h-5 w-5" />
              <Icon icon="fa6-brands:facebook" className="h-5 w-5" />
              <Icon icon="fa6-brands:pinterest" className="h-5 w-5" />
            </div>
          </div>

          {/* Country Selector */}
          <div className="flex items-center justify-center gap-2 bg-transparent border-none cursor-pointer text-[12.5px] text-[#1c1c1c] pt-2 pb-4">
            <span className="text-base">🇮🇳</span>
            <span>India (INR ₹)</span>
            <ChevronDown size={14} />
          </div>
        </div>

        {/* DESKTOP LAYOUT (lg+): Multi-column side-by-side */}
        <div className="hidden lg:flex flex-col gap-10">
          <div className="flex w-full h-full justify-between gap-8">
            <div className="flex justify-between w-[38%] gap-6">
              <div className="flex flex-col h-full whitespace-nowrap">
                <HeadTagBtn
                  text="Shop"
                  className="!text-black font-dune !text-[12px] mb-[24px]"
                />
                {shopLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-[#1c1c1c] text-[12.5px] font-normal tracking-[0.7px] flex flex-col mb-3 hover:opacity-70 cursor-pointer"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col h-full whitespace-nowrap">
                <HeadTagBtn
                  text="Brands"
                  className="!text-black font-dune !text-[12px] mb-[24px]"
                />
                {brandLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-[#1c1c1c] text-[12.5px] font-normal tracking-[0.7px] flex flex-col mb-3.5 hover:opacity-70 cursor-pointer"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col h-full whitespace-nowrap">
                <HeadTagBtn
                  text="About"
                  className="!text-black font-dune !text-[12px] mb-[24px]"
                />
                {aboutLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-[#1c1c1c] text-[12.5px] font-normal tracking-[0.7px] flex flex-col mb-3 hover:opacity-70 cursor-pointer"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start justify-start">
              <div className="relative w-[130px] h-[120px]">
                <Image
                  src={Assets.FooterLogo}
                  alt="Store logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="min-w-[39%]">
              <h2 className="m-0 !text-[48px] font-dune text-[#1a1a1a]">
                SIGN UP &amp; SAVE 15%
              </h2>
              <p className="text-[13px] text-[#1c1c1c] leading-[1.6] mt-4 mb-[20px] max-w-[500px] tracking-[0.1px]">
                Be the first to know about our biggest and best sales. We'll
                never send more than one email a month.
              </p>

              <div className="flex items-center justify-between border-b-2 border-[#1c1c1c] pb-2 max-w-[55%]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border-none outline-none bg-transparent text-[14px] placeholder:text-[13px] placeholder:font-normal placeholder:tracking-wider placeholder:text-[#1c1c1c] text-[#1c1c1c] w-full"
                />
                <button
                  aria-label="Subscribe"
                  className="bg-transparent border-none cursor-pointer text-[#1c1c1c]"
                >
                  <Mail size={22} strokeWidth={1} />
                </button>
              </div>

              <div className="flex gap-3 mt-[26px]">
                <Icon icon="fa6-brands:instagram" className="h-6 w-7" />
                <Icon icon="fa6-brands:facebook" className="h-6 w-6" />
                <Icon icon="fa6-brands:pinterest" className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 bg-transparent border-none cursor-pointer text-[12.5px] text-[#1c1c1c] pt-4">
            <span className="text-base">🇮🇳</span>
            <span>India (INR ₹)</span>
            <ChevronDown size={15} />
          </div>
        </div>
      </div>
    </footer>
  );
}
