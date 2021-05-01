const mysql = require('mysql');
const cTable = require('console.table');

const getAllRoles = () => {
    return new Promise ((resolve, reject) => {
      connection.query(`SELECT * FROM roles;`, (err, res) => {
        if (err) reject (err);
        resolve(res);
      })
    })
  }

  module.exports = getAllRoles;