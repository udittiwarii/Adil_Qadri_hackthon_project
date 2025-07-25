// src/Components/collectioncomponents/CollectionGrid.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CollectionCard from './CollectionCard';
import { collections } from '../../data/collections';

const CollectionGrid = () => {
  const navigate = useNavigate();

  const handleClick = (collection) => {
    navigate(`/products/${collection.id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-10">
      {collections.map((collection) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          onClick={() => handleClick(collection)}
        />
      ))}
    </div>
  );
};

export default CollectionGrid;
