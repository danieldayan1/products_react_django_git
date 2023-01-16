import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import { shopStore } from "../../../redux/ShopStore";
import productsService from "../../../Services/ProductsService";
import Loading from "../../SharedArea/Loading/Loading";
import ProdCounter from "../ProdCounter/ProdCounter";
import "./ProdCountersList.css";
import * as React from 'react'
import BuyModel from "../../../Models/BuyModel";

function ProdCountersList():JSX.Element { 
			
    const [products, setProducts] = useState<ProductModel[]>([]);
    const[totalBuys , setTotalBuys]   = useState<number>(0);

    useEffect(() => {
        productsService.fetchAllProducts()
            .then(productsFromBackend => setProducts(productsFromBackend))
            .catch(err => alert(err.message))

            const buys = shopStore.getState().buys

            const unsubscribe = shopStore.subscribe(() => { //listen to any changes, and invoke the callback when something changed
            let total = 0 ; 
            for(let i=0 ; i<buys.length ; i++){
                total += buys.at(i).price
            }
            setTotalBuys(total)
            total = 0
        })

        return () => {
            unsubscribe();
        }

    }, [shopStore.getState().updateFlag])

    const filterByCategory = (category:number)=>{
        productsService.getProductsByCategory(category)
        .then(productsFromBackend => setProducts(productsFromBackend))
        .catch(err => alert(err.message))
    }

    return (
        <div className="ProdCountersList">

            {products.length === 0 && <Loading />}
            <span><b>Category: </b></span><select onChange={(option)=>filterByCategory(+option.target.value)} >
                        <option value={0}>ALL</option>
                        <option value={1}>vegetables & fruits</option>
                        <option value={2}>meat</option>
                        <option value={3}>cakes</option>
                        <option value={4}>drinks</option>
            </select>
            <br /><br />
            <div className="row row-cols-1 row-cols-md-3 g-1">
                {products.map(p => <ProdCounter key={p.id} product={p} />)}
            </div>
            <br /><br />
            <p>
                TOTAL PRICE:{totalBuys}$ 
                <span style ={{position:"absolute",margin:"5px"}}><NavLink to="/shop/summary"><button>PURCHASE</button></NavLink></span>
            </p>
        </div>
    );
}

export default ProdCountersList;



