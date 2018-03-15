// require dependencies and connect to mysql server

var mysql = require ('mysql');
var inquirer = require ('inquirer');
var connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "",
    database: "bamazon"
  });

// runs on connection to mysql server
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    question();
});

// function runs when connection is made and is the initial prompt the user will see
var question = ()=>{
    inquirer.prompt([
        {
            type: 'list',
            name: 'manage',
            message: "Select a managerial function:",
            choices: ['View Products','View Low Inventory','Add to Inventory','Add New Product']
        }
    ]).then(function(user){
        // switch will trigger next functions based on which action the user chooses
        switch (user.manage){
            case 'View Products':
                inventory();
                break;
            case 'View Low Inventory':
                lowInventory();
                break;
            case 'Add to Inventory':
                getQuantity();
                break;
            case 'Add New Product':
                addProduct();
                break;
            
        }
    });
}

// displays the current inventory found in products
var inventory = ()=>{
    var query = connection.query(
        `select * from products`,
        function (err,res){
            for (var i =0; i<res.length;i++){
                console.log(`\nProduct: ${res[i].product_name} | Department: ${res[i].department_name} | ${res[i].stock_quantity} in stock | ${res[i].price} denarii per item`);
            }
            restart();
        }
    )
}

// displays all products that have an inventory of less than 13
var lowInventory = () =>{
    // inquirer.prompt([
    //     {
    //         type: 'input',
    //         name: 'quantity',
    //         message: 'What is the threshold for low inventory?'
    //     }
    // ]).then(function(user){
        // var quant = parseInt(user.quantity);
        // var concat = '* from products where stock_quantity<=';
        var query = connection.query(
        // `select concat (concat,quant) as products`,
        'select * from products where stock_quantity<=13',
        function(err,res){
            for (var i =0; i<res.length;i++){
                console.log(`\nProduct: ${res[i].product_name} | Department: ${res[i].department_name} | ${res[i].stock_quantity} in stock`);
            }
            restart();
        }
    )   
    // })
}
// retrieves the quantity of a certain product based on a prompt
// then triggers the addQuantity function which will add items to inventory
var getQuantity = () =>{
    inquirer.prompt([
        {
            type: 'input',
            name: 'product',
            message: 'Which product would you like to add stock to?'
        }
    ]).then(function(user){
        var product = user.product;
        var currentStock = 0;
        var query = connection.query(
            'select stock_quantity from products where ?',
            {
                product_name: product
            }, function (err,res){
                currentStock = res[0].stock_quantity
                addQuantity(currentStock,product);
            }
        )
        
    })
}

// addQuantity function updates the inventory to reflect the amount added by the user through the prompt
var addQuantity = (inStock,product) =>{
    inquirer.prompt([
        {
            type: 'input',
            name: 'amount',
            message: 'How much of this product do you want to order?'
        }
    ]).then(function(user){
        var addAmount = parseInt(user.amount);
        var stockUpdate = inStock + addAmount;
        var query = connection.query(
            `update products set ? where ?`,
            [{
                stock_quantity: stockUpdate
            },
            {
                product_name: product
            }],
            function(err,res){
                console.log(`\nAdded ${addAmount} to stock of ${product}`);
                restart();
            }
        )
    })
}

//function inserts a new row based on user input and adds that product to the DB
var addProduct = () =>{
    inquirer.prompt([
        {
            type: 'input',
            name: 'product',
            message: 'What product are you adding?'
        },
        {
            type: 'input',
            name: 'category',
            message: 'Which department is this item part of?'
        },
        {
            type: 'input',
            name: 'price',
            message: 'How much does this cost per item?'
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How much of this item would you like to order?'
        }
    ]).then(function(user){
        var product = user.product;
        var category = user.category;
        var price = user.price;
        var quantity = user.quantity;
        var query = connection.query(
            `insert into products set ?`,
            {
                product_name: product,
                department_name: category,
                price: price,
                stock_quantity: quantity
            }, function(err,res){
                console.log(`Added ${quantity} of ${product}, costing ${price} to ${category} department`);
                restart();
            }
        )
    })
}

// function asks user if they want to do another action, then reruns the question function
// this function is triggered in the callback of the mysql query for the other functions
var restart = () =>{
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'restart',
            message: 'Would you like to perform another action?'
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