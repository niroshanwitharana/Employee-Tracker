//import modules
const inquirer = require("inquirer");
const mysql = require("mysql");
const util = require("util");

//import files
const connection = require("./server");
const queryAsync = util.promisify(connection.query).bind(connection);
const answers = require("./answers");



const start = function() {
  
  inquirer.prompt([answers[0]])
    
    .then(function (answer) {
      switch (answer.action) {
        case "View all employees":
          sqlQuery.viewEmployees();          
          break;
        case "View all departments":
          sqlQuery.viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Add department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "EXIT":
          endApp();
          break;
        default:
          break;
      }
    });
  }

start();

const sqlQuery = {

  viewEmployees: async function () {
      try {
      const data = await queryAsync("SELECT * FROM employee;");
          
          console.log(data.length + " employees found!");
          console.log('All Employees:');
          console.table(data);
          console.log("--------------------------------------------");
                     
         start();                     
      }
      catch (error) {
          console.log("Error with viewEmployees() ", error);
      }
  },

  viewDepartments: async function() {
    try {
      const data = await queryAsync( "SELECT * FROM department;")
      
      onsole.log(data.length + " Departments found!");
          console.log('All Departments:');
          console.table(data);
          console.log("--------------------------------------------");
      start();
    }
    catch (error) {
      console.log("Error with viewEmployees() ", error);
  } 
  }


}

