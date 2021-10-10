var express = require( 'express' )
var app = express()
const bodyparser = require( 'body-parser' )
const
 env = require('dotenv').config(),
 db = require('mongodb'),
 bcrypt = require("bcrypt")
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const GitHubStrategy = require('passport-github2').Strategy;
const cookieParser = require('cookie-parser');
const config = require('./config');
const path = require('path');
var nodemailer = require('nodemailer');



const User = require('./models').User;
const watchlist = require('./models').watchlist;

// app.use( express.static( 'public' ) )

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  name: 'sid',
  secret: config.sessionSecret,
  saveUninitialized: false,
  resave: false,
  cookie: {
      httpOnly: true,
      sameSite: true,
      maxAge: 24 * 60 * 60 * 1000
  },
  store: new FileStore({logFn: function() {}})
}));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
  clientID: config.GithubClientID,
  clientSecret: config.GithubClientSecret,
  callbackURL: config.GithubCallbackURL
},
function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user._id);
  });
}
));

mongoose.connect(config.dbConnection, { useNewUrlParser: true, useUnifiedTopology: true });

function auth(req, res, next) {
  if (typeof req.session.userId !== 'undefined' && req.session.userId !== null) {
      next();
  } else {
      res.sendFile(__dirname + '/public/login.html');
  }
}

app.get('/auth/github', passport.authenticate('github', { scope: [ 'profile' ] }));

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login.html' }),
    function(req, res) {
        req.session.userId = req.user;
        req.session.username = req.body.username;
        res.redirect('/');
    }
);

app.post('/login', function (req, res) {
  User.findOne({username: req.body.username}, function(err, result) {
      if (result != null) {
          bcrypt.compare(req.body.password, result.password, function(err, ok) {
              if (ok) {
                  req.session.userId = result._id;
                  req.session.username = req.body.username;
                  res.json({code: 200, msg: "success"});
              } else {
                  res.json({code: 400, msg: "invalid credentials"});
              }
          });
      } else {
          res.json({code: 400, msg: "invalid credentials"});
      }
  });
});

app.post('/reg', function (req, res) {
  if (req.body.username === "" || req.body.password === "")
      res.json({code: 401, msg: "username or password cannot be empty"});
  else {
      User.findOne({username: req.body.username}, function (err, result) {
          if (result != null) {
              res.json({code: 401, msg: "The username already exists."});
          } else {
              const user = {};
              user.username = req.body.username;
              user.password = bcrypt.hashSync(req.body.password, 10);

              const newUser = new User(user);
              newUser.save(function (err, docs) {
                  req.session.userId = docs._id;
                  res.json({code: 200, msg: "success"});
              });
          }
      });
  }
});

app.get('/',auth, function(request, response) {
    response.sendFile( __dirname + '/public/index.html' )
})

app.get('/aboutus', function(request, response) {
  response.sendFile( __dirname + '/public/aboutus.html' )
})

app.get('/watchlist',auth, function(request, response) {
  response.sendFile( __dirname + '/public/watchlist.html' )
})

app.get('/search_anime',auth, function(request, response) {
  response.sendFile( __dirname + '/public/search_anime.html' )
})

app.post('/addData', bodyparser.json(), function(request, response) {
  console.log(request.body);
  response.json({result: "success!"});
})
app.get('/logout', auth, function (req, res) {
  req.logout();
  req.session.destroy(function(err) {
      res.clearCookie('sid');
      res.redirect('/login.html');
  });
});

app.post('/sendEmail', bodyparser.json(), function (req, res) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bigsmartmovie@gmail.com',
      pass: '1qa2ws#ED'
    }
  });

  var mailOptions = {
    from: 'bigsmartmovie@gmail.com',
    to: 'bigsmartmovie@gmail.com',
    cc: req.body.emailAddress,
    subject: 'Sending Email using Node.js',
    text: req.body.message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})

app.post('/getprofile', function (req, res){
  res.json({username:req.session.username, userId:req.session.userId})
})

// Watchlist related
app.post('/add', auth, function (req, res) {
  req.body.user = req.session.userId;
  const newWatch = new watchlist(req.body);
  newWatch.save().then(r => {
      res.json({code: 200, msg: 'success'});
  });
});
app.get('/getAdventure', auth, function (req, res) {
  watchlist.find({user: req.session.userId}, function (err, docs) {
      res.json(docs.filter((item) => new watchlist(item.category).valueOf() = "adventure"));
  });
});
app.get('/getLove', auth, function (req, res) {
  watchlist.find({user: req.session.userId}, function (err, docs) {
      res.json(docs.filter((item) => new watchlist(item.category).valueOf() = "love"));
  });
});
app.get('/getSuspense', auth, function (req, res) {
  watchlist.find({user: req.session.userId}, function (err, docs) {
      res.json(docs.filter((item) => new watchlist(item.category).valueOf() = "suspense"));
  });
});

app.get('/getSol', auth, function (req, res) {
  watchlist.find({user: req.session.userId}, function (err, docs) {
      res.json(docs.filter((item) => new watchlist(item.category).valueOf() = "sol"));
  });
});
app.get('/getFantansy', auth, function (req, res) {
  watchlist.find({user: req.session.userId}, function (err, docs) {
      res.json(docs.filter((item) => new watchlist(item.date).valueOf() = "fantasy"));
  });
});

app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(3030)
