var express = require('express');
var router = express.Router();

console.log("I'm the index router")

const isAuthenticated = false

let history = []

/* GET home page. */  //module on the server not in the browser, client side into public, index to index.html , public front end, same process index.html to link
router.get('/', function(req, res, next) {
  console.log("Welcome to the root, your requested: " + req.url)
  if (isAuthenticated){
    res.render('index')
  }else{
    res.render('login', { title: 'Express' });
}
});

// router.get('/rtc', function(req, res, next) {
//   res.render('rtc', { title: 'Express' });
//   // res.sendFile(path.join(__dirname, '../public/rtc.html'))
// })


router.get('/loadCanvas', function(req, res, next) {
  res.json(history)
});

router.get('/addDraw', function(req, res, next) {
  history.push(req)
});

module.exports = router;
