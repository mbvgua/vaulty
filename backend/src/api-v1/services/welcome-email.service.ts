import { Response } from "express";
import dotenv from "dotenv";
import path from "path";
import handlebars from "handlebars";
import { pool } from "../../config/db.config";
import fs from "fs";

import { Users } from "../models/user.model";
import { sendEmail } from "../helpers/send-email.helper";
import { nodeMailerMessageOptions } from "../models/node-mailer.model";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// Get the absolute path to the template
const templatePath = path.resolve(
  __dirname,
  "../../../templates/welcome-email.html",
);

// Read the raw HTML from the file
const source = fs.readFileSync(templatePath, "utf8");

// Compile the Handlebars template
const compiledTemplate = handlebars.compile(source);

//export async function sendWelcomeEmail(message: nodeMailerMessageOptions, response:Response) {
export async function welcomeUser() {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query(
      "SELECT * FROM users WHERE is_welcome_email_sent=0 AND is_deactivated=0 AND is_deleted=0;",
    );
    // BUG: when I use the stored procedure, it returne a ResultHeader alongside
    // the query that makes it harder to destructure in the .forEach below
    //const [rows, fields] = await connection.query("CALL getUnverifiedUsers();");
    const unverifiedUsers = rows as Users[];

    if (unverifiedUsers.length > 0) {
      unverifiedUsers.forEach(async (user) => {
        const data = compiledTemplate({
          name: user.user_name,
          email: user.email,
        });

        //define what the email will contain
        let message: nodeMailerMessageOptions = {
          from: process.env.EMAIL,
          to: user.email,
          subject: "welcome to vaulty",
          html: data,
        };

        //send the email using the email helper
        await sendEmail(message);

        ////update the user in the db
        await connection.query(
          `UPDATE users SET is_welcome_email_sent=1 WHERE id="${user.id}"`,
        );

        //TODO: figure out how to return this as a response
        console.log(
          JSON.stringify({
            code: 200,
            status: "success",
            message: "All welcome emails have successfully been sent",
            data: message.subject,
            metadata: {},
          }),
        );
      });
    } else {
      // else if no users with unverified email status
      console.log(
        JSON.stringify({
          code: 200,
          status: "success",
          message:
            "Currenly no users needing email verification. Try again later?",
          data: {},
          metadata: {},
        }),
      );
    }
  } catch (error) {
    console.log(
      JSON.stringify({
        code: 500,
        status: "error",
        message: "Internal server error occurred: ",
        data: error,
        metadata: {},
      }),
    );
  }
}
