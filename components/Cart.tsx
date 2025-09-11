"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Cart = () => {
  const items = useSelector((state: RootState) => state.cart.items);

  return (
    <div>
      <h1 className="text-xl font-bold">Your Cart</h1>
      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} — {item.quantity} × ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
