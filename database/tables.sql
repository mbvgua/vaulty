-- schema for tables in vaulty

-- create and use the database
CREATE DATABASE vaulty;
USE vaulty;

-- users table
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    user_name VARCHAR(100) UNIQUE,
    email VARCHAR(100) NOT NULL,
    hashed_password VARCHAR(255),
    role ENUM('admin','farmer','buyer','vet') NOT NULL,
    created_at DATE DEFAULT(CURRENT_DATE),
    is_email_verified BOOLEAN DEFAULT 0,
    is_deactivated BOOLEAN DEFAULT 0,
    is_deleted BOOLEAN DEFAULT 0
);

-- birds table
CREATE TABLE birds (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    bird_type ENUM('broiler','kienyeji','layer') NOT NULL,
    bird_details JSON,
    is_deleted BOOLEAN DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- coops table
CREATE TABLE coops(
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    bird_id VARCHAR(255),
    is_deleted BOOLEAN DEFAULT 0,
    created_at DATE DEFAULT(CURRENT_DATE),
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (bird_id) REFERENCES birds(id)
);

-- expenses table
CREATE TABLE expenses (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    coop_id VARCHAR(255),
    category ENUM('health','feeds','equipment','labour','other') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    lastUpdated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (coop_id) REFERENCES coops(id)
);

-- feeds table
CREATE TABLE feeds (
    id VARCHAR(255) PRIMARY KEY,
    coop_id VARCHAR(255),
    expense_id VARCHAR(255),
    feed_type ENUM('starter','grower','layer','broiler') NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    acquired_on DATE DEFAULT(CURRENT_DATE),
    estimated_finish DATE DEFAULT(CURRENT_DATE),
    FOREIGN KEY (coop_id) REFERENCES coops(id),
    FOREIGN KEY (expense_id) REFERENCES expenses(id)
);
