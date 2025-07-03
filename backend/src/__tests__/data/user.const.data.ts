import { UserRoles, Users } from "../../api-v1/models/user.model";

export const mockUser:Users = {
  first_name: "Dummy",
  last_name: "User",
  user_name: "dummyuser",
  email: "dummyuser@gmail.com",
  // TODO must be password to pass validation. must be hashed_password
  // to pass models type checking. dilemma
  password: "Qwerty12!",
};
