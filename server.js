require('dotenv').config();
const database = require('./database')(process.env.MONGODB_URI);
const express  = require( 'express' );

const app = express();

app.use(express.json())
app.use(express.static('build'))


app.get('/', function (req, res) {
    res.sendFile(__dirname, '/build/index.html')
})

app.post('/addCalendar', async function(req, res) {
    let response = await database.addCalendar(req.body);
    res.send(response)
});

app.post('/deleteCalendar', async function(req, res) {
    let response = await database.deleteCalendar(req.body);
    res.send(response)
});

app.post('/modifyCalendar', async function(req, res) {
    let response = await database.updateCalendar(req.body);
    res.send(response)
});

app.post('/addEvent', async function(req, res) {
    let response = await database.addEvent(req.body);
    res.send(response)
});

app.post('/deleteEvent', async function(req, res) {
    let response = await database.deleteEvent(req.body);
    res.send(response)
});

app.post('/modifyEvent', async function(req, res) {
    let response = await database.updateEvent(req.body);
    res.send(response)
});

app.post('/addTask', async function(req, res) {
    let response = await database.addTask(req.body);
    res.send(response)
});

app.post('/deleteTask', async function(req, res) {
    let response = await database.deleteTask(req.body);
    res.send(response)
});

app.post('/modifyTask', async function(req, res) {
    let response = await database.updateTask(req.body);
    res.send(response)
});


app.listen( process.env.PORT || 8080 )