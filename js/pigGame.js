'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions

let scores, currentScore, currentPlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  currentPlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchingPlayer = function () {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentScore = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Things to do
// 0: Handling the event to dice button

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1: Create a Rolling dice
    const dice = Math.floor(Math.random() * 6) + 1;

    // 2: displaying the image
    diceEl.classList.remove('hidden');
    diceEl.src = `imgs/dice-${dice}.PNG`;

    // 3: displaying the score and adding the score
    // if it is not 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      // Switch player
      switchingPlayer();
    }
  }
});

// Things to do here

// 4. stop the game

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. hold the score and show it in the window
    scores[currentPlayer] += currentScore;
    document.querySelector(`#score--${currentPlayer}`).textContent =
      scores[currentPlayer];

    // 3. check if the user win
    if (scores[currentPlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
    } else {
      // 2. switch the player
      switchingPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

