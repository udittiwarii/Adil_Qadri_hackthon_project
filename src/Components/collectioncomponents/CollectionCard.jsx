// src/Components/collectioncomponents/CollectionCard.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CollectionCard = ({ collection, onClick }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (collection?.image) {
      const img = new Image();
      img.src = collection.image;
      img.onload = () => setLoaded(true);
    }
  }, [collection]);

  if (!collection) return null;

  return (
    <motion.div
      className="cursor-pointer p-4 rounded-xl bg-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {loaded ? (
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-48 object-contain mb-4"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 animate-pulse mb-4 rounded-lg" />
      )}
      <h2 className="text-lg font-semibold text-gray-800">
        {collection.name}
      </h2>
      <p className="text-sm text-gray-500">{collection.description}</p>
    </motion.div>
  );
};

export default CollectionCard;
