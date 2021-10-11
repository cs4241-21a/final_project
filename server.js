// Import dependencies for properly running the server
const express = require("express"),
      bodyparser = require("body-parser"),
      morgan = require('morgan'),
      mongodb = require( 'mongodb' ),
      mongoose = require('mongoose'),
      UserEntry = require('./models/loginModel.js'),
      EventEntry = require('./models/eventModel.js'),
      CalendarEntry = require('./models/calendarModel.js'),
      cookie = require('cookie-session'),
      app = express(),
      staticDir  = "build",
      moment = require('moment'),
      port = 8080;
require('dotenv').config();

const { json } = require("body-parser");
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

app.get('/pendingEvents', (req, res) => {
    EventEntry.find({$and: [{attendees: req.session.username}]}) // {owner: {$ne: req.session.username}}, {chosenEventDate: null}
    .then(result => {
        res.json({
            events: result,
            username: req.session.username,
        })
    })
})

app.get('/ownedEvents', (req, res) => {
  EventEntry.find({owner: req.session.username})
  .then(result => {
      res.json({
          events: result,
          username: req.session.username,
      })
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
    console.log("CURR DATE: " + currentDate)
    dateArray.push(new Date (currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

app.post('/editEvent', bodyparser.json(), async(req, res) => {
  EventEntry.findByIdAndUpdate(req.body.eventID, {chosenEventDate: req.body.chosenEventDate, chosenStartTime: req.body.chosenStartTime, location: req.body.location, description: req.body.description, attendees: req.body.attendees})
      .then(result =>{
          console.log(result)
          res.sendStatus(200)
      })
      .catch(result => {
          console.log(result)
          res.sendStatus(504)
      })
})

app.post('/addUserAvail', bodyparser.json(), async (req, res) => {
  let userAvailObject = {name: req.session.username, personalLoaded: true, availability: req.body.attendeesAvailArray};
  let eventData = await EventEntry.findById(req.body.eventID)
  let availability = eventData.attendeesAvailability

  let notInAvail = true
  for(let i = 0; i < availability.length; i++) {
    let currName = availability[i].name 
    if(currName === req.session.username) {
      notInAvail = false
      availability[i] = userAvailObject
      break
    }
  }

  if(notInAvail) {
    availability.push(userAvailObject)
  }

  EventEntry.findByIdAndUpdate(req.body.eventID, {attendeesAvailability: availability})
    .then(result => {
      res.sendStatus(200)
    })
})

app.post('/deleteEvent', bodyparser.json(), async(req, res) =>{
  EventEntry.findByIdAndDelete(req.body.eventID)
      .then(result =>{
          res.sendStatus(200)
      })
})


app.post('/createEvent', bodyparser.json(), async (req,res) => {
  console.log(req.body);

  let startDate = new Date(req.body.startDate);
  console.log("START RAW: " + req.body.startDate)
  console.log("START DATE: " + startDate)
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

app.post('/refreshpersonal', async(req,res) => {
  CalendarEntry.find({username: {$eq: req.session.username}})
    .then(dbresponse =>{
      //console.log(dbresponse)
      let jsonRes = []
      for(let i = 0; i < dbresponse.length; i++){
        let calItem = {}
        calItem.start = dbresponse[i].startDateTime.toISOString()
        calItem.end = dbresponse[i].endDateTime.toISOString()
        calItem.title = dbresponse[i].eventName
        calItem.location = dbresponse[i].location
        calItem.description = dbresponse[i].description
        calItem.id = dbresponse[i]._id.toString()
        jsonRes.push(calItem)
      }
      
      //console.log(jsonRes)
      res.json(jsonRes)
    })
})

app.post('/addpersonal', async(req, res) => {
  let dbEntry = new CalendarEntry({
    username: req.session.username,
    eventName: req.body.eventName,
    recurring: false,
    startDateTime: new Date(req.body.startDateTime),
    endDateTime: new Date(req.body.endDateTime),
    location: req.body.location,
    description: req.body.description
  })
  await dbEntry.save()
  res.redirect('/index')
})

app.post('/removepersonal', bodyparser.json(), async(req,res) => {
  console.log(req.body)
  CalendarEntry.deleteOne({_id: req.body.id})
    .then(response => {
      res.render('index')
    })
})


app.post('/addToOthersPersonal', bodyparser.json(), async(req, res) => {
  let dbEntry = new CalendarEntry({
    username: req.body.attendeeName,
    eventName: req.body.eventName,
    recurring: false,
    startDateTime: new Date(req.body.startDateTime),
    endDateTime: new Date(req.body.endDateTime),
    location: req.body.location,
    description: req.body.description
  })
  await dbEntry.save()
  res.render('index')
})
app.post('/getavailabilityfrompersonal', bodyparser.json(), async(req,res) => {
  EventEntry.findById(req.body.eventID)
    .then(async dbresponse => {
      let dates = dbresponse.availableDates
      console.log("dates: " + dates)
      let times = dbresponse.availableTimes   //need to use times[dateIndex][timeIndex] to access time list
      console.log("times: " + times)
      let duration = dbresponse.meetingDuration
      console.log("duration: " + duration)
      let attAv = dbresponse.attendeesAvailability
      let availabilityArray = []
      for(let dateIndex = 0; dateIndex<dates.length; dateIndex++){
        for(let timeIndex = 0; timeIndex<times[dateIndex].length; timeIndex++){
          console.log("dateIndex: " + dateIndex)
          console.log("timeIndex: " + timeIndex)
          console.log("times length:" + times.length)
          let startDateTime = new Date(dates[dateIndex])
          if(duration === 0.5){   //if duration is 0.5
            startDateTime.setHours(Math.floor(times[dateIndex][timeIndex]))   //need to get the floor to always get hour value only
            console.log("modulo: " + times[dateIndex][timeIndex]%1)
            if(times[dateIndex][timeIndex]%1 === 0){  //if we're on a whole hour
              startDateTime.setMinutes(0)
            }else{  //if we're on a half hour
              startDateTime.setMinutes(30)
            }
          }else if(times[dateIndex][timeIndex]%1 === 0){  //or we're on a whole hour 
            startDateTime.setHours(times[dateIndex][timeIndex])
          }

          let endDateTime = new Date(startDateTime.getTime() + (duration*60*60*1000))  //lol janky math

          await CalendarEntry.find({username: {$eq: req.session.username}, startDateTime: {$lt: endDateTime}, endDateTime: {$gte: startDateTime}})
            .then(dbresponse => {
              console.log(req.session.username + ", " + startDateTime + ", " + endDateTime)
              if(dbresponse.length === 0){  //no results found, user is available 
                console.log("dbresponse" + dbresponse)
                availabilityArray.push(startDateTime)
              }
            })
        }
      }
      let newAvObj = {
        name: req.session.username,
        availability: availabilityArray,
        personalLoaded: false,
      }
      attAv.push(newAvObj)
      console.log(availabilityArray)
      res.json(availabilityArray)
      /* EventEntry.findByIdAndUpdate(req.body.eventID, {attendeesAvailability: attAv})
      .then(result =>{
        res.json(availabilityArray)
      }) */
    })
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
  if( req.session.login === true || req.url === '/css/style.css' || req.url === '/css/sakura.css') {
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
  res.render('events', {sentUsername: req.session.username, title:"Events"});
})

app.get('/myEvents', (req,  res) => {
  res.render('myEvents', {sentUsername: req.session.username, title:"Events"});
})

app.get('/eventInvites', (req,  res) => {
  res.render('eventInvites', {sentUsername: req.session.username, title:"Events"});
})

app.get('/signUpPage', (req,res) =>{
  res.render('signUpPage');
})

app.get('/login', (req,res) => {
  res.render('login', {title:"Login Page"})
})

app.get('/addpersonal', (req,res) => {
  res.render('addpersonal');
})


// 404 page
app.use((req,res) => {
  res.status(404).render('404',{title: '404'})
})
