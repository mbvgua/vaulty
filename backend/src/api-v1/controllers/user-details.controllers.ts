import { Request,Response } from "express"
import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'

import { sqlConfig } from "../../config"
import { sqlError } from "../models/db.models"
import { UserObject, UserRoles, Users } from "../models/users.models"
import { deleteUserByEmailSchema, deleteUserByUsernameSchema, emailSchema, updateUserSchema } from "../validators/users.validators"

const pool = mysql.createPool(sqlConfig)

// getUserByParams

// getUserByEmail
export async function getUserByEmail(request:Request<{id:string}>, response:Response){
  /*
   *get a specific user by email
   */

   const id = request.params.id
   const {email} = request.body
   const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
   
   try {
     if (emailRegex.test(email)){
       // if an actual email
       const {error} = emailSchema.validate(request.body)
       if(error){
        return response.status(400).json(error.details[0].message)
      }
      const connection = await pool.getConnection()
      const [rows1,fields1] = await pool.query(
        `SELECT * FROM users WHERE id='${id}' and isDeleted=0;`
      )
      const user = rows1 as Array<Users>

      if (user[0].role === UserRoles.admin){
        const [rows2,fields2] = await pool.query(
          `SELECT * FROM users WHERE
          email='${email}' AND isDeleted=0;`
        )
        const user = rows2 as Array<Users>
    
        if(user){
          console.log(user[0])
          return response.status(200).json(user[0])
        }
        return response.status(400).json({error:`Oops! Looks like that user does not exist, try again?`})
      }
      return response.status(400).json({error:`It looks like you do not have access to view this page. Contact your administrator`})


    }
    // if not an email
    return response.status(400).json({error:`Oops! That does not look like a valid email, try again?`})

   } catch (error:sqlError | any) {
    return response.status(500).json({error:`An error occurred: `+error.sqlError})
   }
}

// getUsers
export async function getUsers(request:Request<{id:string}>, response:Response){
  /*
   * get all the user registered in the system who still have active accounts 
   * if none, appropriate error messages will be returned
   */

  const id = request.params.id

  try {
    const connection = await pool.getConnection()
    const [rows1,fields1] = await pool.query(
      `SELECT * FROM users WHERE id='${id}' AND isDeleted=0;`
    )
    const user = rows1 as Array<Users>
    if(user[0].role === UserRoles.admin){
      const [rows2,fields2] = await connection.query(
        `SELECT * FROM users WHERE isDeleted=0;`
      )
      const users = rows2 as Array<UserObject>
      // console.log(users)
  
      if (users){
        return response.status(200).json(users)
      }
      // if no users in system
      return response.status(500).json({error:`Oops! Looks like there are no users in the system. Give it some time champ :-)`})
    }
    return response.status(400).json({error:'It looks like you do not have access to view this page. Contact your administrator'})

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
 
 try {
  const {error} = updateUserSchema.validate(request.body)
  if (error){
    return response.status(400).json(error.details[0].message)
  }
  // get user based off id
  const connection = await pool.getConnection()
  const [rows,fields] = await pool.query(
    `SELECT * FROM users WHERE
    id='${userId}' AND isDeleted=0;`
  )
  const user = rows as Array<Users>
  if (user){          
    // update data accordingly
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password,saltRounds)

    const [rows2,fields2] = await pool.query(
      `
      UPDATE users SET 
      username='${username}',
      email='${email}',
      hashedPassword='${hashedPassword}',
      phoneNumber='${phoneNumber}'
      WHERE id='${user[0].id}' AND isDeleted=0;

      UPDATE userDetails SET
      gender='${gender}',
      dob='${dob}',
      profilePic='${profilePic}'
      WHERE userId='${user[0].id}';
      `
    )
    // response message
    return response.status(200).json({message:`Congratuations! You have successfully updated ${user[0].username}'s profile`})
  } else {
    //  else if user doesnt exist
    return response.status(400).json(error)
  }

 } catch (error:sqlError | any) {
  return response.status(500).json({error:`An error occured: `+error.sqlMessage})
 }
}

export async function deleteAccount(request:Request<{id:string}>, response:Response){
  /**
   * delete user accounts, either by username or email.
   * only to be used by the admin
   */

  const id = request.params.id
  const {emailOrUsername} = request.body
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/

  try {
    const connection = await pool.getConnection()

    const [rows1,fields] = await connection.query(`
      SELECT * FROM users WHERE id='${id}' AND isDeleted=0;`
    )
    const user = rows1 as Array<Users>

    if(user[0] && user[0].role==='admin'){
      // if admin, delete
      if (emailRegex.test(emailOrUsername)){
        // if it is an email
        const {error} = deleteUserByEmailSchema.validate(request.body)
  
        if (error){
          return response.status(400).json({error:error.details[0].message})
        }
        const [rows2,fields2] = await connection.query(
          `SELECT * FROM users WHERE email='${emailOrUsername}' AND isDeleted=0;`
        )
        const deletedUser = rows2 as Array<Users>
        if (deletedUser[0] && +deletedUser[0].isDeleted===0){
          // if user to be deleted exists
          const [rows3,fields3] = await connection.query(
            `UPDATE users SET isDeleted=1 WHERE email='${emailOrUsername}';`
          )
          return response.status(200).json({message:`You have successfully deleted ${deletedUser[0].username}'s account!`})

        }
        // if user to be deleted doesnt exist
        return response.status(400).json({error:`Oops!Looks like the user has already been deleted or does not exist, try again?`})
      } else {
        // if not an email
        const {error} = deleteUserByUsernameSchema.validate(request.body)
  
        if (error){
          return response.status(400).json({error:error.details[0].message})
        }
        const [rows2,fields2] = await connection.query(
          `SELECT * FROM users WHERE username='${emailOrUsername}' AND isDeleted=0;`
        )
        const deletedUser = rows2 as Array<Users>

        if (deletedUser[0] && +deletedUser[0].isDeleted===0){
          // if user to be deleted exists
          const [rows3,fields3] = await connection.query(
            `UPDATE users SET isDeleted=1 WHERE username='${emailOrUsername}';`
          )
          return response.status(200).json({message:`You have successfully deleted ${deletedUser[0].username}'s account!`})

        }
        // if user to be deleted doesnt exist
        return response.status(400).json({error:`Oops!Looks like the user has already been deleted or does not exist, try again?`})

      }
    }
    // if not an admin, no auth
    return response.status(400).json({error:`Oh no! It seems like you do not have priviledges to perform this operation, contact your admin for support.`})

    
  } catch (error:sqlError | any) {
    return response.status(500).json({error:`An error occurred: `+error})
    
  }
}
