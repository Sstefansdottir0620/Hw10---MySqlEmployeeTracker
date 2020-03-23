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
      choices: [`Add ${category}`, `View ${category}`, `Update ${category}`]

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
                update(category);
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
  })

  
}};




function view(category){
switch (category) {
  case "Department":
      connection.query("SELECT * FROM department", (err, data) => {
          console.table(data);

      })

      break;
  case "Employee":
      connection.query("SELECT * FROM employees", (err, data) => {
          console.table(data);
          
      })
      break;
  case "Role":
      connection.query("SELECT * FROM employee_role", (err, data) => {
          console.table(data);
          
      })
      break;
}};

function update(category) {
  switch(category) {
    case "Department":
      let choiceList = [];
      connection.query("SELECT department_name FROM department", (err, data) => {
        if (err) throw err;
        choiceList = data.map(item => {
          return item.department_name;
        })
        inquirer.prompt({
          type: "list",
          name: "updateDepartment",
          message: "Which department would you like to update",
          choices: choiceList
        }).then(choice1 => {
          inquirer.prompt({
            type: "input",
            name: "department_name",
            message: "Insert the department name"
          }).then(choice2 => {
            connection.query(`UPDATE department SET department_name = "${choice2.department_name}" WHERE department_name = "${choice1.updateDepartment}"`,
          (err, data) => {
            if (err) throw err;
          })
        })
      })

      
        
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
  })

  
}};

// function queryAllSongs() {
//     connection.query("SELECT * FROM songs", function(err, res) {
//       if (err) throw err;
//       for (var i = 0; i < res.length; i++) {
//         console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
//       }
//       console.log("-----------------------------------");
//     });
//   }
  
//   function queryDanceSongs() {
//     var query = connection.query("SELECT * FROM songs WHERE genre=?", ["Dance"], function(err, res) {
//       if (err) throw err;
//       for (var i = 0; i < res.length; i++) {
//         console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
//       }
//     });
  
//     // logs the actual query being run
//     console.log(query.sql);
//     connection.end();
//   }


// function createSong() {
//     console.log("Inserting a new songs...\n");
//     var query = connection.query(
//       "INSERT INTO songs SET ?",
//       {
//         genre: "pop",
//         title: "I want to dance with somebody",
//         artist: "Witney Houston"
//       },
//       function(err, res) {
//         if (err) throw err;
//         console.log(res.affectedRows + " songs inserted!\n");
//         // Call updateProduct AFTER the INSERT completes
//         updateSong();
//       }
//     );
  
//     // logs the actual query being run
//     console.log(query.sql);
//   }
  
//   function updateProduct() {
//     console.log("Updating all pop quantities...\n");
//     var query = connection.query(
//       "UPDATE songs SET ? WHERE ?",
//       [
//         {
//           artist: "Witney Houston"
//         },
//         {
//           genre: "pop"
//         }
//       ],
//       function(err, res) {
//         if (err) throw err;
//         console.log(res.affectedRows + " songs updated!\n");
//         // Call deleteProduct AFTER the UPDATE completes
//         deleteSong();
//       }
//     );
  
//     // logs the actual query being run
//     console.log(query.sql);
//   }
  
//   function deleteSong() {
//     console.log("Deleting all pop...\n");
//     connection.query(
//       "DELETE FROM songs WHERE genre?",
//       {
//         artist: "Asgeir Trausti"
//       },
//       function(err, res) {
//         if (err) throw err;
//         console.log(res.affectedRows + " songs deleted!\n");
//         // Call readPSong AFTER the DELETE completes
//         readSong();
//       }
//     );
//   }
  
//   function readProducts() {
//     console.log("Selecting all songs...\n");
//     connection.query("SELECT * FROM songs", function(err, res) {
//       if (err) throw err;
//       // Log all results of the SELECT statement
//       console.table(res);
//       connection.end();
//     });
//   }
  
