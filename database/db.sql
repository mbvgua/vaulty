CREATE DATABASE vaulty;
USE vaulty;

-- create users table
CREATE TABLE users(
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','user') NOT NULL, 
    createdAt DATE DEFAULT (CURRENT_DATE),
    lastUpdated DATE DEFAULT (CURRENT_DATE),
    isEmailVerified BOOLEAN DEFAULT 0,
    isDeactivated BOOLEAN DEFAULT 0,
    isDeleted BOOLEAN DEFAULT 0
);

-- indexes
CREATE UNIQUE INDEX usernameIndex ON users(username);
CREATE UNIQUE INDEX emailIndex ON users(email);

-- INSERT DUMMY DATA
INSERT INTO users VALUES
    (1,'admin','admin@gmail.com','0712345678','@Admin2025','admin',DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT),
    (2,'user1','user1@gmail.com','0712345678','@User12025','user',DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT),
    (3,'user2','user2@gmail.com','0712345678','@User22025','user',DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT)
;


-- create userDetails table
    -- SAME AS id INT PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
    -- gender CHAR(1) ENUM('male','female') --IS THIS POSSIBLE?
CREATE TABLE userDetails(
    id VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255) NOT NULL,
    gender ENUM('male','female','other') NOT NULL,
    dob DATE NOT NULL,
    profilePic VARCHAR(255) NOT NULL,
    lastUpdated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);


-- INSERT DUMMY DATA
INSERT INTO userDetails VALUES
    (1,1,'male','1998-04-23','profiles/admin.jpeg',DEFAULT),
    (2,2,'female','2000-07-03','profiles/user1.jpeg',DEFAULT),
    (3,3,'female','2001-01-17','profiles/user2.jpeg',DEFAULT)
;

-- storedProcedures

delimiter #

-- addUser
CREATE PROCEDURE addUser(
    IN username VARCHAR(255),
    IN email VARCHAR(255),
    IN phoneNumber INT,
    IN password VARCHAR(255),
    IN role ENUM('admin','user')
)
BEGIN
    INSERT INTO users(username,email,phoneNumber,password,role)
    VALUES (@username,@email,@phoneNumber,@password,@role);
END
#

-- getUserById
CREATE PROCEDURE getUserById(
    IN id VARCHAR(255)
)
BEGIN
    SELECT * FROM users
    WHERE id=@id
    AND isDeleted=0;
END
#

-- getUserByEmail
CREATE PROCEDURE getUserByEmail(
    IN email VARCHAR(255)
)
BEGIN
    SELECT * FROM users
    WHERE email=@email
    AND isDeleted=0;
END
#

-- getUserByUsername
CREATE PROCEDURE getUserByUsername(
    IN username VARCHAR(255)
)
BEGIN
    SELECT * FROM users
    WHERE username=@username
    AND isDeleted=0;
END
#

-- getUsers
CREATE PROCEDURE getUsers()
BEGIN
    SELECT * FROM users
    WHERE isDeleted=0;
END
#

-- updateUser
CREATE PROCEDURE updateUser(
    IN id VARCHAR(255),
    IN username VARCHAR(255),
    IN email VARCHAR(255),
    IN phoneNumber INT,
    IN password VARCHAR(255),
    IN role ENUM('admin','user')
)
BEGIN
    UPDATE users
    SET username=@username,email=@email,phoneNumber=@phoneNumber,password=@password
    WHERE id=@id
    AND isDeleted=0;
END
#
-- forgotPassword. TO BE ADDED IN PATCH
-- changePassword. TO BE ADDED IN PATCH

-- deleteUser
CREATE PROCEDURE deleteUser(
    IN id VARCHAR(255)
)
BEGIN
    UPDATE users
    SET isDeleted=1
    WHERE id=@id;
END
#

delimiter ;

-- triggers

delimiter #

-- trigger to automatically change lastUpdated column 
-- ON UPDATE is not supported in CURRENT_DATE only CURRENT_TIMESTAMP
CREATE TRIGGER lastBasicDataUpdate BEFORE UPDATE
ON users FOR EACH ROW
BEGIN
    SET NEW.lastUpdated = CURRENT_DATE;
END
#

-- to automatically change isDeleted columns once deactivate is on for >7days
CREATE TRIGGER deleteAccount BEFORE UPDATE
ON users FOR EACH ROW
BEGIN
    IF (DATEDIFF(CURRENT_DATE,OLD.lastUpdated) >= 7 AND OLD.isDeactivated=1) THEN
        SET NEW.isDeleted = 1;
    END IF;
END
#

delimiter ;

-- views 

delimiter #
-- view showing all verified emails
CREATE VIEW verifiedUserEmails
AS
    SELECT id,username,email FROM users
    WHERE isEmailVerified=1
    AND isDeleted=0;
#

CREATE VIEW deletedAccounts
AS
    SELECT id,username,email,phoneNumber FROM users 
    WHERE isDeleted=1;
#

CREATE VIEW genderBalance
AS
    SELECT gender,COUNT(*) AS totals
    FROM userDetails
    GROUP BY gender;
#

-- CREATE VIEW averageUserAge
-- AS
--     SELECT userId,dob,CURR_DATE-dob AS age FROM userDetails
--     WHERE userId={SELECT id,username,email 
--     FROM users
--     WHERE isDeleted=0}
-- #

delimiter ;

-- functions



