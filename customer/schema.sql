use bamazon;

create table products(
    item_id int not null auto_increment,
    product_name varchar(45) null,
    department_name varchar(45) null,
    price decimal(10,2),
    stock_quantity int(10),
    primary key(item_id)
);

insert into products (product_name,department_name,price,stock_quantity)
values ('chair','home goods',99.99,5), ('book','media',12.50,100), ('monitor','electronics', 135.75,15), ('dog food','pet goods', 35.85,18), ('fig newton','grocery',6.75,30),('toothbrush','health',3.50, 200),('lego','entertainment',89.99,30),('sweater','clothing',55.45,13),('backgammon','entertainment',35.25,8),('puzzle','entertainment',35.99,7);
