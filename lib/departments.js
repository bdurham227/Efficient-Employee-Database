// const updateEmployee = () => {
//     const query = `  
//     SELECT 
//     e.first_name AS firstName, 
//      e.last_name AS lastName,
//     r.title AS title,
//     r.salary AS salary
// FROM employees e
// JOIN roles r 
// ON e.role_id = r.id
// ;`;

// connection.query(query, (err, res) => {
//     if (err) throw err;
//     const arr1 = [];
//     res.forEach(({ firstName, lastName, title, salary }) => {
//         arr1.push(`First Name: ${firstName} Last Name: ${lastName} Title: ${title} Salary: ${salary} `);
//         // console.table(arr1);
//     })
//     // console.table(arr1);
//     inquirer.prompt([
//         {
//             type: 'list',
//             name: 'chosenEmployee',
//             message: "Choose an employee you wish to update",
//             choices: arr1
//         },
//         {
//             type: 'confirm',
//             name: 'confirmFirstName',
//             message: "Would you like to update an employee's first name?",
//         },
//         {
//             type: 'input',
//             name: 'firstName',
//             messsage: "Update employee's first name",
//             when: function (answers) {
//                 return answers.confirmFirstName;
//             },
//         },
//         {
//             type: 'confirm',
//             name: 'confirmLastName',
//             message: "Would you like to update an employee's last name?",
//         },
//         {
//             type: 'input',
//             name: 'lastName',
//             messsage: "Update employee's last name",
//             when: function (answers) {
//                 return answers.confirmLastName;
//             },
//         },
//         {
//             type: 'confirm',
//             name: 'confirmTitle',
//             message: "Would you like to update an employee's job title?",
//         },
//         {
//             type:"input",
//             name: 'title',
//             message: "Update employee's job title",
//             when: function (answers) {
//                 return answers.confirmTitle;
//             },
//         },
//         {
//             type: "confirm",
//             name: "confirmSalary",
//             message: "Would you like to update an employee's salary",
//         },
//         {
//             type: "input",
//             name: "salary",
//             message: "Update employee's salary",
//             validate(value) {
//                 if (isNaN(value) === false) {
//                   return true;
//                 }
//                 return false;
//               },
//             when: function (answers) {
//                 return answers.confirmSalary;
//             },
//         },
//     ])
//     .then((answer) => {
//       const firstName = answer.firstName;
//       const lastName = answer.lastName;
//        const updatedEmployee = [firstName, lastName, answer.title, answer.salary];
//         console.log(updatedEmployee);
//        const updateQuery = connection.query(
//     `UPDATE employees, roles 
//     SET 
//     first_name = ?,
//     last_name = ?,
//     title = ?,
//     salary = ?
//      WHERE (?, ?, ?, ?)`);
   
//     connection.query(updateQuery, updatedEmployee, (err) => {
//         if (err) throw err;
//         console.log('employee was updated');
//     })

//     })