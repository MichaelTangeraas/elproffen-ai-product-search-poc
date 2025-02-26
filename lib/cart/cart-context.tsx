"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (productId: string, productName: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

type CartItem = {
  productId: string;
  productName: string;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (productId: string, productName: string) => {
    setCartItems((prev) => {
      if (!prev.some((item) => item.productId === productId)) {
        return [...prev, { productId, productName }];
      }
      return prev;
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
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
