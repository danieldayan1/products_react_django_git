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
    let flag = productsStore.getState().updateFlag

    useEffect(() => {
        productsService.fetchAllProducts()
            .then(productsFromBackend => setProducts(productsFromBackend))
            .catch(err => alert(err.message))
    }, [flag])


    const filterByCategory = (category:number)=>{
        productsService.getProductsByCategory(category)
        .then(productsFromBackend => setProducts(productsFromBackend))
        .catch(err => alert(err.message))
    }

    return (
        <div className="ProductsList">

            {products.length === 0 && <Loading />}
           <span><NavLink to="/products/new" title="add product" style={{textDecoration:"none"}}>➕</NavLink>  <b>Category:</b></span> <select  onChange={(option)=>filterByCategory(+option.target.value)} >
                        <option value={0}>ALL</option>
                        <option value={1}>vegetables & fruits</option>
                        <option value={2}>meat</option>
                        <option value={3}>cakes</option>
                        <option value={4}>drinks</option>
                    </select>
            <br /> <br /> 
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </div>
    );
}

export default ProductsList;
