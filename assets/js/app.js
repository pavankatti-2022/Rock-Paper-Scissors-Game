const choices = document.querySelectorAll(".choice");
const message = document.querySelector('#msg');
const resetBtn = document.querySelector('#reset');

const scoreBoard = {
  user: document.querySelector('#user-score'),
  comp: document.querySelector('#comp-score'),
  draw: document.querySelector('#draw')
}

// Initialize score from Local Storage or defaults
let scores = JSON.parse(localStorage.getItem('scores')) || {user: 0, comp: 0, draw: 0};

// Update Score Board
const updateScoreBoard = () => {
  for(let key in scoreBoard) scoreBoard[key].innerText = scores[key];
  localStorage.setItem('scores', JSON.stringify(scores));
}

// Show Message Function
const showMessage = (msg, color = '#fff') => {
  message.innerText = msg;
  message.style.backgroundColor = color;
}

document.addEventListener('DOMContentLoaded', (e) => {
  updateScoreBoard();
})

// Computer Choice
const genCompChoice = () => {
  const options = ['rock','paper','scissors'];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

// Play Game Function
const playGame = (userChoice) => {

  // Generate computer choice
  const compChoice = genCompChoice();

  if(userChoice === compChoice) {

    scores.draw++;  // Increment draw score
    showMessage(`Both chose ${userChoice}, hence Game Draw.`);
    
  } else {

    // Define Winning Pattern
    const userWins = (userChoice === 'paper' && compChoice === 'rock') ||
                    (userChoice === 'scissors' && compChoice === 'paper') ||
                    (userChoice === 'rock' && compChoice === 'scissors');
    
    if(userWins) {

      scores.user++   // increment User Score      
      showMessage(`You chose ${userChoice}, Computer chose ${compChoice} hence You Win.`, '#155126');
    } else { 

      scores.comp++;  // increment Computer score      
      showMessage(`You chose ${userChoice}, Computer chose ${compChoice} hence Computer Win.`, '#a9607a');
    }
  }
  updateScoreBoard();  // Update on Score Board  
}

// On Reload
window.onload = () => {
  updateScoreBoard()
  showMessage(`Play Your Move.`)
}

// Reset Scores
resetBtn.addEventListener('click', (e) => {

  e.stopPropagation();  // Prevent event Bubbling

  scores.user = scores.comp = scores.draw = 0;
  updateScoreBoard();  
  showMessage(`Play Your Move.`)
})

// Game Starting Point
choices.forEach((choice) => {  
  choice.addEventListener("click", (e) => {

    e.stopPropagation();  // Prevent event Bubbling
    
    showMessage(`Play your move`)   // Reset message
    const userChoice = choice.getAttribute("alt");
    playGame(userChoice);
  })
})