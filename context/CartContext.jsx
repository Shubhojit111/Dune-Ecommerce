"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "dune-cart";
const STORAGE_VERSION = "v2"; // bump to force-clear stale corrupt data
const VERSIONED_KEY = `${STORAGE_KEY}-${STORAGE_VERSION}`;

// Generate a deterministic cart ID based on product id + size + color
// This ensures adding the same product+size+color combo increments qty
// instead of creating a duplicate entry
function makeCartId(id, size, color) {
  return `${id}__${size || "default"}__${color || "default"}`;
}

// Parse price string ("Rs. 3,700.00" / "$96" / "₹899") into a number
export function parsePrice(price) {
  if (typeof price === "number") return price;
  if (typeof price === "string") {
    // Remove commas first, then strip everything except digits and dot
    const noCommas = price.replace(/,/g, "");
    const cleaned = noCommas.replace(/[^0-9.]/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

// Extract currency symbol from a price string
export function getCurrencySymbol(price) {
  if (typeof price !== "string") return "Rs. ";
  const match = price.match(/^([^\d\s]+)/);
  return match ? match[1].trim() + " " : "Rs. ";
}

// Format a number using the currency symbol from a reference price string
export function formatPrice(amount, refPrice) {
  const symbol = getCurrencySymbol(refPrice);
  const rounded = Math.round(amount);
  const hasDecimals = amount % 1 !== 0;
  return symbol + rounded.toLocaleString("en-IN", {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  });
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      // Clean up old version keys to prevent stale corrupt data
      const oldData = localStorage.getItem(STORAGE_KEY);
      if (oldData) {
        localStorage.removeItem(STORAGE_KEY);
      }

      const stored = localStorage.getItem(VERSIONED_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage:", e);
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever items change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(VERSIONED_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage:", e);
      setError("Unable to save cart. Storage may be full.");
    }
  }, [items, hydrated]);

  // Add item to cart with deduplication
  const addItem = useCallback((product) => {
    setError(null);
    try {
      // Validate required fields
      if (!product.id && !product.handle) {
        throw new Error("Product ID is required");
      }

      const productId = product.id || product.handle;
      const size = product.size || "default";
      const color = product.color || "default";
      const cartId = makeCartId(productId, size, color);
      const qty = product.qty || 1;

      // Stock validation: if product has inStock=false, reject
      if (product.inStock === false) {
        throw new Error("This product is out of stock");
      }

      setItems((prev) => {
        const existing = prev.find((item) => item.cartId === cartId);
        if (existing) {
          // Same product+size+color: increment quantity
          return prev.map((item) =>
            item.cartId === cartId
              ? { ...item, qty: item.qty + qty }
              : item
          );
        }
        // New combination: add as new entry
        return [
          ...prev,
          {
            cartId,
            id: productId,
            name: product.name || "Unknown Product",
            size,
            color,
            price: product.price || "Rs. 0.00",
            image: product.image || "",
            qty,
            inStock: product.inStock !== false,
          },
        ];
      });
    } catch (e) {
      console.error("Failed to add item to cart:", e);
      setError(e.message || "Failed to add item to cart");
    }
  }, []);

  const updateQty = useCallback((cartId, delta) => {
    setError(null);
    setItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  }, []);

  const setQty = useCallback((cartId, qty) => {
    setError(null);
    setItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  }, []);

  const removeItem = useCallback((cartId) => {
    setError(null);
    setItems((prev) => prev.filter((item) => item.cartId !== cartId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Calculate subtotal (handles both string and number prices)
  const subtotal = items.reduce((sum, item) => {
    return sum + parsePrice(item.price) * item.qty;
  }, 0);

  // Total item count (sum of all quantities)
  const itemCount = items.reduce((count, item) => count + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQty,
        setQty,
        removeItem,
        clearCart,
        subtotal,
        itemCount,
        hydrated,
        error,
        clearError: () => setError(null),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}