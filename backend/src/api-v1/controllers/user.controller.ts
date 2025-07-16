import { Request, Response } from "express";
import { v4 as uid } from "uuid";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import { pool } from "../../config/mysql.config";
import { sqlError } from "../models/mysql.model";
import { UserRoles, Users } from "../models/user.model";
import {
  loginEmailSchema,
  loginUserNameSchema,
  registerSchema,
} from "../validators/user.validator";
import { validationHelper } from "../helpers/verify-schema.helper";
import { logger } from "../../config/winston.config";

dotenv.config();

export async function registerUser(request: Request, response: Response) {
  const id = uid();
  // hardcoded to user, incase of new admin, add manually
  const role = UserRoles.farmer;
  const { first_name, last_name, user_name, email, password } = request.body;

  try {
    validationHelper(request, response, registerSchema);

    const saltRounds = 9;
    const hashed_password = await bcrypt.hash(password, saltRounds);

    const connection = await pool.getConnection();
    await connection.query("CALL addUser(?,?,?,?,?,?,?)", [
      id,
      first_name,
      last_name,
      user_name,
      email,
      hashed_password,
      role,
    ]);
    connection.release();

    // log sucesful user registration
    logger.info({
      message: "Successful user registration",
      data: {
        users: {
          id: id,
          user_name: user_name,
          email: email,
        },
      },
    });

    // return response
    return response.status(201).json({
      code: 201,
      status: "success",
      message: "Successful user registration!",
      data: {
        users: {
          id,
          user_name,
          email,
          role,
        },
      },
      metadata: null,
    });
  } catch (error: sqlError | any) {
    // log errors
    logger.error({
      message: "Error occurred during user registration",
      data: { error },
    });

    // return error response
    return response.status(500).json({
      code: 500,
      status: "error",
      message: "Internal server error occured: ",
      data: error,
      metadata: null,
    });
  }
}

export async function loginUser(request: Request, response: Response) {
  try {
    const { username_or_email, password } = request.body;
    const email_regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

    const connection = await pool.getConnection();
    const [rows]: any = await connection.query(
      "CALL getUserByUsernameOrEmail(?);",
      [username_or_email],
    );
    connection.release();
    const user = rows[0] as Users[]; //destructure an array of an array

    if (user.length > 0) {
      //dealing with email
      if (email_regex.test(username_or_email)) {
        //no validation error present
        validationHelper(request, response, loginEmailSchema);

        // user found
        if (user[0].email === username_or_email) {
          const passwordMatch = await bcrypt.compare(
            password,
            user[0].hashed_password,
          );
          if (passwordMatch) {
            //log succesul login
            logger.info({
              message: "Successful login",
              data: {
                users: {
                  id: user[0].id,
                  user_name: user[0].user_name,
                  email: user[0].email,
                },
              },
            });

            return response.status(200).json({
              code: 200,
              status: "success",
              message: "Successful login!",
              data: {
                users: {
                  id: user[0].id,
                  user_name: user[0].user_name,
                  email: user[0].email,
                  role: user[0].role,
                },
              },
              metadata: null,
            });
          }
        }
        // no user/password match found
        logger.info({
          message: "Unsuccessful user login with email attempt",
          data: {
            users: {
              email: username_or_email,
            },
          },
        });

        return response.status(422).json({
          code: 422,
          status: "error",
          message: "Incorrect email or password. Try again?",
          data: {
            user: {
              email: username_or_email,
              password: password,
            },
          },
          metadata: null,
        });
      } else {
        //dealing with username
        validationHelper(request, response, loginUserNameSchema);

        //// no validation error present
        //const connection = await pool.getConnection();
        //const [rows]: any = await connection.query(
        //  "CALL getUserByUsernameOrEmail(?)",
        //  [username_or_email],
        //);
        //connection.release();
        //const user = rows as Users[]; //destructure an array of an array

        // user found
        if (user[0].user_name === username_or_email) {
          const passwordMatch = await bcrypt.compare(
            password,
            user[0].hashed_password,
          );
          if (passwordMatch) {
            //log succesul login
            logger.info({
              message: "Successful login",
              data: {
                users: {
                  id: user[0].id,
                  user_name: user[0].user_name,
                  email: user[0].email,
                },
              },
            });

            return response.status(200).json({
              code: 200,
              status: "success",
              message: "Successful login!",
              data: {
                users: {
                  id: user[0].id,
                  user_name: user[0].user_name,
                  email: user[0].email,
                  role: user[0].role,
                },
              },
              metadata: null,
            });
          }
        }
        // no user/password match found
        // log sucesful user registration
        logger.info({
          message: "Unsuccessful user login with username attempt",
          data: {
            users: {
              user_name: username_or_email,
            },
          },
        });

        return response.status(422).json({
          code: 422,
          status: "error",
          message: "Incorrect email or password. Try again?",
          data: {
            user: {
              user_name: username_or_email,
              password: password,
            },
          },
          metadata: null,
        });
      }
    } else {
      // no user match found in db
      logger.info({
        message: "Unsuccessful user login attempt",
        data: null,
      });

      return response.status(404).json({
        code: 404,
        status: "error",
        message: "Not found. User account has been deleted or does not exist.",
        data: {
          user: {
            user_name: username_or_email,
            password: password,
          },
        },
        metadata: null,
      });
    }
  } catch (error: sqlError | any) {
    // log errors
    logger.error({
      message: "Error occurred during user login",
      data: { error },
    });

    return response.status(500).json({
      code: 500,
      status: "error",
      message: "Internal server error occurred: ",
      data: error,
      metadata: null,
    });
  }
}

export async function verifyEmail(
  request: Request<{ id: string }>,
  response: Response,
) {
  const user_id = request.params.id;

  try {
    const connection = await pool.getConnection();
    const [rows]: any = await connection.query("CALL getUserById(?);", [
      user_id,
    ]);
    const user = rows[0] as Users[];

    if (user.length > 0 && user[0].is_email_verified != "yes") {
      await connection.query("CALL setVerifiedEmails(?);", [user_id]);

      // log sucesful user verification
      logger.info({
        message: "Succesful user email verification",
        data: {
          users: {
            id: user[0].id,
            user_name: user[0].user_name,
            email: user[0].email,
          },
        },
      });

      return response.status(200).json({
        code: 200,
        status: "success",
        message: `User ${user_id} has successfuly verified their account!`,
        data: {
          users: {
            id: user[0].id,
            user_name: user[0].user_name,
            email: user[0].email,
            is_email_verified: user[0].is_email_verified,
            is_deactivated: user[0].is_deactivated,
          },
        },
        metadata: null,
      });
    }

    // log unsucesful user verification
    logger.info({
      message: "Unsuccesful user email verification",
      data: {
        users: {
          id: user[0].id,
          user_name: user[0].user_name,
          email: user[0].email,
        },
      },
    });

    return response.status(404).json({
      code: 404,
      status: "error",
      message:
        "User does not exist or account is already verified. Try a different id?",
      data: {
        users: {
          id: user_id,
        },
      },
      metadata: null,
    });
  } catch (error: sqlError | any) {
    // log errors
    logger.error({
      message: "Error occurred during user login",
      data: { error },
    });

    return response.status(500).json({
      code: 500,
      status: "error",
      message: "Internal server error occurred: ",
      data: error,
      metadata: null,
    });
  }
}
