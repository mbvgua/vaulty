import supertest from "supertest";
import app from "../../../app";

jest.mock("../../../config/mysql.config");
import { pool } from "../../../config/mysql.config";
import { UserRoles, Users } from "../../../api-v1/models/user.model";

const request = supertest(app);
const mockedQuery = pool.query as jest.Mock;


const mockUser:Users = {
  first_name: "Dummy",
  last_name: "User",
  user_name: "dummyuser",
  email: "dummyuser@gmail.com",
  // TODO must be password to pass validation. must be hashed_password
  // to pass models type checking. dilemma
  password: "Qwerty12!",
};


//tearup running before all tests
beforeAll(async () => {
  mockedQuery.mockReset();
});

afterAll(async () => {
  mockedQuery.mockReset();
});

describe("AUTH MODULE", () => {
  describe("[user registration api]", () => {
    it("registers a new users into the system", async () => {
      //arrange
      mockedQuery.mockResolvedValueOnce([{}, undefined]);

      //act
      const registerUser = await request
        .post("/v1/auth/register")
        .send(mockUser);

      //assert
      expect(registerUser).toBeDefined();
      expect(registerUser.statusCode).toBe(201);
      expect(registerUser.body).toEqual({
        code: 201,
        status: "success",
        message: "Successful user registration!",
        data: {
          user: {
            id: `${mockUser.id}`,
            first_name: `${mockUser.first_name}`,
            last_name: `${mockUser.last_name}`,
            user_name: `${mockUser.user_name}`,
            email: `${mockUser.email}`,
            role: `${mockUser.role}`,
            password: `${mockUser.hashed_password}`,
          },
        },
        metadata: {},
      });
      //console.log(registerUser.request);
    });

    it("hashes the password before storing in db", async () => {});
    it("assigns a unique id to each user", async () => {});
  });

  describe("[user registration api][FAILING]", () => {
    it("username already exists in system", async () => {
      try {
      } catch (e) {}
    });
    it("user email already exists in system", async () => {
      try {
      } catch (e) {}
    });
    it("missing required fields(email,password)", async () => {
      try {
      } catch (e) {}
    });
    it("invalid email format", async () => {
      try {
      } catch (e) {}
    });
    it("password is too weak", async () => {
      try {
      } catch (e) {}
    });
  });
});
