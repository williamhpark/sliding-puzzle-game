import React from "react";

import "./Tile.css";

const Tile = (props) => {
  if (props.number !== 0) {
    return (
      <button className="tile" onClick={() => props.handleClick(props.number)}>
        <p>{props.number}</p>
      </button>
    );
  } else {
    // If the number is equal to 0, show an empty tile.
    return <button className="tile-hidden"></button>;
  }
};

export default Tile;
