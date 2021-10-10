# Final Project
https://aram-generator.herokuapp.com/ 
## Description
ARAM is a 5v5 mode in League of Legends where each player is assigned a random character that they own and can trade with their teammates. Currently, there is no good way to generate an ARAM character draft in non-matchmaking player organized games, so we made a match generator which would assign characters to players for these types of games. 

Using the Riot API, each time we generate a draft of characters, we retrieve each player’s owned character pool and grab a total of 10 characters for each team.

Our interface has the user input 10 usernames with 5 on each team. After clicking a ‘generate’ button, our program outputs 10 characters for each team to select from, with each username owning at least 2 out of the 10 generated characters.

We also created a tournament generator where you can add teams to a database and randomly generate matches so that every team has a match against another team.

## Additional Instructions

Here is a list of valid League of Legends summoner names to test the app with.

Xialblo
NearbyAnt
Tiicho
Kyøu
Time to Break
Kieran2500
Planet 9
Big Jadeo
Deino Mite
jairzinho
Robertdobert
happynoob23
ezra3102
uginghostdragon
FC Wombat
Schnellaffe
Xyatz314
WrÆth
WalrusKing21
link101011
maxchief101
luckybanana16
HexKnight 
Wephen
Dragonkillermega
TeaGoon
Emperor Gandalf
TheSimoneseCat
Viserra
Trutru32
Dayanah
cadgweep
Mumichu
Megagamer10
jhooney WPI
Ksesha
ricetoeatyou
Rilay
ItsMyMiddleLane
GriffonStrike14
The Quıpster
Gearldine6Z
Yuumíí
SovietPupper
rathmadara
Flagged ID
HideOnShrubbery
Parzival0913

## Technologies
Javascript
Nodejs
Bootstrap - used for styling 
React - used for frontend 
react-router-dom
Heroku - used to deploy the website
Express - used for backend
Mongodb - used for storing users, teams, matches, and tournaments
Mongoose - used to store & retrieve data from mongodb
Riot Games API - used for generating champions and getting IDs linked to summoner names
LeagueJS - Wrapper for riot API calls 

## Challenges
The Riot API takes longer to respond than expected so our code runs a lot slower than we’d like. Additionally the API doesn’t always respond when called. 
CORS was inconvenient during development
Formatting the images to show next to each character was annoying

## Responsibilities

Felix Chen - Front end for single draft generation and some css styling
Jason Odell - API functions champion generation & getting account IDs from summoner names. Added checks for valid summoner name input
Timothy Goon - login and register system, connect single match generation page with backend, code reviews and refactoring, app deployment
Denver Blake - Front & Back end for TournamentCreation page, set up database schemas for tournament, matches, and teams

