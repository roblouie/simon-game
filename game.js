import { GamePiece } from "./game-piece.js";
import { currentGameState, GameState, increaseGameRound, resetGameRound, setGameState } from "./game-state.js";

const pieces = [];
let sequence = [];
let matchingSequenceIndex = 0;

export { setupGame };

function setupGame(gamePieceElements, gameStartButtonElement) {
  gamePieceElements.forEach(pieceElement => {
    pieces.push(new GamePiece(pieceElement));
  });

  gameStartButtonElement.addEventListener('click', startGame);
  pieces.forEach(piece => piece.onPress(piecePressHandler));
}

function startGame() {
  resetGameRound();
  gameLoop();
}

async function gameLoop() {
  increaseGameRound();

  setGameState(GameState.ComputersTurn);
  sequence.push(getRandomGamePiece());
  await playComputerSequence();

  setGameState(GameState.PlayersTurn);
  matchingSequenceIndex = 0;
  startNewTimeLimit();
}

async function piecePressHandler(pieceColor) {
  if (currentGameState !== GameState.PlayersTurn) {
    return;
  }

  if (pieceColor === sequence[matchingSequenceIndex].color) {
    matchingSequenceIndex++;
    startNewTimeLimit();
    if (matchingSequenceIndex === sequence.length) {
      clearTimeLimit();
      await waitFor(400);
      gameLoop();
    }
  } else {
    gameOver();
  }
}

function getRandomGamePiece() {
  const pieceIndex = Math.floor(Math.random() * pieces.length);
  return pieces[pieceIndex];
}

async function playComputerSequence() {
  for (const piece of sequence) {
    piece.press();
    await waitFor(300);
    piece.release();
  }
}

function waitFor(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

let timeoutId;

function startNewTimeLimit() {
  clearTimeLimit();
  timeoutId = setTimeout(() => {
    gameOver();
  }, 1000);
}

function clearTimeLimit() {
  clearTimeout(timeoutId);
}

function gameOver() {
  clearTimeLimit();
  sequence = [];
  matchingSequenceIndex = 0;
  setGameState(GameState.GameOver);
}