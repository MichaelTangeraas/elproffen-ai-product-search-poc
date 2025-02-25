import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "~/components/ui/accordion";

interface ProductCardProps {
  productNumber: string;
  productName: string;
  manufacturerName: string;
  technicalDescription: string;
}

export function ProductCard({
  productNumber,
  productName,
  manufacturerName,
  technicalDescription,
}: ProductCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm w-[500px] flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
        {productName}
      </h3>
      <div className="space-y-2 flex flex-col">
        <div>
          <span className="font-medium text-gray-600">Produktnummer: </span>
          <span className="text-gray-800">{productNumber}</span>
        </div>
        <div>
          <span className="font-medium text-gray-600">Produsent: </span>
          <span className="text-gray-800">{manufacturerName}</span>
        </div>
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value="technical-description">
              <AccordionTrigger className="font-medium text-gray-600">
                Teknisk beskrivelse
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-800 text-sm max-h-[150px] overflow-y-auto">
                  {technicalDescription}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors w-full">
          Legg til i handlekurv
        </button>
      </div>
    </div>
  );
}
