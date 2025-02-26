"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type CartContextType = {
  cartItems: string[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<string[]>([]);

  const addToCart = (productId: string) => {
    setCartItems((prev) => {
      if (!prev.includes(productId)) {
        return [...prev, productId];
      }
      return prev;
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((id) => id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
