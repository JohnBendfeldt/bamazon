var inquirer = require('inquirer');
var mysql = require('mysql');
require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Anti666",
  database: "bamazonDB"
});

function displayWares() {

	// Construct the db query string
	queryStr = 'SELECT * FROM products';

	// Make the db query
	connection.query(queryStr, function(err, data) {
		if (err) throw err;
		console.log('Existing Wares: ');
		console.table(data);
        actionChoices();
	})
}

inquirer.prompt([{
	type: 'confirm',
    name: 'displayProducts',
    message: 'Would you like to see our products?'
}]).then(function(display) {
        // If they answer yes user gets to see the products
        if(display.displayProducts) {
            displayWares();
        }
    })

function actionChoices() {
	inquirer.prompt([
		{   
			type: 'confirm',
			name: 'choices',
			message: 'Would you like to buy anything?'
		}
	]).then(function(buy){
	if (buy.choices){
		purchase();
	} else {
			console.log('Have a wonderful day!');
			connection.end();
		}
	})

}

function purchase() {


	// Prompt the user to select an item
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID which you would like to purchase:',
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you need?',
			filter: Number
		}
	]).then(function(input) {

		var item = input.item_id;
		var quantity = input.quantity;

		// Checks db if there is enough product to buy
		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID.');
				displayWares();

			} else {
				var productData = data[0];

				// If the quantity requested by the user is in stock
				if (quantity <= productData.stock_quantity) {
					console.log('Placing order!');

					// Construct the updating query string
					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

					// Update the Wares
					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Your order has been placed! Your total is $' + productData.price * quantity);
						// End the database connection
						connection.end();
					})
				} else {
					console.log('Insufficient Quantity!');
			
					displayWares();
				}
			}
		})
	})
}