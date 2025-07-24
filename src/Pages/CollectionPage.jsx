import CollectionGrid from './../Components/collectioncomponents/CollectionGrid';

const CollectionPage = () => {
  return (
    <section className="py-12 px-4 md:px-12 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-10">Our Collections</h2>
      <CollectionGrid />
    </section>
  );
};

export default CollectionPage;
