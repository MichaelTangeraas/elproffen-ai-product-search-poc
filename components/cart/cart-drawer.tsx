"use client";

import { X } from "lucide-react";
import { useCart } from "~/lib/cart/cart-context";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "~/components/ui/sheet";

interface CartDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function CartDrawer({ isOpen, setIsOpen }: CartDrawerProps) {
  const { cartItems, removeFromCart, clearCart } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-80 sm:w-96">
        <SheetHeader className="mb-6">
          <SheetTitle>Handlekurv</SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Handlekurven er tom</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              <h3 className="font-medium">Produkter i handlekurven:</h3>
              <ul className="space-y-2">
                {cartItems.map((productId) => (
                  <li
                    key={productId}
                    className="flex items-center justify-between rounded-md border p-2"
                  >
                    <span className="text-sm">Produkt ID: {productId}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(productId)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
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
