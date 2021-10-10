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
      staticDir  = "build",
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

app.post('/loadEvents', async (req, res) =>{
    EventEntry.find({attendees: {$in: req.session.username}})
    .then(dbresponse =>{
      //console.log("aaaa",dbresponse)
      res.json(dbresponse)
    })
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

app.post('/editEvent', bodyparser.json(), async(req, res) => {
  EventEntry.findByIdAndUpdate(req.body.eventID, {chosenEventDate: req.body.chosenEventDate, chosenStartTime: req.body.chosenStartTime, location: req.body.location, description: req.body.description, attendees: req.body.attendees})
      .then(result =>{
        //console.log(result)
      })
})

app.post('/addUserAvail', bodyparser.json(), async (req, res) => {
  let userAvailObject = {name: req.session.username, filledOut:true, availability: req.body.attendeesAvailArray};

  EventEntry.findByIdAndUpdate(req.body.eventID, {$push: {attendeesAvailability: userAvailObject}})
      .then(result => {

      })
})


app.post('/createEvent', bodyparser.json(), async (req,res) => {
  console.log(req.body);

  let startDate = new Date(req.body.startDate);
  let endDate = new Date(req.body.endDate);
  let dateRange = getDates(startDate,endDate);

  let timeRangeArray = [];
  for (let i = 0; i < dateRange.length; i++){
    timeRangeArray.push(req.body.timeRange);
  }

  let fullAttendees = []
  fullAttendees.push(req.session.username)
  for(let count = 0; count<req.body.attendees.length; count++){
    if(req.body.attendees[count] !== "")fullAttendees.push(req.body.attendees[count])
  }

  let attendeesAvailList = [];
  /*for (let i = 0; i < fullAttendees.length; i++){
    attendeesAvailList.push({name: fullAttendees[i], filledOut:false, availability: []});
  }*/

  const entry = new EventEntry({
    owner: req.session.username,
    eventName: req.body.title,
    availableDates: dateRange,
    availableTimes: timeRangeArray,
    attendees: fullAttendees,
    attendeesAvailability: attendeesAvailList,
    meetingDuration: req.body.duration,
    description: req.body.description,
    chosenEventDate: null,
    location: req.body.location
  })
  await entry.save()
  let result = await EventEntry.find({})
  res.render('events', {eventsList: result, sentUsername: req.session.username, title:"Events"})
})


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
  EventEntry.find({owner: req.session.username})
      .then(result1 => {
        EventEntry.find({$and: [{attendees: req.session.username}]}) // {owner: {$ne: req.session.username}}, {chosenEventDate: null}
            .then(result2 =>{
              res.render('events', {eventsList: result1, pendingList:result2, sentUsername: req.session.username, title:"Events"});
            })
      })
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
