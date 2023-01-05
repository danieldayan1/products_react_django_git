import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import BuyModel from "../../../Models/BuyModel";
import ProductModel from "../../../Models/ProductModel";
import { productsStore } from "../../../redux/ProductsState";
import { shopStore } from "../../../redux/ShopStore";
import "./ShopSummary.css";
import * as React from 'react'

function ShopSummary(): JSX.Element {

    const buys:BuyModel[]= shopStore.getState().buys;
    const products:ProductModel[] = productsStore.getState().products;

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
                    <td>{buy.price}</td>
                </tr>
                )}
                <tr><td colSpan={3} ><NavLink to="/shop"><button>FINISH</button></NavLink></td></tr> 
            </table>
    
            }
        </div>
    );
}

export default ShopSummary;
