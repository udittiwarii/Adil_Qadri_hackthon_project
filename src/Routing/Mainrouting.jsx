import { Route, Routes } from "react-router";
import Home from './../Pages/Home';
import About from './../pages/About';
import CollectionPage from "../pages/CollectionPage";
import Productsdetail from './../pages/Productsdetail';
import ProtectedRoute from './ProtectedRoute';
import Profile from './../Pages/Profile';
import Login from './../Pages/Login';
import Contact from './../Pages/Contact';
import Products from './../Pages/Products';

const Mainrouting = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products/:id" element={<Products />} />
            <Route path="/ProductDetail/:productId" element={<Productsdetail />} />
            <Route path="/profile" element={<Profile />} />


            {/* ✅ Add login route */}
            <Route path="/login" element={<Login />} />

            <Route
                path="/collection"
                element={
                    <ProtectedRoute>
                        <CollectionPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default Mainrouting;
