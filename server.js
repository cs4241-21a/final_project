const express = require('express'),
    expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const {regValidation, logValidation} = require('./validation');
const User = require('./model/User');
const cookie  = require( 'cookie-session' );
let userNameOfU = '';

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true}, 
() => console.log("Connected to DB"))

app.use( express.urlencoded({ extended:true }) )

//Middleware
app.use(express.json());

//ejs
app.use(express.static("views"));
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('login')
})

app.get('/help', ((req, res) => {
    res.render('help')
}))

app.get('/user', ((req, res) => {
    res.render('welcome')
}))

// cookie middleware! The keys are used for encryption and should be
// changed
app.use( cookie({
    name: 'sessionLog',
    sameSite: "none",
    keys: ['123', '456']
  }))

app.post('/register', async (req, res) => {    
    //validate user response before user creation
      const isValid = regValidation(req.body);    
    //check if username already exists
      const usernameExists = await User.findOne({username: req.body.username});
    if( !isValid.error && !usernameExists) {
      // define a variable that we can check in other middleware
      // the session object is added to our requests by the cookie-session middleware
      req.session.login = true
      console.log("Registered!")
      // since login was successful, send the user to the main content
      // use redirect to avoid authentication problems when refreshing
      // the page or using the back button, for details see:
      // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern 
      const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    try{
        const savedUser = await user.save();
        console.log("User created!");
        // res.send(savedUser);
        userNameOfU = req.body.username;    
        req.session.login = true
        res.render('welcome')      
  
    }catch(err){
        res.status(400).send(err);
    }
  
    }else{
      // password incorrect, redirect back to login page
      console.log("Failed registration!")
      res.render('login')
    } 
  })

app.post('/login', async (req, res) => {
// express.urlencoded will put your key value pairs 
    // into an object, where the key is the name of each
    // form field and the value is whatever the user entered
    
    // below is *just a simple authentication example* 
    // for A3, you should check username / password combos in your database
            //validate user response before user creation
            const isValid = logValidation(req.body);
            //check if username does not exists
            const usernameExists = await User.findOne({username: req.body.username});
            //pass is correct?
            const passwordCorrect = await User.findOne({username: req.body.username, password: req.body.password})
        if( !isValid.error && usernameExists && passwordCorrect ) {
          // define a variable that we can check in other middleware
          // the session object is added to our requests by the cookie-session middleware
          req.session.login = true
          userNameOfU = req.body.username;    
          console.log(req.session.username)
          console.log("Succefull log in!")
          // since login was successful, send the user to the main content
          // use redirect to avoid authentication problems when refreshing
          // the page or using the back button, for details see:
          // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern 
          res.render('welcome')      
        }else{
          // password incorrect, redirect back to login page
          console.log("Failed log in!")
          res.render('login')
        }  
      })

      // add some middleware that always sends unauthenicaetd users to the login page
app.use( function( req,res,next) {
    if( req.session.login === true )
      next()
    else
      res.render('login')
  })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})