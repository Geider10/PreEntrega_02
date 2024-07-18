import express from "express"
import ProductManager from "../controllers/productManager.js"

const router = express.Router()
const pm = new ProductManager()

router.get("/",(req,res)=>{
    const products = pm.getProducts()
    res.render("home",{products})
})

export default router