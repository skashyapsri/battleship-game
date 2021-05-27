import React from "react";
import {
  SQUARE_STATE,
  stateToClass,
  generateEmptyLayout,
  putEntityInLayout,
  indexToCoords,
  calculateOverhang,
  canBePlaced,
} from "./layoutHelpers";

export const PlayerBoard = ({
  currentlyPlacing,
  setCurrentlyPlacing,
  rotateShip,
  placeShip,
  placedShips,
  hitsByComputer,
  playSound,
}) => {
  // Player ships on empty layout
  let layout = placedShips.reduce(
    (prevLayout, currentShip) =>
      putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship),
    generateEmptyLayout()
  );

  // Hits by computer
  layout = hitsByComputer.reduce(
    (prevLayout, currentHit) =>
      putEntityInLayout(prevLayout, currentHit, currentHit.type),
    layout
  );

  layout = placedShips.reduce(
    (prevLayout, currentShip) =>
      currentShip.sunk
        ? putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship_sunk)
        : prevLayout,
    layout
  );

  const isPlacingOverBoard =
    currentlyPlacing && currentlyPlacing.position != null;
  const canPlaceCurrentShip =
    isPlacingOverBoard && canBePlaced(currentlyPlacing, layout);

  if (isPlacingOverBoard) {
    if (canPlaceCurrentShip) {
      layout = putEntityInLayout(layout, currentlyPlacing, SQUARE_STATE.ship);
    } else {
      let forbiddenShip = {
        ...currentlyPlacing,
        length: currentlyPlacing.length - calculateOverhang(currentlyPlacing),
      };
      layout = putEntityInLayout(layout, forbiddenShip, SQUARE_STATE.forbidden);
    }
  }

  let squares = layout.map((square, index) => {
    return (
      <React.Fragment>
        {/^\d$/.test(index) && (
          <span
            className="coordinate-x"
            style={{ transform: `translate(${40 * index}px,-40px)` }}
          >
            <p style={{ transform: "translateY(50%)" }}>
              {String.fromCharCode(65 + index)}
            </p>
          </span>
        )}
        {index % 10 === 0 && (
          <span
            className="coordinate-y"
            style={{ transform: `translate(-40px,${(40 * index) / 10}px)` }}
          >
            <p style={{ transform: "translateY(50%)" }}>{1 + index / 10}</p>
          </span>
        )}
        <div
          onMouseDown={(e) => {
            if (canPlaceCurrentShip) {
              rotateShip(e);
            }
          }}
          onClick={() => {
            if (canPlaceCurrentShip) {
              playSound("click");
              placeShip(currentlyPlacing);
            }
          }}
          className={`square ${stateToClass[square]}`}
          key={`square-${index}`}
          id={`square-${index}`}
          onMouseOver={() => {
            if (currentlyPlacing) {
              setCurrentlyPlacing({
                ...currentlyPlacing,
                position: indexToCoords(index),
              });
            }
          }}
        />
      </React.Fragment>
    );
  });

  return (
    <div>
      <h2 className="player-title">You</h2>
      <div className="board">{squares}</div>
    </div>
  );
};
