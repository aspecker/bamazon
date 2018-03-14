create database bamazon;
use bamazon;

create table products{
    item_id int not null auto_increment,
    product_name varchar(45) null,
    department_name varchar(45) null,
    price decimal(10,2),
    stock_quantity int(10),
    primary key(item_id)
}

insert into products (product_name,department_name,price,stock_quantity)
values ()