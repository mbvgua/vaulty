import { Request,Response,NextFunction } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { TokenRequest, UserPayload } from "../models/users.models"

dotenv.config()

export async function verifyToken(request:TokenRequest, response:Response, next:NextFunction){
    /**
     * routes checks user tokens and checks values, such as name and role
     * the request is usually paused at this point and will resume operation after
     */

    try {
        // read token
        const token = request.headers['token'] as string
        
        // verify token is valid
        if(!token){
            // return error if no token
            return response.status(401).json({error:`Access forbidden. Please contact your administrator!`})

        }
        const decodedData = jwt.verify(token,process.env.SECRET as string) as UserPayload
        // console.log(decodedData)
        request.data = decodedData

    } catch (error) {
        return response.status(500).json({error:`An error occurred: `+error})        
    }

    // resume operations if successful
    next()
}
