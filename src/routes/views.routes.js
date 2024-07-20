import express from "express"
import ProductManager from "../controllers/productManager.js"

const router = express.Router()
const pm = new ProductManager()

//segun el endpoint rendersiza una vista u otra
router.get("/",(req,res)=>{
    const products = pm.getProducts()
    res.render("home",{products})
})
router.get("/realTimeProducts",(req,res)=>{
    res.render("realTimeProducts",{})
})
router.post("/realTimeProducts",(req,res)=>{
    // res.render("realTimeProducts",{})
    // const products = pm.getProducts()
    // res.render("realTimeProducts",{products})
})
export default router