import express, { json } from "express";
import dotenv from "dotenv";
import { limiter } from "./api-v1/helpers/rate-limit.helper";
import authRouter from "./api-v1/routes/user.route";

dotenv.config();

const app = express();

app.use(json()); // middleware. adds body to all requests
app.use(limiter);

//routes within app
app.use("/v1/auth", authRouter);

export default app;
