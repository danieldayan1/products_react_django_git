import { useNavigate, useParams } from "react-router-dom";
import "./ProductDeatils.css";
import config from "../../../Utils/Config";
import productService from "../../../Services/ProductsService";
import { useEffect , useState } from "react";
import ProductModel from "../../../Models/ProductModel";
import { NavLink } from "react-router-dom";
import * as React from 'react'
import { productsStore } from "../../../redux/ProductsState";



function ProductDeatils(): JSX.Element{

    const params = useParams()
    const navigate = useNavigate()
    const [product , setProduct] = useState<ProductModel>()
    const [id , useId] = useState<number>()
    const [name,useName] = useState<string>();
    const [imgName,useImgName] = useState<string>();
    const [price,usePrice] = useState<number>();
    const [stock,useStock] = useState<number>();
    let flag = productsStore.getState().updateFlag
   
    useEffect(()=>{ 

        const prodId = +params.prodId

        productService.getOneProductById(prodId)
            .then(p => {
                setProduct(p),
                localStorage.setItem("name",p.name.toString()),
                localStorage.setItem("price",p.price.toString()),
                localStorage.setItem("stock",p.stock.toString()),
                localStorage.setItem("imgName",p.imageName.toString()),
                localStorage.setItem("id",p.id.toString())
            })
            .catch(err => {
                useName(localStorage.getItem("name")),
                usePrice(parseInt(localStorage.getItem("price"))),
                useStock(parseInt(localStorage.getItem("stock"))),
                useImgName(localStorage.getItem("imgName")),
                useId(parseInt(localStorage.getItem("id")))
            })
        
       return(()=>{
        if(flag){
            localStorage.removeItem("name");
            localStorage.removeItem("price");
            localStorage.removeItem("stock");
            localStorage.removeItem("imgName");
            localStorage.removeItem("id");
        }
       })

       } , [flag])

    const deleteProduct = () =>{
        let pId:number=0
        if(product){
            pId = product.id;
        }else{
            pId = id;
        }
        productService.deleteProduct(pId)
            .then(()=> {
                alert(product.name + "has been delited !");
                navigate("/products");
            })
            .catch(err => alert(err.message))
        }
  

    return (
        <div className="ProductDeatils Box">
            { product && <div >
			<div className="card">
                { product.imageName?<img src={config.productImagesUrl + product.imageName} className="card-img-top" alt="..."/>:<img src={config.productImagesUrl + imgName} className="card-img-top" alt="..."/>}
                    <div className="card-body">
                        <p className="card-text">name: {product.name?product.name:name}</p>
                        <p className="card-text">price: {product.price?product.price:price}</p>
                        <p className="card-text">stock: {product.stock?product.stock:stock}</p>
                    </div>
                    <NavLink to = '/products' ><button className="btn btn-warning">BACK</button></NavLink>
                    {product.id?<NavLink to = {'/products/edit/'+product.id}><button className="btn btn-success">EDIT</button></NavLink>:<NavLink to = {`/products/edit/+${id}`}><button className="btn btn-success" >EDIT</button></NavLink>}
                    <button className="btn btn-danger" onClick = {deleteProduct}>DELETE</button>
                </div>
            </div>} 
        </div>
    )
}
export default ProductDeatils;
