var express = require( 'express' )
var app = express()
const bodyparser = require( 'body-parser' )

app.use( express.static( 'public' ) )

// get json when appropriate
app.use( bodyparser.json() )


app.get('/', function(request, response) {
    response.sendFile( __dirname + '/public/index.html' )
  })

app.listen(3000)