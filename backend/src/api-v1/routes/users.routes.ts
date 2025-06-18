import { Router } from "express";
import { registerUser } from "../controllers/users.controllers";

const authRouter: Router = Router();

authRouter.post("/register", registerUser);

export default authRouter;
