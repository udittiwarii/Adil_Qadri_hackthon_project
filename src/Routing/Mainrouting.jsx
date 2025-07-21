import { Route, Routes } from "react-router"
import Home from './../Pages/Home';
import Products from './../Pages/Products';
import About from './../Pages/About';
import productsdetail from './../Pages/Productsdetail';

const Mainrouting = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/productsdetail" element={<productsdetail />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    )
}

export default Mainrouting