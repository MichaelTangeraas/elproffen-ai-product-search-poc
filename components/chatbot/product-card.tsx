"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { useCart } from "~/lib/cart/cart-context";

interface ProductCardProps {
  imageIds: string[];
  productName: string;
  productNumber: string;
  manufacturerName: string;
  productDescription: string;
  technicalDescription: string;
}

export default function ProductCard({
  imageIds,
  productName,
  productNumber,
  manufacturerName,
  productDescription,
  technicalDescription,
}: ProductCardProps) {
  const [currentImage, setCurrentImage] = React.useState(0);
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

  const handleAddToCart = () => {
    addToCart(productNumber, productName);
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent className="p-6">
        <div className="grid gap-6 md:gap-8">
          {/* Image Carousel */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <div className="absolute inset-0">
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
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={previousImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Forrige bilde</span>
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Neste bilde</span>
                </Button>
              </div>
            )}

            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`h-1.5 w-1.5 rounded-full bg-button transition-all ${
                      currentImage === index ? "w-5 opacity-100" : "opacity-30"
                    }`}
                    onClick={() => setCurrentImage(index)}
                  >
                    <span className="sr-only">Se bilde {index + 1}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="grid gap-4">
            <div className="grid gap-1">
              <h2 className="text-2xl font-bold">{productName}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Produktnummer: {productNumber}</span>
                <span>Produsent: {manufacturerName}</span>
              </div>
            </div>

            <p className="text-base/relaxed">{productDescription}</p>

            {/* Technical Description Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="technical-description">
                <AccordionTrigger>Teknisk beskrivelse</AccordionTrigger>
                <AccordionContent>{technicalDescription}</AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Add to Cart Button */}
            <Button
              className="w-full sm:w-auto bg-button hover:bg-button hover:opacity-80"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Legg i handlekurv
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
