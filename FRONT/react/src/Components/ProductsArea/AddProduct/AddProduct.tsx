import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/ProductsService";
import "./AddProduct.css";
import * as React from 'react'
import { ErrorMessage } from '@hookform/error-message';
import { useState } from "react";


function AddProduct(this: any): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<ProductModel>();
    const [cat , setCat] = useState<number>(0);


    async function send(product: ProductModel) {
        try {
            product.category = cat;
            const addedProduct = await productsService.addProduct(product);
            alert('product added succsessfuly !');
            navigate("/products/");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="AddProduct Box">
    
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit(send)}>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" {...register("name", {
                        required: { value: true, message: "Missing name" },
                        
                        min: { value: 3, message: "Name too short" },
                        max: { value: 25, message: "Name too long" }
                    })} />
                     <ErrorMessage errors={errors} name="name" render={({ message }) => <p>{message}</p>}/>
                    <label>Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="number" className="form-control" id="floatingInput" {...register("price", {
                        required: { value: true, message: "Missing price" },
                        min: { value: 1, message: "price cant be below 1" },
                        max: { value: 100, message: "price cant be over 100" }
                    })} />
                    <ErrorMessage errors={errors} name="price" render={({ message }) => <p>{message}</p>}/>
                    <label>Price</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="number" className="form-control" id="floatingInput" {...register("stock", {
                        required: { value: true, message: "Missing stock" },
                        min: { value: 1, message: "stock cant be below 1" },
                        max: { value: 100, message: "stock cant be over 100" }
                    })} />
                    <ErrorMessage errors={errors} name="stock" render={({ message }) => <p>{message}</p>}/>
                    <label>stock</label>
                </div>

                <div className="form-floating mb-3">
                    <select className="form-control" id="floatingInput" onChange={(option)=>setCat(+option.target.value)}>
                        <option value={0}>ALL</option>
                        <option value={1}>vegetables & fruits</option>
                        <option value={2}>meat</option>
                        <option value={3}>cakes</option>
                        <option value={4}>drinks</option>
                    </select>
                    <ErrorMessage errors={errors} name="category" render={({ message }) => <p>{message}</p>}/>
                    <label>category</label>
                </div>



                <div className="input-group mb-3">
                    <input type="file" className="form-control" id="inputGroupFile01" accept="image/*" {...register("image")} />
                </div>
                <button className="btn btn-primary">Add</button>
            </form>
        </div>
    );
}

export default AddProduct;
