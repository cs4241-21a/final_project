# Final Project
Website Link: https://aram-generator.herokuapp.com/ 
Video Link: https://drive.google.com/file/d/1oLcI_5p4T-1tOXv322fftIzquvw4JZGF/view?usp=sharing
## Description
ARAM is a 5v5 mode in League of Legends where each player is assigned a random character that they own and can trade with their teammates. Currently, there is no good way to generate an ARAM character draft in non-matchmaking player organized games, so we made a match generator which would assign characters to players for these types of games. 

Using the Riot API, each time we generate a draft of characters, we retrieve each player’s owned character pool and grab a total of 10 characters for each team.

Our interface has the user input 10 usernames with 5 on each team. After clicking a ‘generate’ button, our program outputs 10 characters for each team to select from, with each username owning at least 2 out of the 10 generated characters.

We also created a tournament generator where you can add teams to a database and randomly generate matches so that every team has a match against another team.

## Additional Instructions

Here is a list of valid League of Legends summoner names to test the app with.

1. Xialblo
2. NearbyAnt
3. Tiicho
4. Kyøu
5. Time to Break
6. Kieran2500
7. Planet 9
8. Big Jadeo
9. Deino Mite
10. jairzinho
11. Robertdobert
12. happynoob23
13. ezra3102
14. uginghostdragon
15. FC Wombat
16. Schnellaffe
17. Xyatz314
18. WrÆth
19. WalrusKing21
20. link101011
21. maxchief101
22. luckybanana16
23. HexKnight 
24. Wephen
25. Dragonkillermega
26. TeaGoon
27. Emperor Gandalf
28. TheSimoneseCat
29. Viserra
30. Trutru32
31. Dayanah
32. cadgweep
33. Mumichu
34. Megagamer10
35. jhooney WPI
36. Ksesha
37. ricetoeatyou
38. Rilay
39. ItsMyMiddleLane
40. GriffonStrike14
41. The Quıpster
42. Gearldine6Z
43. Yuumíí
44. SovietPupper
45. rathmadara
46. Flagged ID
47. HideOnShrubbery
48. Parzival0913

## Technologies
- Javascript
- Nodejs
- Bootstrap - used for styling 
- React - used for frontend 
  - react-router-dom
- Heroku - used to deploy the website
- Express - used for backend
- Mongodb - used for storing users, teams, matches, and tournaments
- Mongoose - used to store & retrieve data from mongodb
- Riot Games API - used for generating champions and getting IDs linked to summoner names
- LeagueJS - Wrapper for riot API calls 

## Challenges
The Riot API takes longer to respond than expected so our code runs a lot slower than we’d like. Additionally the API doesn’t always respond when called. 
CORS was inconvenient during development
Formatting the images to show next to each character was annoying

## Responsibilities

- Felix Chen - Front end for single draft generation and some css styling
- Jason Odell - API functions champion generation & getting account IDs from summoner names. Added checks for valid summoner name input
- Timothy Goon - login and register system, connect single match generation page with backend, code reviews and refactoring, app deployment
- Denver Blake - Front & Back end for TournamentCreation page, set up database schemas for tournament, matches, and teams

