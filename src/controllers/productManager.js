import FsManager from "./fsManager.js"
const filePath = "./src/models/products.json"//path donde esta el json
const fs = new FsManager(filePath)
class ProductManager {
    constructor(){
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
        let empty = false
        const id = this.getProducts().length + 1 
        const p = {...product, status: true}//se cambia el valor porque el atributo ya existe
        const newProduct= {id: id,...p}//se agregar el nuevo atributo id porque no existe
        for(let clave in newProduct){
            if(newProduct[clave] === ""){
                empty = true
                break
            }
        }
        if(empty){
            return { "Error" : "Todos los campos son obligatorios"}
        }
        else{
            const products = fs.loadProducts()
            products.push(newProduct)
            fs.saveProducts(products)
        }
    }
    updateProduct(product,id){
        const pro = this.getProductById(id)
        if(pro){
            const products = fs.loadProducts()
            const newProducts = products.map(p=>{
                if(p.id == id){
                    return {...p, ...product, id: p.id}//actualizamos y mantenemos el id
                }
                return p//devolemos el objeto original
            })
            fs.saveProducts(newProducts)
        }
        else{
            return { "Error" : "there are not product"}
        }
    }
    deleteProduct(id){
        const pro = this.getProductById(id)
        if(pro){
            const products = fs.loadProducts()
            const newProducts = products.filter((p)=> p.id !== id)
            fs.saveProducts(newProducts)
        }
        else{
            return { "Error" : "there are not product"}
        }
    }
}

export default ProductManager
