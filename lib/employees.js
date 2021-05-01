// const mysql = require('mysql');
// const cTable = require('console.table');
// const inquirer = require('inquirer');
// // const connection = require('../config/connection');
// const util = require('util');




// const getAllRoles = require('../lib/roles');
// // const connection = require('../config/connection');
// connection.query() = util.promisify(connection.query());

// const getAllEmployees = () => {
//     return new Promise((resolve, reject) => {
//       connection.query(`SELECT * FROM employees;`, (err, res) => {
//         if (err) reject (err);
//         resolve(res);
//       })
//     })
//   }

//   const updateEmployee = async () => {
//     try {
//       const query = await getAllRoles();
//       const roles = query.map(({ title, salary}) => ({ title, salary}));
//       //employees
//       const empQuery = await getAllEmployees();
//       const emps = empQuery.map(({ first_name, last_name, role_id }) => ({ first_name, last_name, role_id}));
    
  
//       inquirer.prompt([
//         {
//           type: 'list',
//           name: 'employee',
//           message: 'Choose the employee and their role you would like to change',
//           choice: emps
//         },
    //     {
    //         type: 'list',
    //         name: 'roles',
    //         message: 'Which role?',
    //         choices: roles
    //     }
    //   ])
  
   
  
  
  
//     } catch (err) {
//       if (err) throw (err);
//       console.log('oops something wrong!')
//     }
//   }
  updateEmployee();