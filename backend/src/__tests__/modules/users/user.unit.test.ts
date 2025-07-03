import supertest from "supertest";
import app from "../../../app";

jest.mock("../../../config/db.config");
import { pool } from "../../../config/db.config";
import { mockUser } from "../../data/user.const.data";

const request = supertest(app);

//tearup running before all tests
beforeAll(async()=>{
    const users = await pool.query("SELECT * FROM users;")
    console.log(users)
})

describe("[user controller unit tests]", () => {
  describe("user registration test: ", () => {
    it("should succesfully register new users to the system", async () => {
      //arrange
      //act
      const registerUser = await request
        .post("/v1/auth/register")
        .send(mockUser);

      console.log(registerUser.request);
      //assert
    //expect(registerUser)
    });

    //it("should return error is user registers with exixting email account", async () => {});
  });

  describe("user login tests: ", () => {
    it("should succesfully login existing users to the system", async () => {});

    it("should return error is existing user uses wrong credentials to login", async () => {});
  });
  //TODO: add rate-limiting later on
  //it("should return error if user trie too many login attempts", async()=>{})
});
