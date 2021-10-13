import React, {useState, useEffect} from "react";
import anime from 'animejs/lib/anime.es.js';
import ColorTile from "./ColorTile"


const GameApp = () => {
    React.useEffect( () =>{
        anime({
            targets:'.score',
            left: '50%'
        })
    })
    const colors = ["red", "yellow", "blue", "green"]
    const initGame = {
        appTurn: false,
        appColors: [],
        playerTurn: false,
        playerColors: [],
        playerScore: 0
    }

    const [flashValue, setFlashValue] = useState("")
    const [gameState, setGameState] = useState(initGame)
    const [gameOver, setGameOver] = useState(false)
    const [delayTime, setDelayTime] = useState(505)
    const delay = ms => new Promise(res => setTimeout(res, ms))
    const sounds = {
        green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
        red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
        yellow: new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
        blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3")
      }

    useEffect(() => {
      if (gameState.appTurn) {
        if(delayTime > 100){
            setDelayTime(delayTime - 15)
        }
        let newColor = colors[Math.floor(Math.random() * 4)]
  
        const colorSequence = [...gameState.appColors]
        colorSequence.push(newColor)
        setGameState({ ...gameState, appColors: colorSequence })
      }
    }, [gameState.appTurn])

    useEffect(() => {
        if (gameOver) {
            setDelayTime(505)
            setGameState({...initGame, playerScore: gameState.playerScore} )
          
            //POST user score to update DB leaderboard
            const json = { playerScore: gameState.playerScore }

            fetch( '/api/score', { 
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify( json )
            })
            .then( response => response.text())
            .then ( (text) => {
                console.log(text)
            })
        }
      }, [gameOver])

      useEffect(() => {
          if(gameState.appColors.length > 0){
            flashSequence()
              
          }
      }, [gameState.appColors.length])

    const flashSequence = async () => {
        await delay(delayTime*2)
        for (let i = 0; i < gameState.appColors.length; i++) {
            sounds[gameState.appColors[i]].play()
            setFlashValue(gameState.appColors[i])
            await delay(delayTime)
            setFlashValue("")
            await delay(delayTime)
        }
        const colorSequence = [...gameState.appColors]
        setGameState({...gameState, appTurn: false, playerTurn: true, playerColors: colorSequence.reverse() })
    }

    const colorClick = async (color) => {
        if(gameState.playerTurn){
            const playerColorsCopy = [...gameState.playerColors]
            const prevColor = playerColorsCopy.pop()
            setFlashValue(color)
            sounds[color].play()
    
            if (color === prevColor) {
                if (playerColorsCopy.length > 0) { 
                    setGameState({ ...gameState, playerColors: playerColorsCopy }) 
                } 
                else { 
                    setGameState({...gameState, appTurn: true, playerTurn: false, playerColors: [], playerScore: gameState.appColors.length })
                }
            }    
            else { 
                setGameOver(true)
            }
            await delay(delayTime)
            setFlashValue("")
        }
    }

    return (
        <div className="GameApp">
            <div className="tileContainer">
           {colors.map((colorValue, i) => <ColorTile key={i} color={colorValue} flash= {flashValue === colorValue} cursor={gameState.playerTurn} onClick={() => colorClick(colorValue)}/> )} 
           {!gameState.appTurn && !gameState.playerTurn && 
           <button id="start" onClick={() => {
               setGameOver(false)
               setGameState({...initGame, appTurn:true})}
           }>{gameOver ? "Restart" : "Start"}</button>}
           <button id="Exit" onClick={() => window.location.href='/room.html'}>Exit</button>
            </div>
            <svg id='blue_yellow' width="170" height="1190" viewBox="0 0 170 1190" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="85" width="85" height="85" fill="#DA1D1D"/>
                <rect width="85" height="85" fill="#45963E"/>
                <rect y="85" width="85" height="85" fill="#1D52DA"/>
                <rect y="255" width="85" height="85" fill="#1D52DA"/>
                <rect y="425" width="85" height="85" fill="#1D52DA"/>
                <rect y="595" width="85" height="85" fill="#1D52DA"/>
                <rect y="765" width="85" height="85" fill="#1D52DA"/>
                <rect y="935" width="85" height="85" fill="#1D52DA"/>
                <rect y="1105" width="85" height="85" fill="#1D52DA"/>
                <rect x="85" y="85" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="255" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="425" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="595" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="765" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="935" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="1105" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="170" width="85" height="85" fill="#DA1D1D"/>
                <rect x="85" y="340" width="85" height="85" fill="#DA1D1D"/>
                <rect x="85" y="510" width="85" height="85" fill="#DA1D1D"/>
                <rect x="85" y="680" width="85" height="85" fill="#DA1D1D"/>
                <rect x="85" y="850" width="85" height="85" fill="#DA1D1D"/>
                <rect x="85" y="1020" width="85" height="85" fill="#DA1D1D"/>
                <rect y="170" width="85" height="85" fill="#45963E"/>
                <rect y="340" width="85" height="85" fill="#45963E"/>
                <rect y="510" width="85" height="85" fill="#45963E"/>
                <rect y="680" width="85" height="85" fill="#45963E"/>
                <rect y="850" width="85" height="85" fill="#45963E"/>
                <rect y="1020" width="85" height="85" fill="#45963E"/>
            </svg>
            <svg id='red_green' width="170" height="1190" viewBox="0 0 170 1190" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="85" width="85" height="85" fill="#DA1D1D"/>
                <rect width="85" height="85" fill="#45963E"/>
                <rect y="85" width="85" height="85" fill="#1D52DA"/>
                <rect y="255" width="85" height="85" fill="#1D52DA"/>
                <rect y="425" width="85" height="85" fill="#1D52DA"/>
                <rect y="595" width="85" height="85" fill="#1D52DA"/>
                <rect y="765" width="85" height="85" fill="#1D52DA"/>
                <rect y="935" width="85" height="85" fill="#1D52DA"/>
                <rect y="1105" width="85" height="85" fill="#1D52DA"/>
                <rect x="85" y="85" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="255" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="425" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="595" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="765" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="935" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="1105" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="170" width="85" height="85" fill="#DA1D1D"/>
                <rect x="85" y="340" width="85" height="85" fill="#DA1D1D"/>
                <rect x="85" y="510" width="85" height="85" fill="#DA1D1D"/>
                <rect x="85" y="680" width="85" height="85" fill="#DA1D1D"/>
                <rect x="85" y="850" width="85" height="85" fill="#DA1D1D"/>
                <rect x="85" y="1020" width="85" height="85" fill="#DA1D1D"/>
                <rect y="170" width="85" height="85" fill="#45963E"/>
                <rect y="340" width="85" height="85" fill="#45963E"/>
                <rect y="510" width="85" height="85" fill="#45963E"/>
                <rect y="680" width="85" height="85" fill="#45963E"/>
                <rect y="850" width="85" height="85" fill="#45963E"/>
                <rect y="1020" width="85" height="85" fill="#45963E"/>
            </svg>
           <h1 className="score">Score: {gameState.playerScore}</h1>

           
        </div>
    )
  }
export default GameApp