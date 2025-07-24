import { useParams } from "react-router-dom";

const ProductsPage = () => {
  const { collectionId } = useParams();

  return (
    <section className="p-10 bg-white min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 capitalize">{collectionId.replace('-', ' ')} Products</h2>
      <p className="text-gray-500">Display products here for the collection: <strong>{collectionId}</strong></p>
    </section>
  );
};

export default ProductsPage;
