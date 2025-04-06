import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import path from 'path'

import { sqlConfiguration } from '../models'

// dotenv.config() --DOES NOT WORK?!
dotenv.config({path:path.resolve(__dirname,'../../.env')})
// console.log(process.env.DB_USERNAME)


// sql config values
export const sqlConfig:sqlConfiguration = {
    host:'localhost',
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
}
