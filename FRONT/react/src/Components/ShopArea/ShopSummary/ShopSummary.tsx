import { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import BuyModel from "../../../Models/BuyModel";
import ProductModel from "../../../Models/ProductModel";
import { productsStore } from "../../../redux/ProductsState";
import { shopStore } from "../../../redux/ShopStore";
import "./ShopSummary.css";
import * as React from 'react'
import productsService from "../../../Services/ProductsService";

function ShopSummary(): JSX.Element {

    const buys:BuyModel[]= shopStore.getState().buys;
    const products:ProductModel[] = productsStore.getState().products;
    const [total , setTotal] = useState<number>(0)
    const navigate  = useNavigate()

    useEffect(()=>{
        let total = 0 ; 
        for(let i=0 ; i<buys.length ; i++){
            total += buys.at(i).price
        }
        setTotal(total)
    },[])


    const finishBuy = () =>{
        let success = true;
        for(let i=0;i<buys.length;i++){
            productsService.getOneProductById(buys[i].id) //Get Product to edit from service
            .then(prodToEdit => {
                prodToEdit.stock = prodToEdit.stock - buys[i].amount
                productsService.editProduct(prodToEdit) // Edit product with new amount
                .then(editedProduct => { })
                .catch(err=> success = false)
                })
            .catch(err=> success = false)
            }
            if(success){
                alert("purchase has been made !");
                navigate("/shop");
            }else{
                alert("purchased failed . please try again !")
            }
    }

    return (
        <div className="ShopSummary">
            {buys && <table>
                <tr>
                    <th>NAME</th>
                    <th>AMOUNT</th>
                    <th>PRICE</th>
                </tr>
                {buys.map(buy => <tr>
                    <td>{products.filter(p=>p.id === buy.id)[0].name}</td>
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
