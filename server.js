// Import dependencies for properly running the server
const express = require("express"),
      bodyparser = require("body-parser"),
      morgan = require('morgan'),
      mongodb = require( 'mongodb' ),
      mongoose = require('mongoose'),
      UserEntry = require('./models/loginModel.js'),
      EventEntry = require('./models/eventModel.js'),
      cookie = require('cookie-session'),
      app = express(),
      staticDir  = "public",
      moment = require('moment'),
      port = 8080;
require('dotenv').config();

const {response, request} = require("express");

const uri = 'mongodb+srv://'+process.env.ACCOUNT+':'+process.env.PASS+'@'+process.env.HOST

//const uri =`mongodb+srv://${USER}:${PASS}@${HOST}/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => app.listen(process.env.PORT || port))
    .catch(err => console.log(err));

//register view engine
app.set('view engine','ejs');

// helpful bois
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));

// Custom middleware for outputting an error code if the MongoDB server is down
/*app.use((req,res,next) => {
  if(collection !== null) {
    next()
  }else{
    res.status(503).send()
  }
})*/

// cookie setup
app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2'],
  username: 'username'
}))


app.post('/signUp', async (req, res) => {
  const entry = new UserEntry({
    username: req.body.username,
    password: req.body.password
  })
  // check if username exists
  if (await checkUsername(req.body.username)) {
    entry.save()
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          console.log(err);
        });
    res.render('login')
  }
  return;
  //return error warning that username is already taken
})

async function checkUsername(user,){
  let array = [];
  await UserEntry.find({username: {$eq: user}})
      .then(result =>{
        array = result;
      })
  if (array.length >= 1 ){
    return false;
  }
  return true;
}

app.post('/login', async (req, res) => {
  console.log(req.body)
  let validated = await checkUsernamePassword(req.body.username, req.body.password);
  if (validated) {
    req.session.login = true;
    req.session.username = req.body.username;
    res.redirect('/index');
  } else {
    res.render('login');
  }
})

Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

function getDates(startDate, stopDate) {
  let dateArray = new Array();
  let currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date (currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

app.post('/createEvent', async (req,res) => {
  let startDate = new Date(req.body.startDate);
  let endDate = new Date(req.body.endDate);
  console.log(getDates(startDate,endDate));


  const entry = new EventEntry({
    owner: req.session.username,
    eventName: req.body.title,
    availableDates: getDates(startDate,endDate),
    //availableTimes: req.body.availTimes,
    //attendees: req.body.attendees,
    //availableDates: [],
    availableTimes: [],
    attendees: [],
    description: req.body.description,
    location: req.body.location
  })
  await entry.save()
      .then(async result => {
        //res.send(result);
      })
      .catch(err => {
        console.log(err);
      })
  res.render('events');
})
/*
app.post('/createEvent', async (req, res) => {

  collection.insertOne(req.body)
  .then(dbresponse => {
    return collection.find({'_id':dbresponse.insertedId}).toArray()
  })
  .then(dbresponse =>{
    res.json(dbresponse)
  })
    .then(dbresponse =>{
      collection.updateOne({'_id':mongodb.ObjectId(req.body._id)},
      {$set:{ user:req.session.user} })
        .then( dbresponse=>{
          res.json(dbresponse)
         // console.log(dbresponse)
        })
  })
})
*/

async function checkUsernamePassword(user, pass){
  let array = [];
  await UserEntry.find({username: {$eq: user}, password: {$eq:pass}})
      .then(result =>{
        array = result;
      })
  if (array.length >= 1 ){
    return true;
  }
  return false;
}

app.use( function( req,res,next) {
  if(req.url === '/signUpPage'){
    res.render('signUpPage');
    return;
  }
  if( req.session.login === true || req.url === '/css/style.css') {
    next()
  } else {
    res.render('login')
  }
})

// Use body parser to parse JSON when necessary
/*app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())*/

// Serve static files when necessary
app.use(express.static(staticDir));
app.use((req,res,next) => {
  res.locals.path = req.path;
  next();
});

// Setup handling of GET requests for homepage route
app.get('/', (req,  res) => {
  res.redirect('/index');
})

app.get('/index', (req, res) =>{
  res.render('index');
})

app.get('/events', (req,  res) => {
  res.render('events');
})

app.get('/signUpPage', (req,res) =>{
  res.render('signUpPage');
})

app.get('/login', (req,res) => {
  res.render('login', {title:"Login Page"})
})

// 404 page
app.use((req,res) => {
  res.status(404).render('404',{title: '404'})
})
