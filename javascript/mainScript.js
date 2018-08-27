// holds colors for each game session
let colors = []

// correct answer
let goal = 0;

// get a node list of all game squares
let squares = document.querySelectorAll('.gameSquare');
let message = document.querySelector('#message');
let hint = document.querySelector('#hint');
let headingWrapper = document.querySelector('.wrapper');
let reset = document.querySelector('#newgame');
let easy = document.querySelector('#easy');
let hard = document.querySelector('#hard');
let gameBoard = document.querySelector('.gameBoard');
let gameMode = false;

// start game
setControls();
startGame('hard');

// set board, add a click listener to each square and game logic
function setBoard(){
    squares = document.querySelectorAll('.gameSquare');
    for (var i = 0; i < squares.length; i++) {
        // assign an event listener to each game square
        squares[i].addEventListener('click', function(){

            // get clicked color
            var clickedColor = this.style.backgroundColor;

            if(clickedColor === colors[goal]){
                headingWrapper.style.backgroundColor = colors[goal];
                reset.textContent = 'Play Again';
                message.textContent = 'Correct!';
                correctColor(goal);
            } else {
                message.textContent = 'Try Again';
                this.style.backgroundColor = '#232323';
            }

        });
    }

}

// start game
function startGame(mode){

    // select mode
    if (mode === 'easy') {
        gameBoard.innerHTML = '<div class="gameSquare"></div><div class="gameSquare"></div><div class="gameSquare"></div><div class="gameSquare"></div><div class="gameSquare"></div><div class="gameSquare"></div>';
    } else {
        gameBoard.innerHTML = '<div class="gameSquare"></div><div class="gameSquare"></div><div class="gameSquare"></div><div class="gameSquare"></div><div class="gameSquare"></div><div class="gameSquare"></div><div class="gameSquare"></div><div class="gameSquare"></div><div class="gameSquare"></div>';
    }

    // initialize the board
    setBoard();

    // empty colors array and generate six new colors
    newRandomColors();

    // give each game square a color
    addColors();

    // pick new answer
    goal = newGuess();

    // display the color inside the rgba element
    hint.textContent = colors[goal];

    // reset heading wrapper
    headingWrapper.style.backgroundColor = 'steelblue';

    // reset message
    message.textContent = '';

    // reset reset button msg
    reset.textContent = 'New Colors';

}

// give each game square a color
function addColors(){
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
    }
}

// generate new answer
function newGuess(){
    return Math.floor(Math.random()*squares.length);
}

// generate 6 random colors
function newRandomColors() {

    // reset colors array
    colors = [];

    // populate colors array with 6 new random rbg colors
    for (var i = 0; i < squares.length; i++) {
        rgb = randomColor();
        colors.push(rgb);
    }
}

function randomColor(){

    // generate 3 random integers from 0 - 255
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);

    // create an rgb string
    var rgb = 'rgb(' + r + ', ' + g + ', ' + b + ')';

    return rgb;
}

// change all squares to the correct color
function correctColor(target){
    for (var i = 0; i < squares.length; i++) {
        if (squares[i].style.backgroundColor !== colors[target]) {
            squares[i].style.backgroundColor = colors[target];
        }
    }
}

function setControls(){
    // reset game based on last game mode choice
    reset.addEventListener('click', function(){
        if (gameMode === true) {
            startGame('easy');
        } else {
            startGame('hard');
        }
    });

    // select easy game mode
    easy.addEventListener('click', function(){
        startGame('easy');
        easy.classList.add('selected');
        hard.classList.remove('selected');
        gameMode = true;
    });

    // select hard game mode
    hard.addEventListener('click', function(){
        startGame('hard');
        easy.classList.remove('selected');
        hard.classList.add('selected');
        gameMode = false;
    });
}
