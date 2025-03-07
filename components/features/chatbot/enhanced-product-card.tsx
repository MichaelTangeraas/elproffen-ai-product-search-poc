"use client";

import * as React from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { useCart } from "~/lib/cart/cart-context";

interface EnhancedProductCardProps {
  imageIds: string[];
  productName: string;
  productNumber: string;
  manufacturerName: string;
  productDescription: string;
  technicalDescription: string;
}

export default function EnhancedProductCard({
  imageIds,
  productName,
  productNumber,
  manufacturerName,
  productDescription,
  technicalDescription,
}: EnhancedProductCardProps) {
  const [currentImage, setCurrentImage] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const { addToCart } = useCart();

  const images = imageIds.map((imageId) => `/api/product-image/${imageId}`);

  const previousImage = () => {
    setCurrentImage((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const nextImage = () => {
    setCurrentImage((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    // Add the product to cart with the selected quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(productNumber, productName);
    }
    // Reset quantity after adding to cart
    setQuantity(1);
  };

  return (
    <Card className="w-full overflow-hidden border border-gray-200 bg-white">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left side - Image */}
          <div className="relative aspect-square w-full overflow-hidden bg-gray-50 p-4">
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <Image
                src={images[currentImage] || "/placeholder.svg"}
                alt={`Produktbilde ${currentImage + 1}`}
                fill
                sizes="(max-width: 500px) 100vw, 500px"
                className="object-contain"
                priority
              />
            </div>

            {images.length > 1 && (
              <>
                <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white shadow-sm pointer-events-auto"
                    onClick={previousImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Forrige bilde</span>
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white shadow-sm pointer-events-auto"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Neste bilde</span>
                  </Button>
                </div>

                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        currentImage === index
                          ? "w-6 bg-red-600"
                          : "w-2 bg-gray-300"
                      }`}
                      onClick={() => setCurrentImage(index)}
                    >
                      <span className="sr-only">Se bilde {index + 1}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right side - Product Information */}
          <div className="p-6 flex flex-col">
            <div className="mb-2">
              <div className="text-sm text-gray-500 mb-1">Kampanje</div>
              <h2 className="text-xl font-bold">{productName}</h2>
              <div className="flex flex-col text-sm text-gray-500 mt-1">
                <span>Produktnr.: {productNumber}</span>
                <span>Produsent: {manufacturerName}</span>
              </div>
            </div>

            <div className="flex-grow mt-4">
              <p className="text-sm text-gray-700">{productDescription}</p>
            </div>

            {/* Technical Description Accordion */}
            <Accordion type="single" collapsible className="w-full mt-4">
              <AccordionItem
                value="technical-description"
                className="border-b-0"
              >
                <AccordionTrigger className="py-2 text-sm">
                  Teknisk beskrivelse
                </AccordionTrigger>
                <AccordionContent className="text-sm">
                  {technicalDescription}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Quantity and Add to Cart */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={decreaseQuantity}
                    className="h-8 px-2 rounded-none border-r border-gray-300"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <div className="w-8 text-center text-sm">{quantity}</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={increaseQuantity}
                    className="h-8 px-2 rounded-none border-l border-gray-300"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Legg til
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
