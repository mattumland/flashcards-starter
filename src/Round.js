const Turn = require('../src/Turn');

class Round {
  constructor(deck) {
    this.deck = deck.cards;
    this.turns = 0;
    this.incorrectGuesses = [];
  }

  returnCurrentCard() {
    return this.deck[this.turns];
  }

  takeTurn(guess) {
    const currentTurn = new Turn(guess, this.returnCurrentCard());

    if (!currentTurn.evaluateGuess()) {
      this.incorrectGuesses.push(currentTurn.currentCard.id);
      }

    this.turns++;
    return currentTurn.giveFeedback();
  }

  calculatePercentCorrect() {
    const correctCount = (this.deck.length - this.incorrectGuesses.length)
    const rawPercent = correctCount / this.turns;
    return Math.round(rawPercent * 100);
  }

  endRound() {
    console.log(`** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`);
  }

}

module.exports = Round;
