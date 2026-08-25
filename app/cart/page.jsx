"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useCart, parsePrice } from "@/context/CartContext";
import HeaderBtn from "@/components/buttons/HeaderBtn";

gsap.registerPlugin(ScrollTrigger);

function formatRs(n) {
  return (
    "Rs. " +
    n.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
    })
  );
}

export default function CartPage() {
  const router = useRouter();

  const { items, updateQty, removeItem, subtotal, clearCart, hydrated, error } =
    useCart();

  const [note, setNote] = useState("");

  const cartRef = useRef(null);
  const summaryRef = useRef(null);

  useEffect(() => {
    if (!hydrated || items.length === 0) return;

    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cartRef.current,
        start: "top 140px",
        endTrigger: cartRef.current,
        end: "bottom bottom-=200px",
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

  if (!hydrated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="font-sans text-[15px] text-[#555]">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-serif text-[#1a1a1a]">
      {/* Header */}
      <div className="w-full px-4 sm:px-8 lg:px-14 pt-[140px] sm:pt-36 md:pt-52 pb-16 text-center">
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
      <div className="w-full px-4 sm:px-8 lg:px-14 pb-20">
        <div className="max-w-[1600px] mx-auto w-full flex flex-wrap gap-12 items-start">
          {/* LEFT — Cart Items */}
          <div ref={cartRef} className="flex-1 min-w-[320px] basis-[600px]">
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
                  <div className="flex gap-6 py-6 items-start">
                    {/* Product Image */}
                    <div className="relative w-[150px] h-[170px] flex-shrink-0 overflow-hidden bg-[#e5e3e0]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 font-sans">
                      <div className="text-[15px] text-[#1e3a5f] mb-3 leading-[1.4]">
                        {item.name}
                      </div>

                      <div className="text-[14px] mb-3">
                        <strong>Size:</strong> {item.size}
                      </div>

                      {item.color && item.color !== "default" && (
                        <div className="text-[14px] mb-3">
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
                        className="block border-none bg-none p-0 text-[14px] underline cursor-pointer text-[#1a1a1a] font-sans"
                        onClick={() => removeItem(item.cartId)}
                      >
                        Remove
                      </button>
                    </div>

                    {/* Price */}
                    <div className="font-sans text-[14px] text-[#1e3a5f] whitespace-nowrap pt-1">
                      {formatRs(parsePrice(item.price) * item.qty)}
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
              className="w-[380px] min-w-[300px] flex-shrink-0"
            >
              <div className="bg-[#e9e7e3] p-8 font-sans">
                <div className="text-[13px] tracking-[2px] mb-4">
                  ORDER NOTE
                </div>

                <textarea
                  className="w-full min-h-[100px] box-border p-3 border border-[#999] font-sans text-[14px] resize-y mb-6 bg-white"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder=""
                />

                <div className="flex justify-between text-[15px] mb-5">
                  <span>Subtotal</span>
                  <span>{formatRs(subtotal)}</span>
                </div>

                <button
                  className="w-full py-4 bg-[#1a1a1a] text-white border-none rounded-full text-[14px] tracking-[2px] cursor-pointer font-sans font-bold"
                  onClick={handleCheckout}
                >
                  CHECK OUT
                </button>

                <p className="text-center text-[12px] text-[#555] mt-4 mb-0">
                  Shipping, taxes, and discount codes calculated at checkout.
                </p>

                <button
                  className="block w-full mt-4 border-none bg-none p-0 text-[13px] underline cursor-pointer text-[#555] font-sans"
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
  );
}
