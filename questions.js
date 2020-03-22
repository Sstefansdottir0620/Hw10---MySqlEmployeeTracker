let departmentQuestions = [
    {
        type: "list",
        name: "department",
        message: "What would you like to do?",
        choices:["View Departments", "Add Department", "Update Department"]
    },   
]

let addDeparmentQuestions = [
    {
        type: "input",
        name: "departmentName",
        message: "Enter department-name"

    }
]

let employeeQuestions = [
    {
        type: "list",
        name: "department",
        message: "What would you like to do?",
        choices:["View Employee", "Add Employee", "Update Employee"]
    },   
]

let addEmployeeQuestions = [
    {
        type: "input",
        name: "first_name",
        message: "Please enter employee first-name"
    },
    {
        type: "input",
        name: "last_name",
        message: "Please enter employee last-name"
    },
    {
        type: "input",
        name: "role_id",
        message: "Please enter role-ID of employee"
    },
    {
        type: "input",
        name: "manager_id",
        message: "Please enter manager-ID of employee"
    }, 




]

let roleQuestions = [
    {
        type: "input",
        name: "title",
        message: "Please enter the title of employee"
    },
    {
        type: "input",
        name: "salary",
        message: "Please enter the salary of employee"
    },
    {
        type: "input",
        name: "department_id",
        message: "Please enter the department_id for employee"
    },

]


module.exports = { departmentQuestions,employeeQuestions, roleQuestions, addDeparmentQuestions, addEmployeeQuestions}