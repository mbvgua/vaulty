
export interface sqlConfiguration{
    host:string,
    user?:string,
    password?:string,
    database?:string,
    waitForConnections?: boolean,
    connectionLimit?: number,
    maxIdle?: number,
    idleTimeout?: number,
    queueLimit?: number,
    enableKeepAlive?: boolean,
    keepAliveInitialDelay?: number,

}

export interface UsersBasicInfo {
    id:number,
    username:string,
    email:string,
    phoneNumber:string,
    password:string,
    createdAt:string,
    isEmailVerified:string,
    isDeleetd:string
}

export interface UsersPersonalInfo {
    id:number,
    userId:number,
    gender:string,
    dob:string,
    profilePic:string,
    agreedToTos:string,
    lastUpdated:string
}

