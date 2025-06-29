
delimiter #

-- users storedProcedures
-- addUser
CREATE PROCEDURE addUser(
    IN id VARCHAR(255),
    IN first_name VARCHAR(100),
    IN last_name VARCHAR(100),
    IN user_name VARCHAR(100),
    IN email VARCHAR(100),
    IN hashed_password VARCHAR(255),
    IN role ENUM('admin','farmer','buyer','vet')
)
BEGIN
    INSERT INTO users(id,first_name,last_name,user_name,email,hashed_password,role)
    VALUES (id,first_name,last_name,user_name,email,hashed_password,role);
END#

-- getUserById
CREATE PROCEDURE getUserById(
    IN user_id VARCHAR(255)
)
BEGIN
    SELECT * FROM users
    WHERE id=user_id AND is_deleted=0;
END#

-- getUserByEmail
CREATE PROCEDURE getUserByEmail(
    IN email VARCHAR(100) 
)
BEGIN
    SELECT * FROM users
    WHERE email=email AND is_deleted=0;
END#

-- getUserByUsername
CREATE PROCEDURE getUserByUserName(
    IN user_name VARCHAR(100)
)
BEGIN
    SELECT * FROM users
    WHERE user_name=user_name AND is_deleted=0;
END#

-- getAllUsers
CREATE PROCEDURE getAllUsers()
BEGIN
    SELECT * FROM users WHERE is_deleted=0;
END#

-- getUnverifiedEmails
-- CREATE PROCEDURE getUnverifiedEmails()
-- BEGIN
--     SELECT * FROM users WHERE is_email_verified=0 AND is_deleted=0;
-- END#

-- setVerifiedEmails
-- CREATE PROCEDURE setVerifiedEmails(
--     IN id VARCHAR(255)
-- )
-- BEGIN
--     UPDATE users SET is_email_verified=1 
--     WHERE id=id AND is_deleted=0;
-- END#

-- updateUser
CREATE PROCEDURE updateUser(
    IN first_name VARCHAR(100),
    IN last_name VARCHAR(100),
    IN user_name VARCHAR(100),
    IN email VARCHAR(100),
    IN hashed_password VARCHAR(255),
    IN role ENUM('admin','farmer','buyer','vet')
)
BEGIN
    UPDATE users
    SET id=id,first_name=first_name,last_name=last_name,user_name=user_name,email=email,hashed_password=hashed_password
    WHERE id=id
    AND is_deleted=0;
END#

-- deactivateUserAccount
CREATE PROCEDURE deactivateUserAccount(
    IN id VARCHAR(255)
)
BEGIN
    UPDATE users SET is_deactivated=1
    WHERE id=id;
END#

-- deleteUserAccount
CREATE PROCEDURE deleteUserAccount(
    IN id VARCHAR(255)
)
BEGIN
    UPDATE users SET is_deleted=1
    WHERE id=id;
END#


-- birds storedProcedures
-- addBird
CREATE PROCEDURE addBird(
    IN id VARCHAR(255),
    IN user_id VARCHAR(255),
    IN bird_type ENUM('broiler','kienyeji','layer'),
    IN bird_details JSON
)
BEGIN
    INSERT INTO birds(id,user_id,bird_type,bird_details)
    VALUES(id,user_id,bird_type,bird_details);
END#

-- getBirdById
CREATE PROCEDURE getBirdById(
    IN id VARCHAR(255)
)
BEGIN
    SELECT * FROM birds
    WHERE id=id AND is_deleted=0;
END#

-- getAllBirds
CREATE PROCEDURE getAllBirds()
BEGIN
    SELECT * FROM birds WHERE is_deleted=0;
END#

-- updateBird
CREATE PROCEDURE updateBird(
    IN id VARCHAR(255),
    IN bird_type ENUM('broiler','kienyeji','layer'),
    IN bird_details JSON
)
BEGIN
    UPDATE birds
    SET bird_type=bird_type, bird_details=bird_details
    WHERE id=id AND is_deleted=0;
END#

-- deleteBird
CREATE PROCEDURE deleteBird(
    IN id VARCHAR(255)
)
BEGIN
    UPDATE birds
    SET is_deleted=1 WHERE id=id;
END#


-- coops storedProcedures
-- addCoop
CREATE PROCEDURE addCoop(
    IN id VARCHAR(255),
    IN user_id VARCHAR(255),
    IN bird_id VARCHAR(255),
    IN coop_name VARCHAR(255),
    IN coop_details JSON
)
BEGIN
    INSERT INTO coops(id,user_id,bird_id,coop_name,coop_details)
    VALUES (id,user_id,bird_id,coop_name,coop_details);
END#

-- getCoopById
CREATE PROCEDURE getCoopById(
    IN id VARCHAR(255)
)
BEGIN
    SELECT * FROM coops
    WHERE id=id AND is_deleted=0;
END#

-- getCoopByName
CREATE PROCEDURE getCoopByName(
    IN coop_name VARCHAR(100)
)
BEGIN
    SELECT * FROM coops
    WHERE coop_name=coop_name AND is_deleted=0;
END#

-- getAllCoops
CREATE PROCEDURE getAllCoops()
BEGIN
    SELECT * FROM coops
    WHERE is_deleted=0;
END#

-- updateCoop
CREATE PROCEDURE updateCoop(
    IN id VARCHAR(255),
    IN user_id VARCHAR(255),
    IN bird_id VARCHAR(255),
    IN coop_name VARCHAR(100),
    IN coop_details JSON
)
BEGIN
    UPDATE coops
    SET user_id=user_id,bird_id=bird_id,coop_name=coop_name,coop_details=coop_details
    WHERE id=id AND is_deleted=0;
END#

-- deleteCoop
CREATE PROCEDURE deleteCoop(
    IN id VARCHAR(255)
)
BEGIN
    UPDATE coops
    SET is_deleted=1 WHERE id=id;
END#

-- feeds storedProcedures
-- addFeed
CREATE PROCEDURE addFeed(
    IN id VARCHAR(255),
    IN coop_id VARCHAR(255),
    IN expense_id VARCHAR(255),
    IN feed_type ENUM('starter','grower','layer','broiler'),
    IN quantity DECIMAL(10,2)
)
BEGIN
    INSERT INTO feeds(id,coop_id,expense_id,feed_type,quantity)
    VALUES(id,coop_id,expense_id,feed_type,quantity);
END#

-- getFeedById
CREATE PROCEDURE getFeedById(
    IN id VARCHAR(255)
)
BEGIN
    SELECT * FROM feeds
    WHERE id=id ANd is_deleted=0;
END#

-- getFeedByType
CREATE PROCEDURE getFeedByType(
    IN feed_type ENUM('starter','grower','layer','broiler')
)
BEGIN
    SELECT * FROM feeds
    WHERE feed_type=feed_type AND is_deleted=0;
END#

-- getAllFeeds
CREATE PROCEDURE getAllFeeds()
BEGIN
    SELECT * FROM feeds WHERE is_deleted=0;
END#

-- updateFeed
CREATE PROCEDURE updateFeed(
    IN id VARCHAR(255),
    IN coop_id VARCHAR(255),
    IN expense_id VARCHAR(255),
    IN feed_type ENUM('starter','grower','layer','broiler'),
    IN quantity DECIMAL(10,2)
)
BEGIN
    UPDATE feeds
    SET coop_id=coop_id,expense_id=expense_id,feed_type=feed_type,quantity=quantity
    WHERE id=id AND is_deleted=0;
END#

-- deleteFeed
CREATE PROCEDURE deleteFeed(
    IN id VARCHAR(255)
)
BEGIN
    UPDATE feeds
    SET is_deleted=1 WHERE id=id;
END#

-- expenses storedProcedures
-- addExpense
CREATE PROCEDURE addExpense(
    IN id VARCHAR(255),
    IN user_id VARCHAR(255),
    IN coop_id VARCHAR(255),
    IN category ENUM('health','feeds','equipment','labour','other'),
    IN amount DECIMAL(10,2),
    IN description TEXT
)
BEGIN
    INSERT INTO expenses(id,user_id,coop_id,category,amount,description)
    VALUES(id,user_id,coop_id,category,amount,description);
END#

-- getExpenseById
CREATE PROCEDURE getExpenseById(
    IN id VARCHAR(255)
)
BEGIN
    SELECT * FROM expenses
    WHERE id=id AND is_deleted=0;
END#

-- getExpenseByCategory
CREATE PROCEDURE getExpenseByCategory(
    IN category ENUM('health','feeds','equipment','labour','other')
)
BEGIN
    SELECT * FROM expenses
    WHERE category=category AND is_deleted=0;
END#

-- getAllExpenses
CREATE PROCEDURE getAllExpenses()
BEGIN
    SELECT * FROM expenses WHERE is_deleted=0;
END#

-- updateExpense
CREATE PROCEDURE updateExpense(
    IN id VARCHAR(255),
    IN user_id VARCHAR(255),
    IN coop_id VARCHAR(255),
    IN category ENUM('health','feeds','equipment','labour','other'),
    IN amount DECIMAL(10,2),
    IN description TEXT
)
BEGIN
    UPDATE expenses
    SET user_id=user_id,coop_id=coop_id,category=category,amount=amount,description=description
    WHERE is_deleted=0;
END#

-- deleteExpense
CREATE PROCEDURE deleteExpense(
    IN id VARCHAR(255)
)
BEGIN
    UPDATE expenses
    SET is_deleted=1 WHERE id=id;
END#

-- return normal termination semi-colons
delimiter ;

