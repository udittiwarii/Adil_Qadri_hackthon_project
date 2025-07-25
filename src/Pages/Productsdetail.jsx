import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { productsByCollection } from '../data/products';
import ProductSwiper from './../Components/productdetail/ProductSwiper';
import gsap from 'gsap';
import { toast } from 'react-toastify';
import Lenis from '@studio-freight/lenis';
import { BsSun, BsMoon } from 'react-icons/bs';

const ProductDetail = () => {
  const { productId } = useParams();
  const allProducts = Object.values(productsByCollection).flat();
  const product = allProducts.find((p) => p.id.toString() === productId);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [reviewInput, setReviewInput] = useState('');
  const [showReviews, setShowReviews] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const { cartItems, setCartItems } = useContext(CartContext);

  // Smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    gsap.from('.product-wrapper', {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
    });

    const stored = localStorage.getItem(`reviews-${productId}`);
    if (stored) setReviews(JSON.parse(stored));
  }, [productId]);

  const handleAddReview = () => {
    if (reviewInput.trim()) {
      const updated = [...reviews, reviewInput.trim()];
      setReviews(updated);
      localStorage.setItem(`reviews-${productId}`, JSON.stringify(updated));
      setReviewInput('');
    }
  };

  const handleQtyChange = (type) => {
    setQuantity((q) => (type === 'inc' ? q + 1 : q > 1 ? q - 1 : 1));
  };

  const handleAddToCart = () => {
    const alreadyInCart = cartItems.find((item) => item.id === product.id);
    if (alreadyInCart) {
      alert('Already in cart!');
      return;
    }

    setCartItems([...cartItems, product]);
    toast.success(`${product.name} added to cart!`, {
      position: 'top-right',
      autoClose: 2000,
      theme: 'colored',
    });
  };

  if (!product) {
    return (
      <div className="p-10 mt-20 text-center font-mono text-red-500 text-xl">
        ❌ Product Not Found
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      {/* Theme toggle */}
      <div className="fixed top-5 right-5 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
        </button>
      </div>

      <div className="product-wrapper px-6 mt-20 md:px-20 py-12">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/2">
            <ProductSwiper product={product} />
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 space-y-5">
            <h1 className="text-3xl md:text-4xl font-bold font-['JetBrains_Mono']">{product.name}</h1>
            <div className="text-2xl font-semibold text-green-700">₹{product.price * quantity}</div>
            <div className="text-yellow-600">⭐ {product.rating}</div>
            <p className="text-gray-600 dark:text-gray-300">
              {product.description || 'Premium fragrance, crafted with the finest ingredients.'}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={() => handleQtyChange('dec')}
                className="px-4 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                −
              </button>
              <span className="font-medium text-lg">{quantity}</span>
              <button
                onClick={() => handleQtyChange('inc')}
                className="px-4 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                +
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleAddToCart}
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition-all shadow-md"
              >
                🛒 Add to Cart
              </button>
              <button className="border border-black px-6 py-2 rounded-md hover:bg-black hover:text-white transition-all">
                ⚡ Buy Now
              </button>
            </div>

            {/* Reviews */}
            <div className="mt-8">
              <textarea
                value={reviewInput}
                onChange={(e) => setReviewInput(e.target.value)}
                placeholder="Write your thoughts..."
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 bg-white dark:bg-gray-800 dark:text-white"
              />
              <div className="mt-2 flex items-center gap-4">
                <button
                  onClick={handleAddReview}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Submit Review
                </button>
                <button
                  onClick={() => setShowReviews(!showReviews)}
                  className="text-blue-600 underline"
                >
                  {showReviews ? 'Hide' : 'View'} All Reviews
                </button>
              </div>

              {showReviews && (
                <div className="mt-4 space-y-2 max-h-52 overflow-y-auto pr-2">
                  {reviews.length > 0 ? (
                    reviews.map((rev, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-gray-100 dark:bg-gray-700 border rounded-md text-gray-700 dark:text-white"
                      >
                        {rev}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
