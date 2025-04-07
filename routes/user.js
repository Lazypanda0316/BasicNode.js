import express from "express"
import { deleteUser, getMe, register, updateUser } from "../controllers/user.js";
const router = express.Router()

//register
router.post("/register",register)
router.get("/me/:id",getMe)
router.put("/update/:id",updateUser)
router.delete("/delete/:id",deleteUser)




export default router;