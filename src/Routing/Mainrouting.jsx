import { Route, Routes } from "react-router";
import Home from './../Pages/Home';
import About from './../Pages/About';
import CollectionPage from "./../Pages/CollectionPage";
import Productsdetail from './../Pages/Productsdetail';
import ProtectedRoute from './ProtectedRoute';
import Profile from './../Pages/Profile';
import Login from './../Pages/Login';
import Contact from './../Pages/Contact';
import Products from './../Pages/Products';
import CartPage from "../Pages/CartPage";

const Mainrouting = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products/:id" element={
                    <Products />
            } />
            <Route path="/ProductDetail/:productId" element={
                    <Productsdetail />}/>
            <Route path="/profile" element={<Profile />} />
            <Route path="/Cart" element={<CartPage />} />

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
