const express  = require( 'express' );
const app = express();


app.use(express.json())

app.use(express.static('build'))

app.get('/', function (req, res) {
    res.sendFile(__dirname, '/build/index.html')
})

app.post('/addCalendar', function(req, res) {
    res.send('Add Calendar Called')
});

app.post('/deleteCalendar', function(req, res) {
    res.send('Delete Calendar Called')
});

app.post('/modifyCalendar', function(req, res) {
    res.send('Modify Calendar Called')
});

app.post('/addEvent', function(req, res) {
    res.send('Add Event Called')
});

app.post('/deleteEvent', function(req, res) {
    res.send('Delete Event Called')
});

app.post('/modifyEvent', function(req, res) {
    res.send('Modify Event Called')
});


app.listen( process.env.PORT || 8080 )