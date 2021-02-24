import { setupGame } from './game.js';
import { setupGameState } from './game-state.js';

setupGame(document.querySelectorAll('.game-piece'), document.querySelector('.play-button'));
setupGameState(document.querySelector('.game-state'), document.querySelector('.game-round'));