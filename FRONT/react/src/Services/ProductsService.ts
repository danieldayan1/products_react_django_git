import axios from "axios";
import ProductModel from "../Models/ProductModel";
import { ProductsActionType, productsStore } from "../redux/ProductsState";
import config from "../Utils/Config";

class ProductsService {

    public async fetchAllProducts(): Promise<ProductModel[]> {

        let products = productsStore.getState().products;

        if (products.length === 0) {
            const response = await axios.get<ProductModel[]>(config.productsUrl);
            products = response.data;
            productsStore.dispatch({ type: ProductsActionType.FetchAllProducts, payload: products })
        }

        return products;
    }

    public async getOneProductById(id: number): Promise<ProductModel> {

        let products = productsStore.getState().products;
        
        let product =  products.find((p:ProductModel) => p.id === id);
        
        if (!product) {
          
            const response = await axios.get<ProductModel>(config.productsUrl + id); 
            product = response.data;
        }
        
        return product;
    }

    public async getProductsByCategory(category:number):Promise<ProductModel[]>{

        let products = productsStore.getState().products;
        let products_category =  products.filter((p:ProductModel) => p.category === category);
        
        if (products_category.length == 0 || category == 0 ) {
            return products
        }
        return products_category
    }

    public async addProduct(product: ProductModel): Promise<ProductModel> {

        const formData = new FormData();

        formData.append("name", product.name)
        formData.append("price", product.price.toString())
        formData.append("stock", product.stock.toString())
        // formData.append("image", product.image.item(0))
        formData.append("category", product.category.toString())
       
        const response = await axios.post<ProductModel>(config.productsUrl+  
        `${product.name} , ${product.stock} , ${product.price} , ${product.category}`);
        const addedProduct = response.data;


        productsStore.dispatch({ type: ProductsActionType.AddProduct, payload: addedProduct })

        return addedProduct;
    }

    public async editProduct(product: ProductModel): Promise<ProductModel> {
        const formData = new FormData();
        formData.append("name", product.name)
        formData.append("price", product.price.toString())
        formData.append("stock", product.stock.toString())
        formData.append("category", product.category.toString())
        // if (product.image) {
        //     formData.append("image", product.image.item(0))
        // }
       
        
        const response = await axios.put<ProductModel>(config.productsUrl + product.id + '/' +
            `${product.name} , ${product.stock} , ${product.price} , ${product.category}`)
        const editedProduct = response.data;
        productsStore.dispatch({ type: ProductsActionType.EditProduct, payload: editedProduct })
        
        return editedProduct;
    }

    public async deleteProduct(id: number): Promise<void> {
        await axios.delete(config.productsUrl + id);

        productsStore.dispatch({ type: ProductsActionType.DeleteProduct, payload: id })
    }
}
const productsService = new ProductsService();
export default productsService;
