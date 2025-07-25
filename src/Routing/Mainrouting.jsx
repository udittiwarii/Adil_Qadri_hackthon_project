import { Route, Routes } from "react-router";
import Home from './../Pages/Home';
import Products from './../Pages/Products';
import About from './../Pages/About';
import CollectionPage from "../Pages/CollectionPage";
import Productsdetail from './../Pages/Productsdetail'; // Capitalized correctly

const Mainrouting = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products/:id" element={<Products />} /> {/* or /products/:id if needed */}
                <Route path="/collection" element={<CollectionPage />} />
                <Route path="/ProductDetail/:productId" element={<Productsdetail />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    );
};

export default Mainrouting;
