import dotenv from "dotenv";
import path from "path";
import handlebars from "handlebars";
import fs from "fs";

import { pool } from "../../config/mysql.config";
import { Users } from "../models/user.model";
import { nodeMailerMessageOptions } from "../models/node-mailer.model";
import { sendEmail } from "../helpers/send-email.helper";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const templatePath = path.resolve(
  __dirname,
  "../../../templates/verify-email.html",
);

const source = fs.readFileSync(templatePath, "utf8");

const compiledTemplate = handlebars.compile(source);

export async function sendVerificationEmail() {
  try {
    const connection = await pool.getConnection();
    const [rows, fileds] = await connection.query(
      "CALL getUnverifiedEmails();",
    );
    // TODO: code works. Find out how to remove error?
    const unverifiedUsers = rows[0] as Users[];
    if (unverifiedUsers.length > 0) {
      unverifiedUsers.forEach(async (user) => {
        const data = compiledTemplate({
          name: user.user_name,
          email: user.email,
        });

        let message: nodeMailerMessageOptions = {
          from: process.env.EMAIL,
          to: user.email,
          subject: "email verification",
          html: data,
        };

        await sendEmail(message);

        await connection.query(
          `UPDATE users SET is_email_verified="pending" WHERE id="${user.id}";`,
        ),
          console.log(
            JSON.stringify({
              code: 200,
              status: "success",
              message:
                "All users have been requested to verify their email accounts. If unverified, they are pending verfication by the users.",
              data: message.subject,
              metadata: {},
            }),
          );
      });
    } else {
      // else if no users with 'no' in email verification status
      console.log(
        JSON.stringify({
          code: 200,
          status: "success",
          message:
            "All users have been requested to verify their email accounts. If unverified, they are pending verfication by the users.",
          data: {},
          metadata: {},
        }),
      );
    }
  } catch (error) {
    console.log(
      JSON.stringify({
        code: 500,
        statues: "error",
        message: "Internal server errror",
        data: error,
        metadata: {},
      }),
    );
  }
}

sendVerificationEmail();
