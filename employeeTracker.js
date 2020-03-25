// app.use(express.json(()); If the post request comes back as "undefined" you need this method to render the data of (req.body)

var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable = require("console.table");
const fs = require("fs");
const util = require("util");
const { departmentQuestions, addEmployeeQuestions, roleQuestions, addDeparmentQuestions } = require("./questions")

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "companyDB"
});

// Each key in the manager/intern/engineer array will be a new instance of a specific employee class.
var data = {
    manager: [],
    intern: [],
    engineer: []
}



connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    init();
//Figure out how to call addviewUpdate() only when init() function is complete
//Use async/await or any other asycronous functions in javascript
})

function init(){

    inquirer.prompt([{

        type: "list",
        name: "table",
        message: "Which category would you like to search by?",
        choices: ["Department", "Employee", "Role"]

    }])

        .then(answers => {
            
            
            addViewUpdate(answers.table);

        });
}

function addViewUpdate(category){

  inquirer.prompt([{

      type: "list",
      name: "table",
      message: "What would you like to do?",
      choices: [`Add ${category}`, `View ${category}`, `Update ${category}`, "Choose another category", "Exit"]

  }])

      .then(answers => {
          switch (answers.table) {
              case `Add ${category}`:
                add(category);

                break;

              case `View ${category}`:
                view(category);

                break;

              case `Update ${category}`:
                switch (category){
                  case "Department":
                  updateDepartment(category);

                  break; 
                
                  case "Employee":
                  updateEmployee(category);
                  break;
                  
                  case "Role":
                  updateRole(category);
                  break;
                }  
                
                break;

              case "Choose another category":
                  init();

                break;

              case "Exit":
                    console.log("Good bye!!");
      }})
    };

function add(category) {
switch(category) {
  case "Department":
    inquirer.prompt({
      type: "input",
      name: "department_name",
      message: "Insert the department name"
    }).then(answers => {
      connection.query("INSERT INTO department SET ?",
    {
      department_name: answers.department_name
    },

    (err, data) => {
      if (err) throw err;
    })
    view(category);
  })

  break;
  case "Employee":
    inquirer.prompt(addEmployeeQuestions)
    .then(answers => {
      connection.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
    [
      answers.first_name,
      answers.last_name,
      answers.role_id,
      answers.manager_id
    ],

    (err, data) => {
      if (err) throw err;
    })
    addViewUpdate(category);
  })


  break;
  case "Role":
    inquirer.prompt(roleQuestions)
    .then(answers => {
      connection.query("INSERT INTO employee_role (title, salary, department_id) VALUES (?, ?, ?)",
    [
      answers.title,
      answers.salary,
      answers.depatment_id,
    ],

    (err, data) => {
      if (err) throw err;
    })
    addViewUpdate(category);
  })

}
};


function view(category){
switch (category) {
  case "Department":
      connection.query("SELECT * FROM department", (err, data) => {
          console.table(data);
          addViewUpdate(category);
      })

      break;
  case "Employee":
      connection.query("SELECT * FROM employees", (err, data) => {
          console.table(data);
          addViewUpdate(category);
      })
      break;
  case "Role":
      connection.query("SELECT * FROM employee_role", (err, data) => {
          console.table(data);
          addViewUpdate(category);
      })
      break;
}



};

function updateDepartment(category){
  connection.query("SELECT department_name FROM department", (err, data) => {
    if (err) throw err;
    let choiceList = data.map(item => {
      return item.department_name;
    })
    inquirer.prompt({
      type: "list",
      name: "updateDepartment",
      message: "Which department would you like to update",
      choices: choiceList
    }).then(choice1 => {
        inquirer.prompt({
        type: "list",
        name: "updateChoices",
        message: "Would you like to delete or edit this department?",
        choices:["delete", "change"]
      }).then(choice2 => {
        switch (choice2.updateChoices) {
          case "delete":
            connection.query(`DELETE FROM department WHERE department_name = "${choice1.updateDepartment}"`,
            (err, data) => {
              if (err) throw err;
            })
            view(category);
            break;

          case "change":
            inquirer.prompt({
              type: "input",
              name: "newDepartmentName",
              message: "What would you like to name this department?"
            }).then(choice3 => {
              connection.query(`UPDATE department SET department_name = "${choice3.newDepartmentName}" WHERE department_name = "${choice1.updateDepartment}"`,
            (err, data) => {
              if (err) throw err;
            })
            view(category);
            })
            break;
        }   
    })
  })
})


};

function updateEmployee(category){
  let firstName, lastName;
  connection.query("SELECT first_name, last_name FROM employees", (err, data) => {
    if (err) throw err;
    let choiceList = data.map(item => {
      return `${item.first_name} ${item.last_name}` ;
    })
    inquirer.prompt({
    type: "list",
    name: "updateEmployees",
    message: "Which employee would you like to update",
    choices: choiceList
    })
    .then(choice1 => {
      let nameArray = choice1.updateEmployees.split(" "); // "mry sdd asdfsd sdfs" => ["mry", "sdd"...]
      firstName = nameArray[0], lastName = nameArray[1];
      inquirer.prompt({
      type: "list",
      name: "updateChoices",
      message: "Would you like to delete or edit the employee?",
      choices:["delete", "edit"]
    })
    .then(choice2 => {
      switch (choice2.updateChoices) {
        case "delete":
          connection.query(`DELETE FROM employees WHERE (first_name = "${firstName}" AND last_name = "${lastName}")`,
          (err, data) => {
            if (err) throw err;
            view(category);
          })
          
          break;

        case "edit":
          inquirer.prompt({
            type: "list",
            name: "editList",
            message: "What would you like to edit",
            choices:["edit role-ID", "edit manager-ID", "edit first-name", "edit last-name"]
          })
          .then(choice3 => {
            switch(choice3.editList){
              case "edit role-ID":
                inquirer.prompt({
                  type: "input",
                  name: "editRoleID",
                  message: "Insert the new Role-ID"
                })
                .then(newRoleID => {
                  connection.query(`UPDATE employees SET role_id = "${newRoleID.editRoleID}" WHERE (first_name = "${firstName}" AND last_name = "${lastName}")`,
                  (err, data) => {
                  if (err) throw err;
                  view(category);
                })})
              break;

              case "edit manager-ID":
                inquirer.prompt({
                  type:"input",
                  name:"editManagerID",
                  message: "Insert the new Mnager-ID"
                })
                .then(newManagerID => {
                  connection.query(`UPDATE employees SET manager_id = "${newManagerID.editManagerID}" WHERE (first_name = "${firstName}" AND last_name = "${lastName}")`,
                  (err, data) => {
                  if (err) throw err;
                  view(category);
                })})
              break;

                }})
            }
          })
      }
    })
  }
  )
})
}

  
