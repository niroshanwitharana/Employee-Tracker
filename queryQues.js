//import packages
const mysql = require('mysql');


const queryQues = {
    startScreen: ['View all Employees', 'View all Emplyees by Department', 'View all Employees by Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'Remove Role', 'View all Departments', 'Add Department', 'Remove Department', 'Exit'],
    addEmployeeQuestions: ['What is the first name?', 'What is the last name?', 'What is their role?', 'Who is their manager?'],
    allEmployeeQuery: 
        `SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.department_name AS "Department", IFNULL(r.salary, 'No Data') AS "Salary", CONCAT(m.first_name," ",m.last_name) AS "Manager"
        FROM employees e
        LEFT JOIN roles r 
        ON r.id = e.role_id 
        LEFT JOIN departments d 
        ON d.id = r.department_id
        LEFT JOIN employees m ON m.id = e.manager_id
        ORDER BY e.id;`,
    roleQuery: `SELECT * from roles; SELECT CONCAT (e.first_name," ",e.last_name) AS full_name, r.title, d.department_name FROM employees e INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id WHERE department_name = "Management"`,
    roleQuery: `SELECT * from roles; SELECT CONCAT (e.first_name," ",e.last_name) AS full_name FROM employees e`,
    mgrQuery: `SELECT CONCAT (e.first_name," ",e.last_name) AS full_name, r.title, d.department_name FROM employees e INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id WHERE department_name = "Management";`,
    deptQuery: `SELECT * FROM departments`,
    byDeptQuery: `SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title AS "Title", d.department_name AS "Department", r.salary AS "Salary" FROM employees e INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id WHERE ?;`,
    mgrQuery2: `SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", IFNULL(r.title, "No Data") AS "Title", IFNULL(d.department_name, "No Data") AS "Department", IFNULL(r.salary, 'No Data') AS "Salary", CONCAT(m.first_name," ",m.last_name) AS "Manager"
        FROM employees e
        LEFT JOIN roles r 
        ON r.id = e.role_id 
        LEFT JOIN departments d 
        ON d.id = r.department_id
        LEFT JOIN employees m ON m.id = e.manager_id
        WHERE CONCAT(m.first_name," ",m.last_name) = ?
        ORDER BY e.id;`,
    addEmpQuery: `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES(?, ?, 
        (SELECT id FROM roles WHERE title = ? ), 
        (SELECT id FROM (SELECT id FROM employees WHERE CONCAT(first_name," ",last_name) = ? ) AS tmptable))`,
    delEmpQuery:  `DELETE FROM employees where ?`,
    updateEmpQuery: `SELECT CONCAT (first_name," ",last_name) AS full_name FROM employees; SELECT title FROM roles`,
    updateEmpQuery2:`UPDATE employees 
            SET role_id = (SELECT id FROM roles WHERE title = ? ) 
            WHERE id = (SELECT id FROM(SELECT id FROM employees WHERE CONCAT(first_name," ",last_name) = ?) AS tmptable)`,
    viewRoleQuery: `SELECT title AS "Title" FROM roles`,
    addRoleQuery: `SELECT * FROM roles; SELECT * FROM departments`,
    addRoleQuery2: `INSERT INTO roles(title, salary, department_id) 
    VALUES (?, ?, (SELECT id FROM departments WHERE department_name = ?));`,
    viewRoleQuery2: `SELECT * FROM roles;`,
    delRoleQuery: `DELETE FROM roles WHERE ? ;`,
    viewDeptQuery: `SELECT department_name AS "Departments" FROM departments;`,
    addDeptQuery: `SELECT department_name AS "Departments" FROM departments;`,
    addDeptQuery2: `INSERT INTO departments(department_name) VALUES( ? )`,
    allDeptQuery: `SELECT * FROM departments;`,
    removeDeptQuery: `DELETE FROM departments WHERE ? ;`
}


module.exports = queryQues;