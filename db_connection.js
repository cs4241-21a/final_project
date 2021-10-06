const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'mysql.wpi.edu',
  user: 'lauren',
  password: 'n8njyP',
  database: 'wishlist'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});