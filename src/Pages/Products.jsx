import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { productsByCollection } from '../data/products';
import { motion } from 'framer-motion';

const Products = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const originalProducts = productsByCollection[id] || [];

  const [sortType, setSortType] = useState(() => {
    return localStorage.getItem('selectedSortType') || 'rating';
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    localStorage.setItem('selectedSortType', sortType);
  }, [sortType]);

  useEffect(() => {
    let sorted = [...originalProducts];

    switch (sortType) {
      case 'priceLowHigh':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighLow':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
      default:
        sorted.sort((a, b) => b.rating - a.rating);
    }

    setProducts(sorted);
  }, [sortType, id]);

  const buttonVariants = {
    hover: {
      scale: 1.1,
      backgroundColor: '#000',
      color: '#fff',
      transition: { type: 'spring', stiffness: 300 },
    },
  };

  return (
    <div className="p-6 mt-20 font-['Inter']">
      {/* Heading + Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold capitalize tracking-wide font-['JetBrains_Mono']">
          {id} Products
        </h1>

        <div className="flex gap-3">
          {['rating', 'priceLowHigh', 'priceHighLow'].map((type) => {
            const label =
              type === 'rating'
                ? '⭐ Rating'
                : type === 'priceLowHigh'
                ? '₹ Low to High'
                : '₹ High to Low';

            return (
              <motion.button
                key={type}
                onClick={() => setSortType(type)}
                variants={buttonVariants}
                whileHover="hover"
                animate={{
                  backgroundColor: sortType === type ? '#000' : '#fff',
                  color: sortType === type ? '#fff' : '#000',
                  transition: { duration: 0.2 },
                }}
                className="px-4 py-2 border rounded-full font-medium font-['JetBrains_Mono']"
              >
                {label}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="text-gray-600 font-medium">No products found.</p>
        ) : (
          products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, type: 'spring' }}
              className="bg-white rounded-xl border shadow-md p-4 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 font-['Inter']"
            >
              <div className="h-40 bg-gray-50 flex items-center justify-center rounded-lg overflow-hidden mb-3">
                <img
                  src={product.image?.[0]} // ✅ Display first image from array
                  alt={product.name}
                  className="h-full object-contain"
                />
              </div>

              <h3 className="text-lg font-semibold tracking-tight">{product.name}</h3>
              <p className="text-green-700 font-bold mt-1">₹{product.price}</p>
              <p className="text-yellow-600 text-sm mb-3">⭐ {product.rating}</p>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 text-sm bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-all"
                >
                  🛒 Add to Cart
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 text-sm border border-black text-black py-2 rounded-md hover:bg-black hover:text-white transition-all"
                  onClick={() => navigate(`/ProductDetail/${product.id}`)}
                >
                  🔍 View More
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
