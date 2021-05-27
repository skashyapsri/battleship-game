import React from "react";

export const WelcomeScreen = ({ startPlay }) => {
  return (
    <main>
      <h2 className="tip-box-title">Background</h2>
      <p className="player-tip">
        Battleship is a 2 player game. Each player has some number of ships of
        different lengths that they can place on their board. They do not tell
        their opponent where their ships are. Once both players have placed
        their ships, they take turns guessing board coordinates to “bomb”. If a
        ship is fully bombed, it sinks. The player who sinks all their
        opponent’s ships first wins.
      </p>
      <button onClick={startPlay}>Start</button>
    </main>
  );
};
