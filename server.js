// MAKE SURE TO INSTALL dotenv, express, and mongodb
require("dotenv").config();
const express = require("express"),
  app = express(),
  mongodb = require("mongodb"),
  MongoClient = mongodb.MongoClient,
  // Will need to create .env file with variables for DB_USER, DB_PASS, and DB_HOST
  // uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/HotelReviews?retryWrites=true&w=majority`,
  uri = `mongodb+srv://test_user:tester_user_pw@cluster0.exade.mongodb.net/`,
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }),
  // test id for now
  id = 77777;

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
  for (let i = 0; i < json.length; i++) { //loop through all the posts 
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
      postedByProfile: id,
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

app.listen(process.env.PORT || 3000);
