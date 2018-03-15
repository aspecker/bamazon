#Bamazon CLI App
## Adam Specker March 2018

## Dependencies
* Mysql
* inquirer

### Stage One
* create database and populate with products
* write customer function
    * outputs all the items in the database
    * prompt the user on their action
        * first - id of product they want to buy
        * second - quantity of product they want to buy
        * if quantity is insufficient, output message and prevent transaction
        * else display total cost and update quantity

### Stage Two
* inquirer prompt with these options, tied to functions
    * view products
        * select * - list every product
    * view low inventory - select * where
        * list all items with inventory count less than 5
    * add to inventory - update where
        * increase the quantity of an item in the inventory
    * add new product - insert into
        * add new product with a value for each of the columns



Challenge #2: Manager View (Next Level)
Create a new Node application called bamazonManager.js. Running this application will:

List a set of menu options:
View Products for Sale
View Low Inventory
Add to Inventory
Add New Product
If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
If you finished Challenge #2 and put in all the hours you were willing to spend on this activity, then rest easy! Otherwise continue to the next and final challenge.


Challenge #3: Supervisor View (Final Level)
Create a new MySQL table called departments. Your table should include the following columns:
department_id

department_name

over_head_costs (A dummy number you set for each department)

Modify the products table so that there's a product_sales column and modify the bamazonCustomer.js app so that this value is updated with each individual products total revenue from each sale.

Modify your bamazonCustomer.js app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

Make sure your app still updates the inventory listed in the products column.
Create another Node app called bamazonSupervisor.js. Running this application will list a set of menu options:
View Product Sales by Department

Create New Department

When a supervisor selects View Product Sales by Department, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.
department_id	department_name	over_head_costs	product_sales	total_profit
01	Electronics	10000	20000	10000
02	Clothing	60000	100000	40000
The total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales. total_profit should not be stored in any database. You should use a custom alias.

If you can't get the table to display properly after a few hours, then feel free to go back and just add total_profit to the departments table.

Hint: You may need to look into aliases in MySQL.

Hint: You may need to look into GROUP BYs.

Hint: You may need to look into JOINS.

HINT: There may be an NPM package that can log the table to the console. What's is it? Good question :)