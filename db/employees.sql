-- Create the database employees_tracker_DB and specified it for use.
CREATE DATABASE employees_tracker_DB;
USE employees_tracker_DB;

-- Create the table department.
CREATE TABLE department (
  id INTEGER,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)  
);

-- Create the table role.
CREATE TABLE role (
  id INTEGER,
  title VARCHAR(30) NOT NULL,
  salary VARCHAR(30) NOT NULL,
  department_id INTEGER,  
  PRIMARY KEY(id)  
);

-- Create the table employee.
CREATE TABLE employee (
  id INTEGER,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER,
  PRIMARY KEY(id)   
);




-- Insert a set of records.
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
("Jerry", "Smith", "relaxed");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Elaine", "Williams", "righteous");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kramer", "Brown", "doofus");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("George", "Wilson", "selfish")