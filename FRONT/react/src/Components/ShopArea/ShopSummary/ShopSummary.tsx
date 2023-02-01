import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BuyModel from "../../../Models/BuyModel";
import ProductModel from "../../../Models/ProductModel";
import { productsStore } from "../../../redux/ProductsState";
import { shopStore } from "../../../redux/ShopStore";
import "./ShopSummary.css";
import * as React from 'react'
import productsService from "../../../Services/ProductsService";

function ShopSummary(): JSX.Element {

    // let products:ProductModel[] ;
    const [total , setTotal] = useState<number>(0);
    const [myBuys , setMyBuys] = useState<BuyModel[]>([...shopStore.getState().buys]);
    const [products , setProducts] = useState<ProductModel[]>([...productsStore.getState().products]);
    const navigate  = useNavigate();
    
    useEffect(()=>{

        //products
        productsService.fetchAllProducts()
        .then(productsFromBackend =>setProducts(productsFromBackend))
        .catch(err => alert(err.message))

        //BUYS 
        if(!myBuys.length) {
            setMyBuys(JSON.parse(localStorage.getItem("buys") || "[]") as BuyModel[]);
        }else{
            setTotal(parseInt(localStorage.getItem("total") || "0"));
        }
        localStorage.setItem("buys", JSON.stringify(myBuys));

        //TOTAL
        let myTotal = parseInt(localStorage.getItem("total") || "0");
        if(myTotal==0){
            for(let i=0 ; i<myBuys.length ; i++){
                myTotal += myBuys.at(i).price;
            }
        }
        setTotal(myTotal);
        localStorage.setItem("total",myTotal.toString())   //save total price in cookies
        
    },[])


    const finishBuy = () =>{
        let success = true;
        for(let i=0;i<myBuys.length;i++){
            productsService.getOneProductById(myBuys[i].id) //Get Product to edit from service
            .then(prodToEdit => {
                prodToEdit.stock = prodToEdit.stock - myBuys[i].amount
                productsService.editProduct(prodToEdit) // Edit product with new amount
                .then(editedProduct => { })
                .catch(err=> success = false)
                })
            .catch(err=> success = false)
            }
            if(success){
                localStorage.removeItem("buys");
                localStorage.removeItem("total");
                alert("purchase has been made !");
                navigate("/shop");
            }else{
                alert("purchased failed . please try again !")
            }
    }


    return (
        <div className="ShopSummary">
            {myBuys && <table>
                <tr>
                    <th>NAME</th>
                    <th>AMOUNT</th>
                    <th>PRICE</th>
                </tr>
                {myBuys.map(buy => <tr>
                    <td>{(products.filter(p=>p.id === buy.id)[0] || {}).name}</td>
                    <td>{buy.amount}</td>
                    <td>{buy.price}$</td>
                </tr>
                )}
                <tr><td colSpan={3}>Total: {total}$</td></tr>
                <tr><td colSpan={3} ><button onClick={finishBuy}>FINISH</button></td></tr> 
            </table>
            }
        </div>
    );
}

export default ShopSummary;
