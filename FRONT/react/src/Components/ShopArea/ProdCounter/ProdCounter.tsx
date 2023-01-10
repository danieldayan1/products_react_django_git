import "./ProdCounter.css";
import ProductModel from "../../../Models/ProductModel";
import { useEffect, useState } from "react";
import config from "../../../Utils/Config";
import { ShopActionType, shopStore } from "../../../redux/ShopStore";
import BuyModel from "../../../Models/BuyModel";
import productsService from "../../../Services/ProductsService";
import * as React from 'react'
import ProdCountersList from "../ProdCountersList/ProdCountersList";


interface PropsProdCounter{
    product:ProductModel;  
}

function ProdCounter(props:PropsProdCounter): JSX.Element {

    const [counter , setCounter] = useState<number>()
    const [price, setPrice] = useState<number>()
   

    useEffect(()=>{
        setCounter(0);
        setPrice(0);
    },[])
 
    const addCounter = ()=>{
        if(counter<props.product.stock){
            setCounter(counter+1);
            setPrice(props.product.price*(counter+1))
            editBuy(counter+1,props.product.price*(counter+1))
        }
    }   

    const subCounter = ()=>{
        if(counter>0){
            setCounter(counter-1);
            setPrice(props.product.price*(counter-1))
            editBuy(counter-1 , props.product.price*(counter-1))
        }
    }


    const editBuy = (c:number , p:number)=> {
        let buy = new BuyModel()
        buy.id = props.product.id;
        buy.amount = c; 
        buy.price = p ;
        shopStore.dispatch({type:ShopActionType.EditBuy , payload:buy});
    }



    return (
        <div className="ProdCounter">
            <span>{props.product.id}) </span>
            <img src={config.productImagesUrl + props.product.imageName} className="card-img-top" alt="..." />
            {props.product.name} <span className="badge badge-primary m-2">{counter} / {props.product.stock} =  {price}$</span> 
            <button className="btn btn-secondary btn-sm"  onClick={addCounter}>+</button> <button className="btn btn-secondary btn-sm" onClick={subCounter}>-</button>
        </div>
    );
}

export default ProdCounter;
