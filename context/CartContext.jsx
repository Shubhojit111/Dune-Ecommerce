"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "dune-cart";

// Generate a deterministic cart ID based on product id + size + color
// This ensures adding the same product+size+color combo increments qty
// instead of creating a duplicate entry
function makeCartId(id, size, color) {
  return `${id}__${size || "default"}__${color || "default"}`;
}

// Parse price string ("Rs. 3,700.00" / "$96") into a number
export function parsePrice(price) {
  if (typeof price === "number") return price;
  if (typeof price === "string") {
    const cleaned = price.replace(/[^0-9.]/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
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