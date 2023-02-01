import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import { shopStore } from "../../../redux/ShopStore";
import productsService from "../../../Services/ProductsService";
import Loading from "../../SharedArea/Loading/Loading";
import ProdCounter from "../ProdCounter/ProdCounter";
import "./ProdCountersList.css";
import * as React from 'react'
import { productsStore } from "../../../redux/ProductsState";

function ProdCountersList():JSX.Element { 
			
    const [products, setProducts] = useState<ProductModel[]>([]);
    const[totalBuys , setTotalBuys]   = useState<number>(0);
    const [myCategory , setCategory] = useState<number>(0);
    let flag = productsStore.getState().updateFlag;
    let category:number=0;
  

    useEffect(() => {
        
        productsService.fetchAllProducts()
            .then(productsFromBackend => {
                setProducts(productsFromBackend);  
                category = parseInt(localStorage.getItem("category")||'0');
                if(category>0){
                    filterByCategory(category);
                }})
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

        return (() => {
            unsubscribe();
            if(flag){
                localStorage.removeItem("category");
            }
        })

    }, [flag])

    const filterByCategory = (category:number)=>{
        productsService.getProductsByCategory(category)
        .then(productsFromBackend => {setProducts(productsFromBackend);setCategory(category);localStorage.setItem("category",category.toString());})
        .catch(err => alert(err.message))
    }

    return (
        <div className="ProdCountersList">

            {products.length === 0  && <Loading />}
            <span><b>Category: </b></span><select onChange={(option)=>{filterByCategory(+option.target.value);}} >
                        {myCategory==0 ? <option value={0} selected>ALL</option> : <option value={0}>ALL</option>}
                        {myCategory==1 ?<option value={1} selected>vegetables & fruits</option>:<option value={1} >vegetables & fruits</option>}
                        {myCategory==2 ?<option value={2} selected>meat</option>:<option value={2} >meat</option>}
                        {myCategory==3 ?<option value={3} selected>cakes</option>:<option value={3} >cakes</option>}
                        {myCategory==4 ?<option value={4} selected>drinks</option>:<option value={4} >drinks</option>}
            </select>
            <br /><br />
            <div className="row row-cols-1 row-cols-md-3 g-1">
                {products.map(p => <ProdCounter key={p.id} product={p} />)}
            </div>
            <br /><br />
            <p>
            TOTAL PRICE:{totalBuys}${totalBuys=== 0? <span className="button_no_active"><NavLink to="/shop/summary"><button onClick={()=>{localStorage.removeItem("category")}}>PURCHASE</button></NavLink></span>:<span className="button_active"><NavLink to="/shop/summary"><button onClick={()=>{localStorage.removeItem("category")}}>PURCHASE</button></NavLink></span>}
            </p>
        </div>
    );
}

export default ProdCountersList;



