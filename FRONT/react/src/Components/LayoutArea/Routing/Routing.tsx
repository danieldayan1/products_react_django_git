import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import AddProduct from "../../ProductsArea/AddProduct/AddProduct";
import EditProduct from "../../ProductsArea/EditProduct/EditProduct";
import ProductDeatils from "../../ProductsArea/ProductDeatils/ProductDeatils";
import ProductsList from "../../ProductsArea/ProductsList/ProductsList";
import ProdCountersList from "../../ShopArea/ProdCountersList/ProdCountersList";
import ShopSummary from "../../ShopArea/ShopSummary/ShopSummary";
import NotFound404 from "../NotFound404/NotFound404";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Navigate to="/home" />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/products" element={<ProductsList />}></Route>
                <Route path="/products/details/:prodId" element={<ProductDeatils />}></Route>
                <Route path="/products/new" element={<AddProduct />}></Route>
                <Route path="/products/edit/:prodToEdit" element={<EditProduct />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/logout" element={<Logout />}></Route>
                <Route path="/*" element={<NotFound404 />}></Route>
                <Route path="/shop" element={<ProdCountersList />}></Route>
                <Route path="/shop/summary" element={<ShopSummary />}></Route>
            </Routes>
        </div>
    );
}

export default Routing;
