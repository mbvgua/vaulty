import { transporter } from "../../config/node-mailer.config";
import { nodeMailerMessageOptions } from "../models/node-mailer.model";

export async function sendEmail(message: nodeMailerMessageOptions) {
  await transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("An error occurred: ", err);
    }
    console.log("Successfully sent the email!", info);
  });
}

// TODO: make this work. better than console logging things,
// only problem is that when i call the function in the services, i cannot only pass
// the message, i have to pass 2 argumets. Which i do not have

//export async function sendEmail(
//  message: nodeMailerMessageOptions,
//  response: Response,
//) {
//  await transporter.sendMail(message, (err, info) => {
//    if (err) {
//      return response.status(422).json({
//        code: 422,
//        status: "error",
//        message: "Error occurred while processing email: ",
//        data: err,
//        metadata: {},
//      });
//    }
//    return response.status(200).json({
//      code: 200,
//      status: "success",
//      message: "Email succesfully sent",
//      data: message.subject,
//      metadata: {},
//    });
//  });
//}
