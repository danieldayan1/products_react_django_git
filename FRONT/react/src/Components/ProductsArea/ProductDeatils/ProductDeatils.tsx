import { useNavigate, useParams } from "react-router-dom";
import "./ProductDeatils.css";
import config from "../../../Utils/Config";
import productService from "../../../Services/ProductsService";
import { useEffect , useState } from "react";
import ProductModel from "../../../Models/ProductModel";
import { NavLink } from "react-router-dom";



function ProductDeatils(): JSX.Element{

    const params = useParams()
    const navigate = useNavigate()
    const [product , setProduct] = useState<ProductModel>()
    
    useEffect(()=>{
        const prodId = +params.prodId
        productService.getOneProductById(prodId)
            .then(p => setProduct(p))
            .catch(err => navigate("/products"))

       } , [true])


    function deleteProduct(){
        productService.deleteProduct(product.id)
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
                <img src={config.productImagesUrl + product.imageName} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <p className="card-text">name: {product.name}</p>
                        <p className="card-text">price: {product.price}</p>
                        <p className="card-text">stock: {product.stock}</p>
                    </div>
                    <NavLink to = '/products' ><button className="btn btn-warning">BACK</button></NavLink>
                    <NavLink to = {'/products/edit/'+product.id}><button className="btn btn-success">EDIT</button></NavLink>
                    <button className="btn btn-danger" onClick = {deleteProduct}>DELETE</button>
                </div>
            </div>} 
        </div>
    )
}
export default ProductDeatils;
