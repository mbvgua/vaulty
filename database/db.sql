CREATE DATABASE vaulty;
USE vaulty;

-- create userBasicInfo table
CREATE TABLE userBasicInfo(
    id INT PRIMARY KEY SERIAL DEFAULT VALUE,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phoneNumber INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    isEmailVerified BOOLEAN DEFAULT 0,
    isDeleted BOOLEAN DEFAULT 0
)

-- indexes
CREATE UNIQUE INDEX usernameIndex userBasicInfo(username);
CREATE UNIQUE INDEX emailIndex ON userBasicInfo(email);

-- INSERT DUMMY DATA
INSERT INTO userBasicInfo VALUES
    (DEFAULT,'admin','admin@gmail.com',0712345678,'@Admin2025',DEFAULT,DEFAULT,DEFAULT),
    (DEFAULT,'user1','user1@gmail.com',0712345678,'@User12025',DEFAULT,DEFAULT,DEFAULT),
    (DEFAULT,'user2','user2@gmail.com',0712345678,'@User22025',DEFAULT,DEFAULT,DEFAULT)
;


-- create userPersonalInfo table
    -- SAME AS id INT PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
    -- gender CHAR(1) ENUM('male','female') --IS THIS POSSIBLE?
CREATE TABLE userPersonalInfo(
    id INT PRIMARY KEY SERIAL DEFAULT VALUE,
    userId INT NOT NULL,
    gender ENUM('male','female','other') NOT NULL,
    dob DATE NOT NULL,
    profilePic VARCHAR(255) NOT NULL,
    agreedToTos BOOLEAN DEFAULT 0,
    lastUpdated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES userBasicInfo(id)
);


-- INSERT DUMMY DATA
INSERT INTO userPersonalInfo VALUES
    (DEFAULT,2,'male','1998-04-23','profiles/admin.jpeg',1),
    (DEFAULT,3,'female','2000-07-03','profiles/user1.jpeg',1),
    (DEFAULT,4,'female','2001-01-17','profiles/user2.jpeg',1)
;


-- storedProcedures
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


-- triggers
delimiter #

-- trigger to automatically change lastUpdated column when one changes their dp
CREATE TRIGGER lastProfileUpdate BEFORE UPDATE
ON userPersonalInfo FOR EACH ROW
BEGIN
    IF NEW.profilePic != OLD.profilePic
     THEN SET NEW.lastUpdated = CURRENT_TIMESTAMP;
    END IF;
END
#

delimiter ;

-- views

-- functions



