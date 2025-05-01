import { Router } from "express"
import { addUserDetails, deactivateAccount, loginUser, registerUser } from "../controllers/users.controllers"
import { getUsers, getUserByEmail, updateUser, deleteAccount } from "../controllers/user-details.controllers"


const authRouter:Router = Router()

authRouter.post('/register',registerUser)
authRouter.post('/login',loginUser)
authRouter.post('/add-details/:id',addUserDetails)
authRouter.get('/:id/get-all',getUsers)
authRouter.get('/:id/get-by-email',getUserByEmail)
authRouter.patch('/update/:id',updateUser)
authRouter.put('/deactivate/:id',deactivateAccount)
authRouter.delete('/:id/delete/',deleteAccount)


export default authRouter