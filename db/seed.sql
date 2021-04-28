USE employee_tracker_db;

INSERT INTO departments (name)
 VALUES ('Human Resources'),
 ('Sales'),
 ('Marketing'),
 ('Engineering'),
 ('Legal'),
 ('Finance'),
 ('Customer Service');

  INSERT INTO roles (title, salary, department_id) 
 VALUES 
 ('Sales Coordinator', 40000, 2),
 ('Sales Lead', 70000, 2),
 ('Lead Engineer', 100000, 4),
 ('Senior Developer', 150000, 4),
 ('Junior Developer', 70000, 4),
 ('Legal Team Lead', 120000, 5),
 ('Lawyer', 83000, 5),
 ('Employee Relations', 50000, 1),
 ('Employee Finances', 43000, 1),
 ('Social Media Analyst', 51000, 3),
 ('Social Media Strategist', 60000, 3),
 ('Customer Service Agent', 33000, 7),
 ('Customer Support', 34000, 7),
 ('Chief Financial Officer', 200000, 6),
 ('Accountant', 60000, 6)
 ;

  INSERT INTO employees (first_name, last_name, role_id, manager_id)
  VALUES ('Vitorino', 'Castro', 2, null),
  ('Brittany', 'Bradford', 1, 2),
  ('Roberto', 'Masis', 5, 3),
  ('Eduardo', 'Troian', 13, 2),
  ('Patrick', 'Durham', 14, null),
  ('Steven', 'Oliver', 15, 14),
  ('Hector', 'Oliver', 10, 2),
  ('Ricky', 'Iverson', 3, null),
  ('Dylan', 'Jones', 8, 3),
  ('Jordan', 'Jones', 4, 3),
  ('Craig', 'Stevenson', 6, null),
  ('Josh', 'Gozdal', 7, 6),
  ('Jason', 'Barbnel', 11, 2),
  ('Penny', 'Durham', 12, 2),
  ('Colin', 'Iverson', 9, 2),
  ('Theodore', 'Decker', 8, 2);