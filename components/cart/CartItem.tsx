import React from "react";
import type { CartItem } from "@/types/product";
import Button from "@/components/common/Button";
import Image from "next/image";

interface CartItemProps {
  item: CartItem;
  onRemove: () => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const { images, name, price, quantity } = item;

  return (
    <li className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        {images?.[0] && (
          <div className="relative h-16 w-16">
            <Image
              src={images[0].url}
              alt={images[0].alt || name}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
        )}
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-gray-500">
            {quantity} × ${price.toFixed(2)}
          </p>
        </div>
      </div>
      <Button variant="danger" onClick={onRemove}>
        Remove
      </Button>
    </li>
  );
};

export default CartItemComponent;
