"use client";

import React, { useState } from "react";
import { Mail, ChevronDown } from "lucide-react";
import Countdown from "react-countdown";
import HeadTagBtn from "./buttons/HeadTagBtn";
import Assets from "@/public/images/Assets";

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
            <a
              href="#"
              className="jst text-[14.5px] text-[#1c1c1c] no-underline hover:opacity-70"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ children }) {
  return (
    <a
      href="#"
      className="w-[34px] h-[34px] rounded-full border border-[#1c1c1c] flex items-center justify-center text-[#1c1c1c] no-underline hover:bg-[#1c1c1c] hover:text-white transition-colors"
    >
      {children}
    </a>
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
  return (
    <div className="w-full bg-[#e9e8e6] h-[400px] flex">
      <div className="w-full px-14 py-16 flex flex-col">
        <div className="flex w-full h-full justify-between">
          <div className="flex justify-between w-[38%]">
            <div className="flex flex-col h-full whitespace-nowrap">
              <HeadTagBtn
                text="Shop"
                className="!text-black font-dune !text-[12px] mb-[24px]"
              />
              {shopLinks.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="text-[#1c1c1c] text-[12.5px] font-semibold tracking-[0.5px] flex flex-col mb-3"
                  >
                    {item}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col h-full whitespace-nowrap">
              <HeadTagBtn
                text="Brands"
                className="!text-black font-dune !text-[12px] mb-[24px]"
              />
              {brandLinks.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="text-[#1c1c1c] text-[12.5px] font-semibold tracking-[0.5px] flex flex-col mb-3.5"
                  >
                    {item}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col h-full whitespace-nowrap">
              <HeadTagBtn
                text="About"
                className="!text-black font-dune !text-[12px] mb-[24px]"
              />
              {aboutLinks.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="text-[#1c1c1c] text-[12.5px] font-semibold tracking-[0.5px] flex flex-col mb-3"
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col items-center ">
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
                className="jst border-none outline-none bg-transparent text-[14px] placeholder:text-[12px] placeholder:font-semibold placeholder:tracking-wider  placeholder:text-[#1c1c1c] text-[#1c1c1c] w-full"
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
        <div className="flex items-center justify-center gap-2 bg-transparent border-none cursor-pointer text-[12.5px] text-[#1c1c1c]">
          <span className="text-base">🇮🇳</span>
          <span>India (INR ₹)</span>
          <ChevronDown size={15} />
        </div>
      </div>
    </div>
  );
}
