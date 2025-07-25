// src/components/Cart/CartItem.jsx
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { CartContext } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart } = useContext(CartContext);

  return (
    <motion.div
      className="bg-white p-4 rounded-2xl shadow-md flex items-center gap-4"
      whileHover={{ scale: 1.02 }}
    >
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
      <div className="flex-1">
        <h2 className="font-semibold text-lg">{item.name}</h2>
        <p className="text-gray-500">{item.description}</p>
        <p className="text-black font-bold mt-2">₹{item.price}</p>
      </div>
      <div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Remove
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;
