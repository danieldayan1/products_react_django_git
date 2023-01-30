
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import config from "../../../Utils/Config";
import "./ProductCard.css";
import * as React from 'react'

interface ProductCardProps {
    product: ProductModel;
}

function ProductCard(props: ProductCardProps): JSX.Element {


    return (
        <div className="ProductCard">
            <div className="col">
                <div className="card" >
                    <NavLink  to={`/products/details/` + "" +props.product.id}  style={{ textDecoration: 'none' }}>
                    <img src={config.productImagesUrl + props.product.imageName} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">name:{props.product.name}</h5>
                        <p className="card-text">price:{props.product.price}₪</p>
                        <p className="card-text">stock: {props.product.stock}</p>
                    </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
