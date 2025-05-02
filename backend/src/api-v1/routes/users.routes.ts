import { Router } from "express"
import * as userEndPoint from "../controllers/users.controllers"
import { getUsers, getUserByEmail, updateUser, deleteAccount } from "../controllers/user-details.controllers"
import { verifyToken } from "../middleware/tokens.middleware"


const authRouter:Router = Router()

authRouter.post('/register',userEndPoint.registerUser)
authRouter.post('/login',userEndPoint.loginUser)
authRouter.post('/add-details/:id',userEndPoint.addUserDetails)
authRouter.get('/:id/get-all',verifyToken,getUsers)
authRouter.get('/:id/get-by-email',getUserByEmail)
authRouter.patch('/update/:id',updateUser)
authRouter.put('/deactivate/:id',userEndPoint.deactivateAccount)
authRouter.delete('/:id/delete/',verifyToken,deleteAccount)


export default authRouter