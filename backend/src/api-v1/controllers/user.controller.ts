import { Request, Response } from "express";
import mysql from "mysql2/promise";
import { v4 as uid } from "uuid";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import { pool } from "../../config/db.config";
import { sqlError } from "../models/db.model";
import { UserRoles, Users } from "../models/user.model";
import {
  loginEmailSchema,
  loginUserNameSchema,
  registerSchema,
} from "../validators/user.validator";
import { validationHelper } from "../helpers/verify-schema.helper";

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

    return response.status(201).json({
      code: 201,
      status: "success",
      message: "Successful user registration!",
      data: {
        user: {
          id: `${id}`,
          first_name: `${first_name}`,
          last_name: `${last_name}`,
          user_name: `${user_name}`,
          email: `${email}`,
          role: `${role}`,
          password: `${hashed_password}`,
        },
      },
      metadata: {},
    });
  } catch (error: sqlError | any) {
    return response.status(500).json({
      code: 500,
      status: "error",
      message: "Internal server error occured: ",
      data: error,
      metadata: {},
    });
  }
}

export async function loginUser(request: Request, response: Response) {
  try {
    const { userNameOrEmail, password } = request.body;
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(userNameOrEmail)) {
      //dealing with email
      validationHelper(request, response, loginEmailSchema);

      // no validation error present
      const connection = await pool.getConnection();
      const [rows, fields] = await connection.query("CALL getUserByEmail(?)", [
        userNameOrEmail,
      ]);
      connection.release();
      const [user] = rows as Array<Users[]>; //destructure an array of an array

      // user found
      if (user[0].email === userNameOrEmail) {
        const passwordMatch = await bcrypt.compare(
          password,
          user[0].hashed_password,
        );
        if (passwordMatch) {
          return response.status(200).json({
            code: 200,
            status: "success",
            message: "Successful login!",
            data: {
              user: {
                user_name: `${userNameOrEmail}`,
                password: `${user[0].hashed_password}`,
              },
            },
            metadata: {},
          });
        }
      }
      // no user/password match found
      return response.status(422).json({
        code: 422,
        status: "error",
        message: "Incorrect email or password. Try again?",
        data: {
          user: {
            user_name: `${userNameOrEmail}`,
            password: password,
          },
        },
        metadata: {},
      });
    } else {
      //dealing with username
      validationHelper(request, response, loginUserNameSchema);

      // no validation error present
      const connection = await pool.getConnection();
      const [rows, fields] = await connection.query(
        "CALL getUserByUserName(?)",
        [userNameOrEmail],
      );
      connection.release();
      const [user] = rows as Array<Users[]>; //destructure an array of an array
      console.log(user[0]);

      // user found
      if (user[0].user_name === userNameOrEmail) {
        const passwordMatch = await bcrypt.compare(
          password,
          user[0].hashed_password,
        );
        if (passwordMatch) {
          return response.status(200).json({
            code: 200,
            status: "success",
            message: "Successful login!",
            data: {
              user: {
                user_name: `${userNameOrEmail}`,
                password: `${user[0].hashed_password}`,
              },
            },
            metadata: {},
          });
        }
      }
      // no user/password match found
      return response.status(422).json({
        code: 422,
        status: "error",
        message: "Incorrect email or password. Try again?",
        data: {
          user: {
            user_name: `${userNameOrEmail}`,
            password: password,
          },
        },
        metadata: {},
      });
    }
  } catch (error: sqlError | any) {
    return response.status(500).json({
      code: 500,
      status: "error",
      message: "Internal server error occurred: ",
      data: error,
      metadata: {},
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
    const [rows] = await connection.query("CALL getUserById(?);", [user_id]);
    const user = rows as Users[];
    const [actual_user] = user[0]; //has errors but its the only one that works

    if (user.length > 0 && actual_user.is_email_verified != "yes") {
      await connection.query("CALL setVerifiedEmails(?);", [user_id]);
      return response.status(200).json({
        code: 200,
        status: "success",
        message: `User ${user_id} has successfuly verified their account!`,
        data: {
          id: actual_user.id,
          user_name: actual_user.user_name,
          email: actual_user.email,
          is_email_verified: actual_user.is_email_verified,
          is_deactivated: actual_user.is_deactivated,
        },
        metadata: {},
      });
    }
    return response.status(404).json({
      code: 404,
      status: "error",
      message:
        "User does not exist or account is already verified. Try a different id?",
      data: {
        id: user_id,
      },
      metadata: {},
    });
  } catch (error: sqlError | any) {
    return response.status(500).json({
      code: 500,
      status: "error",
      message: "Internal server error occurred: ",
      data: error,
      metadata: {},
    });
  }
}
