"use client";

import { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle, Minus, Plus } from "lucide-react";
import HeadTagBtnSmall from "./HeadTagBtnSmall";

// Cart id must match CartContext's makeCartId: `${id}__${size}__${color}`
function makeCartId(id, size, color) {
  return `${id}__${size || "default"}__${color || "default"}`;
}

const BUTTON_CLASS =
  "leading-none py-[18px] w-full border border-ink rounded-full text-[13px] uppercase tracking-[0.25em] font-bold text-ink  transition-all duration-300";

const STEPPER_CLASS =
  "w-full h-[51px] rounded-full border border-ink flex items-center justify-between px-2";

/**
 * Reusable Add to cart button with 3 states:
 * 1. "Add to cart" — variant not in cart
 * 2. "✓ Added"     — 1.5s confirmation flash right after clicking
 * 3. Stepper       — [ − ] qty [ + ], replaces the button while the
 *                    variant is in the cart (decrement at qty 1 removes it)
 *
 * `product` must be the same payload shape addItem expects:
 * { id, name, size, color, price, image }
 */
export default function AddToCart({
  product,
  className = BUTTON_CLASS,
  stepperClassName = STEPPER_CLASS,
}) {
  const { items, addItem, updateQty, removeItem } = useCart();

  // "Added ✓" confirmation flash
  const [justAdded, setJustAdded] = useState(false);
  const justAddedTimeout = useRef(null);

  useEffect(() => () => clearTimeout(justAddedTimeout.current), []);

  // Cart line for this exact product+size+color variant
  const cartId = makeCartId(
    product?.id || product?.handle,
    product?.size,
    product?.color
  );
  const cartLine = items.find((item) => item.cartId === cartId);

  const handleAdd = () => {
    addItem(product);
    setJustAdded(true);
    clearTimeout(justAddedTimeout.current);
    justAddedTimeout.current = setTimeout(() => setJustAdded(false), 1500);
  };

  // Stepper replaces the button once this variant is in the cart
  // (shown after the "Added" flash finishes)
  if (cartLine && !justAdded) {
    return (
      <div className={stepperClassName}>
        <button
          onClick={() =>
            cartLine.qty === 1
              ? removeItem(cartLine.cartId)
              : updateQty(cartLine.cartId, -1)
          }
          aria-label="Decrease quantity"
          className="w-11 h-11 rounded-full flex items-center justify-center text-ink hover:bg-ink/5 transition-colors"
        >
          <Minus size={16} strokeWidth={1.5} />
        </button>
        <span className="text-[14px] font-bold text-ink tabular-nums">
          {cartLine.qty}
        </span>
        <button
          onClick={() => addItem(product)}
          aria-label="Increase quantity"
          className="w-11 h-11 rounded-full flex items-center justify-center text-ink hover:bg-ink/5 transition-colors"
        >
          <Plus size={16} strokeWidth={1.5} />
        </button>
      </div>
    );
  }

  return (
    <button onClick={handleAdd} className={className}>
      {justAdded ? (
        <span className="flex items-center justify-center gap-2 normal-case tracking-normal">
          <CheckCircle size={16} strokeWidth={1.5} className="text-green-600" />
          <HeadTagBtnSmall text="Added" />
        </span>
      ) : (
        "Add to cart"
      )}
    </button>
  );
}