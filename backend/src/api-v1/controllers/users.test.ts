import app from "../../app";
import supertest from "supertest";
import bcrypt from 'bcrypt'
// import { registerUser, loginUser, addUserDetails, deactivateAccount } from "./users.controllers";
import { UserRoles, Users } from "../models/users.models";

const request = supertest

const user = {
    username:'notAdmin',
    email:'notAdmin@gmail.com',
    phoneNumber:'0712345678',
    password:'@notAdmin2025'
}


describe('[user routes]', ()=>{

    test('registers new user', async()=>{
        const registerUser = await request(app).post('/auth/register').send(user)
        // console.log('response after creating the user: ',registerUser.text)
        expect(registerUser.status).toBe(200)
    })

    test('login existing user', async()=>{
        const loginUser = await request(app).post('/auth/register').send({'username':user.username,'password':user.password})
        console.log('response after logging in the user: ',loginUser.text)
        expect(loginUser.status).toBe(200)
    })

})