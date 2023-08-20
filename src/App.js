import React, { useState } from "react";
import "./App.css";
import Board from "./Board";
import Keyboard from "./Keyboard";
import words from "./words.json";
import GameOver from "./GameOver";

function App() {
  const numRows = 6;
  const numCols = 5;

  const [guesses, setGuesses] = useState(Array(numRows).fill("").map(() => Array(numCols).fill("")));
  const [currentRow, setCurrentRow] = useState(0);
  const [targetWord, setTargetWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [submittedRows, setSubmittedRows] = useState(Array(numRows).fill(false));
  const [incorrectGuessCount, setIncorrectGuessCount] = useState(0);
  const [gameOver, setGameOver] = useState({ isGameOver: false, isGuessedWord: false });

  const handleLetterClick = (letter) => {
    console.log("Target Word:", targetWord);
    if (currentRow < numRows) {
      const updatedGuesses = [...guesses];
      const focusedGuessIndex = updatedGuesses[currentRow].findIndex((guess) => guess === "");

      if (focusedGuessIndex !== -1) {
        updatedGuesses[currentRow][focusedGuessIndex] = letter;
        setGuesses(updatedGuesses);
      }
    }
  };

  const handleDeleteClick = () => {
    if (currentRow < numRows) {
      const updatedGuesses = [...guesses];
      const focusedGuessIndex = updatedGuesses[currentRow].findIndex((guess) => guess === "");

      if (focusedGuessIndex > 0) {
        updatedGuesses[currentRow][focusedGuessIndex - 1] = "";
        setGuesses(updatedGuesses);
      } else if (focusedGuessIndex === -1) {
        updatedGuesses[currentRow][4] = "";
        setGuesses(updatedGuesses);
      }
    }
  };

  const handleEnterClick = () => {
    if (currentRow < numRows) {
      if (guesses[currentRow].includes("")) {
        window.alert("Not enough letters");
      } else if (!checkValidWord()) {
        window.alert("Not in word list");
      } else if (guesses[currentRow].join("") === targetWord) {
        setSubmittedRows((prevSubmittedRows) => {
          const newSubmittedRows = [...prevSubmittedRows];
          newSubmittedRows[currentRow] = true;
          return newSubmittedRows;
        });
        setGameOver({ isGameOver: true, isGuessedWord: true });
      } else {
        setCurrentRow((prevRow) => prevRow + 1);
        setSubmittedRows((prevSubmittedRows) => {
          const newSubmittedRows = [...prevSubmittedRows];
          newSubmittedRows[currentRow] = true;
          return newSubmittedRows;
        });
        setIncorrectGuessCount((count) => count + 1);
        if (incorrectGuessCount >= 5) {
          setGameOver({ isGameOver: true, isGuessedWord: false });
        }
      }
    }
  };

  const checkValidWord = () => words.includes(guesses[currentRow].join(""));

  const replayHandler = () => {
    const newTargetWord = words[Math.floor(Math.random() * words.length)];
    const newInitialGuesses = Array(numRows).fill("").map(() => Array(numCols).fill(""));

    setGuesses(newInitialGuesses);
    setCurrentRow(0);
    setSubmittedRows(Array(numRows).fill(false));
    setIncorrectGuessCount(0);
    setTargetWord(newTargetWord);
    setGameOver({ isGameOver: false, isGuessedWord: false });
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <Board guesses={guesses} currentRow={currentRow} targetWord={targetWord} submittedRows={submittedRows} />
      <Keyboard onLetterClick={handleLetterClick} onDeleteClick={handleDeleteClick} onEnterClick={handleEnterClick} targetWord={targetWord} checkValidWord={checkValidWord} replayHandler={gameOver.isGameOver} />
      {gameOver.isGameOver && <GameOver replayHandler={replayHandler} guessedWord={gameOver.isGuessedWord} targetWord={targetWord} />}
    </div>
  );
}

export default App;
