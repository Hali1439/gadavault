import React from "react";
import { CartItem as CartItemType } from "@/types";
import Button from "@/components/common/Button";

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const { product, quantity } = item;

  return (
    <li className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        {product.images?.[0] && (
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-16 w-16 rounded-md object-cover"
          />
        )}
        <div>
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-sm text-gray-500">
            {quantity} × ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
      <Button variant="danger" onClick={onRemove}>
        Remove
      </Button>
    </li>
  );
};

export default CartItem;
