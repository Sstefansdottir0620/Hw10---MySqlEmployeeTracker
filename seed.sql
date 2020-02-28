INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES
("Claudia", "Fernandez", 1, 5),
("Stefania", "Stefansdottir", 2, 4),
("Hanna", "Fuentes", 3, 3),
("Fransisco", "Cortez", 4, 2),
("Claudia", "Huerta", 5, 1);



INSERT INTO department (department_name) 
VALUES
("Reaserch_Development"),
("Marketing"),
("Human_Resource"),
("Account_Finance"),
("IT");

INSERT INTO employee_role (title, salary, department_id) 
VALUES
("CEO", 80000, 1),
("Account_Manager", 70000, 4),
("Creative_Director", 60000, 2),
("Office_Manager", 50000, 3),
("Web_Developer", 40000, 5);
