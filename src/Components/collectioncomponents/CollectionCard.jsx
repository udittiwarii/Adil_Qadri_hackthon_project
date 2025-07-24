import React, { useEffect, useState } from "react";

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
    <div
      className="cursor-pointer p-4 rounded-xl bg-white shadow-lg hover:scale-105 transition-all duration-300"
      onClick={() => onClick(collection)}
    >
      {loaded ? (
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 animate-pulse rounded-lg mb-3" />
      )}

      <h2 className="text-xl font-semibold text-gray-800">
        {collection.name}
      </h2>
      <p className="text-sm text-gray-500">{collection.description}</p>
    </div>
  );
};

export default CollectionCard;
