import { Request,Response } from "express"
import mysql from 'mysql2/promise'

import { sqlConfig } from "../../config"
import { sqlError } from "../models/db.models"
import { Users } from "../models/users.models"
import { emailSchema, updateUserSchema } from "../validators/users.validators"

const pool = mysql.createPool(sqlConfig)

// getUserByParams

// getUserByEmail
export async function getUserByEmail(request:Request, response:Response){
  /*
   *get a specific user by email
   */

   const {email} = request.body
   const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/

   try {
    if (emailRegex.test(email)){
      // if an actual email
      const {error} = emailSchema.validate(request.body)
      if(!error){
        const connection = await pool.getConnection()
        const [rows,fields] = await pool.query(
          `SELECT * FROM userBasicInfo WHERE
          email='${email}' AND isDeleted=0;`
        )
        const user = rows as Array<Users>
        console.log(user[0])
        return response.status(200).json(user[0])
      }
      // else if error exists
      return response.status(400).json(error)
    }
    // if not an email
    return response.status(400).json({error:`Oops! That does not look like a valid email, try again?`})

   } catch (error:sqlError | any) {
    return response.status(500).json({error:`An error occurred: `+error.sqlError})
   }
}

// getUsers
export async function getUsers(request:Request, response:Response){
  /*
   * get all the user registered in the system who still have active accounts 
   * if none, appropriate error messages will be returned
   */

  try {
    const connection = await pool.getConnection()
    const [rows,fields] = await connection.query(
      `SELECT * FROM userBasicInfo WHERE isDeleted=0;`
    )
    const users = rows as Array<Users>
    // console.log(users)

    if (users){
      return response.status(200).json(users)
    }
    // if no users in syst
    return response.status(500).json({error:`Oops! Looks like there are no users in the system. Give it some time champ :-)`})
  } catch (error:sqlError | any) {
    return response.status(500).json({error:`An error occurred: `+error.sqlError})
  }
}

// updateUser -> to be updated to include userDetails
export async function updateUser(request:Request<{id:string}>,response:Response){
  /**
   * update a users data in the system
   * must pass validation
   * if no error exists, user data is updated accordingly
   * appropriate response messages are sent
  */
 const userId = request.params.id
 const {username,email,phoneNumber,password,gender,dob,profilePic} = request.body
 const {error} = updateUserSchema.validate(request.body)

 try {
  if (!error){
    // get user based off id
    const connection = await pool.getConnection()
    const [rows,fields] = await pool.query(
      `SELECT * FROM userBasicInfo WHERE
      id='${userId}' AND isDeleted=0;`
    )
    const user = rows as Array<Users>
    if (user){          
      // update data accordingly
      const [rows2,fields2] = await pool.query(
        `UPDATE userBasicInfo SET 
        username='${username}',
        email='${email}',
        password='${password}',
        phoneNumber='${phoneNumber}'
        WHERE id='${user[0].id}' AND isDeleted=0;

        UPDATE userDetails SET
        gender='${gender}',
        dob='${dob}',
        profilePic='${profilePic}'
        WHERE id='${user[0].id}';`
      )
      // response message
      return response.status(200).json({message:`Congratuations! You have successfully updated ${user[0].username}'s profile`})
    }
    return response.status(400).json({error:`Oh no!Looks like that user does not exist, try again?`})
   }
   //  else if error exists
   return response.status(400).json(error)

 } catch (error:sqlError | any) {
  return response.status(500).json({error:`An error occured: `+error.sqlMessage})
 }
}


