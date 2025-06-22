import { Response } from "express";
import dotenv from "dotenv";
import path from "path";
import handlebars from "handlebars";
import fs from "fs";

import { transporter } from "../../config/node-mailer.config";
import { nodeMailerMessageOptions } from "../models/node-mailer.model";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// Get the absolute path to the template
const templatePath = path.resolve(__dirname, "../../../templates/welcome.html");

// Read the raw HTML from the file
const source = fs.readFileSync(templatePath, "utf8");

// Compile the Handlebars template
const compiledTemplate = handlebars.compile(source);

const html = compiledTemplate({
  name: "sentinel",
  email: process.env.EMAIL_RECEPIENT,
});

//define what the email will contain
let message: nodeMailerMessageOptions = {
  from: process.env.EMAIL,
  to: process.env.EMAIL_RECEPIENT,
  subject: "welcome to vaulty",
  html: html,
};

async function sendWelcomeEmail(
  message: nodeMailerMessageOptions,
  response: Response,
) {
  await transporter.sendMail(message, (err, info) => {
    if (err) {
      return response.status(422).json({
        code: 422,
        status: "error",
        message: "Error occurred while processing email: ",
        data: err,
        metadata: {},
      });
    }
    return response.status(200).json({
      code: 200,
      status: "success",
      message: "Email succesfully sent",
      data: message.subject,
      metadata: {},
    });
  });
}

//sendWelcomeEmail(message)
