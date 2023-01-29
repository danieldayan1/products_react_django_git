import { useEffect, useState } from "react";
import { useForm  } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import { productsStore } from "../../../redux/ProductsState";
import productsService from "../../../Services/ProductsService";
import config from "../../../Utils/Config";
import "./EditProduct.css";
import * as React from 'react'
import { ErrorMessage } from '@hookform/error-message';


function EditProduct(): JSX.Element {

    const [product, setProduct] = useState<ProductModel>();
    const navigate = useNavigate();
    const params = useParams();
    const { register, handleSubmit, formState, setValue , formState: { errors }} = useForm<ProductModel>();
    const [cat , setCat] = useState<number>(0);

    useEffect(() => {
        const prodToEditId = +params.prodToEdit; //Get Id From Route

        productsService.getOneProductById(prodToEditId) //Get Product to edit from service
            .then(prodToEdit => {
                setProduct(prodToEdit);
                setValue("id", prodToEdit.id); //set form Product
                setValue("name", prodToEdit.name);
                setValue("price", prodToEdit.price);
                setValue("stock", prodToEdit.stock);
                setCat(+prodToEdit.category)
            })
            .catch(err => alert(err.message)) // show message if something went wrong
            
    }, [])


    function send(formProduct: ProductModel) {
        formProduct.category = cat;
        productsService.editProduct(formProduct)
            .then(editedProduct => { 
                setProduct(editedProduct)
                alert(product.name + " has been edited!"); 
                navigate("/products/details/" + formProduct.id)
             })
            .catch(err => alert(err.message))
    }

    return (
        <div className="EditProduct Box">
            <h2>Edit Product</h2>
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
                        max: { value: 200, message: "price cant be over 200" }
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
                    <select className="form-control" id="floatingInput" onChange={(option)=>setCat(+option.target.value)} >
                        <option value={0}>ALL</option>
                        {cat==1 ? <option value={1} selected>vegetables & fruits</option>:<option value={1}>vegetables & fruits</option>}
                        {cat==2 ? <option value={2} selected>meat</option>:<option value={2}>meat</option>}
                        {cat==3 ? <option value={3} selected>cakes</option>:<option value={3}>cakes</option>}
                        {cat==4 ? <option value={4} selected>drinks</option>:<option value={4}>drinks</option>}
                    </select>
                    <ErrorMessage errors={errors} name="category" render={({ message }) => <p>{message}</p>}/>
                    <label>category</label>
                </div>


                {/* <div className="input-group mb-3">
                    <input type="file" className="form-control" id="inputGroupFile01" accept="image/*"  {...register("image")} />
                </div> */}
                <button className="btn btn-primary">Edit</button>
            </form>
        </div>
    );
}

export default EditProduct;
