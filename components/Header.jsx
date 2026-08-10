﻿"use client";

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
import Assets from "@/assets/images/Assets";
import Image from "next/image";
import SubTextBtn from "./buttons/SubTextBtn";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✅ NEW
  const [activeMenu, setActiveMenu] = useState(null);
  const dropdownRef = useRef(null);
  const shopItemsRef = useRef([]);
  const brandColsRef = useRef([]);
  const closeTimeout = useRef(null);

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
    };
  }, [activeMenu]);

  const navItems = [
    { label: "Shop", href: "/collections/all", hasDropdown: true },
    { label: "New Arrivals", href: "/collections/new" },
    { label: "Best Sellers", href: "/collections/best-sellers" },
    { label: "Shop by Brand", href: "/collections/brands", hasDropdown: true },
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

  const mainNavbarPadding = scrolled ? "py-6" : "py-8";

  return (
    <header
      className={`fixed w-full top-0 z-40 transition-colors duration-300 ${navbarBg}`}
    >
      {/* Row 1  Announcement Bar */}
      <div
        className={`text-[11px] font-medium tracking-[0.1em] py-2.5 px-14 text-center select-none transition-colors duration-300 bg-[#785C43]`}
      >
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-white">
          <span className="uppercase font-semibold">HASSLE-FREE RETURNS</span>
          <span className="opacity-90 tracking-[0.08em]">
            30-day postage paid returns
          </span>
        </div>
      </div>

      {/* Row 2  Address / Socials / Currency (lg+) */}
      <div
        className={`hidden lg:flex items-center justify-between mx-14 overflow-hidden text-[12px] transition-all duration-300 border-b-white ${addressRowState} ${addressRowBg}`}
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
        className={`flex items-center justify-between px-14 ${mainNavbarPadding}`}
      >
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-1"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          {/* <Link
            href="/"
            className="font-dune text-2xl lg:text-[34px] tracking-[0.01em] font-normal uppercase select-none"
          >
            DUNE
          </Link> */}
          <HeaderBtn text={"DUNE"} className="!text-[34px] !mt-0 !mb-0" />
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
        <div className="flex items-center gap-5 lg:gap-6">
          <Link
            href="/account"
            aria-label="Account"
            className="hidden sm:block hover:opacity-70 transition p-1"
          >
            <User size={20} strokeWidth={1.75} />
          </Link>
          <button
            aria-label="Search"
            className="hover:opacity-70 transition p-1"
          >
            <Search size={20} strokeWidth={1.75} />
          </button>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative hover:opacity-70 transition p-1"
          >
            <ShoppingBag size={20} strokeWidth={1.75} />
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
                  img: Assets.BigScreenImage,
                  links: ["Sweatshirts", "T-Shirts", "Shirts", "Jeans", "Hats"],
                },
                {
                  title: "OUTERWEAR",
                  img: Assets.BigScreenImage,
                  links: ["Jackets", "Vests", "Rain gear"],
                },
                {
                  title: "ACCESSORIES",
                  img: Assets.BigScreenImage,
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
    </header>
  );
}
