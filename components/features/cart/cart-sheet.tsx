"use client";

import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "~/lib/cart/cart-context";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "~/components/ui/sheet";

interface CartSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function CartSheet({ isOpen, setIsOpen }: CartSheetProps) {
  const { cartItems, removeFromCart, clearCart, addToCart } = useCart();

  // Calculate total number of items (sum of quantities)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-80 sm:w-96">
        <SheetHeader className="mb-6">
          <SheetTitle>Handlekurv ({totalItems} varer)</SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Handlekurven er tom</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              <h3 className="font-medium">Produkter i handlekurven:</h3>
              <ul className="space-y-2">
                {cartItems.map((product) => (
                  <li
                    key={product.productId}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {product.quantity}x {product.productName}
                      </span>
                      <span className="text-xs text-gray-500">
                        ID: {product.productId}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(product.productId)}
                        className="h-7 w-7 p-0"
                        title="Fjern produkt"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <SheetFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => clearCart()}
              >
                Tøm handlekurv
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
