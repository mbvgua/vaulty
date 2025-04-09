import { Router } from "express"

import { loginUser, registerUser } from "./auth"

const authRouter:Router = Router()

authRouter.post('/register',registerUser)
authRouter.post('/login',loginUser)



export default authRouter