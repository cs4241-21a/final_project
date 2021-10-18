## CS4241 Final Project
Group 5: Paloma González Gálvez, Mark Forte, Ryan Stebe, Matt Johannesen

### Summary
We created a 2-player web version of the game [Quoridor](https://en.wikipedia.org/wiki/Quoridor), in which players each move their pawn across a 9x9 board (from opposing sides) while placing walls to hinder their opponent's progress.

Given that this project involves multiple clients in a competitive setting, a large focus of our project was cheat protection. We have both the server and client validate the player's moves - that way even if the client code is modified, the server will refuse invalid inputs and will not change the game state.

A large portion of our server code is dedicated to validating pawn and wall placements.  Because walls in Quoridor sit in between grid spaces, we had to come up with our own methods for checking blockages, calculating legal movements, and pathfinding (to satisfy Quoridor's rule that there must always be a path between each pawn and the side of the board they're trying to reach).

Overview video of our project: https://www.youtube.com/watch?v=gbEOEv0PTZ4

### Instructions
Two players (or just two browser tabs) are needed to run the game.
Go to http://final-project-group-5.glitch.me/ to load the first client.
The first client will provide a "join" link - open it on another device/window to start the second client and begin playing.
(If either of these steps doesn't work, close all Quoridor windows and try again.)

You only need your mouse to play.  On your turn, select what you want to do (move your pawn, place a horizontal wall, or place a vertical wall) above the board, then click on the board to make your move.  If you try to make an invalid move, a warning will be displayed under the board.

### Libraries
- Node.js
    - Server code; manages game sessions and validates input from the client to prevent cheating
- p5.js
    - Board visuals
- Websockets (ws)
    - Simple communication between server and clients
- Express
    - Serving the game client page

### Work Distribution
We all met to discuss the game and agree on a set of message formats that the server and clients would use to communicate - once that was settled, Paloma and Mark focused on the client, while Ryan and Matt focused on the server.
