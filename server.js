const express = require('express'),
      app = express()

app.use('/public', express.static(__dirname + '/public'))
