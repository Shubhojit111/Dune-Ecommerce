﻿"use client";

import { useState, useEffect } from "react";
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

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <div className={`flex items-center justify-between px-14 ${mainNavbarPadding}`}>
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
          <HeaderBtn text={"DUNE"} className="!text-[34px] !mt-0 !mb-0"/>
        </div>

        {/* Center */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
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

      {/* Mobile Drawer */}
      {/* {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="h-full w-4/5 max-w-xs bg-cream p-6 overflow-y-auto shadow-2xl text-ink"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-taupe/20">
              <span className="font-dune text-2xl tracking-[0.18em]">
                DUNE
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="p-1"
              >
                <X size={22} />
              </button>
            </div>
            <ul className="space-y-6">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-lg font-dune tracking-wide block hover:opacity-70 transition"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )} */}
    </header>
  );
}
