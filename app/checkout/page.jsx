"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart, parsePrice } from "@/context/CartContext";
import HeaderBtn from "@/components/buttons/HeaderBtn";

function formatRs(n) {
  return "Rs. " + n.toLocaleString("en-IN", { minimumFractionDigits: 2 });
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, hydrated } = useCart();
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [placing, setPlacing] = useState(false);
  const [errors, setErrors] = useState({});

  const shipping = subtotal > 5000 ? 0 : 150;
  const total = subtotal + shipping;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const required = ["email", "firstName", "lastName", "address", "city", "state", "pincode", "phone"];
    required.forEach((field) => {
      if (!form[field].trim()) {
        newErrors[field] = "Required";
      }
    });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email";
    }
    if (form.pincode && !/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = "Invalid pincode";
    }
    if (form.phone && !/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Invalid phone";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setPlacing(true);
    // Simulate order placement
    setTimeout(() => {
      clearCart();
      setPlacing(false);
      router.push("/cart");
    }, 1500);
  };

  if (!hydrated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="font-sans text-[15px] text-[#555]">Loading checkout...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-serif text-[#1a1a1a]">
        <div className="w-full px-4 sm:px-8 lg:px-14 pt-[140px] sm:pt-36 md:pt-52 pb-16 text-center">
          <div className="flex justify-center">
            <HeaderBtn text="Checkout" />
          </div>
        </div>
        <div className="text-center pb-20">
          <p className="font-sans text-[15px] text-[#555]">Your cart is empty.</p>
          <Link
            href="/"
            className="inline-block mt-4 text-[14px] text-[#1a1a1a] underline font-sans"
          >
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-serif text-[#1a1a1a]">
      {/* Header section */}
      <div className="w-full px-4 sm:px-8 lg:px-14 pt-[140px] sm:pt-36 md:pt-52 pb-16 text-center">
        <div className="flex justify-center">
          <HeaderBtn text="Checkout" />
        </div>
        <Link
          href="/cart"
          className="inline-block mt-4 text-[14px] text-[#1a1a1a] underline font-sans"
        >
          Return to cart
        </Link>
      </div>

      {/* Main content */}
      <div className="w-full px-4 sm:px-8 lg:px-14 pb-20">
        <div className="flex flex-wrap gap-12 items-start max-w-[1600px] mx-auto w-full">
          {/* Form column */}
          <div className="flex-1 min-w-[320px] basis-[600px]">
            <form onSubmit={handlePlaceOrder} className="font-sans space-y-8">
              {/* Contact */}
              <section>
                <h2 className="text-[13px] tracking-[0.2em] font-semibold text-[#1a1a1a] mb-4 uppercase">
                  Contact
                </h2>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="Email address"
                  className="w-full h-[48px] border border-ink/20 bg-transparent px-3 text-[13px] text-ink outline-none transition-colors focus:border-ink/60"
                />
                {errors.email && (
                  <p className="text-[12px] text-red-600 mt-1">{errors.email}</p>
                )}
              </section>

              {/* Shipping address */}
              <section>
                <h2 className="text-[13px] tracking-[0.2em] font-semibold text-[#1a1a1a] mb-4 uppercase">
                  Shipping address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={handleChange("firstName")}
                    placeholder="First name"
                    className="h-[48px] border border-ink/20 bg-transparent px-3 text-[13px] text-ink outline-none transition-colors focus:border-ink/60"
                  />
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={handleChange("lastName")}
                    placeholder="Last name"
                    className="h-[48px] border border-ink/20 bg-transparent px-3 text-[13px] text-ink outline-none transition-colors focus:border-ink/60"
                  />
                </div>
                {errors.firstName && <p className="text-[12px] text-red-600 mt-1">{errors.firstName}</p>}
                {errors.lastName && <p className="text-[12px] text-red-600 mt-1">{errors.lastName}</p>}

                <input
                  type="text"
                  value={form.address}
                  onChange={handleChange("address")}
                  placeholder="Address"
                  className="w-full h-[48px] border border-ink/20 bg-transparent px-3 text-[13px] text-ink outline-none transition-colors focus:border-ink/60 mt-4"
                />
                {errors.address && <p className="text-[12px] text-red-600 mt-1">{errors.address}</p>}

                <input
                  type="text"
                  value={form.apartment}
                  onChange={handleChange("apartment")}
                  placeholder="Apartment, suite, etc. (optional)"
                  className="w-full h-[48px] border border-ink/20 bg-transparent px-3 text-[13px] text-ink outline-none transition-colors focus:border-ink/60 mt-4"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <input
                    type="text"
                    value={form.city}
                    onChange={handleChange("city")}
                    placeholder="City"
                    className="h-[48px] border border-ink/20 bg-transparent px-3 text-[13px] text-ink outline-none transition-colors focus:border-ink/60"
                  />
                  <input
                    type="text"
                    value={form.state}
                    onChange={handleChange("state")}
                    placeholder="State"
                    className="h-[48px] border border-ink/20 bg-transparent px-3 text-[13px] text-ink outline-none transition-colors focus:border-ink/60"
                  />
                  <input
                    type="text"
                    value={form.pincode}
                    onChange={handleChange("pincode")}
                    placeholder="PIN code"
                    maxLength={6}
                    className="h-[48px] border border-ink/20 bg-transparent px-3 text-[13px] text-ink outline-none transition-colors focus:border-ink/60"
                  />
                </div>
                <div className="flex gap-4 mt-1">
                  {errors.city && <p className="text-[12px] text-red-600">{errors.city}</p>}
                  {errors.state && <p className="text-[12px] text-red-600">{errors.state}</p>}
                  {errors.pincode && <p className="text-[12px] text-red-600">{errors.pincode}</p>}
                </div>

                <input
                  type="tel"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  placeholder="Phone number"
                  maxLength={10}
                  className="w-full h-[48px] border border-ink/20 bg-transparent px-3 text-[13px] text-ink outline-none transition-colors focus:border-ink/60 mt-4"
                />
                {errors.phone && <p className="text-[12px] text-red-600 mt-1">{errors.phone}</p>}
              </section>

              {/* Place order button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={placing}
                  className="w-full py-4 bg-[#1a1a1a] text-white border-none rounded-full text-[14px] tracking-[2px] cursor-pointer font-sans font-bold transition-opacity hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {placing ? "PLACING ORDER..." : "PLACE ORDER"}
                </button>
              </div>
            </form>
          </div>

          {/* Order summary — sticky */}
          <aside className="flex-[0_1_380px] min-w-[300px] sticky top-[100px] self-start">
            <div className="bg-[#e9e7e3] p-8 font-sans">
              <div className="text-[13px] tracking-[2px] mb-4">ORDER SUMMARY</div>

              {/* Item list */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.cartId} className="flex gap-3 items-start">
                    <div className="relative w-[60px] h-[70px] flex-shrink-0 overflow-hidden bg-[#e5e3e0]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-[#1a1a1a] text-white text-[11px] font-bold flex items-center justify-center leading-none">
                        {item.qty}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] text-[#1a1a1a] leading-snug truncate">
                        {item.name}
                      </div>
                      <div className="text-[12px] text-[#555] mt-0.5">
                        {item.size}{item.color && item.color !== "default" ? ` / ${item.color}` : ""}
                      </div>
                    </div>
                    <div className="text-[13px] text-[#1a1a1a] whitespace-nowrap">
                      {formatRs(parsePrice(item.price) * item.qty)}
                    </div>
                  </div>
                ))}
              </div>

              <hr className="border-none border-t border-[#d8d6d2] mb-4" />

              {/* Totals */}
              <div className="flex justify-between text-[14px] mb-2">
                <span>Subtotal</span>
                <span>{formatRs(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[14px] mb-2">
                <span>Shipping</span>
                <span>{shipping === 0 ? "FREE" : formatRs(shipping)}</span>
              </div>
              <hr className="border-none border-t border-[#d8d6d2] my-3" />
              <div className="flex justify-between text-[16px] font-bold">
                <span>Total</span>
                <span>{formatRs(total)}</span>
              </div>

              {shipping === 0 && (
                <p className="text-[12px] text-green-700 mt-3">
                  You qualify for FREE shipping!
                </p>
              )}
              {shipping > 0 && (
                <p className="text-[12px] text-[#555] mt-3">
                  Add {formatRs(5000 - subtotal)} more for FREE shipping.
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}