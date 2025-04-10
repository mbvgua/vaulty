CREATE DATABASE vaulty;
USE vaulty;

-- create userBasicInfo table
CREATE TABLE userBasicInfo(
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt DATE DEFAULT (CURRENT_DATE),
    lastUpdated DATE DEFAULT (CURRENT_DATE),
    isEmailVerified BOOLEAN DEFAULT 0,
    isDeactivated BOOLEAN DEFAULT 0,
    isDeleted BOOLEAN DEFAULT 0
);

-- indexes
CREATE UNIQUE INDEX usernameIndex ON userBasicInfo(username);
CREATE UNIQUE INDEX emailIndex ON userBasicInfo(email);

-- INSERT DUMMY DATA
INSERT INTO userBasicInfo VALUES
    (1,'admin','admin@gmail.com','0712345678','@Admin2025',DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT),
    (2,'user1','user1@gmail.com','0712345678','@User12025',DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT),
    (3,'user2','user2@gmail.com','0712345678','@User22025',DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT)
;


-- create userPersonalInfo table
    -- SAME AS id INT PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
    -- gender CHAR(1) ENUM('male','female') --IS THIS POSSIBLE?
CREATE TABLE userPersonalInfo(
    id VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255) NOT NULL,
    gender ENUM('male','female','other') NOT NULL,
    dob DATE NOT NULL,
    profilePic VARCHAR(255) NOT NULL,
    agreedToTos BOOLEAN DEFAULT 0,
    lastUpdated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES userBasicInfo(id)
);


-- INSERT DUMMY DATA
INSERT INTO userPersonalInfo VALUES
    (1,1,'male','1998-04-23','profiles/admin.jpeg',1,DEFAULT),
    (2,2,'female','2000-07-03','profiles/user1.jpeg',1,DEFAULT),
    (3,3,'female','2001-01-17','profiles/user2.jpeg',1,DEFAULT)
;

-------------------------
--- storedProcedures ----
-------------------------
delimiter #

-- addUser
CREATE PROCEDURE addUser(
    IN username VARCHAR(255),
    IN email VARCHAR(255),
    IN phoneNumber INT,
    IN password VARCHAR(255)
)
BEGIN
    INSERT INTO userBasicInfo(username,email,phoneNumber,password)
    VALUES (@username,@email,@phoneNumber,@password);
END
#

-- getUserById
CREATE PROCEDURE getUserById(
    IN id VARCHAR(255)
)
BEGIN
    SELECT * FROM userBasicInfo
    WHERE id=@id
    AND isDeleted=0;
END
#

-- getUserByEmail
CREATE PROCEDURE getUserByEmail(
    IN email VARCHAR(255)
)
BEGIN
    SELECT * FROM userBasicInfo
    WHERE email=@email
    AND isDeleted=0;
END
#

-- getUserByUsername
CREATE PROCEDURE getUserByUsername(
    IN username VARCHAR(255)
)
BEGIN
    SELECT * FROM userBasicInfo
    WHERE username=@username
    AND isDeleted=0;
END
#

-- getUsers
CREATE PROCEDURE getUsers()
BEGIN
    SELECT * FROM userBasicInfo
    WHERE isDeleted=0;
END
#

-- updateUser
CREATE PROCEDURE updateUser(
    IN id VARCHAR(255),
    IN username VARCHAR(255),
    IN email VARCHAR(255),
    IN phoneNumber INT,
    IN password VARCHAR(255)
)
BEGIN
    UPDATE userBasicInfo
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
    UPDATE userBasicInfo
    SET isDeleted=1
    WHERE id=@id;
END
#

delimiter ;

--------------------
----- triggers -----
--------------------
delimiter #

-- trigger to automatically change lastUpdated column 
-- ON UPDATE is not supported in CURRENT_DATE only CURRENT_TIMESTAMP
CREATE TRIGGER lastBasicDataUpdate BEFORE UPDATE
ON userBasicInfo FOR EACH ROW
BEGIN
    SET NEW.lastUpdated = CURRENT_DATE;
END
#

-- to automatically change isDeleted columns once deactivate is on for >7days
CREATE TRIGGER deleteAccount BEFORE UPDATE
ON userBasicInfo FOR EACH ROW
BEGIN
    IF (DATEDIFF(CURRENT_DATE,OLD.lastUpdated) >= 7 AND OLD.isDeactivated=1) THEN
        SET NEW.isDeleted = 1;
    END IF;
END
#

delimiter ;

----------------------
------- views --------
----------------------
delimiter #
-- view showing all verified emails
CREATE VIEW verifiedUserEmails
AS
    SELECT id,username,email FROM userBasicInfo
    WHERE isEmailVerified=1
    AND isDeleted=0;
#

CREATE VIEW deletedAccounts
AS
    SELECT id,username,email,phoneNumber FROM userBasicInfo 
    WHERE isDeleted=1;
#

CREATE VIEW genderBalance
AS
    SELECT gender,COUNT(*) AS totals
    FROM userPersonalInfo
    GROUP BY gender;
#

-- CREATE VIEW averageUserAge
-- AS
--     SELECT userId,dob,CURR_DATE-dob AS age FROM userPersonalInfo
--     WHERE userId={SELECT id,username,email 
--     FROM userBasicInfo
--     WHERE isDeleted=0}
-- #

delimiter ;

-- functions



