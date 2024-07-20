import FsManager from "./fsManager.js"
const fs = new FsManager("./src/models/carts.json")
import ProductManager from "./productManager.js"
const pm = new ProductManager()

class CartsManager{
    constructor(){
       
    }
    getCarts(){
        const carts = fs.loadProducts()
        return carts
    }
    addCart(cart){
        const carts = fs.loadProducts()
        const id = this.getCarts().length + 1
        const newCart = {id : id,...cart}
        carts.push(newCart)
        fs.saveProducts(carts)
    }
    getCartProducts(id){
        const carts = fs.loadProducts()
        return carts.find(c => c.id == id)
    }
    addProductCart(cartId,productId){
        const carts = fs.loadProducts()
        const cart = carts.find(c => c.id == cartId)
        if(cart){
            const productsFilter = cart.products.some(p => p.id == productId)
            if(productsFilter){//increment the product
                const c = cart.products.map(p => {
                    if(p.id == productId){
                        const pro = {id : p.id, quantity: p.quantity+1}
                        return {...p, ...pro}//replace: first old object, after new object
                    }
                    return p
                })
                const cartsFilter = carts.filter(c => c.id !== cartId)
                const p = [...cartsFilter,{id: cartId, products : c}]
                fs.saveProducts(p)
                return p
            }
            else{//create the product
                const productJson = pm.getProductById(productId)
                if(productJson){
                    const cartsFilter = carts.filter(c => c.id !== cartId)
                    cart.products.push({id:productJson.id, quantity: 1})//add new product at cart1
                    //create new array carts and add new cart1
                    const newProducts = [ ...cartsFilter,{id: cartId,products: cart.products }]
                    fs.saveProducts(newProducts)
                    return newProducts
                }
                else{
                    return {error : "there is no product"}
                }
            }
        }
        else{
            return {error : "there is no cart"}
        }
    }
}
export default CartsManager