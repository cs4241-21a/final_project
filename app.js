var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/**
 * WebSocket Config
 */
const http = require('http');
const WebSocket = require('ws');
const port = 3323

const server = http.createServer(app);
const wss = new WebSocket.Server({ server })
const clients = []

var data = "Real-Time Update 1";
var number = 1;

wss.on('connection', client => {

    client.on('message', message => {
        console.log(`Received message => ${message}`)
        clients.forEach( c => {
            if( c !== client ){
                c.send( msg )
            }
        } )
    })

    clients.push( client )

    var interval = setInterval(function(){
        data = "Real-Time Update "+number;
        console.log("SENT: "+data);
        clients.forEach( c => c.send( data ) )
        number++;
    }, randomInteger(2,9)*100);

    client.on('close', function close() {
        clearInterval(interval);
    });
})

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
//End WebSocket Config

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;
