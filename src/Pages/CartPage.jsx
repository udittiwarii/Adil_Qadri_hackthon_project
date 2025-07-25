// src/pages/CartPage.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

import CartItem from "../Components/Cart/CartItem";
import CartSummary from "../Components/Cart/CartSummary";
import EmptyCart from "../Components/Cart/EmptyCart";

const CartPage = () => {
  const { cartItems } = useContext(CartContext);
  const { darkMode } = useTheme();
  const isEmpty = cartItems.length === 0;

  return (
    <div
      className={`min-h-screen mt-20 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-300 ${
        darkMode ? "bg-[#111] text-white" : "bg-white text-black"
      }`}
    >
      <div className="md:col-span-2 space-y-4">
        {isEmpty ? (
          <EmptyCart />
        ) : (
          cartItems.map((item) => <CartItem key={item.id} item={item} />)
        )}
      </div>
      {!isEmpty && <CartSummary />}
    </div>
  );
};

export default CartPage;
