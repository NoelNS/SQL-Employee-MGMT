
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role; 
DROP TABLE IF EXISTS department; 

CREATE TABLE department(
    id              SERIAL  PRIMARY KEY NOT NULL,
    name            VARCHAR(30) UNIQUE  NOT NULL
);

CREATE TABLE role(
    id              SERIAL  PRIMARY KEY NOT NULL,
    title           VARCHAR(30) UNIQUE  NOT NULL,
    salary          DECIMAL             NOT NULL,
    department_id   INT                 NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee(
    id              SERIAL  PRIMARY KEY NOT NULL,
    first_name      VARCHAR(30)         NOT NULL,
    last_name       VARCHAR(30)         NOT NULL,
    role_id         INT                 NOT NULL,
    manager_id      INT,
    FOREIGN KEY (role_id) REFERENCES role (id),
    FOREIGN KEY (manager_id) REFERENCES role (id)
);

