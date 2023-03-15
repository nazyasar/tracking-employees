const mysql = require('mysql2');
const inquirer = require('inquirer');
const PORT = 3006;

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'istanbul34',
    database: 'employee_db',
});

connection.connect(err => {
    if (err) throw err;
    console.log("Connected");
    promptMenu();
});

// Initial menu 
const promptMenu = () => {
    inquirer.prompt({
        name: 'menu',
        type: 'list',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Done'
        ]
    }).then(answer => {
        if (answer.menu === 'View all departments') {
            viewDepartment()
        } else if (answer.menu === 'View all roles') {
            viewRoles()
        } else if (answer.menu === 'View all employees') {
            viewEmployees()
        } else if (answer.menu === 'Add a department') {
            addDepartment()
        } else if (answer.menu === 'Add a role') {
            addRole()
        } else if (answer.menu === 'Add an employee') {
            addEmployee()
        } else if (answer.menu === 'Update an employee role') {
            updateEmployee()
        } else {
            connection.end();
        }
    })
};

const viewDepartment = () => {
    connection.promise().query('SELECT * FROM department').then(([data]) => {
        console.table(data)
        promptMenu();
    })
}
const viewRoles = () => {
    connection.promise().query('SELECT * FROM role').then(([data]) => {
        console.table(data)
        promptMenu();
    })
}
const viewEmployees = () => {
    connection.promise().query('SELECT * FROM employee').then(([data]) => {
        console.table(data)
        promptMenu();
    })
}

const addDepartment = () => {
    inquirer.prompt({type: 'input', name: 'dept_name', message: 'Please enter the department name'})
    .then(answer => {
        connection.promise().query('INSERT INTO department(dept_name) VALUES (?)', answer.dept_name)
        .then(dbData => {
            console.log(dbData)
            viewDepartment();
        })
    })
}
const addRole = async () => {
    const [departments] = await connection.promise().query('SELECT * FROM department')
    const departmentArray = departments.map(department => (
        {name: department.dept_name, value: department.id}
    ))
    console.log(departments)
    inquirer.prompt([
        {type: 'input', name: 'title', message: 'Please enter the role title'},
        {type: 'input', name: 'salary', message: 'Enter the salary'},
        {type: 'list', name: 'dept_id', message: 'Select department from the list', choices: departmentArray}
    ])
    .then(({title, salary, dept_id}) => {
        let roleObject = {title, salary, dept_id}
        connection.promise().query('INSERT INTO role SET ?', roleObject).then(([data]) => {
            console.log(data)
        })
    })
}
const addEmployee = () => {
    inquirer.prompt([
        {type: 'input', name: 'first_name', message: 'Please enter the employees first name:'},
        {type: 'input', name: 'last_name', message: 'Please enter the employees last name:'},
        {type: 'input', name: 'role_id', message: 'Please enter the role id number:'},
        {type: 'input', name: 'manager_id', message: 'Please enter the manager id number:'}
    ])
    .then(({first_name, last_name, role_id, manager_id}) => {
        let newEmployee = {first_name, last_name, role_id, manager_id}
        connection.promise().query('INSERT INTO employee VALUES (?)', newEmployee)
        .then(dbData => {
            console.log(dbData)
            viewDepartment();
        })
    })
}

// const mysql = require("mysql2");
// const inquirer = require("inquirer");
// const PORT = 3006;

// //database connection

// const connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "istanbul34",
//   database: "employee_db",
// });

// connection.connect((err) => {
//   if (err) throw err;
//   console.log("Connected to the corporate server.");
//   companyData();
// });

// // Questions in the terminal

// const companyData = () => {
//   inquirer
//     .prompt({
//       name: "data",
//       type: "list",
//       choices: [
//         "View all departments",
//         "View all roles",
//         "View all employees",
//         "Add a department",
//         "Add a role",
//         "Add an employee",
//         "Update an employee role",
//         "Quit",
//       ],
//     })
//     .then((answer) => {
//       if (answer.data === "View all departments") {
//         viewDepartment();
//       } else if (answer.data === "View all roles") {
//         viewRoles();
//       } else if (answer.data === "View all employees") {
//         viewEmployees();
//       } else if (answer.data === "Add a department") {
//         addDepartment();
//       } else if (answer.data === "Add a role") {
//         addRole();
//       } else if (answer.data === "Add an employee") {
//         addEmployee();
//       } else if (answer.data === "Update an employee role") {
//         updateEmployee();
//       } else {
//         connection.end();
//       }
//     });
// };

// // CRUD: READ 

// const viewDepartment = () => {
//   connection
//     .promise()
//     .query("SELECT * FROM department")
//     .then(([data]) => {
//       console.table(data);
//       companyData();
//     });
// };

// const viewRoles = () => {
//   connection
//     .promise()
//     .query("SELECT * FROM role")
//     .then(([data]) => {
//       console.table(data);
//       companyData();
//     });
// };

// const viewEmployees = () => {
//   connection
//     .promise()
//     .query("SELECT * FROM employee")
//     .then(([data]) => {
//       console.table(data);
//       companyData();
//     });
// };

// //CRUD: CREATE 

// const addDepartment = () => {
//   inquirer.prompt({type: 'input', name: 'dept_name', message: 'Please enter the department name'})
//   .then(answer => {
//       connection.promise().query('INSERT INTO department(dept_name) VALUES (?)', answer.dept_name)
//       .then(listDB => {
//           console.log(listDB)
//           viewDepartment();
//       })
//   })
// }
// const addRole = async () => {
//   const [departments] = await connection.promise().query('SELECT * FROM department')
//   const departmentArray = departments.map(department => (
//       {name: department.dept_name, value: department.id}
//   ))
//   console.log(departments)
//   inquirer.prompt([
//       {type: 'input', name: 'title', message: 'Please enter the role title'},
//       {type: 'input', name: 'salary', message: 'Enter the salary'},
//       {type: 'list', name: 'id', message: 'Select department from the list', choices: departmentArray}
//   ])
//   .then(({title, salary, id}) => {
//       let roleObject = {title, salary, id}
//       connection.promise().query('INSERT INTO role SET ?', roleObject).then(([data]) => {
//           console.log(data)
//       })
//   })
// }
// const addEmployee = () => {
//   inquirer.prompt([
//       {type: 'input', name: 'first_name', message: 'Please enter the employees first name:'},
//       {type: 'input', name: 'last_name', message: 'Please enter the employees last name:'},
//       {type: 'input', name: 'role_id', message: 'Please enter the role id number:'},
//       {type: 'input', name: 'manager_id', message: 'Please enter the manager id number:'}
//   ])
//   .then(({first_name, last_name, role_id, manager_id}) => {
//       let newEmployee = {first_name, last_name, role_id, manager_id}
//       connection.promise().query('INSERT INTO employee VALUES (?)', newEmployee)
//       .then(listDB => {
//           console.log(listDB)
//           viewDepartment();
//       })
//   })
// }