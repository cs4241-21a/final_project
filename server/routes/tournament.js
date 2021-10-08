var express = require('express');
var router = express.Router();

const Team = require('../schemas/Team')
const Match = require('../schemas/Match')

const Tournament = require('../schemas/Tournament');
process.env.LEAGUE_API_PLATFORM_ID = 'na1'
process.env.LEAGUE_API_KEY =''
const LeagueJS = require('leaguejs');
require('dotenv').config()
const api = new LeagueJS(process.env.LEAGUE_API_KEY);
const Util = require('leaguejs/lib/util')
const DataDragonHelper = require('leaguejs/lib/DataDragon/DataDragonHelper')
DataDragonHelper.storageRoot = ['storage']
let map = new Map();
let val;
let data = require('./champion.json');
data = data.data;
for(let i in data){
    map.set(data[i].id, data[i].name);
}
let team1 = [];
let team2 = [];
let idList1 = [];
let idList2 = [];
let champlist = [];
api.updateRateLimiter({allowBursts: true})
async function getList (arr1, arr2){
    for (const element of arr1) {
        await api.Summoner.gettingByName(element)
            .then(data => {
                val = data;
                idList1.push(val.id)
            })
    }
    for (const element of arr2) {
        await api.Summoner.gettingByName(element)
            .then(data => {
                val = data;
                idList2.push(val.id)
            })
    }
}
async function generateTeams(arr){
    for (const element of arr) {
        await api.ChampionMastery.gettingBySummoner(element, 'na1').then(data => {
            'use strict';
            val = data;
            let x = val[Math.floor(Math.random() * (val.length-1))].championId
            while(champlist.includes(x)){
                x = val[Math.floor(Math.random() * (val.length-1))].championId
            }
            champlist.push(x);
        })
            .catch(err => {
                'use strict';
                console.log(err);
            });
    }

}
async function generateChamps(arr1,arr2){
    idList1 = [];
    idList2 = [];
    champlist = [];
    team1 = [];
    team2 = [];
    await getList(arr1, arr2).then(async r => {
        await generateTeams(idList1).then(async data => {
            await generateTeams(idList1).then(async data => {
                await generateTeams(idList2).then(async data => {
                    await generateTeams(idList2).then(data => {
                        let half_length = Math.ceil(champlist.length / 2);
                        let leftSide = champlist.splice(0, half_length);
                        for (let i in leftSide) {
                            team1.push(map.get(leftSide[i]))
                        }
                        for (let i in champlist) {
                            team2.push(map.get(champlist[i]))
                        }
                    })
                })
            })
        })
    })
    console.log(team1)
    console.log(team2)
}
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
        await generateChamps(teams[i].summoners, teams[i + 1].summoners)
        let newMatch = await Match({
            team1: teams[i].teamName,
            champions1: team1,
            // TODO: What do we do when there are an odd number of teams
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

module.exports = router;
