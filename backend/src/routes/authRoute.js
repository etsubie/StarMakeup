import express from "express"
import verifyToken from "../middleware/authMiddleware.js"
import { loginSatff, logoutStaff } from "../controller/auth/staffAuth.js"
import { login, register, logout } from "../controller/auth/userAuth.js"

const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/user-login', login)
authRouter.post('/user-logout', verifyToken, logout)

authRouter.post('/login', loginSatff)
authRouter.post('/logout', verifyToken, logoutStaff)

export default authRouter