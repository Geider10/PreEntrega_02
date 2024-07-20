import express from "express"
import ProductManager from "../controllers/productManager.js"

function routerIO (socketServer){
    const router = express.Router()
    const pm = new ProductManager()
    
    //segun el endpoint rendersiza una vista u otra
    router.get("/",(req,res)=>{
        const products = pm.getProducts()
        res.render("home",{products})
    })
    router.get("/realTimeProducts",(req,res)=>{
        const products = pm.getProducts()
        res.render("realTimeProducts",{products})
    })
    router.post("/realTimeProducts",(req,res)=>{
        const product = req.body
        // console.log(product);
        // socketServer.on("add",socket=>{
        //     console.log(socket);
        // })
        socketServer.emit("res",product)
        // res.render("realTimeProducts",{})
    })
    return router
}

export default routerIO