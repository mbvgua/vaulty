import { Request,Response } from "express";
import mysql from 'mysql2/promise'
import {v4 as uid} from 'uuid'

import { sqlConfig } from "../../config";
import { sqlConfiguration, sqlError, UsersBasicInfo } from "../models/user-basic.models";
import { registerSchema,loginEmailSchema,loginUsernameSchema, emailSchema, updateUserSchema } from "../validators/user-basic.validators";

const pool = mysql.createPool(sqlConfig)


export async function registerUser(request:Request,response:Response){
  /*
  * Registers new users into the system
  * id is auto-generated by uuid()
  * user input is validated and checked for errors
  * if none user is added to the system
  * if any error occurrs, user will not be added to system
  * appropriate response message and codes are sent back
  */

  const id = uid()
  const {username,email,phoneNumber,password} = request.body
  const {error} = registerSchema.validate(request.body)

  try {
    if (error) {
      return response.status(400).json(error)
    } else {
      const connection = await pool.getConnection()
      const [rows1,fields1] = await connection.query(
        `INSERT INTO userBasicInfo VALUES(
        '${id}',
        '${username}',
        '${email}',
        '${phoneNumber}',
        '${password}',
        DEFAULT,
        DEFAULT,
        0,
        0,
        0
        );`
      )  

      const [rows2,fields2] = await connection.query(
        `SELECT * FROM userBasicInfo
        WHERE id='${id}' AND isDeleted=0;`
      ) 
      connection.release()

      const User = rows2 as Array<UsersBasicInfo>

      return response.status(200).json({message:`Congratulations ${User[0].username}! You have successfully been registered on the system.`})
    }

  } catch (error:sqlError | any) {
    console.log(error)
      return response.status(500).json({error:`An error occurred: `+error.sqlMessage})
  }
}

export async function loginUser(request:Request,response:Response){
    /*
     * Login already existing users into the system
     * if any error occurrs, user will not be logged into system
     * appropriate response message and codes are sent back
    */

    const {emailOrUsername,password} = request.body
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
    const connection = await pool.getConnection()
    // console.log(emailRegex.test(emailOrUsername))

    try {
      if (emailRegex.test(emailOrUsername)) {
        // if email
        const {error} = loginEmailSchema.validate(request.body)

        if (!error){
          // if no error
          const [rows,results] = await connection.query(
            `SELECT * FROM userBasicInfo WHERE
            email='${emailOrUsername}' AND isDeleted=0;`
          )
          const user = rows as Array<UsersBasicInfo>
          console.log(user[0])

          if (user) {
            // if user exists
            if (user[0].password === password){
              return response.status(200).json({message:`Welcome back ${user[0].username}!`})
            }
            return response.status(400).json({error:`Oh no. Looks like the passwords do not match, try again?`})
          }
          // if user doesnt exist
          return response.status(400).json({error:`Oops! User does not exist. Try a different email/username?`})
        }
        // if error in validation schema
        return response.status(400).json(error)
        
      } else if (!emailRegex.test(emailOrUsername)){
        // if not email
        const {error} = loginUsernameSchema.validate(request.body)
        if (!error){
          // if no error
          const [rows,results] = await connection.query(
            `SELECT * FROM userBasicInfo WHERE
            username='${emailOrUsername}' AND isDeleted=0;`
          )
          const user = rows as Array<UsersBasicInfo>
          console.log(user[0])

          if (user) {
            // if user exists
            if (user[0].password === password){
              return response.status(200).json({message:`Welcome back ${user[0].username}!`})
            }
            return response.status(400).json({error:`Oh no. Looks like the passwords do not match, try again?`})
          } 
          // if user doesnt exist
          return response.status(400).json({error:`Oops! User does not exist. Try a different email/username?`})
          
        }
        // if error in validation schema
        return response.status(400).json(error)
        
      } else {
        // otherwise
        return response.status(400).json({error:`Invalid inputs. Please try again?`})
      }
      
    } catch (error:sqlError | any) {
      return response.status(500).json({error:`An error occurred: `+error.sqlMessage})
    }
    
}

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
        const user = rows as Array<UsersBasicInfo>
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
    const users = rows as Array<UsersBasicInfo>
    console.log(users)
    if (users){
      return response.status(200).json(users)
    }
    // if no users in syst
    return response.status(500).json({error:`Oops! Looks like there are no users in the system. Give it some time champ :-)`})
  } catch (error:sqlError | any) {
    return response.status(500).json({error:`An error occurred: `+error.sqlError})
  }
}

export async function updateUser(request:Request<{id:string}>,response:Response){
  /**
   * update a users data in the system
   * must pass validation
   * if no error exists, user data is updated accordingly
   * appropriate response messages are sent
  */
 const id = request.params.id
 const {username,email,phoneNumber,password} = request.body
 const {error} = updateUserSchema.validate(request.body)

 try {
  if (!error){
    // get user based off id
    const connection = await pool.getConnection()
    const [rows,fields] = await pool.query(
      `SELECT * FROM userBasicInfo WHERE
      id='${id}' AND isDeleted=0;`
    )
    const user = rows as Array<UsersBasicInfo>
    if (user){          
      // update data accordingly
      const [rows2,fields2] = await pool.query(
        `UPDATE userBasicInfo SET 
        username='${username}',
        email='${email}',
        password='${password}',
        phoneNumber='${phoneNumber}'
        WHERE id='${user[0].id}' AND isDeleted=0;`
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


export async function deactivateAccount(request:Request<{id:string}>,response:Response){
  /*
   * deactivates a users account
   * if user does not reativate back in 7 days, acc is permanently deleted
   * appropriate error messages are returned 
   */
  const id = request.params.id
  try {
    const connection = await pool.getConnection()
    const [rows1,results1] = await pool.query(
      `SELECT * FROM userBasicInfo WHERE id='${id}' AND isDeleted=0;`
    )
    const user = rows1 as Array<UsersBasicInfo>
    console.log(user)
    if (user){
      const [rows2,results2] = await pool.query(
        `UPDATE userBasicInfo SET
        isDeactivated=1 WHERE id='${id}' AND isDeleted=0;`
      )
      return response.status(200).json({message:`You have successfuly deactivated your account. It will be permanently deleted in 7 days.`})
    }
    return response.status(400).json({error:`Oops!Looks like that user does not exist. Try again?`})
    
  } catch (error:sqlError | any) {
    return response.status(500).json({error:`An error occured: `+error.sqlError})
  }

}

