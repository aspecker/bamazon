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
            var productSales = res[0].product_sales;
            if (quantity<amount){
                console.log(`Sorry, your order exceeds our stock. Please order again.\n`)
            } else{
                buyProduct(product,(quantity-amount),price,amount,productSales);
            }

        }
    )
}

var buyProduct = (product,quantLeft,price,amount,productSales)=>{
    console.log(amount)
    console.log(price);
    console.log(productSales)
    var newSales = (parseInt(amount)*parseInt(price)) + parseInt(productSales);
    // console.log(newSales);
    var query = connection.query(
        'update products set ? where ?',
        [{
            stock_quantity: quantLeft,
            product_sales: newSales
        },
        {
            product_name: product
        }]
        ,function(err,res){
            console.log(`Successfully purchased ${amount} of ${product} for ${amount*price}\n`);
            // console.log(res.affectedRows);
            restart ();
        }
    )
    
}


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

