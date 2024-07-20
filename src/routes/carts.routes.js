import { Router } from "express"
const router = Router()
import CartsManager from "../controllers/cartsManager.js"
const cm = new CartsManager()

router.get("/",(req,res)=>{
    res.json(cm.getCarts())
})
router.post("/",(req,res)=>{
    cm.addCart(req.body)
    res.status(201).json({succes : "post carts"})
})
router.get("/:cid",(req,res)=>{
    const id = parseInt(req.params.cid)
    res.json(cm.getCartProducts(id))
})
router.post("/:cid/productRouter/:pid",(req,res)=>{
    const cId = parseInt(req.params.cid)
    const pId = parseInt(req.params.pid)
    res.json(cm.addProductCart(cId,pId))
})
export default router
