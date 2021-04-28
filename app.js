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