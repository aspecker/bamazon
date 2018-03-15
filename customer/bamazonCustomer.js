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

var proc = process.argv[2];

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    inventory();
    question();
  });

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

var question = ()=>{
    inquirer.prompt([
        {
            type: 'input',
            name: 'lookup',
            message: 'What product are you buying?',
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to buy?'
        }
    ]).then(function(user){
        findProduct(user.lookup,user.quantity);
    })
}

var findProduct = (product,amount)=>{
    var query = connection.query(
        `select * from products where ?`,
        {
            product_name: product     
        }, 
        function(err,res){
            // console.log(res[0]);
            var quantity = res[0].stock_quantity;
            var price = res[0].price;

            if (quantity<amount){
                console.log(`Sorry, your order exceeds our stock. Please order again.`)
            } else{
                buyProduct(product,(quantity-amount),price,amount);
            }

        }
    )
}

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
            console.log(`Successfully purchased ${amount} of ${product} for ${amount*price}`);
            console.log(res.affectedRows);
        }
    )
}

