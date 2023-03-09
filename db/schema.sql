DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employees 
(
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    title VARCHAR(50) NOT NULL
);

