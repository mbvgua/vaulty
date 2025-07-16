
delimiter #
 
-- userViews 
CREATE VIEW users_birds_view
AS
    SELECT users.user_name,users.email,birds.type,birds.details FROM users
    INNER JOIN birds
    ON users.id = birds.user_id
    WHERE users.is_deleted=0 AND birds.is_deleted=0;
#

CREATE VIEW users_coops_view
AS
    SELECT users.user_name,users.email,users.role,coops.name,coops.details,coops.created_at FROM users
    INNER JOIN coops
    ON users.id=coops.user_id
    WHERE users.is_deleted=0 AND coops.is_deleted=0; 
#

CREATE VIEW users_expenses_view 
AS
    SELECT users.user_name,users.email,users.role,expenses.category,expenses.amount,expenses.description,expenses.created_at FROM users
    INNER JOIN expenses
    ON users.id = expenses.user_id
    WHERE users.is_deleted=0 AND expenses.is_deleted=0;
#

CREATE VIEW users_feeds_view
AS
    SELECT users.user_name,users.email,users.role,feeds.type,feeds.quantity,feeds.acquired_on FROM users
    INNER JOIN feeds
    ON users.id = feeds.user_id
    WHERE users.is_deleted=0 AND feeds.is_deleted=0;
#


-- coopViews
CREATE VIEW coops_birds_view
AS
    SELECT coops.name,coops.details,birds.type,birds.details AS 'bird details' FROM coops
    INNER JOIN birds
    ON coops.bird_id = birds.id
    WHERE coops.is_deleted = 0 AND birds.is_deleted=0;
#

CREATE VIEW coops_expenses_view
AS
    SELECT coops.name,coops.details,expenses.category,expenses.amount,expenses.description FROM coops
    INNER JOIN expenses
    ON coops.id = expenses.coop_id
    WHERE coops.is_deleted=0 AND expenses.is_deleted=0;
#

CREATE VIEW coops_feeds_view
AS
    SELECT coops.name,coops.details,feeds.type,feeds.quantity,feeds.acquired_on FROM coops
    INNER JOIN feeds
    ON coops.id = feeds.coop_id
    WHERE coops.is_deleted=0 AND feeds.is_deleted=0;
#



delimiter ;

