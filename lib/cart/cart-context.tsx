"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (productId: string, productName: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getProductQuantity: (productId: string) => number;
};

type CartItem = {
  productId: string;
  productName: string;
  quantity: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (productId: string, productName: string) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.productId === productId);

      if (existingItem) {
        // If item exists, increase quantity
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If item doesn't exist, add it with quantity 1
        return [...prev, { productId, productName, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getProductQuantity = (productId: string) => {
    const item = cartItems.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getProductQuantity,
      }}
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
