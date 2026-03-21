const choices = document.querySelectorAll(".choice");
const message = document.querySelector('#msg');
const resetBtn = document.querySelector('#reset');

const userScoreBoard = document.querySelector('#user-score')
const compScoreBoard = document.querySelector('#comp-score')
const drawScoreBoard = document.querySelector('#draw')

// Local Storage
let scores = JSON.parse(localStorage.getItem('scores')) || {};

document.addEventListener('DOMContentLoaded', () => {
  updateScoreBoard(userScore, compScore, drawScore);
})

let userScore;
let compScore;
let drawScore;

// Set userScore & compScore to 0
if(scores.user !== undefined &&
   scores.comp !== undefined &&
   scores.draw !== undefined) {
  userScore = scores.user;
  compScore = scores.comp;
  drawScore = scores.draw;
} else {
  userScore = 0, compScore = 0, drawScore = 0;  
}



const updateScoreBoard = (userScore, compScore, drawScore) => {

  userScoreBoard.innerText = userScore;
  compScoreBoard.innerText = compScore;
  drawScoreBoard.innerText = drawScore;

  scores.user = userScore;
  scores.comp = compScore;
  scores.draw = drawScore;

  localStorage.setItem('scores', JSON.stringify(scores))
  
}


// Computer Choice
const genCompChoice = () => {
  const options = ['rock','paper','scissors'];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}


const playGame = (userChoice) => {

  // Generate computer choice
  const compChoice = genCompChoice();

  if(userChoice === compChoice) {
    drawScore++;

    message.innerText = `Your Choice : ${userChoice}; \n Computer Choice : ${compChoice}; \n Hence Game Draw`;
  } else {

    if((userChoice === 'rock' && compChoice === 'paper') ||
     (userChoice === 'paper' && compChoice === 'scissors') ||
     (userChoice === 'scissors' && compChoice === 'rock')) {

      compScore++   // increment Computer Score

      message.innerText = `Your Choice : ${userChoice}; \n Computer Choice : ${compChoice}; \n Hence Computer Wins!`;
      message.style.backgroundColor = '#a9607a';
       
    } else {   
      userScore++;  // increment User score
      
      message.innerText = `Your Choice : ${userChoice}; \n Computer Choice : ${compChoice}; \n Hence You Win!`;
      message.style.backgroundColor = '#155126';
    }

  } 
  // Update on Score Board
  updateScoreBoard(userScore, compScore, drawScore);
  
}

// Game Starting Point

choices.forEach((choice) => {  
  choice.addEventListener("click", () => {
    
    // Reset message
    message.innerText = 'Play your move';
    message.style.backgroundColor = '#fff';

    const userChoice = choice.getAttribute("alt");
    playGame(userChoice);
  })
})

// Reset Scores
resetBtn.addEventListener('click', () => {
  userScore = 0;
  compScore = 0;
  drawScore = 0;
  
  updateScoreBoard(userScore, compScore, drawScore)
  
  message.innerText = 'Play your move';
  message.style.backgroundColor = '#fff';  
})

