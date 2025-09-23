import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeFromCart, clearCart } from "@/store/slices/cartSlice";
import CartItem from "./CartItem";
import Button from "@/components/common/Button";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);

  if (items.length === 0) {
    return <p className="p-6 text-center text-gray-500">Your cart is empty.</p>;
  }

  return (
    <div className="rounded-xl bg-white shadow p-6">
      <h2 className="mb-4 text-xl font-semibold">Shopping Cart</h2>
      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <CartItem
            key={item.id} // CartItem now has id directly
            item={item}
            onRemove={() => dispatch(removeFromCart(item.id))}
          />
        ))}
      </ul>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-lg font-bold">Total: ${total.toFixed(2)}</span>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => dispatch(clearCart())}>
            Clear
          </Button>
          <Button variant="primary">Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
