-- Drop the database if it exists
DROP DATABASE IF EXISTS tododb;

-- Create the database
CREATE DATABASE tododb;

-- Use the newly created database
USE tododb;

-- Create the 'task' table
CREATE TABLE task (
    id INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255) NOT NULL
);

-- Insert sample data into the 'task' table
INSERT INTO task (description) VALUES ('My test task');
INSERT INTO task (description) VALUES ('My another task');