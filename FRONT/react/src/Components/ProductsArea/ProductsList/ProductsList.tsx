import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/ProductsService";
import Loading from "../../SharedArea/Loading/Loading";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductsList.css";
import * as React from 'react'
import { productsStore } from "../../../redux/ProductsState";


function ProductsList(): JSX.Element {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [myCategory , setCategory] = useState<number>(0);
    let flag = productsStore.getState().updateFlag;
    let category:number=0;

    useEffect(() => {
        productsService.fetchAllProducts()
            .then(productsFromBackend => {setProducts(productsFromBackend);
                category = parseInt(localStorage.getItem("category")||'0');
                if(category>0){
                    filterByCategory(category);
                }})
            .catch(err => alert(err.message))

        return(()=>{
            if(flag){
                localStorage.removeItem("category");
            }
        })

    }, [flag])


    const filterByCategory = (category:number)=>{
        productsService.getProductsByCategory(category)
        .then(productsFromBackend => {
            setProducts(productsFromBackend);
            setCategory(category);
            localStorage.setItem("category",category.toString());})
        .catch(err => alert(err.message))
    }

    return (
        <div className="ProductsList">

            {products.length === 0 && <Loading />}
           <span><NavLink to="/products/new" title="add product" style={{textDecoration:"none"}}>➕</NavLink>  <b>Category:</b></span> <select  onChange={(option)=>filterByCategory(+option.target.value)} >
                        {myCategory==0 ? <option value={0} selected>ALL</option> : <option value={0}>ALL</option>}
                        {myCategory==1 ?<option value={1} selected>vegetables & fruits</option>:<option value={1} >vegetables & fruits</option>}
                        {myCategory==2 ?<option value={2} selected>meat</option>:<option value={2} >meat</option>}
                        {myCategory==3 ?<option value={3} selected>cakes</option>:<option value={3} >cakes</option>}
                        {myCategory==4 ?<option value={4} selected>drinks</option>:<option value={4} >drinks</option>}
                    </select>
            <br /> <br /> 
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </div>
    );
}

export default ProductsList;
