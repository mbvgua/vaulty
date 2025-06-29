
delimiter #
 
-- userViews 
CREATE VIEW getUserBirdsView
AS
    SELECT users.user_name,users.email,birds.bird_type,birds.bird_details FROM users
    INNER JOIN birds
    ON users.id = birds.user_id
    WHERE users.is_deleted=0 AND birds.is_deleted=0;
#

CREATE VIEW getUserCoopsView 
AS
    SELECT users.user_name,users.email,users.role,coops.coop_name,coops.coop_details,coops.created_at FROM users
    INNER JOIN coops
    ON users.id=coops.user_id
    WHERE users.is_deleted=0 AND coops.is_deleted=0; 
#

CREATE VIEW getUserExpensesView 
AS
    SELECT users.user_name,users.email,users.role,expenses.category,expenses.amount,expenses.description,expenses.created_at FROM users
    INNER JOIN expenses
    ON users.id = expenses.user_id
    WHERE users.is_deleted=0 AND expenses.is_deleted=0;
#

CREATE VIEW getUserFeedsView
AS
    SELECT users.user_name,users.email,users.role,feeds.feed_type,feeds.quantity,feeds.acquired_on FROM users
    INNER JOIN feeds
    ON users.id = feeds.user_id
    WHERE users.is_deleted=0 AND feeds.is_deleted=0;
#


-- coopViews
CREATE VIEW getCoopBirdsView
AS
    SELECT coops.coop_name,coops.coop_details,birds.bird_type,birds.bird_details FROM coops
    INNER JOIN birds
    ON coops.bird_id = birds.id
    WHERE coops.is_deleted = 0 AND birds.is_deleted=0;
#

CREATE VIEW getCoopExpensesView
AS
    SELECT coops.coop_name,coops.coop_details,expenses.category,expenses.amount,expenses.description FROM coops
    INNER JOIN expenses
    ON coops.id = expenses.coop_id
    WHERE coops.is_deleted=0 AND expenses.is_deleted=0;
#

CREATE VIEW getCoopFeedsView
AS
    SELECT coops.coop_name,coops.coop_details,feeds.feed_type,feeds.quantity,feeds.acquired_on FROM coops
    INNER JOIN feeds
    ON coops.id = feeds.coop_id
    WHERE coops.is_deleted=0 AND feeds.is_deleted=0;
#



delimiter ;

