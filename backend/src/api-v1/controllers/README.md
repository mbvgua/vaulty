# Controllers

This directory is where the bulk of the applications logic is located. To get a better understanding of the files therein, they will be discussed in terms of the modules that they represent:

---

1. Admin -> Handled in the `admin.cotroller.ts` file. It Takes care of the admin only application operations. It includes the following endpoints:
    - **getAllUsers**: get all users in the application
    - **deleteUserAccount**: delete a user without the added step of first deactivating their account first. However, only a soft delete operation will be conducted.
    - **updateAnyUser**: update information of any user in the database. This might be achieved as a whole,e.g where every value of the user is changed, or in part,where only a single value is changed, e.g role.

---
2. Users -> Handled in the `user.controller.ts` file. Deals with all user operational logic; it has 4 main functions:
    - **registerUser**: Registers new users into the system.
    - **loginUser**: Login already existing users into the system.
    - **getUser**: returns a users details, based on the data passed into the request url as a parameter.
    - **changePassword**: when a user forgot their login password and would like to reset it. Utilizes a cron job in the `./services` directory to achieve this functionality.
    - **updateUser**: Updates existing user details. 
    - **deactivateAccount**: User Account deactivation. If user does not reativate back in 7 days(by logging back into the system), the account is permanently deleted. This is faciliatted by use of a trigger that checks for changes in the  users table. Only soft delete at the moment though.

---

