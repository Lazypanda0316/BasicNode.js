import express from "express";
import { deleteProduct, getproduct, input, updateProduct } from "../controllers/product.js";
const router =express.Router()

router.post("/input",input)
router.get("/get/:id",getproduct)
router.put("/update/:id",updateProduct)
router.delete("/delete/:id",deleteProduct)

export default router;