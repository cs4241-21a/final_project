var express = require('express');
var router = express.Router();

const Team = require('../schemas/Team')
const Match = require('../schemas/Match')

const Tournament = require('../schemas/Tournament');


/* GET users listing. */
router.get('/loadTeams', async function(req, res, next) {
  const teams = await Team.find({})
  
  res.json(teams)

});

router.post('/insertTeam', async (req, res, next) => {
    const {userId,teamName,summoners} = req.body
    console.log("insert ",req.body.userId)
    let newTeam = await Team({
        userId,
        teamName,
        summoners

    })
    newTeam = await newTeam.save();
    const teams = await Team.find({})

    res.json(teams)


});

router.post('/updateTeam', async (req, res, next) => {
    const {_id,teamName,summoners} = req.body
    const updated = await Team.updateOne({_id:_id},{$set:{teamName:teamName,summoners:summoners}})
    const teams = await Team.find({})

    res.json(teams)


});

router.post('/deleteTeam', async (req, res, next) => {
    const {_id} = req.body
    console.log("id",_id)
    const team = await Team.deleteOne({_id:_id})
    const teams = await Team.find({})

    res.json(teams)


});

router.post('/generateTournament',async (req,res,next) => {
    const teams = await Team.find({})
    let matches = []
    for (let i = 0;i < teams.length;i+=2) {
        let newMatch = await Match({
            team1:teams[i].teamName,
            champions1:["Leblanc","Zoe","Ahri","Orianna"],
            team2:teams[i+1].teamName,
            champions2:["Leblanc","Zoe","Ahri","Orianna"]
        })
        newMatch = await newMatch.save();
        matches.push(newMatch._id)

    }
    let tournament = await Tournament({
        matches
    })
    tournament = await tournament.save()


    res.json(tournament)
})
router.post('/loadMatches', async function(req, res, next) {
    const {tournamentId} = req.body

    let tournament = await Tournament.findOne({_id:req.body.tournamentId})
    
    //TODO
    
    res.json(tournament.matches)
  
  });

module.exports = router;
