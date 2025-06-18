import { Request, Response } from "express";
import mysql from "mysql2/promise";
import { v4 as uid } from "uuid";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import { sqlConfig } from "../../config";
import { sqlError } from "../models/db.models";
import { UserRoles } from "../models/users.models";
import { registrationSchema } from "../validators/users.validators";

dotenv.config();
const pool = mysql.createPool(sqlConfig);

export async function registerUser(request: Request, response: Response) {
  const id = uid();
  // hardcoded to user, incase of new admin, add manually
  const role = UserRoles.farmer;
  const { first_name, last_name, user_name, email, password } = request.body;

  try {
    const { error } = registrationSchema.validate(request.body);
    if (error) {
      return response.status(422).json({
        code: 422,
        status: "error",
        message: "Validation error occurred: ",
        data: error,
        metadata: {},
      });
    }
    const saltRounds = 9;
    const hashed_password = await bcrypt.hash(password, saltRounds);

    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query(
      `INSERT INTO users VALUES(
            '${id}',
            '${first_name}',
            '${last_name}',
            '${user_name}',
            '${email}',
            '${hashed_password}',
            '${role}',
            DEFAULT,
            DEFAULT,
            DEFAULT,
            DEFAULT);`,
    );
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
          password: `${password}`,
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
