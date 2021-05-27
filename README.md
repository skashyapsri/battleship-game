# Battleship Game

## Battleship (also Battleships or Sea Battle) is a strategy type guessing game for two players

Battleship is a 2 player game. Each player has some number of ships of different lengths that they can place on their board. They do not tell their opponent where their ships are. Once both players have placed their ships, they take turns guessing board coordinates to “bomb”. If a ship is fully bombed, it sinks. The player who sinks all their opponent’s ships first wins.

## [Play Game Online](https://dof6zk3ac10cx.cloudfront.net)
The Battleship Game is Deployed on AWS and is served through Cloudfront CDN.

## How to start

1. Install all dependecies:
   `yarn`
2. Start application:
   `yarn start`
3. Open in your browser [http://localhost:3000/](http://localhost:3000/)

## Requirements
![Image of Battleship Game Board](https://upload.wikimedia.org/wikipedia/commons/6/65/Battleship_game_board.svg)

- A standalone mobile or web app.
- A board with coordinate labels similar to the image above.
- Several types of pieces that can be placed horizontally on the board. Each piece can have a configurable image and length. Feel free to use any image here and stretch it to the correct length.
  - Optional: Allow the user to rotate the piece to make it vertical.
- User is able to drag and drop each piece onto the board.
  - Optional: The piece should snap into place.
  - Optional: Snap into place animation.
  - Optional: As the user drags, highlight the spaces on the board that the ship will snap to.
- A board controller to “bomb” on a board coordinate.

## Credits

- Made with [Create React App](https://github.com/facebook/create-react-app).
