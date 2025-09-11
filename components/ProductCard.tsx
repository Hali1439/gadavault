type Props = {
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
};

export default function ProductCard({ name, price, oldPrice, discount, image }: Props) {
  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition relative">
      <img src={image} alt={name} className="h-40 mx-auto" />
      {discount && (
        <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
          -{discount}%
        </span>
      )}
      <h3 className="mt-4 font-semibold">{name}</h3>
      <div className="flex items-center space-x-2 mt-2">
        <span className="text-red-500 font-bold">${price}</span>
        {oldPrice && <span className="line-through text-gray-400">${oldPrice}</span>}
      </div>
      <button className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
        Add To Cart
      </button>
    </div>
  );
}
