import express, { json } from "express";
import dotenv from "dotenv";
import authRouter from "./api-v1/routes/users.routes";

dotenv.config();

const app = express();

app.use(json()); // middleware. adds body to all requests
app.use("/v1/auth", authRouter);

export default app;
