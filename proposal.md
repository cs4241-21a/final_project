# Proposal: ARAM Match Generator 

Group 3 Team Members
- Felix Chen
- Jason Odell
- Timothy Goon
- Denver Blake

## Description

ARAM is a 5v5 mode in League of Legends where each player is assigned a random character that they own and can trade with their teammates. Currently, there is no good way to generate an ARAM character draft in non-matchmaking player organized games, so we would like to make a match generator which would assign characters to players for these types of games. 

Using the Riot API, we will retrieve each player’s owned champion pool and cache that in a database. When we want to generate characters for the match, we will look at each player’s champion pool and update the database to ensure that there are no duplicates.

Our interface will have the user input 10 usernames with 5 on each team. After clicking a ‘generate’ button, our program will output 10 characters for each team to select from, with each username owning at least 2 out of the 10 generated characters.

![image](https://user-images.githubusercontent.com/32044950/134957030-2a69af6d-1fb1-468d-bd81-866e7bea9c24.png)

## Techonolgies

- Javascript on client side
- React
- Heroku
- Express
- Mongodb
  - Mongoose
- Riot Games API 

## Stretch Goals

- Implement a bracket generator for tournaments 
- Creating accounts for players to sign up for teams 
- Tracking stats for character generation, player stats, winrates, etc

