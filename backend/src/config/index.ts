import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path:path.resolve(__dirname,'../../.env')})
// dotenv.config() --DOES NOT WORK?!
// console.log(process.env.DB_USERNAME)



async function dbConnection(){
    const connection = await mysql.createConnection({
        host:'localhost',
        user:process.env.DB_USERNAME,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME    
    })

    try {
        const [results,fields] = await connection.query(
          'SELECT * FROM userBasicInfo;'
        )  
        console.log(results)
        // console.log(fields) -RETURNS ENTIRE TABLE SCHEMA
      } catch (error) {
          console.log(error)
      }
}

dbConnection()