import { useState } from 'react'
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'
import './App.css'

function App() {
  const [gameState, setGameState] = useState('start')
  const [wordsSpelled, setWordsSpelled] = useState(0)

  const startGame = () => {
    setWordsSpelled(0)
    setGameState('playing')
  }

  const handleGameOver = (finalScore) => {
    setWordsSpelled(finalScore)
    setGameState('gameover')
  }

  const restartGame = () => {
    setGameState('start')
  }

  return (
    <div className="game-container">
      {gameState === 'start' && <StartScreen onStart={startGame} />}
      {gameState === 'playing' && <Game onGameOver={handleGameOver} />}
      {gameState === 'gameover' && <GameOver wordsSpelled={wordsSpelled} onRestart={restartGame} />}
    </div>
  )
}

export default App
