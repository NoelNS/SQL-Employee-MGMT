const { Pool } = require('pg');
// const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const cTable = require('console.table');

const prompt = inquirer.createPromptModule();

const db = new Pool({
    user: 'postgres',
    password: 'Coding77',
    host: 'localhost',
    port: 5432,
    database: 'employees_db'
});

const init = async () => {
    
    let { task } = await prompt([
        {
            type: 'list',
            name: 'task',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department','add a role', 'add an employee', 'update an employee role']
        }
    ]);

// ================================INQUIRER'S CHOICES======================================
    const deptChoices = await db.query(`
        SELECT
            name,
            id value
        FROM department`);

    const roleChoices = await db.query(`
        SELECT
            title name,
            id value
        FROM role`);

    const empChoices = { Null: null, ... await db.query(`
        SELECT
            CONCAT(first_name,' ',last_name) name,
            id value
        FROM employee`) };
        
// ===============================CONDITIONALS===========================================
    if(task == 'view all departments') {
        const { rows} = await db.query('SELECT * FROM department;');
        console.table(rows);
    };

    if(task == 'view all roles') {
        const { rows} = await db.query(`
            SELECT 
                r.id,
                r.title,
                r.salary,
                d.name department 
            FROM role r
            JOIN department d
            ON r.department_id=d.id;`);
        console.table(rows);
    };

    if(task == 'view all employees') {
        const { rows} = await db.query(`
            SELECT 
                e.id,
                e.first_name,
                e.last_name,
                r.title,
                d.name department, 
                r.salary,
                CONCAT(e2.first_name,' ',e2.last_name) manager
            FROM employee e
            JOIN role r
            ON e.role_id=r.id
            LEFT JOIN employee e2
            ON e.manager_id=e2.id
            JOIN department d
            ON r.department_id=d.id;`);
        console.table(rows);
    };

    if(task == 'add a department') {

        const name = await prompt([{
            type:'input',
            name:'name',
            message:"What is the department's name?"
        }]);

        await db.query(`INSERT INTO department (name) VALUES ($1)`, [ name ] );
        const { rows} = await db.query('SELECT * FROM department;');
        console.table(rows);
    };

    if(task == 'add a role') {

        const { title, salary, department_id } = await prompt([
            {
            type:'input',
            name:'title',
            message:"What is the title?"
            },
            {
            type:'number',
            name:'salary',
            message:"What is the salary?"
            },
            {
            type:'list',
            name:'department_id',
            message:"What is the department?",
            choices: deptChoices
            }
        ]);
        
        await db.query(`INSERT INTO role SET ?`, { title, salary, department_id });
        const { rows} = await db.query('SELECT * FROM role;');
        console.table(rows);
    };

    if(task == 'add a employee') {

        const { first_name, last_name, role_id, manager_id } = await prompt([
            {
                type:'input',
                name:'first_name',
                message:"What is the first_name?"
            },
            {
                type:'input',
                name:'last_name',
                message:"What is the last_name?"
            },
            {
                type:'list',
                name:'role_id',
                message:"What is the role?",
                choices: roleChoices
            },
            {
                type:'list',
                name:'manager_id',
                message:"Who is the manager?",
                choices: empChoices
            }
        ]);
        
        await db.query(`INSERT INTO employee SET ?`, { first_name, last_name, role_id, manager_id });
        const { rows} = await db.query('SELECT * FROM employee;');
        console.table(rows);
    };

    if(task == 'update an employee role') {

        const { id, role_id, manager_id } = await prompt([
            {
                type:'list',
                name:'id',
                message:"Update role of what employee?",
                choices: empChoices
            },
            {
                type:'list',
                name:'role_id',
                message:"What is the new role of the employee?",
                choices: roleChoices
            },
            {
                type:'list',
                name:'manager_id',
                message:"Who is the manager of the employee?",
                choices: empChoices
            }
        ]);
        
        await db.query(`UPDATE employee SET ? WHERE ?`, [{ role_id, manager_id }, { id }]);
        const { rows} = await db.query('SELECT * FROM employee;');
        console.table(rows);
    };

    init();
}

//=====================START APP WITH TITLE=====================================
figlet(`

SQL-EMPLOYEE-MGMT
`,
{ whitespaceBreak: false },
(err, data) => {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);

    init();
});

