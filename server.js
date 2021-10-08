var express = require( 'express' )
var app = express()
const bodyparser = require( 'body-parser' )

app.use( express.static( 'public' ) )

// get json when appropriate
app.use( bodyparser.json() )


app.get('/', function(request, response) {
    response.sendFile( __dirname + '/public/index.html' )
})

app.get('/aboutus', function(request, response) {
  response.sendFile( __dirname + '/public/aboutus.html' )
})

app.post('/addData', bodyparser.json(), function(request, response) {
  console.log(request.body);
  response.json({result: "success!"});
})


app.listen(3000)