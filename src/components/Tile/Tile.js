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
    return <button className="tile-hidden"></button>;
  }
};

export default Tile;
