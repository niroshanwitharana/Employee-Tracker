const answers = [
    {
        name: "action",
        type: "list",
        message: "Welcome to our employee database! What would you like to do?",
        choices: [
            "View all employees",
            "View all departments",
            "View all roles",
            "Add an employee",
            "Add department",
            "Add a role",
            "EXIT"
        ]
    }
]

module.exports = answers;