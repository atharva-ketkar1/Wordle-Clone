import React from "react";
import Letter from "./Letter";

function Board({ guesses, targetWord, submittedRows }) {
  const numRows = 6;
  const numCols = 5;

  const renderRow = (rowIndex) => (
    <div key={rowIndex} className="row">
      {Array.from({ length: numCols }, (_, colIndex) => (
        <Letter
          key={colIndex}
          position={colIndex}
          attempt={rowIndex}
          letter={guesses[rowIndex][colIndex]}
          targetWord={targetWord}
          submittedRows={submittedRows}
        />
      ))}
    </div>
  );

  return (
    <div className="Board">
      {Array.from({ length: numRows }, (_, rowIndex) => renderRow(rowIndex))}
    </div>
  );
}

export default Board;