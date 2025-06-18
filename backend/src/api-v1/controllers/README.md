# Controllers

This is directory is where the bulk of the applications logic is located. There are 5 files, each with the main operations going on within that specific module. They include:

---
1. Admin -> Handled in the `admin.cotrollers.ts` file. Takes care of the admin only app operations including:
    - **deleteUserAccount**:
    - **changeUserRole**:
    - **updateAnyUser**:
---
2. Users -> Handled in the `users.controllers.ts` file. Deals with all user operational logic; it has 4 main functions:
    - **registerUser**: Registers new users into the system. User input is validated and checked for errors, and if none are located, the user is registered into the system; else appropriate error messages and status codes are returned.
    - **loginUser**: Login already existing users into the system. Proper validation of user input is done, and if any error occurrs, user will not be logged into system, appropriate response message and codes are returned.
    - **updateUser**: Updates existing user details. Proper validation is done and error messges returned accordingly.
    - **deactivateAccount**: User Account deactivation. If user does not reativate back in 7 days(by loggin back into the system), the acc is permanently deleted. Appropriate error messages and status codes are returned incase of an error.

---
3. Birds ->
---
4. Coops ->
---
5. Feeds ->
---
6. Expenses ->
---
