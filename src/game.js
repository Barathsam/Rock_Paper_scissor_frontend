import { useEffect, useState } from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import Axios from 'axios';
import './App.css'

function Game(){
  const location = useLocation()
  const [userChoice, setUserChoice] = useState('rock')
  const [computerChoice, setComputerChoice] = useState('rock')
  const [userPoints, setUserPoints] = useState(0)
  const [computerPoints, setComputerPoints] = useState(0)
  const [result, setResult] = useState('Let\'s see who wins')
  const [turnResult, setTurnResult] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  const choices = ['rock', 'paper', 'scissors']

  const handleClick = (value) => {
    setUserChoice(value)    
    generateComputerChoice()
  }
// const api_url="https://rock-paper-scissor-89z8.onrender.com/users"
const api_url="http://localhost:3000/"

let navigation = useNavigate();
let logout = ()=> navigation("/");

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)]
    setComputerChoice(randomChoice)
  }

  const reset = () => {
    window.location.reload()
  }
  async function computerwins(){
    await Axios.post(api_url,{name:location.state.name,status:"Computer Wins"})
  }
   async function userwins(){
    await Axios.post(api_url,{name:location.state.name,status:"User Wins"})
  }

  useEffect( () => {
    const comboMoves = userChoice + computerChoice
      if (comboMoves === 'scissorspaper' || comboMoves === 'rockscissors' || comboMoves === 'paperrock') {
        // userPoints.current += 1
        const updatedUserPoints = userPoints + 1
        setUserPoints(updatedUserPoints)
        setTurnResult('User gets the point!')
        if (updatedUserPoints === 6){
          setResult('User Wins')
          userwins();
          const gameOff = true
          setGameOver(gameOff)
        }
      }

      if (comboMoves === 'paperscissors' || comboMoves === 'scissorsrock' || comboMoves === 'rockpaper') {
        // computerPoints.current += 1
        const updatedComputerPoints = computerPoints + 1
        setComputerPoints(updatedComputerPoints)
        setTurnResult('Computer gets the point!')
        if (updatedComputerPoints === 6) {
          setResult('Computer Wins')
           computerwins();
          const gameOff = true
          setGameOver(gameOff)
        }
      }

      if (comboMoves === 'paperpaper' || comboMoves === 'rockrock' || comboMoves === 'scissorsscissors') {
        if(computerPoints != 0 || userPoints != 0 )
        {
          const updatedComputerPoints = computerPoints + 1
          const updatedUserPoints = userPoints + 1
          setComputerPoints(updatedComputerPoints)
          setUserPoints(updatedUserPoints)
          setTurnResult('Tie')
          if (updatedComputerPoints === 6 ) {
          setResult('Computer Wins')
           computerwins();
          const gameOff = true
          setGameOver(gameOff)
        }else if (updatedUserPoints === 6){
            setResult('User Wins')
            userwins();
            const gameOff = true
            setGameOver(gameOff)
          }
        }
      }
    
  }, [computerChoice, userChoice])

  return (
    <div className="App">
      <h1 className='heading'>Rock-Paper-Scissors</h1>
      <h2 className='heading'>Welcome {location.state.name}</h2>
      <div className='score'>
        <h1>User Points: {userPoints}</h1>
        <h1>Computer Points: {computerPoints}</h1>
      </div>

      <div className='choice'>
        <div className='choice-user'>
          <img className='user-hand' src={`../images/${userChoice}.png`} alt=''></img>
        </div>
        <div className='choice-computer'>
          <img className='computer-hand' src={`../images/${computerChoice}.png`} alt=''></img>
        </div>
      </div>
      
      <div className='button-div'>
        {choices.map((choice, index) =>
          <button className='button' key={index} onClick={() => handleClick(choice)} disabled={gameOver}>
            {choice} 
          </button>
        )}
      </div>
      
      <div className='result'>
        <h1>Turn Result: {turnResult}</h1>
        <h1>Final Result: {result}</h1>
      </div>
      
      <div className='button-div'>
        {gameOver && 
          <button className='button' onClick={() => reset()}>Restart Game?</button>
        }
        <button className='button' onClick={logout}>LogOut</button>
      </div>
      
    </div>
    
  )
}

export default Game;
