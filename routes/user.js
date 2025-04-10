import express from "express"
import { deleteUser, getMe, login, register, updateUser } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router()

//register
router.post("/register",register)
router.post("/login",login)

router.get("/me",isAuthenticated, getMe)
router.put("/update/:id",updateUser)
router.delete("/delete/:id",deleteUser)




export default router;