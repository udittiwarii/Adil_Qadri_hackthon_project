// src/components/Cart/CartSummary.jsx
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { motion } from "framer-motion";

const CartSummary = () => {
  const { cartItems } = useContext(CartContext);
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);
const handler = ()=>{
    alert('No Bakend!!')
}
  return (
    <motion.div
      className="bg-white p-6 rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-semibold mb-4">Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Total Items</span>
        <span>{cartItems.length}</span>
      </div>
      <div className="flex justify-between font-bold text-lg">
        <span>Total Price</span>
        <span>₹{total}</span>
      </div>
      <button onClick={handler} className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
        Proceed to Checkout
      </button>
    </motion.div>
  );
};

export default CartSummary;
