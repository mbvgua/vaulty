import { Request, Response } from "express";
import mysql, { ProcedureCallPacket, ResultSetHeader } from "mysql2/promise";
import { v4 as uid } from "uuid";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import { sqlConfig } from "../../config";
import { sqlError } from "../models/db.models";
import { UserRoles, Users } from "../models/users.models";
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
        data: {
          location: error.details[0].path,
          message: error.details[0].message,
        },
        metadata: {},
      });
    }
    const saltRounds = 9;
    const hashed_password = await bcrypt.hash(password, saltRounds);

    const connection = await pool.getConnection();
    await connection.query(
            "CALL addUser(?,?,?,?,?,?,?)",
            [ id,first_name,last_name,user_name,email,hashed_password,role]
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
