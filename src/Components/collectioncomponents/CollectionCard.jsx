import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CollectionCard = ({ collection }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate(`/products/${collection.id}`)}
      className="cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg p-4 flex flex-col items-center hover:shadow-2xl"
    >
      <img src={collection.image} alt={collection.name} className="h-40 object-contain mb-4" />
      <h3 className="text-xl font-bold">{collection.name}</h3>
      <p className="text-gray-600 text-sm text-center">{collection.description}</p>
    </motion.div>
  );
};

export default CollectionCard;
