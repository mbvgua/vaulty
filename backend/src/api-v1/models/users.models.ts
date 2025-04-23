
export enum UserRoles {
    admin = 'admin',
    user = 'user'
}

export interface Users {
    id:number,
    username:string,
    email:string,
    phoneNumber:string,
    password:string,
    role:UserRoles,
    createdAt:string,
    isEmailVerified:string,
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


