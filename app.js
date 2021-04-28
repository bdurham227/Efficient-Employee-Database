const inquirer = require('inquirer');

const cTable = require('console.table');
const mysql = require('mysql');

require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
})
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    runSearch();
})

const runSearch = () => {
    inquirer
      .prompt([
        {
          name: "action",
          type: "list",
          message: "What would you like to do?",
          choices: [
            "Find all Departments",
            "Find all Roles",
            "Find all Employees",
            "Edit Department",
            "Edit role",
            "Edit Employee",
            
            
          ],
        },
      ])
      .then((answers) => {
        switch (answers.action) {
  
          case "Find all Departments":
            findDepartments();
            break;
  
          case "Find all Roles":
            findRoles();
            break;
  
          case "Find all Employees":
            findEmployees();
            break;
  
          case "Edit Department":
            editDepartment();
            break;
  
          case "Edit Role":
            editRole();
            break;
  
          case "Edit Employee":
            editEmployee();
            break;
         
        }
      });
  };

  const findDepartments = async () => {
    console.log("----------");
    await connection.query(
      `SELECT
           id, 
           name AS Department 
       FROM departments`,
      (err, res) => {
        if (err) throw err;
        console.table(res);
        runSearch();
      }
    );
  };
  
  const findRoles = async () => {
    console.log("--------------");
    await connection.query(
      `SELECT 
          id AS 'Employee ID',
          title AS Position,
          salary,
          department_id AS 'Department ID'
      FROM roles;`,
      (err, res) => {
        if (err) throw err;
        console.table(res);
        runSearch();
      }
    );
  };
  
  const findEmployees = async () => {
    console.log("--------------------");
    await connection.query(
      `SELECT 
          e.id,
          CONCAT(e.first_name, ' ', e.last_name) AS 'Employee Name',
          CONCAT(m.first_name, ' ', m.last_name) AS 'Manager',
          r.salary,
          r.title,
          d.name AS 'Department',
          e.manager_id 
      FROM employees e
      LEFT JOIN employees m
      ON e.manager_id = m.role_id
      JOIN roles r
      ON e.role_id = r.id
      JOIN departments d
      ON r.department_id = d.id; `,
  
      (err, res) => {
        if (err) throw err;
        console.table(res);
        runSearch();
      }
    );
  };