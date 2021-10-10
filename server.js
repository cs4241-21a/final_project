//
const express = require("express");
const     app = express();
const    port = 3000;
const   mysql = require("mysql");
const  dotenv = require('dotenv');
const  path = require("path");
const  bodyparser = require('body-parser');

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');
//app.engine('hbs', require('ejs').renderFile);
app.use(express.urlencoded({extended: false}));
app.use(express.json());

dotenv.config({ path: './.env'});

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

 db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!"); 
/*   var sqlUserTable = "CREATE TABLE Users ( username VARCHAR2(20) Primary Key, password VARCHAR2(30))";
  var sqlListsTable = "CREATE TABLE Lists (listName VARCHAR2(30) Primary Key, description VARCHAR2(100), username VARCHAR2(20) References Users (username))";
  var sqlItemsTable = "CREATE TABLE Items (itemName VARCHAR2(50) Primary Key, link VARCHAR2(300) Primary Key, price NUMBER(6,2), store VARCHAR2(30), picture VARCHAR2(100), listName VARCHAR2(30) References Lists (listName))";

  db.query(ssqlUserTableql, function (err, result) {
    if (err) throw err;
    console.log("User Table created");
  });

  db.query(ssqlListsTableql, function (err, result) {
    if (err) throw err;
    console.log("Lists Table created");
  });

  db.query(ssqlItemsTableql, function (err, result) {
    if (err) throw err;
    console.log("Items Table created");
  });  */
});

var users = [
  { 'username': 'lauren', 'password': 'pw' },
]

var lists = [
  { 'listName': 'Example List Name', 'description': 'Example Description', 'username': 'Example Username' },
]

var items = [
  { 'itemName': 'Example Item Name', 'link': 'Example Link', 'price': 100.99, 'store': 'Example Store', 'picture': 'Example picture', 'listName': 'Example List Name' },
]



// ROUTES

app.get("/", (request, response) => {
  response.render("index");
});

app.get("/register", (request, response) => {
  response.render("register");
});

app.get("/login", (request, response) => {
  response.render("login");
});

app.use('/auth', require('./routes/auth'));

app.get("/addList", (request, response) => {
  response.render("addList");
});

app.get("/addItem", (request, response) => {
  response.render("addItem");
});

app.get("/home", (request, response) => {
  response.render("home");
});

app.get("/listView", (request, response) => {
  response.render("listView");
});

// listen for requests :)
const listener = app.listen(process.env.PORT || port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});