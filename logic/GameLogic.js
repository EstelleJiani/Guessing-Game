const GameLogic = {
  // Generate a number that is a multiple of the last digit of the phone number
  // between lastDigit and 100(inclusive).
  generateNumber: (lastDigit) => {
    // Generate the guessing number
    // Generate an array of multiples of the last digit between 1 and 100
    const multiples = [];
    // Loop through lastDigit to 100 and add multiples of the last digit to the array
    for (let i = lastDigit; i <=100; i += lastDigit) {
      multiples.push(i);
    }

    // Randomly select a number from the array
    const randomIndex = Math.floor(Math.random() * multiples.length);
    return multiples[randomIndex];
  },

  // Check if the guess is correct, indicating too high or too low
  checkGuess: (guessedNumber, chosenNumber, attempts) => {
    let feedbackMessage = '';
    let correct = false;
    let attemptsLeft = attempts - 1;

    if (guessedNumber === chosenNumber) {
      correct = true;
      feedbackMessage = 'You guessed correct!';
    } else if (guessedNumber > chosenNumber) {
      feedbackMessage = 'You did not guess correct! You should guess lower.';
    } else {
      feedbackMessage =  'You did not guess correct! You should guess higher.';
    }
    return { correct, feedbackMessage, attemptsLeft };
  },
};

export default GameLogic;