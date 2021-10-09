// MAKE SURE TO INSTALL dotenv, express, and mongodb
require("dotenv").config();
const express = require("express"),
  app = express(),
  fs = require("fs"),
  mime = require("mime"),
  cors = require("cors"),
  mongodb = require("mongodb"),
  bodyParser = require("body-parser");
MongoClient = mongodb.MongoClient;

// OAuth Code
const passport = require("passport");
const session = require("express-session");
const OutlookStrategy = require("passport-outlook").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const DiscordStrategy = require("passport-discord").Strategy;
const { profile } = require("console");
const { LensTwoTone } = require("@mui/icons-material");
scopes = ["identify"];

app.use(cors());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

let profileID;

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  cb(null, id);
});

app.get(["/login.html", "/login"], (request, response) => {
  if (request.user) {
    return response.redirect("/dashboard.html"); // redirect according to profile
  }
  sendFile(response, __dirname + "/build/login.html");
});

// simple testing to route to login initially -> change for final version
app.get(
  "/",
  (request, response) => response.redirect("/login.html") // redirect according to profile
);

app.get(
  ["/build/dashboard.html", "/dashboard.html", "/dashboard"],
  async (request, response) => {
    if (request.user) {
      let user = null;
      let dbPromise_user = collection_profile
        .findOne({ profileID: Number(profileID) })
        .then((read_data) => (user = read_data));

      await dbPromise_user;

      if (user) {
        sendFile(response, __dirname + "/build/dashboard.html");
      } else {
        response.redirect("/profile.html");
      }
    } else {
      return response.redirect("/login");
    }
  }
);
app.get(
  ["/build/profile.html", "/profile.html", "/profile"],
  async (request, response) => {
    if (request.user) {
      sendFile(response, __dirname + "/build/profile.html");
    } else {
      return response.redirect("/login");
    }
  }
);

// Handles sending a file over to the front end
const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
    // if the error = null, then we've loaded the file successfully
    if (err === null) {
      // status code: https://httpstatuses.com
      response.writeHeader(200, { "Content-Type": type });
      response.end(content);
    } else {
      // file not found, error code 404
      response.writeHeader(404);
      response.end("404 Error: File Not Found");
    }
  });
};

app.get("/logout", (request, response) => {
  // console.log(request.user);
  request.logOut();
  response.redirect("/login");
});

async function handle_login(req, res) {
  let user = null;
  let dbPromise_user = collection_profile
    .findOne({ profileID: Number(profileID) })
    .then((read_data) => (user = read_data));

  await dbPromise_user;

  // console.log(user);

  if (user) {
    res.redirect("/dashboard.html");
  } else {
    res.redirect("/profile.html");
  }
}

passport.use(
  new OutlookStrategy(
    {
      clientID: process.env.OUTLOOK_CLIENT_ID,
      clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
    },
    function (accessToken, refreshToken, profile, done) {
      profileID = profile.id;

      cb(null, profile);
    }
  )
);

app.get(
  "/auth/outlook",
  passport.authenticate("windowslive", {
    scope: ["openid", "profile", "offline_access"],
  })
);

app.get(
  "/auth/outlook/callback",
  passport.authenticate("windowslive", { failureRedirect: "/login" }),
  async function (req, res) {
    // Successful authentication
    handle_login(req, res);
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
    handle_login(req, res);
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
    handle_login(req, res);
  }
);

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CALLBACK_URL,
      scope: scopes,
    },
    function (accessToken, refreshToken, profile, cb) {
      profileID = profile.id;

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
    handle_login(req, res);
  }
);

// Will need to create .env file with variables for DB_USER, DB_PASS, and DB_HOST
(uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/HotelReviews?retryWrites=true&w=majority`),
  // (uri = `mongodb+srv://test_user:tester_user_pw@cluster0.exade.mongodb.net/`),
  (client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }));

let collection_profile = null;
let collection_admin = null;
let collection_skill = null;
let collection_class = null;
let collection_post = null;
let collection_postComment = null;

let collection_studentSkillRelation = null;
let collection_studentClassRelation = null;
let collection_postSkillRelation = null;

client.connect();

client.once("open", () => {
  //connecting to all the collections
  collection_profile = client.db("WebwareGroupProject").collection("Profile");
  collection_admin = client.db("WebwareGroupProject").collection("Admin");
  collection_skill = client.db("WebwareGroupProject").collection("Skill");
  collection_class = client.db("WebwareGroupProject").collection("Class");
  collection_post = client.db("WebwareGroupProject").collection("Post");

  collection_studentSkillRelation = client
    .db("WebwareGroupProject")
    .collection("StudentSkillRelation");
  collection_studentClassRelation = client
    .db("WebwareGroupProject")
    .collection("StudentClassRelation");
  collection_postSkillRelation = client
    .db("WebwareGroupProject")
    .collection("PostSkillRelation");
});

// serve all the static files in the build directory
app.use(express.static("build"));

// will parse incoming request body content
app.use(express.json());

// for testing purposes --> this will change when branch is merged into main branch
app.get("/", (request, response) =>
  response.sendFile(__dirname + "/build/dashboard.html")
);

// Helper function that will get all the posts in the database and will format them into one
// json object
const getAllPosts = async function () {
  let profile_data = null;
  let post_data = null;
  let post_skill_data = null;
  let skill_data = null;

  //grab data in profile collection
  await collection_profile
    .find({})
    .toArray()
    .then((read_data) => (profile_data = read_data));

  //grab data in post collection
  await collection_post
    .find({})
    .toArray()
    .then((read_data) => (post_data = read_data));

  //grab data in post skill relation collection
  await collection_postSkillRelation
    .find({})
    .toArray()
    .then((read_data) => (post_skill_data = read_data));

  //grab data in skill collection
  await collection_skill
    .find({})
    .toArray()
    .then((read_data) => (skill_data = read_data));

  let json = post_data;
  for (let i = 0; i < json.length; i++) {
    //loop through all the posts
    let skills = []; //will hold the programming skills attached to this post
    let languages = []; //will hold the programming languages attached to this post
    for (let n = 0; n < post_skill_data.length; n++) {
      if (post_skill_data[n].postID.equals(json[i]._id)) {
        //found post skill relation that goes with the post
        for (let t = 0; t < skill_data.length; t++) {
          if (
            post_skill_data[n].skillName === skill_data[t].skill &&
            skill_data[t].category === "Programming Languages"
          ) {
            //the skill is a programming language so we add to the appropriate array
            languages.push(post_skill_data[n].skillName);
            break;
          }
          if (
            post_skill_data[n].skillName === skill_data[t].skill &&
            skill_data[t].category === "Programming Skills"
          ) {
            //the skill is a programming skill so we add to the appropriate array
            skills.push(post_skill_data[n].skillName);
            break;
          }
        }
      }
    }
    for (let j = 0; j < profile_data.length; j++) {
      if (json[i].postedByProfile === profile_data[j].profileID) {
        //found the profile of the person who created the post
        //we will fill in other information that we will need on client-side
        json[i].firstName = profile_data[j].firstName;
        json[i].lastName = profile_data[j].lastName;
        json[i].linkToProfilePic = profile_data[j].linkToProfilePic;
        json[i].languages = languages;
        json[i].skills = skills;
        break;
      }
    }
  }

  // Area to ensure that skills and languages is not undefined
  for (let k = 0; k < json.length; k++) {
    if (json[k].skills === undefined) {
      json[k].skills = [];
    }
    if (json[k].languages === undefined) {
      json[k].languages = [];
    }
  }

  // console.log(json);

  return json;
};
app.get("/posts", async (request, response) => {
  let json = await getAllPosts();
  response.json(json);
});

app.post("/submit", async (request, response) => {
  let courseNum = null;
  let courseDep = null;
  if (request.body.class === "personal") {
    courseNum = "";
    courseDep = "Personal Project";
  } else {
    courseDep = "CS";
    courseNum = request.body.class;
  }
  collection_post
    .insertOne({
      bodyContent: request.body.description,
      header: request.body.title,
      date: request.body.date,
      postedByProfile: Number(profileID),
      forClassNumber: courseNum,
      forClassDepartment: courseDep,
    })
    .then((reply) => {
      //once we add a post to the post collection we also want to add the post-skill relations
      let postID = reply.insertedId;
      for (let x = 0; x < request.body.skills.length; x++) {
        collection_postSkillRelation.insertOne({
          postID: postID,
          skillName: request.body.skills[x],
        });
      }

      for (let y = 0; y < request.body.languages.length; y++) {
        collection_postSkillRelation.insertOne({
          postID: postID,
          skillName: request.body.languages[y],
        });
      }
    });

  let json = await getAllPosts();
  response.json(json);
});

app.post("/filter", async (request, response) => {
  let json = await getAllPosts();
  let noCourse = false;
  let noSkills = false;
  let noLanguages = false;
  let course = request.body.course;
  let skills = request.body.skills;
  let languages = request.body.languages;

  let newJson = [];
  if (course === "") {
    newJson = json;
    noCourse = true;
  }

  if (!noCourse) {
    for (let i = 0; i < json.length; i++) {
      if (
        `${json[i].forClassDepartment} ${json[i].forClassNumber}` === course ||
        json[i].forClassDepartment === course
      ) {
        newJson.push(json[i]);
      }
    }
  }

  let newJson2 = [];
  if (!skills.length) {
    newJson2 = newJson;
    noSkills = true;
  }

  if (!noSkills) {
    for (let j = 0; j < newJson.length; j++) {
      if (skills.every((x) => newJson[j].skills.includes(x))) {
        newJson2.push(newJson[j]);
      }
    }
  }

  let newJson3 = [];
  if (!languages.length) {
    newJson3 = newJson2;
    noLanguages = true;
  }

  if (!noLanguages) {
    for (let k = 0; k < newJson2.length; k++) {
      if (languages.every((v) => newJson2[k].languages.includes(v))) {
        newJson3.push(newJson2[k]);
      }
    }
  }
  response.json(newJson3);
});

app.get("/profile", (request, response) => {
  response.sendFile(__dirname + "/build/profile.html");
});

app.post("/create_profile", bodyParser.json(), async (request, response) => {
  await collection_profile.deleteMany({ profileID: Number(profileID) });

  let allSkills = request.body.skills.concat(request.body.languages);

  await insertStudentClassRelation(request.body.courses);
  await insertStudentSkillRelation(allSkills);

  jsonToInsert = {
    profileID: Number(profileID),
    linkToProfilePic: "",
    bio: request.body.bio,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    grade: request.body.grade,
    phoneNum: request.body.phoneNum,
  };

  await collection_profile.insertOne(jsonToInsert).then((result) => {
    //console.log(result)
  });

  response.json();
});

app.post("/get_profile", bodyParser.json(), async (request, response) => {
  let profile = null;
  await collection_profile
    .find({ profileID: Number(profileID) })
    .toArray()
    .then(async (read_data) => {
      if (read_data.length > 0) {
        profile = read_data[0];
        let allSkills = null;
        let studentSkills = null;
        let studentClasses = null;

        await collection_studentSkillRelation
          .find({ profileID: Number(profileID) })
          .toArray()
          .then((read_data) => (studentSkills = read_data));

        await collection_studentClassRelation
          .find({ profileID: Number(profileID) })
          .toArray()
          .then((read_data) => (studentClasses = read_data));

        await collection_skill
          .find({})
          .toArray()
          .then((read_data) => (allSkills = read_data));

        let skills = [];
        let languages = [];
        let courses = [];

        for (let i = 0; i < studentClasses.length; i++) {
          if (studentClasses[i].classDepartment === "personal") {
            courses.push("personal");
          } else {
            courses.push(studentClasses[i].classCourseNumber);
          }
        }

        for (let j = 0; j < studentSkills.length; j++) {
          let skillName = studentSkills[j].skill;
          for (let k = 0; k < allSkills.length; k++) {
            if (allSkills[k].skill === skillName) {
              if (allSkills[k].category === "Programming Languages") {
                languages.push(skillName);
                break;
              } else {
                skills.push(skillName);
                break;
              }
            }
          }
        }

        profile.courses = courses;
        profile.skills = skills;
        profile.languages = languages;

        response.json(profile);
      } else {
        response.json({});
      }
    });
});

async function insertStudentClassRelation(classNames) {
  await collection_studentClassRelation.deleteMany({
    profileID: Number(profileID),
  });

  //console.log("removed courses already there. ")

  for (let i = 0; i < classNames.length; i++) {
    let json = null;
    if (classNames[i] === "personal") {
      json = {
        profileID: Number(profileID),
        classCourseNumber: "",
        classDepartment: classNames[i],
      };
    } else {
      json = {
        profileID: Number(profileID),
        classCourseNumber: classNames[i],
        classDepartment: "CS",
      };
    }
    //console.log("insert into studentClassRElation: ", json)

    await collection_studentClassRelation.insertOne(json).then((result) => {
      //console.log(result)
    });
  }
}

async function insertStudentSkillRelation(skills) {
  await collection_studentSkillRelation.deleteMany({
    profileID: Number(profileID),
  });

  //console.log("removed courses already there. ")

  for (let i = 0; i < skills.length; i++) {
    let json = {
      profileID: Number(profileID),
      skill: skills[i],
    };
    //console.log("insert into studentSkillRelation: ", json)

    await collection_studentSkillRelation.insertOne(json).then((result) => {
      //console.log(result)
    });
  }
}

app.post("/delete_post", bodyParser.json(), async (request, response) => {
  if (Number(request.body.profileID) === Number(profileID)) {
    await collection_post
      .deleteOne({ _id: mongodb.ObjectId(request.body.postID) })
      .then(async () => {
        await collection_postSkillRelation.deleteMany({
          postID: mongodb.ObjectID(request.body.postID)
        });
      });
  }

  // Use this to get all the posts after successfully deleting post
  let json = await getAllPosts();
  response.json(json);
});

app.listen(process.env.PORT || 3000);
