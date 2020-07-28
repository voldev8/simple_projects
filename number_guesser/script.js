let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

const generateTarget = () => {
  return Math.floor(Math.random() * 10);
};

const compareGuesses = (user_guess, computer_guess, secret_target) => {
  return Math.abs(user_guess - secret_target) <=
    Math.abs(computer_guess - secret_target)
    ? true
    : false;
};

const updateScore = (winner) => {
  if (winner == 'human') {
    humanScore++;
  } else if (winner == 'computer') {
    computerScore++;
  }
};

const advanceRound = () => {
  currentRoundNumber++;
};
