var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Anti666",
  database: "bamazonDB"
});

function displayInventory() {

	// Construct the db query string
	queryStr = 'SELECT * FROM products';

	// Make the db query
	connection.query(queryStr, function(err, data) {
		if (err) throw err;
		console.log('Existing Inventory: ');
		var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + data[i].item_id + ' || ';
			strOut += 'Product Name: ' + data[i].product_name + ' || ';
			strOut += 'Department: ' + data[i].department_name + ' || ';
			strOut += 'Price: $' + data[i].price + '\n';

			console.log(strOut);
		}
        actionChoices();
	})
}

inquirer.prompt([{
	type: 'confirm',
    name: 'displayProducts',
    message: 'Would you like to see our products?'
}]).then(function(displayWares) {
        // If they answer yes user gets to see the products
        if(displayWares.displayProducts) {
            displayInventory();
        }
    })

function actionChoices() {
inquirer.prompt([
    {   type: "cofirmt",
        name: "choices",
        message: "Would you like to buy anything?",
    }
]).then(function(){
  
});

}