import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

import { nodeMailerConfigOptions } from "../api-v1/models/node-mailer.model";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// create the transporter
const nodeMailerConfig: nodeMailerConfigOptions = {
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
};

//create and export the transporter
export const transporter = nodemailer.createTransport(nodeMailerConfig);
