// src/components/Cart/EmptyCart.jsx
import React from "react";
import { motion } from "framer-motion";

const EmptyCart = () => {
  return (
    <motion.div
      className="text-center text-gray-500 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-semibold">Your cart is empty 😢</h2>
      <p className="mt-4">Looks like you haven’t added anything yet.</p>
    </motion.div>
  );
};

export default EmptyCart;
