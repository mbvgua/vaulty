import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import path from 'path'

import { sqlConfiguration } from '../api-v1/models/db.models'

// dotenv.config() --DOES NOT WORK?!
dotenv.config({path:path.resolve(__dirname,'../../.env')})
// console.log(process.env.DB_USERNAME)


// sql config values
export const sqlConfig:sqlConfiguration = {
    host:'localhost',
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
}
