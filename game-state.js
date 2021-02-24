const GameState = {
  New: 'new',
  ComputersTurn: 'computers-turn',
  PlayersTurn: 'players-turn',
  GameOver: 'game-over'
}

let gameStateElement;
let gameRoundElement;
let currentGameState;
let currentGameRound = 0;

export { GameState, currentGameState, setupGameState, setGameState, increaseGameRound, resetGameRound };

function setupGameState(gameStateEl, gameRoundEl) {
  gameStateElement = gameStateEl;
  gameRoundElement = gameRoundEl;
  gameRoundElement.innerText = currentGameRound;
  setGameState(GameState.New);
}

function setGameState(gameState) {
  currentGameState = gameState;

  switch(gameState) {
    case GameState.GameOver:
      gameStateElement.innerText = 'Game Over';
      break;

    case GameState.New:
      gameStateElement.innerText = 'Press play to start!';
      break;

    case GameState.PlayersTurn:
      gameStateElement.innerText = 'Your turn';
      break;

    case GameState.ComputersTurn:
      gameStateElement.innerText = 'Computers Turn';
      break;
  }
}

function increaseGameRound() {
  currentGameRound++;
  gameRoundElement.innerText = currentGameRound;
}

function resetGameRound() {
  currentGameRound = 0;
  gameRoundElement.innerText = currentGameRound;
}