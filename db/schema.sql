DROP DATABASE employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT  PRIMARY KEY,
    name VARCHAR(30)
);


CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT  PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(10),
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);


CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES roles(id)
);

DROP TABLE employees;