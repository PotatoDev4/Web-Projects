//rock paper scissors
let score = JSON.parse(localStorage.getItem('score')) || {Wins: 0, Loses: 0, Ties: 0} ;
let gameRunning = true;
let isAutoPlay = false;
let autoPlayId;
let computerMove = '';
let win = '';
let lose = '';
let statusElem = document.querySelector('.js-status');
let pickElem = document.querySelector('.js-pick');
let resultsElem = document.querySelector('.js-results');
let autoPlayElem = document.querySelector('.js-auto-play');
resultsElem.innerHTML = `Wins: ${score.Wins}, Loses: ${score.Loses} and Ties: ${score.Ties}`

function computer() {
    const randomNumber = Math.random();
    if (randomNumber >= 0 && randomNumber <= 1/3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber <= 2/3){
        computerMove = 'paper';
    } else if (randomNumber >= 2/3 && randomNumber <= 1) {
        computerMove = 'scissors';
    }
    return computerMove;
}


function autoPlay() {
    if (!isAutoPlay) { 
        autoPlayId = setInterval(function () {
            let move = computer();
            player(move);}, 
        1000);
        isAutoPlay = true;
        autoPlayElem.innerText = 'Stop auto play';
    } else {
        clearInterval(autoPlayId);
        isAutoPlay = false;
        autoPlayElem.innerText = 'Start auto Play';
    }
}



function player(move) {
    let result = '';
    computer();
    pickElem.innerHTML = `
    Your pick 
    <img class="move-icon" src="images/${move}-emoji.png">
    Computer pick
    <img class="move-icon" src="images/${computerMove}-emoji.png">
    `

    if (move === 'rock') {
        win = 'scissors';
        lose = 'paper';
    } else if (move === 'paper') {
        win = 'rock';
        lose = 'scissors';
    } else if (move === 'scissors') {
        win = 'paper';
        lose = 'rock'
    }

    if (computerMove === lose) {
        result = 'You lose.';
        score.Loses += 1;
    } else if (computerMove === win) {
        result = 'You won.';
        score.Wins += 1;
    } else if (computerMove === move) {
        result = 'Tie.';
        score.Ties += 1;
    }
    
    
    localStorage.setItem('score', JSON.stringify(score));
    
    statusElem.innerHTML = result;
    resultsElem.innerHTML = `Wins: ${score.Wins}, Loses: ${score.Loses} and Ties: ${score.Ties}`;
}


function resetScore() {
    score = {
        Wins: 0,
        Loses: 0,
        Ties: 0
    };
    localStorage.removeItem('score');
    statusElem.innerHTML = 'Scores are resetted.';
    resultsElem.innerHTML = `Wins: ${score.Wins}, Loses: ${score.Loses} and Ties: ${score.Ties}`;
}


function quitGame() {
    const gameElem = document.querySelector('.js-game');

    if (gameRunning) {
        localStorage.removeItem('score');
        gameElem.innerHTML = 'Game is Closed!';
        clearInterval(autoPlayId);
        document.querySelector('.js-quit-game').innerHTML = 'Start game.';
        gameRunning = false;
    } else {
        location.reload();
    }
}


const keyPressData = [];
document.body.addEventListener('keydown', (event) => {   
    keyPressData.push(event.key);
    if (event.key === 'Backspace') {
        resetScore();
    }
    if (event.key === 'a') {
        autoPlay();
    } 
    console.clear();
    console.log(keyPressData);
});