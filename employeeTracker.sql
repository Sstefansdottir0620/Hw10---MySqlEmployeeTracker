DROP DATABASE IF EXISTS companyDB;
CREATE database companyDB;

USE companyDB;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employees (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee_role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(100) NOT NULL,
  salary DECIMAL(100) NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);


