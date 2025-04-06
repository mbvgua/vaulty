import { Router } from "express"

import { registerUser } from "./auth"

const authRouter:Router = Router()

authRouter.post('/register',registerUser)




export default authRouter