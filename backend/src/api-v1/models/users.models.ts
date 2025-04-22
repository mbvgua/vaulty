
export interface Users {
    id:number,
    username:string,
    email:string,
    phoneNumber:string,
    password:string,
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


