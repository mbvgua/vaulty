CREATE TABLE users(
    -- mandatory data by user
    -- SERIAL DEFAULT VALUE equates to NOT NULL AUTO_INCREMENT UNIQUE
    id INT PRIMARY KEY SERIAL DEFAULT VALUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    phoneNumber INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender ENUM('male','female') NOT NULL,
    dob INT NOT NULL,
    profilePicture VARCHAR(255),
    -- autofill
    createdAt DATETIME NOT NULL DEFAULT(CURRENT_TIMESTAMP),
    role ENUM('admin','user') NOT NULL,
    isDeleted BOOLEAN DEFAULT 0,
    isEmailSent BOOLEAN DEFAULT 0
)


-- dump dummy users
-- INSERT INTO users VALUES
--     ();