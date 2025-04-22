import { Router } from "express"
import { registerUser } from "../controllers/users.controllers"


const authRouter = Router()

authRouter.post('/register',registerUser)


export default authRouter