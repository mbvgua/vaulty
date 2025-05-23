import { Request } from "express"


export enum UserRoles {
    admin = 'admin',
    user = 'user'
}

export interface UserPayload {
    id:number,
    username:string,
    email:string,
    role:UserRoles
}

export interface Users {
    id:number,
    username:string,
    email:string,
    phoneNumber:string,
    hashedPassword:string,
    role:UserRoles,
    createdAt:string,
    isEmailVerified:string,
    isDeactivated:string,
    isDeleted:string
}

export interface UserDetails {
    id:number,
    userId:number,
    gender:string,
    dob:string,
    profilePic:string,
    lastUpdated:string
}

export interface UserObject {
    basic:Users,
    details:UserDetails
}

export interface TokenRequest extends Request {
    data?:UserPayload
}


