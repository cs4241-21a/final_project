var express = require('express');
var router = express.Router();

/* GET home page. */  //module on the server not in the browser, client side into public, index to index.html , public front end, same process index.html to link 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




module.exports = router;
