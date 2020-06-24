// import packages
const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');
const cTable = require('console.table');

//import files
const connection = require('./config/connection');
const queryQues = require('./queryQues');




const startApp = () => {
    inquirer.prompt({
        name: 'menuChoice',
        type: 'list',
        message: 'Select an option',
        choices: queryQues.startScreen

    }).then((answer) => {
        switch (answer.menuChoice) {
            case queryQues.startScreen[0]:
                showAll();
                break;
            case queryQues.startScreen[1]:
                showByDept();
                break;
            case queryQues.startScreen[2]:
                showByManager();
                break;
            case queryQues.startScreen[3]:
                addEmployee();
                break;
            case queryQues.startScreen[4]:
                removeEmployee();
                break;
            case queryQues.startScreen[5]:
                updateRole();
                break;
            case queryQues.startScreen[6]:
                viewRoles();
                break;
            case queryQues.startScreen[7]:
                addRole();
                break;
            case queryQues.startScreen[8]:
                removeRole();
                break;
            case queryQues.startScreen[9]:
                viewDept();
                break;
            case queryQues.startScreen[10]:
                addDept();
                break;
            case queryQues.startScreen[11]:
                removeDept();
                break;
            case queryQues.startScreen[12]:
                connection.end();
                break;
        }
    })
}

// show all employes full details joining all tables

const showAll = () => {
    connection.query(queryQues.allEmployeeQuery, (err, results) => {
        if (err) throw err;
        console.log(chalk.yellow('All Employees'));
        console.table(results);
        console.log('-------------------------------------------------------');
        
        startApp();
    })

}

//view all employees by specific department
const showByDept = () => {

    connection.query(queryQues.deptQuery, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'deptChoice',
                type: 'list',
                choices: function () {
                    let choiceArray = results.map(choice => choice.department_name)
                    return choiceArray;
                },
                message: 'Select a Department to view:'
            }
        ]).then((answer) => {
            let chosenDept;
            for (let i = 0; i < results.length; i++) {
                if (results[i].department_name === answer.deptChoice) {
                    chosenDept = results[i];
                }
            }

            connection.query(queryQues.byDeptQuery, { department_name: chosenDept.department_name }, (err, res) => {
                if (err) throw err;
                console.log(chalk.yellow(`All Employees by Department: ${chosenDept.department_name}`));
                console.table(res)
                console.log('-------------------------------------------------');
                
                startApp();
            })
        })
    })
}

// select all Employee by Manager
const showByManager = () => {
    connection.query(queryQues.mgrQuery, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'mgr_choice',
                type: 'list',
                choices: function () {
                    let choiceArray = results.map(choice => choice.full_name);
                    return choiceArray;
                },
                message: 'Select a Manager:'
            }
        ]).then((answer) => {
            
            connection.query(queryQues.mgrQuery2, [answer.mgr_choice], (err, results) => {
                if (err) throw err;
                console.log(chalk.yellow('Employees by Manager'));
                console.table(results);
                console.log('---------------------------------------------------------');
                
                startApp();
            })
        })
    })
}
// add a new employee
const addEmployee = () => {
    connection.query(queryQues.roleQuery, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'fName',
                type: 'input',
                message: queryQues.addEmployeeQuestions[0]

            },
            {
                name: 'lName',
                type: 'input',
                message: queryQues.addEmployeeQuestions[1]
            },
            {
                name: 'role',
                type: 'list',
                choices: function () {
                    let choiceArray = results[0].map(choice => choice.title);
                    return choiceArray;
                },
                message: queryQues.addEmployeeQuestions[2]

            },
            {
                name: 'manager',
                type: 'list',
                choices: function () {
                    let choiceArray = results[1].map(choice => choice.full_name);
                    return choiceArray;
                },
                message: queryQues.addEmployeeQuestions[3]

            }
        ]).then((answer) => {
            connection.query(queryQues.addEmpQuery, [answer.fName, answer.lName, answer.role, answer.manager]
            )
            console.log(chalk.yellow(answer.fName +' '+ answer.lName + ' Registered as an Employee!'));
            console.log('---------------------------------------------------------------');
                
            startApp();
        })
    })


}

//Remove an Employee
const removeEmployee = () => {
    connection.query(queryQues.allEmployeeQuery, (err, results) => {
        if (err) throw err;
        console.log(chalk.yellow('All Employees'));
        console.table(results);
        console.log('---------------------------------------------');
        
        inquirer.prompt([
            {
                name: 'IDtoRemove',
                type: 'input',
                message: 'Enter the Employee ID of the person to remove:'
            }
        ]).then((answer) => {
            connection.query(queryQues.delEmpQuery, { id: answer.IDtoRemove });
            console.log(chalk.yellow('Employee ID: '+ answer.IDtoRemove + ' Employee has been Removed !'));
            console.log('-----------------------------------------------------');
            
            
            startApp();
        })
    })
}
// Update Employee Role
const updateRole = () => {
   
    connection.query(queryQues.updateEmpQuery, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'empl',
                type: 'list',
                choices: function () {
                    let choiceArray = results[0].map(choice => choice.full_name);
                    return choiceArray;
                },
                message: 'Select an employee to update their role:'
            },
            {
                name: 'newRole',
                type: 'list',
                choices: function () {
                    let choiceArray = results[1].map(choice => choice.title);
                    return choiceArray;
                }
            }
        ]).then((answer) => {
            connection.query(queryQues.updateEmpQuery2, [answer.newRole, answer.empl], (err, results) => {
                    if (err) throw err;
                    console.log(chalk.yellow(answer.empl + ' Upadeted Role as a '+ answer.newRole) );
                    console.log('---------------------------------------------------------');
                    
                    
                    startApp();
                })
        })


    })

}

//view all the Roles
const viewRoles = () => {
    
    connection.query(queryQues.viewRoleQuery, (err, results) => {
        if (err) throw err;

        console.log(chalk.yellow('All Roles'));
        console.table(results);
        console.log('---------------------------------------------------------------');
        
        startApp();
    })

}

//Add a new Role to a specific Department
const addRole = () => {
    
    connection.query(queryQues.addRoleQuery, (err, results) => {
        if (err) throw err;

        console.log(chalk.yellow('List of current Roles:'));
        console.table(results[0]);
        console.log('-------------------------------------------------------');
        

        inquirer.prompt([
            {
                name: 'newTitle',
                type: 'input',
                message: 'Enter the new Title:'
            },
            {
                name: 'newSalary',
                type: 'input',
                message: 'Enter the salary for the new Title:'
            },
            {
                name: 'dept',
                type: 'list',
                choices: function () {
                    let choiceArray = results[1].map(choice => choice.department_name);
                    return choiceArray;
                },
                message: 'Select the Department for this new Title:'
            }
        ]).then((answer) => {
            connection.query(
                queryQues.addRoleQuery2, [answer.newTitle, answer.newSalary, answer.dept ], () => {
                    if(err) throw err;

                    console.log(chalk.yellow(answer.newTitle + ' New Role Successfully added !'));
                    console.log('--------------------------------------------------------');
                    
                    
                    startApp();
                })

        })
    })

}

//Remove a Role
removeRole = () => {
    
    connection.query(queryQues.viewRoleQuery2, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'removeRole',
                type: 'list',
                choices: function () {
                    let choiceArray = results.map(choice => choice.title);
                    return choiceArray;
                },
                message: 'Select a Role to remove:'
            }
        ]).then((answer) => {
            connection.query(queryQues.delRoleQuery, { title: answer.removeRole }, () => {
                if (err) throw err;
                console.log(chalk.yellow(`${answer.removeRole } Successfully Removed !`));
                console.log('-----------------------------------------------------------------');
                
                
                startApp();
            });

        })

    })

}

// View All Department
const viewDept = () => {
    
    connection.query(queryQues.viewDeptQuery, (err, results) => {
        if (err) throw err;

        console.log(chalk.yellow('All Departments'));
        console.table(results);
        console.log('----------------------------------------------------------');
        
        startApp();
    })
}
// Add Department
const addDept = () => {
    
    connection.query(queryQues.addDeptQuery, (err, results) => {
        if (err) throw err;

        console.log(chalk.yellow('List of current Departments'));
        console.table(results);

        inquirer.prompt([
            {
                name: 'newDept',
                type: 'input',
                message: 'Enter the name of the Department to add:'
            }
        ]).then((answer) => {
            connection.query(queryQues.addDeptQuery2, answer.newDept, ()=> {
                console.log(chalk.yellow(`${answer.newDept} Added Successfully`));
                console.log('------------------------------------------------------');
                

                startApp();
            })
        })
    })
}
// Remove a Department
const removeDept = () => {
    
    connection.query(queryQues.allDeptQuery, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'dept',
                type: 'list',
                choices: function () {
                    let choiceArray = results.map(choice => choice.department_name);
                    return choiceArray;
                },
                message: 'Select the department to remove:'
            }
        ]).then((answer) => {
            connection.query(queryQues.removeDeptQuery, { department_name: answer.dept }, () => {

                if(err) throw err;
                console.log(chalk.yellow(`${answer.dept} Removed Successfully`));
                console.log('------------------------------------------------------------');
                
                startApp();
            })
        })
    })

}

startApp();