USE vaulty;

-- create userBasicInfo table
CREATE TABLE userBasicInfo(
    id INT PRIMARY KEY SERIAL DEFAULT VALUE,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phoneNumber INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    --extras WITH DEFAULTS
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    isEmailVerified BOOLEAN DEFAULT 0,
    isDeleted BOOLEAN DEFAULT 0
)

-- indexes
CREATE UNIQUE INDEX usernameIndex userBasicInfo(username)
CREATE UNIQUE INDEX emailIndex ON userBasicInfo(email) 

-- INSERT DUMMY DATA
INSERT INTO userBasicInfo VALUES (
    ('','admin','admin@gmail.com','0746200055','@Admin2025','','','')
)


-- -- create userPersonalInfo table
-- CREATE TABLE userPersonalInfo(
--     id INT PRIMARY KEY SERIAL DEFAULT VALUE,
--     -- SAME AS id INT PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
--     userId INT NOT NULL,
--     gender ENUM('male','female','other') NOT NULL,
--     -- gender CHAR(1) ENUM('male','female') --IS THIS POSSIBLE?
--     dob DATETIME NOT NULL,
--     profilePic VARCHAR(255) NOT NULL,
--     agreedToTos BOOLEAN DEFAULT 0,
--     FOREIGN KEY (userId) REFERENCES userBasicInfo(id)
-- )


-- -- INSERT DUMMY DATA
-- INSERT INTO



-- -- triggers
-- -- views
-- -- storedProcedures
-- -- functions

