// MAKE SURE TO INSTALL dotenv, express, and mongodb
require("dotenv").config();
const express = require("express"),
  app = express(),
  mongodb = require("mongodb");
  MongoClient = mongodb.MongoClient;

  // OAuth Code 
  const passport = require('passport');
  const session = require('express-session');
  const OutlookStrategy = require('passport-outlook').Strategy;
  const GitHubStrategy = require("passport-github").Strategy;
  const GoogleStrategy = require("passport-google-oauth2").Strategy;
  const DiscordStrategy = require("passport-discord").Strategy;
  scopes = ['identify'];

  const isAuth = (req,res, next) => {
    if(req.user) {
      next();
    } else {
      res.redirect("/build/login.html");
    }
  }
    
  app.get("/login", (request, response) => {
    if(request.user) {
      return response.redirect('/'); // redirect according to profile
    }
    response.sendFile(__dirname + "/build/login.html");
  });

  // simple testing to route to login initially -> change for final version
  app.get("/", (request, response) => response.sendFile(__dirname + "/build/login.html"))
  app.get("/build/dashboard.html", (request, response) => response.sendFile(__dirname + "/build/dashboard.html"))
  app.get("/build/profile.html", (request, response) => response.sendFile(__dirname + "/build/profile.html"))

  app.get("/logout", (request, response) => {
    request.logOut();
    response.redirect('/login');
  });

  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { 
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }))
  
  app.use(passport.initialize())
  app.use(passport.session());
  
  let profileID; 

  passport.serializeUser(function(user,cb) {
    cb(null, user.id);
  });
  
  passport.deserializeUser(function(id,cb) {
    cb(null, id);
  });
  
  passport.use(new OutlookStrategy({
    clientID: process.env.OUTLOOK_CLIENT_ID,
    clientSecret: process.env.OUTLOOK_CLIENT_SECRET
  },
  function(accessToken, refreshToken, profile, done) {
    profileID = profile.id;

    collection_profile.insertOne( 
      { 
        profileID: profile.id,
      })
    cb(null,profile)
  }
  ));

  app.get('/auth/outlook', passport.authenticate('windowslive', {
    scope: [
      'openid',
      'profile',
      'offline_access'
    ]
  }));
  
  app.get(
    '/auth/outlook/callback',
    passport.authenticate('windowslive', {failureRedirect: '/login'}),
    async function (req, res) {
      // Successful authentication    
      // check if they have an account, redirect accordingly

      let user = null;
      let dbPromise_user = collection_profile
        .findOne({ profileID: profileID })
        .then((read_data) => (user = read_data));
    
      await dbPromise_user;

      if (user) 
      {
        res.redirect('/build/dashboard.html')
      }
      else
      {
        res.redirect('/build/profile.html')
      }
    }
  );
  
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GIT_CLIENT_ID,
        clientSecret: process.env.GIT_CLIENT_SECRET,
        callbackURL: process.env.GIT_CALLBACK_URL,
      },
      function (accessToken, refreshToken, profile, cb) {
        profileID = profile.id;

        collection_profile.insertOne( 
          { 
            profileID: profile.id,
          })

        cb(null, profile);
      }
    )
  );

  app.get("/auth/github", passport.authenticate("github"));

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/" }),
    async function (req, res) {
      // Successful authentication    
      // check if they have an account, redirect accordingly

      let user = null;
      let dbPromise_user = collection_profile
        .findOne({ profileID: profileID })
        .then((read_data) => (user = read_data));
    
      await dbPromise_user;

      if (user) 
      {
        res.redirect('/build/dashboard.html')
      }
      else
      {
        res.redirect('/build/profile.html')
      }
    }
  );

  // in profile server add function, use global variable profile Id to find

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
      },
      function (request, accessToken, refreshToken, profile, done) {
        profileID = profile.id;

        collection_profile.insertOne( 
          { 
            profileID: profile.id,
          })

        return done(null, profile);
      }
    )
  );

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      // successRedirect: "/auth/google/success",
      failureRedirect: "/auth/google/failure",
    }),
  
    async function (req, res) {
      // Successful authentication    
      // check if they have an account, redirect accordingly

      let user = null;
      let dbPromise_user = collection_profile
        .findOne({ profileID: profileID })
        .then((read_data) => (user = read_data));
    
      await dbPromise_user;

      if (user) 
      {
        res.redirect('/build/dashboard.html')
      }
      else
      {
        res.redirect('/build/profile.html')
      }
    }
  );

  passport.use(
    new DiscordStrategy(
      {
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: process.env.DISCORD_CALLBACK_URL,
        scope: scopes
      },
      function (accessToken, refreshToken, profile, cb) {
        profileID = profile.id;

        collection_profile.insertOne( 
          { 
            profileID: profile.id,
          })

        return cb(null, profile);
      }
    )
  );

  app.get("/auth/discord", passport.authenticate("discord"));

  app.get(
    "/auth/discord/callback",
    passport.authenticate("discord", {
      failureRedirect: "/",
    }),
    async function (req, res) {
      // Successful authentication    
      // check if they have an account, redirect accordingly

      let user = null;
      let dbPromise_user = collection_profile
        .findOne({ profileID: profileID })
        .then((read_data) => (user = read_data));
    
      await dbPromise_user;

      if (user) 
      {
        res.redirect('/build/dashboard.html')
      }
      else
      {
        res.redirect('/build/profile.html')
      }
    }
  );

  // Will need to create .env file with variables for DB_USER, DB_PASS, and DB_HOST
  // uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/HotelReviews?retryWrites=true&w=majority`,
  uri = `mongodb+srv://test_user:tester_user_pw@cluster0.exade.mongodb.net/`,
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let collection_profile = null;
  let collection_admin = null;
  let collection_skill = null;
  let collection_class = null;
  let collection_post = null;
  let collection_postComment = null;

  let collection_studentSkillRelation = null;
  let collection_studentClassRelation = null;
  let collection_postSkillRelation = null;

client.connect()

client.once("open", () => {
  collection_profile = client.db("WebwareGroupProject").collection("Profile");
  collection_admin = client.db("WebwareGroupProject").collection("Admin");
  collection_skill = client.db("WebwareGroupProject").collection("Skill");
  collection_class = client.db("WebwareGroupProject").collection("Class");
  collection_post = client.db("WebwareGroupProject").collection("Post");

  collection_studentSkillRelation = client.db("WebwareGroupProject").collection("StudentSkillRelation");
  collection_studentClassRelation = client.db("WebwareGroupProject").collection("StudentClassRelation");
  collection_postSkillRelation = client.db("WebwareGroupProject").collection("PostSkillRelation");
});

app.use(express.static("build"));

app.use(express.json());

// place GET, POST routes

app.listen(process.env.PORT || 3000);
