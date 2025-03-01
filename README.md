# BASIC AUTHENTICATION APP

Simple application where I intend to create and master processes involved in the authentication module. The core technologies used are: 
- **Frontend**: Angular
- **Backend**: Node.Js & Express with Typescript
- **Backend**: MySql
- **Package Manager**: npm

Main concepts to take a deep dive on: 
1. **User Roles & Permissions** - Implement role-based access control (RBAC) or permissions within your app. Using `casbin` (Node.js library for access control), or custom logic in the authentication middleware.

2. **Two-Factor Authentication (2FA)** - Add an additional layer of security by integrating two-factor authentication. Using libraries like `speakeasy` (for TOTP generation) or services like Authy, Google Authenticator, or Twilio for SMS-based verification.

3. **Password Reset Flow** - Add a password recovery option where users can request a reset link. Use `nodemailer` for sending password reset emails.

4. **Social Authentication** - Allow users to log in with third-party services like Google, Facebook, or GitHub. Using Passport.js with appropriate strategies (e.g., `passport-google-oauth`, `passport-facebook`).

5. **Session Management** - Manage how long a user can remain logged in without any activity, using session management libraries (e.g., `express-session`).

---

## Areas of focus
### **Frontend**

1. **@auth0/angular-jwt** - Automatically adding the JWT to HTTP requests and decoding it on the frontend while also managing token expiration.
   
2. **ngx-cookie-service** - For handling cookie-based authentication, including storing JWTs in cookies securely.
   
5. **@ngrx/store** - For managing user authentication state, such as login status, user profile, etc., across the app.
   
---

### **Backend**

1. **jsonwebtoken** - Handling token-based authentication (JWT) on the server side. You can issue tokens after user login and verify them on each protected route.

2. **passport.js** - Integrating different authentication strategies such as JWT, OAuth, local (username/password), and more.
   
3. **passport-local** - Used with `passport.js` to authenticate users using a traditional username and password approach.

4. **passport-jwt** - Use this for JWT authentication to protect routes in your backend.
   
5. **bcryptjs** - Securely hashing user passwords before storing them in the database.
   
6. **express-session** - Handling cookie-based sessions for user authentication. You can store the session ID in a cookie, and the server can use it to keep track of user sessions.

7. **mysql2** - Interacting with your MySQL database to store user credentials, authentication tokens, etc.

8. **dotenv** - Safely manage sensitive data like database credentials, JWT secrets, etc.

9. **cors** - Enable Cross-Origin Resource Sharing (CORS) in your API.

---

### **Bonus Modules**

1. **Jest** - Writing unit and integration tests for your authentication logic on both the frontend (Angular) and backend (Node.js). Useful for ensuring your security and authentication processes work correctly.

2. **Docker** - Containerization for applications.

<!-- 4. **Helmet.js**  
   - **Purpose**: Security middleware for Express.
   - **Use Case**: Adds security-related HTTP headers to your app to help prevent certain types of attacks, like cross-site scripting (XSS) or clickjacking. -->

5. **Rate Limiting (express-rate-limit)**  - Prevent abuse by limiting the number of requests a user can make in a short period thus protecting your authentication endpoints (e.g., login or registration) from brute-force attacks.

7. **Swagger/OpenAPI** - Automatically generate interactive API documentation for your backend, making it easier for frontend developers or external teams to integrate with your app.

---