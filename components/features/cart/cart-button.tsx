"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useCart } from "~/lib/cart/cart-context";
import { CartSheet } from "~/components/features/cart/cart-sheet";

export function CartButton() {
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // Calculate total number of items (sum of quantities)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 z-50 rounded-full bg-white shadow-md hover:bg-gray-100"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-button text-xs text-white">
            {totalItems}
          </span>
        )}
      </Button>
      <CartSheet isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
