import React, { useState, useEffect } from "react";

function Keyboard({ onLetterClick, onDeleteClick, onEnterClick, targetWord, checkValidWord, replayHandler }) {
  const [clickedLetters, setClickedLetters] = useState([]);
  const [letterBackgrounds, setLetterBackgrounds] = useState({});
  const [isReplay, setIsReplay] = useState(false);

  useEffect(() => {
    if (replayHandler) {
      setLetterBackgrounds({});
      setIsReplay(true);
    } else {
      setIsReplay(false);
    }
  }, [replayHandler]);

  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Del", "z", "x", "c", "v", "b", "n", "m", "Enter"],
  ];

  const giveColor = (input) => {
    if (checkValidWord()) {
      const backgrounds = { ...letterBackgrounds };
      for (let i = 0; i < input.length; i++) {
        const inputLetter = input[i];
        const targetLetter = targetWord[i];
  
        if (inputLetter === targetLetter) {
          backgrounds[inputLetter] = "green";
        } else if (targetWord.includes(inputLetter) && backgrounds[inputLetter] !== "green") {
          backgrounds[inputLetter] = "goldenrod";
        } else if (!backgrounds[inputLetter]) {
          backgrounds[inputLetter] = "gray";
        }
      }
      setLetterBackgrounds(backgrounds);
    }
  };

  const handleButtonClick = (buttonText) => {
    if (buttonText === "Del") {
      onDeleteClick();
    } else if (buttonText === "Enter") {
      giveColor(clickedLetters.slice(-5).join(""));
      onEnterClick();
    } else {
      const updatedClickedLetters = [...clickedLetters, buttonText];
      setClickedLetters(updatedClickedLetters);
      onLetterClick(buttonText);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (!isReplay) {
        giveColor(clickedLetters.slice(-5).join(""));
      }
      onEnterClick();
    } else if (event.key === "Backspace") {
      onDeleteClick();
    } else if (event.key.length === 1 && /^[a-z]$/.test(event.key)) {
      const updatedClickedLetters = [...clickedLetters, event.key];
      setClickedLetters(updatedClickedLetters);
      onLetterClick(event.key);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, );

  return (
    <div id="keyboard-cont">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((letter, columnIndex) => (
            <button
              key={columnIndex}
              className="keyboard-button"
              onClick={() => handleButtonClick(letter)}
              style={{
                backgroundColor: letterBackgrounds[letter]
              }}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;