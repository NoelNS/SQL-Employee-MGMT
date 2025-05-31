INSERT INTO department(name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role(title,department_id,salary)
VALUES
    ('Sales Lead',1,100000),
    ('Salesperson',1,80000),
    ('Lead Engineer',2,150000),
    ('Software Engineer',2,120000),
    ('Account Manager',3,160000),
    ('Accountant',3,125000),
    ('Legal Team Lead',4,250000),
    ('Lawyer',4,190000);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES
    ('John','Doe',1,null),
    ('Mike','Doe',2,1),
    ('Ashley','Doe',3,null),
    ('Kevin','Doe',4,3),
    ('Kunal','Doe',5,null),
    ('Malia','Doe',6,5),
    ('Sarah','Doe',7,null),
    ('Tom','Doe',8,7);
