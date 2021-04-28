import React, { useState, useEffect } from "react";

import "./Puzzle.css";
import Tile from "../Tile/Tile";

// The array corresponding to a solved puzzle.
const SOLVED_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 0];

const Puzzle = () => {
  const [tileOrder, setTileOrder] = useState([]);
  const [solved, setSolved] = useState(false);

  // Tile order shuffled in-place using the Fisher-Yates shuffle algorithm.
  const randomizeOrder = () => {
    let array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    setTileOrder(array);
  };

  const swapTiles = (idx1, idx2) => {
    let array = [...tileOrder];
    let temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp;
    setTileOrder(array);
  };

  const handleClick = (number) => {
    // If the empty tile is 1 index or 3 indices away from the clicked tile,
    // swap the positions of the clicked tile and empty tile.
    let i = tileOrder.findIndex((tile) => tile === number);
    if (i !== -1) {
      if (tileOrder[i - 1] === 0) {
        swapTiles(i, i - 1);
      } else if (tileOrder[i + 1] === 0) {
        swapTiles(i, i + 1);
      } else if (tileOrder[i - 3] === 0) {
        swapTiles(i, i - 3);
      } else if (tileOrder[i + 3] === 0) {
        swapTiles(i, i + 3);
      }
    }
  };

  const renderTiles = () => {
    return tileOrder.map((tile) => {
      return <Tile key={tile} number={tile} handleClick={handleClick} />;
    });
  };

  const checkSolved = () => {
    for (let i = 0; i < tileOrder.length; ++i) {
      if (tileOrder[i] !== SOLVED_ARRAY[i]) {
        return false;
      }
    }
    return true;
  };

  const solvePuzzle = () => {
    setTileOrder(SOLVED_ARRAY);
  };

  // Randomize the tiles when application is first run.
  useEffect(() => {
    randomizeOrder();
  }, []);

  useEffect(() => {
    if (checkSolved()) {
      setSolved(true);
    } else {
      setSolved(false);
    }
  }, [tileOrder]);

  return (
    <div className="puzzle-container">
      {solved ? <h2 className="solved-message">You solved it!</h2> : null}
      <div className="grid-container">{renderTiles()}</div>
      <div className="button-container">
        <button onClick={randomizeOrder}>Randomize</button>
        <button onClick={solvePuzzle}>Solve</button>
      </div>
    </div>
  );
};

export default Puzzle;
