import { useEffect, useState } from "react";
import { productsStore } from "../../../redux/ProductsState";
import "./TotalProducts.css";
import React from "react";

function TotalProducts(): JSX.Element {

    const [count, setCount] = useState<number>(0);
    let flag = productsStore.getState().updateFlag

    useEffect(() => {
        //Take products length when our site is up
        setCount(productsStore.getState().products.length);
        

        const unsubscribe = productsStore.subscribe(() => { //listen to any changes, and invoke the callback when something changed
            setCount(productsStore.getState().products.length)
        })

        return () => {
            unsubscribe();
        }

    }, [flag])


    return (
        <div className="TotalProducts">
            <span>Total Products: {count}</span>
        </div>
    );
}

export default TotalProducts;
