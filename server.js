const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'mysql.wpi.edu',
  user: 'lauren',
  password: 'n8njyP',
  database: 'wishlist'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  // connection.query("SELECT VERSION()", function (err, result) {
  //   if (err) throw err;
  //   console.log(result);
  // });
  // var sqlUserTable = "CREATE OR REPLACE TABLE wishlist.users (username VARCHAR(20) PRIMARY KEY, password VARCHAR(30)) ENGINE=InnoDB;";
  // var sqlListsTable = "CREATE OR REPLACE TABLE lists (listName VARCHAR2(30) PRIMARY KEY, description VARCHAR2(100), username VARCHAR2(20), CONSTRAINT `fk_username` FOREIGN KEY (username) REFERENCES users (username) ON DELETE CASCADE);";
  // var sqlItemsTable = "CREATE OR REPLACE TABLE items (itemName VARCHAR2(50) PRIMARY KEY, link VARCHAR2(300) PRIMARY KEY, price NUMBER(6,2), store VARCHAR2(30), picture VARCHAR2(100), listName VARCHAR2(30), CONSTRAINT `fk_listName` FOREIGN KEY (listName) REFERENCES lists (listName) ON DELETE CASCADE);";

  // connection.query(sqlUserTable, function (err, result) {
  //   if (err) throw err;
  //   console.log("User Table created");
  // });

  // connection.query(sqlListsTable, function (err, result) {
  //   if (err) throw err;
  //   console.log("Lists Table created");
  // });

  // connection.query(sqlItemsTable, function (err, result) {
  //   if (err) throw err;
  //   console.log("Items Table created");
  // });
});

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express"),
  app = express(),
  bodyparser = require( 'body-parser' ),
  port = 3000;

  var users = [
    { 'username': 'lauren', 'password': 'pw' },
  ]

  var lists = [
    { 'listName': 'Example List Name', 'description': 'Example Description', 'username': 'Example Username' },
  ]

  var items = [
    { 'itemName': 'Example Item Name', 'link': 'Example Link', 'price': 100.99, 'store': 'Example Store', 'picture': 'Example picture', 'listName': 'Example List Name' },
  ]

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/addList", (request, response) => {
  response.sendFile(__dirname + "/views/addList.html");
});

app.get("/addItem", (request, response) => {
  response.sendFile(__dirname + "/views/addItem.html");
});

app.get("/home", (request, response) => {
  response.sendFile(__dirname + "/views/home.html");
});

app.get("/listView", (request, response) => {
  response.sendFile(__dirname + "/views/listView.html");
});

app.post( '/create-list', bodyparser.json(), function( request, response ) {
  const connection = mysql.createConnection({
    host: 'mysql.wpi.edu',
    user: 'lauren',
    password: 'n8njyP',
    database: 'wishlist'
  });

  console.log(`create-list post request: ${request}`);
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const json = JSON.parse( dataString )
    lists.push(json);
    console.log("lists from /create-list:");
    console.log(lists);
    
    connection.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = `INSERT INTO lists (listName, description, username) VALUES ('${json.listName}', '${json.description}', '${json.username}');`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    });

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(lists))
  })
})

app.post( '/create-item', bodyparser.json(), function( request, response ) {
  const connection = mysql.createConnection({
    host: 'mysql.wpi.edu',
    user: 'lauren',
    password: 'n8njyP',
    database: 'wishlist'
  });

  console.log(`create-item post request: ${request}`);
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const json = JSON.parse( dataString )
    items.push(json);
    console.log("items from /create-item:");
    console.log(items);
    
    connection.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = `INSERT INTO items (itemName, link, price, store, picture, listName) VALUES ('${json.itemName}', '${json.link}', '${json.price}', '${json.store}', '${json.picture}', '${json.listName}');`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    });

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(items))
  })
})

// listen for requests :)
const listener = app.listen(process.env.PORT || port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});