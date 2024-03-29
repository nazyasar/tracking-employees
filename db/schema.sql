DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db; 

USE employee_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    dept_name VARCHAR (30) NOT NULL 
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL (10, 2) NOT NULL,
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES department (id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee (id) ON DELETE SET NULL
);