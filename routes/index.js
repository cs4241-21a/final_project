var express = require('express');
var router = express.Router();

console.log("I'm the index router")

const isAuthenticated = false

/* GET home page. */  //module on the server not in the browser, client side into public, index to index.html , public front end, same process index.html to link 
router.get('/', function(req, res, next) {
  console.log("Welcome to the root, your requested: " + req.url)
  if (isAuthenticated){
    res.render('index')
  }else{
    res.render('login', { title: 'Express' });
}
});

module.exports = router;
