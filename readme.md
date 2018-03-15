#Bamazon CLI App
## Adam Specker March 2018

## Completed as part of coursework for GWU Web Dev bootcamp

## Dependencies
* Mysql
* inquirer

### Stage One - func
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

### Stage Three (under construction)
* create new table called departments with columns
    * department_id
    * department_name
    * over_head_costs
* modify customer.js to update product sales for each individual product
* create a supervisor.js
    * has two functions
    * create department
        * creates a new deparment ?
    * view product sales by department
        * displays a summarized table in terminal with these columns
            * department_id department_name over_head_cost product_sales total_profit
            * total_profit is calculated based on overhead cost and product sales, 
                * not stored in db, use CUSTOM ALIAS


