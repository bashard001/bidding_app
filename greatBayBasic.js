var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({

    host: 'localhost',
    port: 3306,
    user: "root",

    password: "wakeland008",
    database: "greatBay_DB"

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

    }).then(function(answer){
        if (answer.postOrBid === "POST"){

            postItem();

        } else if(answer.postOrBid === "BID"){

            bidItem();
        

        }else(
            connection.end()
        )
    })
}

function postItem(){
    inquirer.prompt([{
        name:"item",
        type:"input",
        message: "what is the item you would like to submit?"
    },
{
    name: "category",
    type: "input",
    message: "What category would you like to place your auction in?"
},
{
    name: "startingBid",
        type: "input",
        message: "What would you like your starting bid to be?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
}]).then(function(answer){
    connection.query("insert into auctions set ?",{
        item_name: answer.item,
          category: answer.category,
          starting_bid: answer.startingBid || 0,
          highest_bid: 1000000
    },
    function(err) {
        if (err) throw err;
        console.log("Your auction was created successfully!");
        // re-prompt the user for if they want to bid or post
        start();
      })
})
}