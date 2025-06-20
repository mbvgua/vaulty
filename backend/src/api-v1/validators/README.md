# Validators

This directory helps in error validation by correcting and catching any error in input data before it is passed into the database. To get a better understanding of the files therein, they will be discussed in terms of the modules that they represent:

---

1. Admin -> 

---
2. Users -> Handled in the `user.validator.ts` file. Deals with all user validation errors:
    - **registerSchema**: when registering a new user into the application. Checks for possible errors in first_name, last_name, user_name, email and password, ensuring they are adhered to.
    - **loginEmailSchema**: when logging in an existing user using their email. Checks for validation errors in email(userNameOrEmail) and password.
    - **loginUserNameSchema**: when loggin in an existing user using their username. Checks for validation errors in user_name(userNameOrEmail) and password.

---
