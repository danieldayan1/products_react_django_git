import "./ProdCounter.css";
import ProductModel from "../../../Models/ProductModel";
import { useEffect, useState } from "react";
import config from "../../../Utils/Config";
import { ShopActionType, shopStore } from "../../../redux/ShopStore";
import BuyModel from "../../../Models/BuyModel";
import productsService from "../../../Services/ProductsService";

interface PropsProdCounter{
    product:ProductModel;  
}

function ProdCounter(props:PropsProdCounter): JSX.Element {

    const [counter , setCounter] = useState<number>()

    useEffect(()=>{
        setCounter(0);
    },[])
 
    function addCounter(){
        if(counter<props.product.stock){
            edit();
            setCounter(counter+1);
        }
    }   

    function subCounter(){
        if(counter>0){
            edit();
            setCounter(counter-1);
        }
    }


    function edit() {
        let myCounter = counter+1 
        let buy = new BuyModel()
        buy.id = props.product.id;
        buy.amount = myCounter;
        buy.price = myCounter * props.product.price ;
        shopStore.dispatch({type:ShopActionType.EditProduct , payload:buy});
        
        
        productsService.getOneProductById(buy.id)
            .then(prodFromServer => {
                prodFromServer.stock = prodFromServer.stock - myCounter;
                productsService.editProduct(prodFromServer).catch(err => alert(err.message))
            })
            .catch(err => alert(err.message))
    }



    return (
        <div className="ProdCounter">
            <span>{props.product.id}) </span>
            <img src={config.productImagesUrl + props.product.imageName} className="card-img-top" alt="..." />
            {props.product.name} <span className="badge badge-primary m-2">{counter} / {props.product.stock}</span> 
            <button className="btn btn-secondary btn-sm" onClick={addCounter}>Increment</button> <button className="btn btn-secondary btn-sm" onClick={subCounter}>Sub</button>
        </div>
    );
}

export default ProdCounter;
