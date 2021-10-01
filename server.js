const express = require('express'),
      app = express(),
      port = 3001

app.use('/', express.static(__dirname + '/'))

app.listen(process.env.PORT || port);