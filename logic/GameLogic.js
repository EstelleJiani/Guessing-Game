const GameLogic={
  // Generate a number that is a multiple of the last digit of the phone number
  // between 1 and 100(inclusive).
  generateNumber: (phoneNumber) => {
    // Get the last digit of the phone number using modulo 10
    const lastDigit = phoneNumber % 10;
    // Generate the guessing number
    // If the last digit is 0, given a defualt value of 1
    if (lastDigit === 0) {
      return 1;
    }
    // Generate an array of multiples of the last digit between 1 and 100
    const multiples = [];
    for (let i = lastDigit; i <=100; i += lastDigit) {
      multiples.push(i);
    }

    // Randomly select a number from the array
    const randomIndex = Math.floor(Math.random() * multiples.length);
    return multiples[randomIndex];
  },

  // Check if the guess is correct, indicating too high or too low
  checkGuess: (guess, correctNumber) => {
    if (guess === correctNumber) {
      return 'correct';
    } else if (guess > correctNumber) {
      return 'too high';
    } else {
      return 'too low';
    }
  }
};

export default GameLogic;