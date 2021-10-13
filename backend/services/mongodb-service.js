const { MongoClient, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let collectionUsers= null
// let collectionRooms = null

const connectDB = async function() {
    await client.connect()
    console.log('Successfully connected to MemoryDB')
    collectionUsers = client.db("MemoryDB").collection("Users");
    // collectionRooms = client.db("MemoryDB").collection("Rooms");
}

connectDB()

// exports.getUser = async function(id){
//     const db_queryresults = await collectionUsers.findOne({ _id : ObjectId(id) })
//     return db_queryresults
// }

exports.getGitHubUser = async function(id) {
  return new Promise((resolve, reject) => {
    collectionUsers.findOne({ githubId : id })
    .then((data) => {
      console.log(data)
      if (data && data._id) {
        resolve(data)
      } else {
        reject()
      }
    })
  })
}

exports.updateUser = async function(user){
    const db_queryresults = await collectionUsers.updateOne({ githubId : user.githubId}, {
      $set: {
        highscore: user.highscore,
        gamesplayed: user.gamesplayed
      }  
    })
    return db_queryresults
}

exports.createUser = async function(user){
  return new Promise ((resolve, reject) => {
    collectionUsers.insertOne({
      githubId: user.id,
      username: user.username,
      highscore: 0,
      gamesplayed: 0
    })
    .then(ack => {
      exports.getGitHubUser(user.id)
      .then( (data) => resolve(data) )
      .catch( (e) => reject(e))
    })
  })
}

exports.getLeaderboard = async function(){
    const db_queryresults = await collectionUsers.find({ }).sort({"highscore": -1}).toArray()
    return db_queryresults
}
/*
exports.createRoom = async function(key){
    const db_queryresults = await collectionRooms.insertOne({ roomkey: key, players:[] }).toArray()
    return db_queryresults
}

exports.updateRoomPlayers = async function(data){
    const db_queryresults = await collectionRooms.updateOne({ _id : ObjectId(data.id)}, {
        $push: {
          players: {
              playerName: data.name,
          }
        }  
      })
      return db_queryresults
}

exports.updateRoomScores = async function(data){
    const db_queryresults = await collectionRooms.updateOne({ _id : ObjectId(data.id), "players.playerName" : data.name}, {
        $set: {
          "players.playerScore": data.score
        } 
      })
      return db_queryresults
}

exports.deleteRoom = async function(data){
    const db_queryresults = await collectionRooms.deleteOne({ _id: ObjectId(data.id) }).toArray()
    return db_queryresults
}
*/

