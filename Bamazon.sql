CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name varchar(50) NULL,
  department_name varchar(50) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Topo Chico", "Beverages", 1.25, 100),
("Converse All-Stars", "Shoes", 35.00, 50),
("Cat Food", "Pet Care", 15.25, 100),
("Dog Food", "Pet Care", 12.50, 5),
("Charcoal", "Summer Supplies", 9.89, 25),
("Grill", "Summer Supplies", 379.99, 10),
("BBQ", "Meat", 12.45, 100),
("Steaks", "Meat", 18.99, 25),
("Bananas", "Produce", 0.44, 1000),
("Eggs", "Dairy", 5.25, 200),
("Milk", "Dairy", 2.99, 100),
("Cheese", "Dairy", 15.25, 100);