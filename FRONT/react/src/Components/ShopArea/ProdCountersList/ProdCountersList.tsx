import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import { shopStore } from "../../../redux/ShopStore";
import productsService from "../../../Services/ProductsService";
import Loading from "../../SharedArea/Loading/Loading";
import ProdCounter from "../ProdCounter/ProdCounter";
import "./ProdCountersList.css";

function ProdCountersList():JSX.Element { 
			
    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        productsService.fetchAllProducts()
            .then(productsFromBackend => setProducts(productsFromBackend))
            .catch(err => alert(err.message))
    }, [])


    return (
        <div className="ProdCountersList">

            {products.length === 0 && <Loading />}
            <span style ={{position:"absolute",margin:"5px"}}><NavLink to="/shop/summary"><button>PURCHASE</button></NavLink></span>
            <div className="row row-cols-1 row-cols-md-3 g-1">
                {products.map(p => <ProdCounter key={p.id} product={p} />)}
            </div>
        </div>
    );
}

export default ProdCountersList;



