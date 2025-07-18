/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/




function generateWinningNumber() {
    return Math.ceil(Math.random() * 100);
}

function shuffle(array) {
    let len = array.length;
    let t, i;

    while (len) {

        i = Math.floor(Math.random() * len--)

        t = array[len];
        array[len] = array[i];
        array[i] = t
    }

    return array;
}

class Game {
    constructor() {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    }

    difference() {
        return Math.abs(this.playersGuess - this.winningNumber)
    }

    isLower() {
        return (this.playersGuess < this.winningNumber);
    }

    playersGuessSubmission(number) {

        number = Number(number);
        if (number < 1 || number > 100 || Number.isNaN(number)) {
            throw 'That is an invalid guess.';

        }
        this.playersGuess = number;
        return this.checkGuess();
    }

    checkGuess() {
        if (this.playersGuess === this.winningNumber) {
            return 'You Win!'
        }

        if (this.pastGuesses.includes(this.playersGuess)) {
            return 'You have already guessed that number.'
        }

        if (this.playersGuess !== this.winningNumber ||
            this.playersGuess in this.pastGuesses
        ) {
            this.pastGuesses.push(this.playersGuess)
            if (this.pastGuesses.length >= 5) {
                return 'You Lose.'
            }
        }

        if (Math.abs(this.playersGuess - this.winningNumber) < 10) {
            return 'You\'re burning up!';
        }

        if (Math.abs(this.playersGuess - this.winningNumber) < 25) {
            return 'You\'re lukewarm.';
        }

        if (Math.abs(this.playersGuess - this.winningNumber) < 50) {
            return 'You\'re a bit chilly.';
        }

        if (Math.abs(this.playersGuess - this.winningNumber) < 100) {
            return 'You\'re ice cold!';
        }
    }

    provideHint() {
        const hintArray = [
            this.winningNumber,
            generateWinningNumber(),
            generateWinningNumber(),
        ];

        return shuffle(hintArray);
    }

}

function newGame() {
    return new Game();
}


let game = new Game();
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const resultDisplay = document.getElementById('result');

submitBtn.addEventListener('click', function() {
    let guess = document.getElementById('value');



    let result = game.playersGuessSubmission(guess.value);
        resultDisplay.textContent = result; 
        
        let showGuess = document.querySelectorAll('.num');
        for(let i = 0; i < game.pastGuesses.length; i++){
            showGuess[i].value = game.pastGuesses[i];
        }
        
        guess.value = ''; 
    

    let hints = document.querySelectorAll('.hint')

    for(let i = 0; i < hints.length; i++){
        for(let hint of game.provideHint()){
            hints[i].value = hint;
        }
    }
});

resetBtn.addEventListener('click', function() {
    game = new Game();
    resultDisplay.innerText = '';

    let showGuess = document.querySelectorAll('.num');

    for(let i = 0; i < showGuess.length; i++){
        showGuess[i].value = '';
    }


    let hints = document.querySelectorAll('.hint')

    for(let i = 0; i < hints.length; i++){
            hints[i].value = '';
        
    }
})

