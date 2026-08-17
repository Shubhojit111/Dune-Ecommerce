"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ChevronDown } from "lucide-react";
import Countdown from "react-countdown";
import HeadTagBtn from "./buttons/HeadTagBtn";
import Assets from "@/assets/images/Assets";

import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  2. FOOTER (Shopify-style)                                         */
/* ------------------------------------------------------------------ */
const shopLinks = [
  "Apparel",
  "Outerwear",
  "Accessories",
  "Homegoods",
  "New Arrivals",
  "Sale",
];
const brandLinks = [
  "Muttonhead",
  "Naked and Famous",
  "Juniper Ridge",
  "Bather",
  "Beside",
];
const aboutLinks = [
  "Theme Features",
  "About",
  "FAQ",
  "Contact",
  "Theme Features",
];

function FooterColumn({ title, links }) {
  return (
    <div>
      <div className="jst text-xs tracking-[2px] text-[#5b7a99] font-medium mb-[22px]">
        {title}
      </div>
      <ul className="list-none m-0 p-0">
        {links.map((link, i) => (
          <li key={i} className="mb-3.5">
            <Link
              href="#"
              className="jst text-[14.5px] text-[#1c1c1c] no-underline hover:opacity-70"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ children }) {
  return (
    <Link
      href="#"
      className="w-[34px] h-[34px] rounded-full border border-[#1c1c1c] flex items-center justify-center text-[#1c1c1c] no-underline hover:bg-[#1c1c1c] hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
}
function InstagramIcon({ size = 26 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ size = 26 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14 8.5V7.1c0-.7.5-1.1 1.2-1.1H17V3h-2.6C11.7 3 10 4.7 10 7.2v1.3H8v3h2V21h3.2v-9.5h2.6l.5-3H13.2z" />
    </svg>
  );
}

function PinterestIcon({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0a12 12 0 0 0-4.37 23.17c-.06-.94-.11-2.38.02-3.4.12-.93.8-5.9.8-5.9s-.2-.4-.2-1c0-.94.55-1.64 1.23-1.64.58 0 .86.43.86.96 0 .58-.37 1.46-.56 2.27-.16.68.34 1.24 1.01 1.24 1.21 0 2.14-1.28 2.14-3.12 0-1.63-1.17-2.77-2.84-2.77-1.94 0-3.07 1.45-3.07 2.95 0 .58.22 1.21.5 1.55a.2.2 0 0 1 .05.19c-.05.22-.17.68-.2.78-.03.13-.1.16-.24.1-.9-.42-1.46-1.73-1.46-2.79 0-2.27 1.65-4.36 4.76-4.36 2.5 0 4.44 1.78 4.44 4.16 0 2.48-1.56 4.48-3.74 4.48-.73 0-1.42-.38-1.65-.83l-.45 1.72c-.16.63-.6 1.42-.9 1.9A12 12 0 1 0 12 0z" />
    </svg>
  );
}

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
                <div key={sec.title} className="border-b border-stone-300 last:border-b-0">
                  <button
                    onClick={() => toggleSection(sec.title)}
                    className="w-full py-4 flex items-center justify-between text-xs tracking-[0.2em] font-semibold text-center uppercase text-[#1c1c1c] transition hover:opacity-70"
                  >
                    <span className="mx-auto pl-5 text-[14px]">{sec.title}</span>
                    {isOpen ? <ChevronDown className="rotate-180 transition-transform" size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {isOpen && (
                    <div className="pb-6 flex flex-col items-center gap-3">
                      {sec.links.map((link, idx) => (
                        <Link
                          key={idx}
                          href="#"
                          className="text-[13px] text-[#333333] hover:opacity-70 font-medium tracking-wide transition"
                        >
                          {link}
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
              <InstagramIcon size={24} />
              <FacebookIcon size={24} />
              <PinterestIcon size={24} />
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
                  <div
                    key={index}
                    className="text-[#1c1c1c] text-[12.5px] font-semibold tracking-[0.7px] flex flex-col mb-3 hover:opacity-70 cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-col h-full whitespace-nowrap">
                <HeadTagBtn
                  text="Brands"
                  className="!text-black font-dune !text-[12px] mb-[24px]"
                />
                {brandLinks.map((item, index) => (
                  <div
                    key={index}
                    className="text-[#1c1c1c] text-[12.5px] font-semibold tracking-[0.7px] flex flex-col mb-3.5 hover:opacity-70 cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-col h-full whitespace-nowrap">
                <HeadTagBtn
                  text="About"
                  className="!text-black font-dune !text-[12px] mb-[24px]"
                />
                {aboutLinks.map((item, index) => (
                  <div
                    key={index}
                    className="text-[#1c1c1c] text-[12.5px] font-semibold tracking-[0.7px] flex flex-col mb-3 hover:opacity-70 cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
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
              <p className="text-[13px] text-[#1c1c1c] leading-[1.6] mt-5 mb-[20px] max-w-[500px] tracking-[0.1px]">
                Be the first to know about our biggest and best sales. We'll never
                send more than one email a month.
              </p>

              <div className="flex items-center justify-between border-b-2 border-[#1c1c1c] pb-2 max-w-[55%]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border-none outline-none bg-transparent text-[14px] placeholder:text-[12px] placeholder:font-semibold placeholder:tracking-wider placeholder:text-[#1c1c1c] text-[#1c1c1c] w-full"
                />
                <button
                  aria-label="Subscribe"
                  className="bg-transparent border-none cursor-pointer text-[#1c1c1c]"
                >
                  <Mail size={22} strokeWidth={1} />
                </button>
              </div>

              <div className="flex gap-3 mt-[26px]">
                <InstagramIcon />
                <FacebookIcon />
                <PinterestIcon />
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
