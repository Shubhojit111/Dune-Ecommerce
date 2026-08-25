"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDownIcon,
  Link2,
  ChevronDown,
} from "lucide-react";
import HeaderBtn from "./buttons/HeaderBtn";
import gsap from "gsap";
import Assets from "@/assets/Assets";
import Image from "next/image";
import SubTextBtn from "./buttons/SubTextBtn";

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

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // ✅ NEW
  const [activeMenu, setActiveMenu] = useState(null);
  const dropdownRef = useRef(null);
  const shopItemsRef = useRef([]);
  const brandColsRef = useRef([]);
  const closeTimeout = useRef(null);
  const mobileDrawerRef = useRef(null);
  const mobileMenuItemsRef = useRef([]);
  const mobileExtraRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ GSAP ANIMATION (open + close smooth)
  useEffect(() => {
    if (!dropdownRef.current) return;

    const el = dropdownRef.current;

    if (activeMenu) {
      gsap.killTweensOf(el);

      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
      );

      if (activeMenu === "Shop") {
        gsap.fromTo(
          shopItemsRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.5,
            ease: "power3.out",
          },
        );
      }

      if (activeMenu === "Shop by Brand") {
        gsap.fromTo(
          brandColsRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.5,
            ease: "power3.out",
          },
        );
      }
    } else {
      gsap.to(el, {
        y: 20,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      });
    }
  }, [activeMenu]);

  // ✅ MOBILE DRAWER GSAP ANIMATION
  useEffect(() => {
    if (mobileOpen) {
      const tl = gsap.timeline();

      if (mobileDrawerRef.current) {
        gsap.set(mobileDrawerRef.current, { xPercent: 100 });
        tl.to(mobileDrawerRef.current, {
          xPercent: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      }

      tl.fromTo(
        mobileMenuItemsRef.current.filter(Boolean),
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.2"
      );

      tl.fromTo(
        mobileExtraRef.current.filter(Boolean),
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.45,
          ease: "power3.out",
        },
        "-=0.2"
      );
    } else if (mobileDrawerRef.current) {
      gsap.to(mobileDrawerRef.current, {
        xPercent: 100,
        duration: 0.35,
        ease: "power2.in",
      });
    }
  }, [mobileOpen]);

  const navItems = [
    { label: "Shop", href: "/collections/all", hasDropdown: true },
    { label: "New Arrivals", href: "/collections/new" },
    { label: "Best Sellers", href: "/collections/best-sellers" },
    { label: "Shop by Brand", href: "/collections/brands", hasDropdown: true, hasAccent: true },
    { label: "Theme Features", href: "/theme-features", hasDropdown: true, hasAccent: true },
  ];

  const navbarBg = scrolled
    ? "bg-white/95 backdrop-blur-md border-b border-stone-200 text-[#1E1B17] shadow-sm"
    : "bg-transparent text-white";

  const addressRowState = scrolled
    ? "max-h-0 py-0 border-b-0 opacity-0 pointer-events-none"
    : "max-h-12 py-2.5 border-b opacity-100";

  const addressRowBg = scrolled
    ? "bg-[#1E1B17] text-white/90"
    : "bg-transparent text-white/90";

  const mainNavbarPadding = scrolled ? "py-4 sm:py-6" : "py-8";

  return (
    <header
      className={`fixed w-full top-0 z-40 transition-colors duration-300 ${navbarBg}`}
    >
      {/* Row 1  Announcement Bar */}
      <div
        className={`text-[11px] font-medium tracking-[0.1em] py-2.5 px-4 sm:px-8 lg:px-14 text-center select-none transition-colors duration-300 bg-[#785C43] 
          ${scrolled ? "hidden sm:block" : ""}
          `}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 text-[10px] text-white">
          <span className="uppercase font-semibold">HASSLE-FREE RETURNS</span>
          <span className="opacity-90 tracking-[0.08em]">
            30-day postage paid returns
          </span>
        </div>
      </div>

      {/* Row 2  Address / Socials / Currency (lg+) */}
      <div
        className={`hidden lg:flex items-center justify-between mx-4 sm:mx-8 lg:mx-14 overflow-hidden text-[12px] transition-all duration-300 border-b-white ${addressRowState} ${addressRowBg}`}
      >
        <div className="flex items-center font-normal tracking-wide">
          <span>337 Roncesvalles Ave, Toronto</span>
        </div>
        <div className="flex items-center gap-16">
          <div className="flex items-center gap-2">
            <button
              aria-label="Instagram"
              className="hover:opacity-75 transition"
            >
              <Link2 width={20} height={20} />
            </button>
            <button
              aria-label="Facebook"
              className="hover:opacity-75 transition"
            >
              <Link2 width={20} height={20} />
            </button>
            <button
              aria-label="Pinterest"
              className="hover:opacity-75 transition"
            >
              <Link2 width={20} height={20} />
            </button>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:opacity-75 transition font-bold tracking-wide">
            <span className="text-[14px]">India (INR)</span>
            <ChevronDown width={12} height={12} />
          </div>
        </div>
      </div>

      {/* Row 3  Main Navbar */}
      <div
        className={`flex items-center justify-between px-5 sm:px-6 md:px-10 lg:px-14 ${mainNavbarPadding}`}
      >
        {/* Left */}
        <div className="flex items-center gap-4">
          <HeaderBtn text={"DUNE"} className="!text-[28px] sm:!text-[34px] !mt-0 !mb-0" />
        </div>

        {/* Center */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onMouseEnter={() => {
                if (!item.hasDropdown) return;
                clearTimeout(closeTimeout.current);
                setActiveMenu(item.label);
              }}
              onMouseLeave={() => {
                if (!item.hasDropdown) return;
                closeTimeout.current = setTimeout(() => {
                  setActiveMenu(null);
                }, 180);
              }}
              className="text-xs lg:text-[22px] font-dune tracking-[0.015em] flex items-center gap-1 font-normal hover:opacity-70 transition-opacity duration-200"
            >
              {item.label}
              {item.hasDropdown && (
                <ChevronDownIcon
                  width={12}
                  height={12}
                  className="opacity-80"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4 sm:gap-5 lg:gap-6">
          <button
            aria-label="Search"
            className="hover:opacity-70 transition p-1"
          >
            <Search size={22} strokeWidth={1.5} />
          </button>
          <button
            className="lg:hidden p-1 hover:opacity-70 transition"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative hover:opacity-70 transition p-1"
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
          </Link>
          <Link
            href="/account"
            aria-label="Account"
            className="hidden sm:block hover:opacity-70 transition p-1"
          >
            <User size={22} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
      {/* ✅ GLOBAL DROPDOWN (NO LAYOUT CHANGE) */}
      <div
        ref={dropdownRef}
        className={`absolute left-0 top-full w-full bg-white text-black shadow-xl px-11 pt-5 pb-8 z-50 will-change-transform ${
          activeMenu ? "pointer-events-auto" : "pointer-events-none hidden"
        }`}
        onMouseEnter={() => clearTimeout(closeTimeout.current)}
        onMouseLeave={() => {
          closeTimeout.current = setTimeout(() => {
            setActiveMenu(null);
          }, 180);
        }}
      >
        {/* SHOP */}
        {activeMenu === "Shop" && (
          <div className="flex justify-between gap-16">
            {/* LEFT: 3 IMAGE CARDS */}
            <div className="flex gap-8">
              {[
                {
                  title: "APPAREL",
                  img: Assets.HeroImage1,
                  links: ["Sweatshirts", "T-Shirts", "Shirts", "Jeans", "Hats"],
                },
                {
                  title: "OUTERWEAR",
                  img: Assets.HeroImage2,
                  links: ["Jackets", "Vests", "Rain gear"],
                },
                {
                  title: "ACCESSORIES",
                  img: Assets.HeroImage3,
                  links: ["Socks", "Hats"],
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  ref={(el) => (shopItemsRef.current[i] = el)}
                  className="opacity-0 translate-y-10 w-[210px]"
                >
                  {/* IMAGE */}
                  <div className="w-full h-[320px] overflow-hidden mb-6">
                    <Image
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Brand */}
                  <p className="mt-1 text-[12px] uppercase tracking-[0.3em] text-[#121212] font-black mb-3.5">
                    {item.title}
                  </p>

                  {/* LINKS */}
                  <ul className="flex flex-col gap-[10.5px] text-black/80">
                    {item.links.map((link) => (
                      <li
                        key={link}
                        className="text-[#1c1c1c] text-[11px] font-semibold tracking-[0.8px] flex flex-col"
                      >
                        {link}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* RIGHT: PROMO IMAGE */}
            <div
              ref={(el) => (shopItemsRef.current[3] = el)}
              className="opacity-0 translate-y-10 w-[460px]"
            >
              <div className="w-full h-[480px] overflow-hidden mb-2">
                <Image
                  src={Assets.BigScreenImage}
                  alt="Promo"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="mt-1 text-[12px] uppercase tracking-[0.3em] text-[#121212] font-bold mb-1">
                25% OFF ALL FLANNEL
              </p>
              <p className="text-[#1c1c1c] text-[11px] font-semibold tracking-[0.8px]">
                Shop flannel shirts collection. Softest organic cotton and new
                patterns.
              </p>
            </div>
          </div>
        )}

        {/* BRAND */}
        {activeMenu === "Shop by Brand" && (
          <div className="flex justify-between gap-16">
            <div className="w-full flex items-center justify-start">
              <div className="mx-auto h-full">
                {[
                  {
                    title: "MUTTONHEAD",
                  },
                  {
                    title: "NAKED AND FAMOUS",
                  },
                  {
                    title: "JUNIPER RUDGE",
                  },
                  {
                    title: "BATHER",
                  },
                  {
                    title: "BESIDE",
                  },
                ].map((item, i) => (
                  <div
                    key={item.title}
                    className="flex flex-col items-start justify-start mb-[10.5px]"
                  >
                    <p className="text-[12px] text-left uppercase tracking-[0.21em] text-[#121212] font-black ">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="h-[270px] w-[470px] ">
                <Image
                  src={Assets.BigScreenImage}
                  alt="Brand1"
                  className="w-full h-full object-cover"
                />
              </div>
              <HeaderBtn text="BOGO" className="!text-[36px] !text-bold" />
              <SubTextBtn
                text="Shop All Brands for your fashion from us"
                className="!text-black"
              />
            </div>
          </div>
        )}
      </div>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div
            ref={mobileDrawerRef}
            className="relative w-[85%] max-w-[400px] bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto px-7 pt-10 pb-10"
          >
            {/* Close Button - Top Right */}
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 text-ink hover:opacity-70 transition"
                aria-label="Close menu"
              >
                <X size={34} strokeWidth={1.2} />
              </button>
            </div>

            {/* Top Divider */}
            <div className="w-full border-t border-ink/60 mb-2" />

            {/* Nav Menu */}
            <nav className="flex flex-col">
              {navItems.map((item, i) => {
                const isOpen = mobileDropdown === item.label;
                return (
                  <div
                    key={item.label}
                    ref={(el) => (mobileMenuItemsRef.current[i] = el)}
                    className="opacity-0 border-b border-ink/60"
                  >
                    {item.hasDropdown ? (
                      <button
                        onClick={() =>
                          setMobileDropdown(isOpen ? null : item.label)
                        }
                        className={`w-full flex items-center justify-between py-5 ${
                          item.hasAccent ? "relative pl-6" : ""
                        }`}
                      >
                        {item.hasAccent && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-8 bg-ink/50" />
                        )}
                        <span className="font-dune text-[28px] sm:text-[32px] tracking-wide text-ink font-normal">
                          {item.label}
                        </span>
                        <ChevronDown
                          className={`text-ink/70 flex-shrink-0 ml-2 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          size={24}
                          strokeWidth={1.2}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`w-full flex items-center justify-between py-5 ${
                          item.hasAccent ? "relative pl-6" : ""
                        }`}
                      >
                        {item.hasAccent && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-8 bg-ink/50" />
                        )}
                        <span className="font-dune text-[28px] sm:text-[32px] tracking-wide text-ink font-normal">
                          {item.label}
                        </span>
                      </Link>
                    )}
                  </div>
                );
              })}

              {/* Login Item */}
              <div
                ref={(el) => (mobileMenuItemsRef.current[navItems.length] = el)}
                className="opacity-0 border-b border-ink/60"
              >
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center gap-3 py-5"
                >
                  <User
                    size={30}
                    strokeWidth={1.2}
                    className="text-ink/80 flex-shrink-0"
                  />
                  <span className="font-dune text-[28px] sm:text-[32px] tracking-wide text-ink font-normal">
                    Log in
                  </span>
                </Link>
              </div>
            </nav>

            {/* Bottom Section */}
            <div className="mt-10 flex flex-col gap-8">
              {/* Address */}
              <div
                ref={(el) => (mobileExtraRef.current[0] = el)}
                className="opacity-0"
              >
                <p className="font-dune text-[22px] sm:text-[24px] leading-tight text-stone-600">
                  337 Roncesvalles
                </p>
                <p className="font-dune text-[22px] sm:text-[24px] leading-tight text-stone-600 mt-1">
                  Ave, Toronto
                </p>
              </div>

              {/* Social Buttons */}
              <div
                ref={(el) => (mobileExtraRef.current[1] = el)}
                className="opacity-0 grid grid-cols-3 gap-0"
              >
                <div className="flex items-center justify-center py-4 border border-ink/80">
                  <InstagramIcon size={28} />
                </div>
                <div className="flex items-center justify-center py-4 border border-ink/80 border-l-0">
                  <FacebookIcon size={28} />
                </div>
                <div className="flex items-center justify-center py-4 border border-ink/80 border-l-0">
                  <PinterestIcon size={28} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
