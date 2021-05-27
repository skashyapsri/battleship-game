import React from "react";
import {
  stateToClass,
  generateEmptyLayout,
  putEntityInLayout,
  SQUARE_STATE,
  indexToCoords,
  updateSunkShips,
} from "./layoutHelpers";

export const ComputerBoard = ({
  computerShips,
  gameState,
  hitsByPlayer,
  setHitsByPlayer,
  handleComputerTurn,
  checkIfGameOver,
  setComputerShips,
  playSound,
}) => {
  // Ships on an empty layout
  let compLayout = computerShips.reduce(
    (prevLayout, currentShip) =>
      putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship),
    generateEmptyLayout()
  );

  //  Add hits dealt by player
  compLayout = hitsByPlayer.reduce(
    (prevLayout, currentHit) =>
      putEntityInLayout(prevLayout, currentHit, currentHit.type),
    compLayout
  );

  compLayout = computerShips.reduce(
    (prevLayout, currentShip) =>
      currentShip.sunk
        ? putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship_sunk)
        : prevLayout,
    compLayout
  );

  // Check what's at the square and decide what next
  const fireTorpedo = (index) => {
    if (compLayout[index] === "ship") {
      const newHits = [
        ...hitsByPlayer,
        {
          position: indexToCoords(index),
          type: SQUARE_STATE.hit,
        },
      ];
      setHitsByPlayer(newHits);
      return newHits;
    }
    if (compLayout[index] === "empty") {
      const newHits = [
        ...hitsByPlayer,
        {
          position: indexToCoords(index),
          type: SQUARE_STATE.miss,
        },
      ];
      setHitsByPlayer(newHits);
      return newHits;
    }
  };

  const playerTurn = gameState === "player-turn";
  const playerCanFire = playerTurn && !checkIfGameOver();

  let alreadyHit = (index) =>
    compLayout[index] === "hit" ||
    compLayout[index] === "miss" ||
    compLayout[index] === "ship-sunk";

  let compSquares = compLayout.map((square, index) => {
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
          // Only display square if it's a hit, miss, or sunk ship
          className={
            stateToClass[square] === "hit" ||
            stateToClass[square] === "miss" ||
            stateToClass[square] === "ship-sunk"
              ? `square ${stateToClass[square]}`
              : `square`
          }
          key={`comp-square-${index}`}
          id={`comp-square-${index}`}
          onClick={() => {
            if (playerCanFire && !alreadyHit(index)) {
              const newHits = fireTorpedo(index);
              const shipsWithSunkFlag = updateSunkShips(newHits, computerShips);
              const sunkShipsAfter = shipsWithSunkFlag.filter(
                (ship) => ship.sunk
              ).length;
              const sunkShipsBefore = computerShips.filter(
                (ship) => ship.sunk
              ).length;
              if (sunkShipsAfter > sunkShipsBefore) {
                playSound("sunk");
              }
              setComputerShips(shipsWithSunkFlag);
              handleComputerTurn();
            }
          }}
        />
      </React.Fragment>
    );
  });

  return (
    <div>
      <h2 className="player-title">Computer</h2>
      <div className="board">{compSquares}</div>
    </div>
  );
};
