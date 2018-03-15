// UNFINISHED SUPERVISOR COMPONENT OF BAMAZON

var mysql = require("mysql");
var inquirer = require('inquirer')
var connection = mysql.createConnection({

  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "bamazon"
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    question();
  });

var question = () =>{
    inquirer.prompt([
        {
        type: 'list',
        name: 'lookup',
        message: 'What action do you want to perform?',
        choices: ['View Product Sales by Department', 'Create New Department']
        }
    ]).then(function(user){
        switch (user.lookup){
            case 'View Product Sales by Department':
                viewSales ();
                break;
            case 'Create New Department':
                createDept ();
                break;
        }
    })
}

var viewSales = ()=>{

}

var createDept = ()=>{
    
}