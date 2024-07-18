// const { link } = require("../routes/products.routes")
import FsManager from "./fsManager.js"
const filePath = "./src/models/products.json"//path donde esta el json
const fs = new FsManager(filePath)
class ProductManager {
    constructor(){
        this.contId = 0
    }
    getProducts(limit){
        const products = fs.loadProducts()
        if(!isNaN(limit) && limit > 0){
            const p = products.slice(0,limit)
            return p
        }
        else{
            return products
        }
    }
    getProductById(id){
        const products = fs.loadProducts()
        return products.find(p => p.id === id)
    }
    addProduct(product){
        const id = this.contId++
        const newProduct= {id,...product}
        const products = fs.loadProducts()
        products.push(newProduct)
        fs.saveProducts(products)
    }
    updateProduct(product,id){
        const products = fs.loadProducts()
        const newProducts = products.map(p=>{
            if(p.id == id){
                return {...p, ...product, id: p.id}//actualizamos y mantenemos el id
            }
            return p//devolemos el objeto original
        })
        fs.saveProducts(newProducts)
    }
    deleteProduct(id){
        const products = fs.loadProducts()
        const newProducts = products.filter((p)=> p.id !== id)
        fs.saveProducts(newProducts)
    }
}

export default ProductManager
