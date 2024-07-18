import { Router } from "express"
const router = Router()
import CartsManager from "../controllers/cartsManager.js"
const cm = new CartsManager()


router.get("/api/carts",(req,res)=>{
    res.json(cm.getCarts())
})
router.post("/api/carts",(req,res)=>{
    cm.addCart(req.body)
    res.status(201).json({succes : "post carts"})
})
router.get("/api/carts/:cid",(req,res)=>{
    const id = parseInt(req.params.cid)
    res.json(cm.getCartProducts(id))
})
router.post("/api/carts/:cid/product/:pid",(req,res)=>{
    const cId = parseInt(req.params.cid)
    const pId = parseInt(req.params.pid)
    res.json(cm.addProductCart(cId,pId))
})
export default router
