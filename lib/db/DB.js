const connection = require('./connection');
const cTable = require('console.table');

class DB {
    constructor(db) {
        this.db = db
    }

    getDepts = () =>
        this.db.promise().query('SELECT * FROM departments;')
            .then(([data]) => console.table(data));

    getRoles = () =>
        this.db.promise()
            .query(`
                SELECT 
                    r.id,
                    r.title,
                    r.salary,
                    d.dept_name department 
                FROM roles r
                JOIN departments d
                ON r.department_id=d.id;`
            )
            .then(([data]) => console.table(data));

    getEmps = () =>
        this.db.promise()
            .query(`
                SELECT 
                    e.id,
                    e.first_name,
                    e.last_name,
                    r.title,
                    d.dept_name department, 
                    r.salary,
                    CONCAT(e2.first_name," ",e2.last_name) manager
                FROM employees e
                JOIN roles r
                ON e.role_id=r.id
                LEFT JOIN employees e2
                ON e.manager_id=e2.id
                JOIN departments d
                ON r.department_id=d.id;`
            )
            .then(([data]) => console.table(data));

    listDepts = () =>
        this.db.promise()
            .query(`SELECT
                        dept_name name,
                        id value
                    FROM departments`
            )
            .then(([data]) => data);

    listRoles = () =>
        this.db.promise()
            .query(`SELECT
                        title name,
                        id value
                    FROM roles`
            )
            .then(([data]) => data);

    listEmps = () =>
        this.db.promise()
            .query(`SELECT
                        CONCAT(first_name," ",last_name) name,
                        id value
                    FROM employees`
            )
            .then(([data]) => {
                data.push({ name: 'null', value: null });
                return data;
            });

    addDept = ({ dept_name }) =>
        this.db.promise().query(`INSERT INTO departments SET ?`, { dept_name });

    addRole = ({ title, salary, department_id }) =>
        this.db.promise().query(`INSERT INTO roles SET ?`, { title, salary, department_id });

    updateRole = ({ id, role_id, manager_id }) =>
        this.db.promise().query(`UPDATE employees SET ? WHERE ?`, [{ role_id, manager_id }, { id }]);

    addEmp = ({ first_name, last_name, role_id, manager_id }) =>
        this.db.promise().query(`INSERT INTO employees SET ?`, { first_name, last_name, role_id, manager_id });

    removeRecord = ({location, record_id}) =>
        this.db.promise().query(`DELETE FROM ${location} WHERE id = ?`, [record_id]);
}

module.exports = new DB(connection);