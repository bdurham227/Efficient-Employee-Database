const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql");
const { prompt } = require("inquirer");
// const connection = require('./config/connection');

require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  runSearch();
});


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
          "Add role",
          "Add Employee",
          "Update Employee"
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
          addDepartment();
          break;

        case "Add role":
          addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee":
            updateEmployee();
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
      console.log(`${res.length} matches found!`);
      console.table(res);
      runSearch();
    }
  );
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departments",
        message: "Enter new Department name",
      },
    ])
    .then((answer) => {
      connection.query("INSERT INTO departments (name) VALUES ( ? )", [
        answer.departments,
      ]);
      console.table(`${answer.departments} was added to Departments`);
      runSearch();
    });
};

const addRole = () => {
  const deptQuery = `SELECT * From departments`;
  connection.query(deptQuery, (err, res) => {
    if (err) throw err;
    const deptOptions = res.map(({ name, id }) => ({ name, id }));
    console.log(deptOptions);

    inquirer
      .prompt([
        {
          type: "list",
          name: "deptName",
          message: "Choose the role's department",
          choices: deptOptions,
        },
      ])
      .then((answer) => {
      
        const deptName = answer.deptName;
        const deptId = deptOptions.find((el) => el.name === answer.deptName).id;
       
        

        //get role information
        inquirer
          .prompt([
            {
              type: "input",
              name: "title",
              message: "Enter a title for the new role",
            },
            {
              type: "input",
              name: "salary",
              message: "Enter a salary for the new role",
              validate(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              },
            },
          ])
          .then((answer) => {
            const roleData = answer.title;
            const roleSalary = answer.salary;
            const newRole = [roleData, roleSalary, deptId];

            const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);`;
            connection.query(sql, newRole, (err) => {
              if (err) throw err;
              console.log(`new role was added!`);
            });
          });
      });
  });
  runSearch();
};


const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter employee's first name",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter employee's last name",
      },
    ])
    .then((answer) => {
      const employeeHolder = [answer.firstName, answer.lastName];
      const roleQuery = `SELECT id, title FROM roles`;
      connection.query(roleQuery, (err, res) => {
        if (err) throw err;
        const roleOptions = res.map(({ id, title }) => ({
          role_id: id,
          name: title,
        }));
        inquirer
          .prompt([
            {
              type: "list",
              name: "roles",
              choices: roleOptions,
            },
          ])
          .then((roleChoice) => {
            const role = roleChoice.roles.id;
            employeeHolder.push(role);
            const mgrQuery = `SELECT * FROM employees`;
            connection.query(mgrQuery, (err, res) => {
              if (err) throw err;
              const mgrOptions = res.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name,
                value: id,
              }));
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "managerName",
                    message: "Choose employee's manager",
                    choices: mgrOptions,
                  },
                ])
                .then((mgrChoice) => {
                  const manager = mgrChoice.managerName;
                  employeeHolder.push(manager);

                  const insertSql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                  connection.query(insertSql, employeeHolder, (err) => {
                    if (err) throw err;
                    console.log(`employee added!`);
                  });
                });
            });
          });
      });
    });
    runSearch();
};

 


const getAllRoles = () => {
  return new Promise ((resolve, reject) => {
    connection.query(`SELECT * FROM roles;`, (err, res) => {
      if (err) reject (err);
      resolve(res);
    })
  })
}
const getAllEmployees = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM employees;`, (err, res) => {
      if (err) reject (err);
      resolve(res);
    })
  })
}



const updateEmployee = async () => {
  try {
    const rolesQuery = await getAllRoles();
    const roles = rolesQuery.map(({ title: name, id: value}) => ({ name, value}));
    // console.log(roles)
    
    const empQuery = await getAllEmployees();
    const emps = empQuery.map(({ first_name: name, id: value }) => ({ name, value}));
    // console.log(emps);
    

    inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Choose the employee and their role you would like to change',
        choices: emps
      },
      {
        type: 'list',
        name: 'roles',
        message: 'Which role?',
        choices: roles
    }
  ])
  .then((answer) => {
    const updated = [answer.employee, answer.roles];
    console.log(updated);
    const updateQuery = `UPDATE employees SET role_id = ? WHERE role_id = ?;`;
    connection.query(updateQuery, updated, (err, res) => {
      if (err) throw (err);
      console.log(`${updated} was updated!`)
    })
  })
  
  } catch (err) {
    if (err) throw (err);
    console.log('oops something wrong!')
  }
}





 


