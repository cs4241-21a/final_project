var express = require('express');
var router = express.Router();

const Team = require('../schemas/Team')
const Match = require('../schemas/Match')

const Tournament = require('../schemas/Tournament');


/* GET users listing. */
router.get('/loadTeams', async function (req, res, next) {
    const teams = await Team.find({ userId: req.cookies.loginCookie.userId });

    res.json(teams)
});

router.post('/insertTeam', async (req, res, next) => {
    const { userId, teamName, summoners } = req.body
    console.log("insert ", req.body.userId)

    // Check if a team already has this name under this user.
    const existingTeam = await Team.findOne({ userId, teamName });
    if (existingTeam) {
        res.json({ error: 'Team with this name already exists.' });
        return;
    }

    let newTeam = await Team({
        userId,
        teamName,
        summoners

    });
    newTeam = await newTeam.save();
    const teams = await Team.find({ userId: userId });

    res.json(teams);
});

router.post('/updateTeam', async (req, res, next) => {
    const { _id, teamName, summoners } = req.body
    const updated = await Team.updateOne({ _id: _id }, { $set: { teamName: teamName, summoners: summoners } })
    const teams = await Team.find({})

    res.json(teams)
});

router.post('/deleteTeam', async (req, res, next) => {
    const { _id } = req.body
    console.log("id", _id)
    const team = await Team.deleteOne({ _id: _id })
    const teams = await Team.find({})

    res.json(teams)
});

router.post('/generateTournament', async (req, res, next) => {
    const teams = await Team.find({ userId: req.cookies.loginCookie.userId });
    let matches = [];

    let currentIndex = teams.length, randomIndex;

    //  Shuffle array of teams
    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [teams[currentIndex], teams[randomIndex]] = [
            teams[randomIndex], teams[currentIndex]];
    }

    for (let i = 0; i < teams.length; i += 2) {
        let newMatch = await Match({
            team1: teams[i].teamName,
            champions1: ["Leblanc", "Zoe", "Ahri", "Orianna"],
            // TODO: What do we do when there are an odd number of teams
            team2: teams[(i + 1) % teams.length].teamName,
            champions2: ["Leblanc", "Zoe", "Ahri", "Orianna"]
        });

        newMatch = await newMatch.save();
        matches.push(newMatch._id);
    }

    let tournament = await Tournament({
        matches
    });

    tournament = await tournament.save();

    res.json(tournament);
});

router.post('/loadMatches', async function (req, res, next) {
    const { tournamentId } = req.body

    let tournament = await Tournament.findOne({ _id: tournamentId })

    const allMatches = [];
    for (let i = 0; i < tournament.matches.length; i++) {
        const match = await Match.findById(tournament.matches[i]);

        allMatches.push({
            team1: match.team1,
            champions1: match.champions1,
            team2: match.team2,
            champions2: match.champions2
        });
    }

    res.json(allMatches);
});

module.exports = router;
