import { Router } from "express"
import { addUserDetails, deactivateAccount, loginUser, reactivateAccount, registerUser } from "../controllers/users.controllers"
import { getUsers, getUserByEmail, updateUser } from "../controllers/user-details.controllers"


const authRouter:Router = Router()

authRouter.post('/register',registerUser)
authRouter.post('/login',loginUser)
authRouter.post('/add-details/:id',addUserDetails)
authRouter.get('/get-all',getUsers)
authRouter.get('/get-by-email',getUserByEmail)
authRouter.patch('/update/:id',updateUser)
authRouter.put('/deactivate/:id',deactivateAccount)
authRouter.patch('/reactivate/:id',reactivateAccount)


export default authRouter