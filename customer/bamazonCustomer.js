// require packages and connect to server
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

// runs on connection to server, displays inventory and prompts user
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    inventory();
    question();
  });

// displays the current inventory, triggered upon connection to the mysql server
var inventory = ()=>{
    var query = connection.query(
        `select * from products`,
        function (err,res){
            for (var i =0; i<res.length;i++){
                console.log(`Product: ${res[i].product_name} | Department: ${res[i].department_name} | ${res[i].stock_quantity} in stock | ${res[i].price} denarii per item`);
            }
        }
    )
}

// prompts the user for which product and how much
// triggered on connection to mysql
// runs findProduct based on user input
var question = ()=>{
    inquirer.prompt([
        {
            type: 'input',
            name: 'lookup',
            message: 'What product are you buying?\n',
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to buy?\n'
        }
    ]).then(function(user){
        findProduct(user.lookup,user.quantity);
    })
}

// finds the product the user chose
// checks to see if user's order exceeds quantity
// if it does not, then it will run buyProduct passing through the values of the desired product
var findProduct = (product,amount)=>{
    var query = connection.query(
        `select * from products where ?`,
        {
            product_name: product     
        }, 
        function(err,res){
            var quantity = res[0].stock_quantity;
            var price = res[0].price;

            if (quantity<amount){
                console.log(`Sorry, your order exceeds our stock. Please order again.\n`)
            } else{
                buyProduct(product,(quantity-amount),price,amount);
            }
        }
    )
}

// function changes the stock_quantity of the desired item based on amount the user ordered
var buyProduct = (product,quantLeft,price,amount)=>{
    var query = connection.query(
        'update products set ? where ?',
        [{
            stock_quantity: quantLeft
        },
        {
            product_name: product
        }]
        ,function(err,res){
            console.log(`Successfully purchased ${amount} of ${product} for ${amount*price}\n`);
            console.log(res.affectedRows);
            restart ();
        }
    )  
}

// prompts user to buy again, and if affirmative reruns initial question function
var restart = () =>{
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'restart',
            message: 'Would you like to buy another item?'
        }
    ]).then(function(user){
        switch (user.restart){
            case false:
                break;
            default: 
                question();
        }
    })
}

