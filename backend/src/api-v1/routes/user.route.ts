import { Router } from "express";
import { loginUser, registerUser, verifyEmail } from "../controllers/user.controller";

const authRouter: Router = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/verify-email/:id", verifyEmail);

export default authRouter;
