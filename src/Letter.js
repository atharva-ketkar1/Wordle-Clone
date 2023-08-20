import React from "react";

function Letter({ letter, position, attempt, targetWord, submittedRows }) {
  const checkColor = () => {
    const currentRowSubmitted = submittedRows[attempt];

    if (currentRowSubmitted) {
      if (letter === targetWord[position]) {
        return "correct";
      } else if (targetWord.includes(letter)) {
        return "present";
      } else {
        return "absent";
      }
    }
  };
  return <div className={`Letter-cell ${checkColor()}`}>{letter}</div>;
}

export default Letter;
