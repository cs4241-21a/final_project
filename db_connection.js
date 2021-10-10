/* const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'mysql.wpi.edu',
  user: 'lauren',
  password: 'n8njyP',
  database: 'wishlist'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sqlUserTable = "CREATE TABLE Users ( username VARCHAR2(20) Primary Key, password VARCHAR2(30))";
  var sqlListsTable = "CREATE TABLE Lists (listName VARCHAR2(30) Primary Key, description VARCHAR2(100), username VARCHAR2(20) References Users (username))";
  var sqlItemsTable = "CREATE TABLE Items (itemName VARCHAR2(50) Primary Key, link VARCHAR2(300) Primary Key, price NUMBER(6,2), store VARCHAR2(30), picture VARCHAR2(100), listName VARCHAR2(30) References Lists (listName))";

  connection.query(ssqlUserTableql, function (err, result) {
    if (err) throw err;
    console.log("User Table created");
  });

  cconnectionon.query(ssqlListsTableql, function (err, result) {
    if (err) throw err;
    console.log("Lists Table created");
  });

  connection.query(ssqlItemsTableql, function (err, result) {
    if (err) throw err;
    console.log("Items Table created");
  });
}); */

// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected!');
// });