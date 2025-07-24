import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

// 👇 Lazy load the CollectionGrid
const CollectionGrid = lazy(() =>
  import('./../Components/collectioncomponents/CollectionGrid')
);

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.3,
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const CollectionPage = () => {
  return (
    <motion.section
      className="py-12 px-4 md:px-12 bg-gradient-to-br from-white via-gray-100 to-white min-h-screen"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        variants={headingVariants}
        className="text-5xl font-extrabold text-center mt-20 mb-12 text-gray-800"
      >
        Our Signature Collections
      </motion.h2>

      <Suspense
        fallback={
          <div className="text-center text-xl font-medium text-gray-500 animate-pulse">
            Loading collections...
          </div>
        }
      >
        <CollectionGrid />
      </Suspense>
    </motion.section>
  );
};

export default CollectionPage;
