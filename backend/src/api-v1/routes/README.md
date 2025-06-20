# Routes

This directory defines the routes to be followed within the application. The logic behind the said routes is laid out in the `./controllers/` directory. To get a better understanding of the files therein, they will be discussed in terms of the modules that they represent:

---

1. Admin -> 

---
2. Users -> Handled in the `user.route.ts` file. Mostly defined in the `./user.controller.ts` file. Deals with all routes for a standard user:
    - **registerUser**: [`POST`] in regards to registering a new user into the application.
    - **loginUser**: [`POST`] defines how to login an existing user into the system.

---
