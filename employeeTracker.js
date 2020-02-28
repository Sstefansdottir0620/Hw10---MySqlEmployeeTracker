// app.use(express.json(()); If the post request comes back as "undefined" you need this method to render the data of (req.body)

var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable = require("console.table");
const fs = require("fs");
const util = require("util");
const { departmentQuestions,employeeQuestions, roleQuestions, addDeparmentQuestions} = require("./questions")

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "companyDB"
});

// Each key in the manager/intern/engineer array will be a new instance of a specific employee class.
var data = {
    manager:[],
    intern:[],
    engineer:[]
}



connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    inquirer.prompt([{

        type: "list",
        name: "table",
        message: "Which category would you like to search by?",
        choices: ["Department", "Employee", "Role"]

    }])
    
    .then(answers => {
        switch(answers.table){
            case "Department":
                console.log("Department")
                break;
            case "Employee":
                break;
            case "Role":
                break;
        }
    })
   

});
