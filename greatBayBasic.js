var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({

    host: 'localhost',
    port: 3306,
    user: "root",

    password: "wakeland008",
    database: "greatBay_db"

});

connection.connect(function (err) {
    if (err) throw err;

    console.log("you are connected" + connection.threadId);
    start()

})

function start(){
    inquirer.prompt({

        name: "postOrBid",
      type: "list",
      message: "Would you like to [POST] an auction or [BID] on an auction?",
      choices: ["POST", "BID", "EXIT"]

    })
}