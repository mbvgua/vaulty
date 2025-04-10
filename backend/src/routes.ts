import { Router } from "express"

import { deactivateAccount, getUserByEmail, getUsers, loginUser, registerUser, updateUser } from "./auth"

const authRouter:Router = Router()

authRouter.post('/register',registerUser)
authRouter.post('/login',loginUser)
authRouter.get('/get-all',getUsers)
authRouter.get('/get-by-email',getUserByEmail)
authRouter.patch('/update/:id',updateUser)
authRouter.patch('/deactivate/:id',deactivateAccount)


export default authRouter