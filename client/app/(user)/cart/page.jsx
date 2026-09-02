"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useCart, parsePrice, formatPrice } from "@/context/CartContext";
import HeaderBtn from "@/components/buttons/HeaderBtn";
import ProductGridSection from "@/components/ProductGridSection";
import { toquesProducts, linenEdit, allNew } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

export default function CartPage() {
  const router = useRouter();

  const { items, updateQty, removeItem, subtotal, clearCart, hydrated, error } =
    useCart();

  const [note, setNote] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  // Mock coupon codes
  const VALID_COUPONS = {
    DUNE10: { type: "percent", value: 10, label: "10% off" },
    DUNE20: { type: "percent", value: 20, label: "20% off" },
    SAVE500: { type: "fixed", value: 500, label: "Rs. 500 off" },
  };

  const discount = appliedCoupon
    ? appliedCoupon.type === "percent"
      ? Math.round((subtotal * appliedCoupon.value) / 100)
      : appliedCoupon.value
    : 0;

  const total = subtotal - discount;

  const cartRef = useRef(null);
  const summaryRef = useRef(null);

  useEffect(() => {
    if (!hydrated || items.length === 0) return;

    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cartRef.current,
        start: "top 130px",
        endTrigger: cartRef.current,
        end: "bottom bottom",
        pin: summaryRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        // markers: true,
      });
    });

    return () => ctx.revert();
  }, [hydrated, items.length]);

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponError("Enter a coupon code");
      return;
    }
    if (VALID_COUPONS[code]) {
      setAppliedCoupon(VALID_COUPONS[code]);
      setCouponError("");
      setCouponCode("");
    } else {
      setCouponError("Invalid coupon code");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
    setCouponCode("");
  };

  if (!hydrated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="font-sans text-[15px] text-[#555]">Loading cart...</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col font-serif text-[#1a1a1a]">
        {/* Header */}
        <div className="w-full px-4 sm:px-8 lg:px-14 pt-[160px] sm:pt-36 md:pt-52 pb-8 md:pb-16 text-center">
          <div className="flex justify-center">
            <HeaderBtn text="Cart" />
          </div>

          <Link
            href="/"
            className="inline-block mt-4 text-[14px] text-[#1a1a1a] underline font-sans"
          >
            Continue shopping
          </Link>
        </div>

        {/* Error */}
        {error && (
          <p className="text-center font-sans text-[14px] text-red-600 mb-4 px-4">
            {error}
          </p>
        )}

        {/* Cart Content */}
        <div className="w-full px-4 sm:px-8 lg:px-14 pb-20 ">
          <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row flex-wrap gap-12 items-start">
            {/* LEFT — Cart Items */}
            <div ref={cartRef} className="flex-1 min-w-[320px] w-full">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-sans text-[15px] text-[#555]">
                    Your cart is empty.
                  </p>

                  <Link
                    href="/"
                    className="inline-block mt-4 text-[14px] text-[#1a1a1a] underline font-sans"
                  >
                    Browse products
                  </Link>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div key={item.cartId}>
                    <div className="flex gap-3 sm:gap-6 py-6 items-start">
                      {/* Product Image — clickable */}
                      <Link
                        href={`/products/${item.id}`}
                        className="relative w-[120px] h-[120px] sm:w-[150px] sm:h-[170px] flex-shrink-0 overflow-hidden bg-[#e5e3e0] block"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0 font-sans">
                        <Link
                          href={`/products/${item.id}`}
                          className="text-[14px] sm:text-[15px] text-[#1e3a5f] mb-3 leading-[1.4] hover:underline block break-words"
                        >
                          {item.name}
                        </Link>

                        <div className="text-[13px] sm:text-[14px] mb-3">
                          <strong>Size:</strong> {item.size}
                        </div>

                        {item.color && item.color !== "default" && (
                          <div className="text-[13px] sm:text-[14px] mb-3">
                            <strong>Color:</strong> {item.color}
                          </div>
                        )}

                        {/* Quantity */}
                        <div className="inline-flex items-center border border-[#999] mb-3.5">
                          <button
                            className="w-[34px] h-[34px] border-none bg-transparent cursor-pointer text-[16px] leading-none"
                            onClick={() => updateQty(item.cartId, -1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            −
                          </button>

                          <span className="w-[32px] text-center text-[14px]">
                            {item.qty}
                          </span>

                          <button
                            className="w-[34px] h-[34px] border-none bg-transparent cursor-pointer text-[16px] leading-none"
                            onClick={() => updateQty(item.cartId, 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            +
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          className="block border-none bg-none p-0 text-[13px] sm:text-[14px] underline cursor-pointer text-[#1a1a1a] font-sans"
                          onClick={() => removeItem(item.cartId)}
                        >
                          Remove
                        </button>
                      </div>

                      {/* Price */}
                      <div className="font-sans text-[14px] sm:text-[14px] text-[#1e3a5f] whitespace-nowrap pt-1">
                        {item.qty > 1
                          ? formatPrice(parsePrice(item.price) * item.qty, item.price)
                          : item.price}
                      </div>
                    </div>

                    {idx < items.length - 1 && (
                      <hr className="border-none border-t border-[#d8d6d2] m-0" />
                    )}
                  </div>
                ))
              )}
            </div>

            {/* RIGHT — Order Summary */}
            {items.length > 0 && (
              <aside
                ref={summaryRef}
                className="w-full lg:w-[380px] lg:min-w-[300px] flex-shrink-0 mt-8 lg:mt-0 "
              >
                <div className="bg-[#e9e7e3] p-6 font-sans">
                  <div className="text-[13px] tracking-[2px] mb-4">
                    ORDER NOTE
                  </div>

                  <textarea
                    className="w-full min-h-[30px] box-border p-3 border border-[#999] font-sans text-[14px] resize-y mb-6 bg-white"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder=""
                  />

                  {/* Invoice breakdown */}
                  <div className="border-t border-[#d8d6d2] pt-4 mb-4">
                    <div className="text-[13px] tracking-[2px] mb-3">
                      INVOICE
                    </div>

                    {/* Line items */}
                    <div className="space-y-2 mb-4">
                      {items.map((item) => (
                        <div
                          key={item.cartId}
                          className="flex justify-between gap-2 text-[13px] text-[#1a1a1a]"
                        >
                          <span className="flex-1 min-w-0 break-words pr-2">
                            {item.qty} × {item.name}
                          </span>
                          <span className="whitespace-nowrap flex-shrink-0">
                            {item.qty > 1
                              ? formatPrice(parsePrice(item.price) * item.qty, item.price)
                              : item.price}
                          </span>
                        </div>
                      ))}
                    </div>

                    <hr className="border-none border-t border-[#d8d6d2] mb-3" />

                    {/* Coupon / Discount Code */}
                    <div className="mb-4">
                      {appliedCoupon ? (
                        <div className="flex items-center justify-between gap-2 bg-white p-3 border border-[#d8d6d2]">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-[13px] font-medium text-[#1a1a1a] truncate">
                              {couponCode || "Coupon"}: {appliedCoupon.label}
                            </span>
                          </div>
                          <button
                            onClick={handleRemoveCoupon}
                            className="text-[12px] text-red-600 underline flex-shrink-0"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={couponCode}
                              onChange={(e) => {
                                setCouponCode(e.target.value);
                                setCouponError("");
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleApplyCoupon();
                              }}
                              placeholder="Coupon code"
                              className="flex-1 min-w-0 px-3 py-2 text-[13px] border border-[#999] bg-white outline-none focus:border-[#1a1a1a]"
                            />
                            <button
                              onClick={handleApplyCoupon}
                              className="px-4 py-2 bg-[#1a1a1a] text-white text-[12px] uppercase tracking-wide font-medium flex-shrink-0"
                            >
                              Apply
                            </button>
                          </div>
                          {couponError && (
                            <p className="text-[12px] text-red-600 mt-1.5">
                              {couponError}
                            </p>
                          )}
                        </>
                      )}
                    </div>

                    {/* Totals */}
                    <div className="flex justify-between text-[14px] mb-2">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal, items[0]?.price)}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-[14px] mb-2">
                        <span>Discount</span>
                        <span className="text-green-700">
                          -{formatPrice(discount, items[0]?.price)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-[14px] mb-2 gap-2">
                      <span>Shipping</span>
                      <span className="text-[#555] text-right">
                        Calculated at checkout
                      </span>
                    </div>
                    <div className="flex justify-between text-[14px] mb-2 gap-2">
                      <span>Taxes</span>
                      <span className="text-[#555] text-right">
                        Calculated at checkout
                      </span>
                    </div>

                    <hr className="border-none border-t border-[#d8d6d2] my-3" />

                    <div className="flex justify-between text-[16px] font-bold">
                      <span>Total</span>
                      <span>{formatPrice(total, items[0]?.price)}</span>
                    </div>
                  </div>

                  <button
                    className="w-full py-4 bg-[#1a1a1a] text-white border-none rounded-full text-[14px] tracking-[2px] cursor-pointer font-sans font-bold"
                    onClick={handleCheckout}
                  >
                    CHECK OUT
                  </button>

                  <p className="text-center text-[12px] text-[#555] mt-3 mb-0">
                    Shipping, taxes, and discount codes calculated at checkout.
                  </p>

                  <button
                    className="block w-full mt-1 border-none bg-none p-0 text-[13px] underline cursor-pointer text-[#f00] font-sans"
                    onClick={clearCart}
                  >
                    Clear cart
                  </button>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>

      <ProductGridSection
        heading="Popular Picks"
        products={[...toquesProducts, ...linenEdit, ...allNew]}
        viewAllHref="/products"
        hasViewAllBtn={true}
        columns={4}
        itemsToShow={4}
      />
    </>
  );
}
