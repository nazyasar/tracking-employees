USE employee_db;

INSERT INTO department (dept_name)
VALUES ('Engineering'),
    ('Marketing'),
    ('Innovation & AI');

INSERT INTO role (title, salary, dept_id)
VALUES ('Software Engineer', 80000, 1),
    ('Marketing Specialist', 60000, 2),
    ('ML Developer', 100000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Steve', 'Jobs', 1, null),
    ('Naz', 'Yasar', 2, 1),
    ('Elon', 'Musk', 3, 1);