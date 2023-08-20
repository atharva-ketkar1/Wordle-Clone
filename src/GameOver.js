import React from "react";

function GameOver({ replayHandler, guessedWord, targetWord }) {
  return (
    <div className="overlay">
      <div className="game-over-menu">
        <h2>Game Over</h2>
        <p className="guess-string">{guessedWord ? 'Congratulations, you guessed the word correctly!': `The correct word was: ${targetWord}`}</p>
        <button onClick={replayHandler}>Replay</button>
      </div>
    </div>
  );
}

export default GameOver;
