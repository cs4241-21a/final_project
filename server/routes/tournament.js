var express = require('express');
var router = express.Router();
const LeagueJS = require('leaguejs');

const Team = require('../schemas/Team')
const Match = require('../schemas/Match')
const Tournament = require('../schemas/Tournament');
const api = new LeagueJS(process.env.LEAGUE_API_KEY);
api.updateRateLimiter({ allowBursts: true })
const Util = require('leaguejs/lib/util')
const DataDragonHelper = require('leaguejs/lib/DataDragon/DataDragonHelper');
DataDragonHelper.storageRoot = ['storage'];

let { data } = require('../champion.json');

let map = new Map();
for (let i in data) {
    map.set(data[i].id, data[i].name);
}

/* GET users listing. */
router.get('/loadTeams', async function (req, res, next) {
    const teams = await Team.find({ userId: req.cookies.loginCookie.userId });

    res.json(teams)
});

router.post('/insertTeam', async (req, res, next) => {
    // TODO: Check for invalid sum names 
    const { userId, teamName, summoners } = req.body
    console.log("insert ", req.body.userId)
    // Check if a team already has this name under this user.
    const existingTeam = await Team.findOne({ userId, teamName });
    if (existingTeam) {
        res.json({ error: 'Team with this name already exists.' });
        return;
    }
    const idList = await getList(summoners);
    console.log(idList);
    if(!(idList)){
        res.json({error:'Invalid summoner name.'});
        return;
    }

    let newTeam = await Team({
        userId,
        teamName,
        summoners,
        idList

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
        const [team1, team2] = await generateChamps(teams[i].idList, teams[(i + 1) % teams.length].idList)
        let newMatch = await Match({
            team1: teams[i].teamName,
            champions1: team1,
            team2: teams[(i + 1) % teams.length].teamName,
            champions2: team2
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

async function getList(arr1) {
    const idList = [];
    for (const element of arr1) {
        try {
            await api.Summoner.gettingByName(element)
                .then(data => {
                    idList.push(data.id)
                })
        }
        catch(err){
            return false;
        }
    }
    return idList;

}

async function generateTeams(arr, champlist) {
    for (const element of arr) {
        await api.ChampionMastery.gettingBySummoner(element, 'na1').then(data => {
            'use strict';
            let x = data[Math.floor(Math.random() * (data.length - 1))].championId
            while (champlist.includes(x)) {
                x = data[Math.floor(Math.random() * (data.length - 1))].championId
            }
            champlist.push(x);
        })
            .catch(err => {
                'use strict';
                console.log(err);
            });
    }
}

/**
 * 
 * @param {String Array} arr1 team 1 summoner names
 * @param {String Array} arr2 team 2 summoner names
 * @returns Array containing 2 things:
 * 
 */
 async function generateChamps(idList1, idList2) {
    champlist = [];
    team1 = [];
    team2 = [];
    await generateTeams(idList1, champlist)
    await generateTeams(idList1, champlist)
    await generateTeams(idList2, champlist)
    await generateTeams(idList2, champlist)

    let half_length = Math.ceil(champlist.length / 2);
    let leftSide = champlist.splice(0, half_length);

    for (let i in leftSide) {
        team1.push(map.get(leftSide[i]))
    }

    for (let i in champlist) {
        team2.push(map.get(champlist[i]))
    }

    return [team1, team2]
}

module.exports = router;
