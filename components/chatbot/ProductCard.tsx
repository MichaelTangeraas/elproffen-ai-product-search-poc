interface ProductCardProps {
  productNumber: string;
  productName: string;
  manufacturer: string;
  technicalDescription: string;
}

export function ProductCard({
  productNumber,
  productName,
  manufacturer,
  technicalDescription,
}: ProductCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {productName}
      </h3>
      <div className="space-y-2">
        <div>
          <span className="font-medium text-gray-600">Product Number: </span>
          <span className="text-gray-800">{productNumber}</span>
        </div>
        <div>
          <span className="font-medium text-gray-600">Manufacturer: </span>
          <span className="text-gray-800">{manufacturer}</span>
        </div>
        <div>
          <span className="font-medium text-gray-600">
            Technical Description:{" "}
          </span>
          <p className="text-gray-800 mt-1 text-sm">{technicalDescription}</p>
        </div>
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors w-full">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
