-- create and use the database
CREATE DATABASE vaulty;
USE vaulty;

-- users table
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    user_name VARCHAR(100) UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    hashed_password VARCHAR(255),
    role ENUM('admin','farmer','buyer','vet') NOT NULL,
    created_at DATE DEFAULT(CURRENT_DATE),
    is_welcome_email_sent BOOLEAN DEFAULT 0,
    is_email_verified ENUM("yes","no","pending") DEFAULT 'no',
    is_deactivated BOOLEAN DEFAULT 0,
    is_deleted BOOLEAN DEFAULT 0
);

-- indexes
CREATE INDEX username_index ON users(user_name);
CREATE INDEX email_index ON users(email);
CREATE INDEX role_index ON users(role);

-- birds table
CREATE TABLE birds (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    type ENUM('broiler','kienyeji','layer') NOT NULL,
    details JSON,
    is_deleted BOOLEAN DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- indexes
CREATE INDEX bird_type_index ON birds(type);

-- coops table
CREATE TABLE coops (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    bird_id VARCHAR(255),
    name VARCHAR(100) NOT NULL,
    details JSON,
    is_deleted BOOLEAN DEFAULT 0,
    created_at DATE DEFAULT(CURRENT_DATE),
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (bird_id) REFERENCES birds(id)
);

-- indexes
CREATE INDEX coop_name_index ON coops(name);

-- expenses table
CREATE TABLE expenses (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    coop_id VARCHAR(255),
    category ENUM('health','feeds','equipment','labour','other') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    description TEXT,
    is_deleted BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (coop_id) REFERENCES coops(id)
);

-- indexes
CREATE INDEX category_index ON expenses(category);

-- feeds table
CREATE TABLE feeds (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    coop_id VARCHAR(255),
    expense_id VARCHAR(255),
    type ENUM('starter','grower','layer','broiler') NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    is_deleted BOOLEAN DEFAULT 0,
    acquired_on DATE DEFAULT(CURRENT_DATE),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (coop_id) REFERENCES coops(id),
    FOREIGN KEY (expense_id) REFERENCES expenses(id)
);

-- indexes
CREATE INDEX feed_type_index ON feeds(type);
CREATE INDEX acquired_on_index ON feeds(acquired_on);
