import { Route, Routes } from "react-router"
import Home from './../Pages/Home';
import Products from './../Pages/Products';
import About from './../Pages/About';
import CollectionPage from "../Pages/CollectionPage";
import productsdetail from './../Pages/Productsdetail';

const Mainrouting = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/collection" element={<CollectionPage />} />
                <Route path="/productsdetail" element={<productsdetail />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    )
}

export default Mainrouting