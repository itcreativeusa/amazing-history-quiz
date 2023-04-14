//Questions & answers array
var questionsArray = [
  {
    question: "Who was the first American to win a Nobel Peace?",
    answers: [
      "Martin Luther King",
      "John Kennedy",
      "Theodore Roosevelt",
      "Elvis Presley",
    ],
    correct: 2,
  },
  {
    question: "Who is the inventor of electric light?",
    answers: [
      "Thomas Edison",
      "Nikola Tesla",
      "Auguste and Louis Lumière",
      "Alexander Bell",
    ],
    correct: 0,
  },
  {
    question:
      "This American engineer is widely regarded as the father of cell phones",
    answers: [
      "Martin Cooper",
      "Eric Tigerstedt",
      "Alexander Graham Bell",
      "W. Rae Young",
    ],
    correct: 2,
  },
  {
    question:
      "Igor Sikorsky, a pioneer in aircraft design, is known for the development of:",
    answers: ["Helicopter", "Seaplane", "Drone", "Flying car"],
    correct: 0,
  },
  {
    question:
      "Developed in the 1990s, this technology enables short-range wireless communication between electronic devices:",
    answers: ["Bluetooth", "Wifi", "Mobile", "PDA"],
    correct: 0,
  },
  {
    question:
      "Which scientist is credited with the invention of the World Wide Web?",
    answers: [
      "Tim Berners-Lee",
      "Steve Jobs",
      "Charles Babbage",
      "Robert Cailliau",
    ],
    correct: 0,
  },
];

//Quiz flow var declaration
var startQuiz = document.querySelector("#start");
var questions = document.querySelector("#questions");
var startScreen = document.querySelector("#start-screen");
var endScreen = document.querySelector("#end-screen");
var questionNumber = 0;
var highscoresEl = document.querySelector("#highscores");
var highscoreCounterSpan = document.querySelector("#highscore-count");
var scoreList = document.querySelector("#score-list");
var submitEl = document.querySelector("#submit");
var initialsEl = document.querySelector("#initials");
var resetGameEl = document.getElementById("reset-game");
var scores = [];
var timerInterval = null;

//Scores var declaration
var scoresEl = document.querySelector(".scores");
var finalScoreEl = document.querySelector("#final-score");
var currentScoreEl = document.querySelector("#current-score");
var currentScore = 0;
var viewHighscoresEl = document.querySelector("#view-highscores");
var lose = document.querySelector("#lose");
var win = document.querySelector("#win");

// Questions & answers var declaration
var questionsEl = document.querySelector("#questions");
var h2El = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
// Create ordered list element
var listEl = document.createElement("ol");
choicesEl.appendChild(listEl);

//Timer start
// Select element by class
var timerEl = document.querySelector(".timer");
// Select element by id
var mainEl = document.getElementById("time");
//Set game time
var secondsLeft = 30;
function setTime() {
  // Sets interval in variable
  timerInterval = setInterval(function () {
    secondsLeft--;
    timerEl.textContent = secondsLeft + " seconds left";
    if (secondsLeft === 0 || secondsLeft < 0) {
      gameOver();
    }
  }, 1000);
}
//Stop timer, show message "game over", open end game section if the game is over
function gameOver() {
  // Stop execution of action at set interval
  clearInterval(timerInterval);
  sendMessage();
  timerEl.textContent = "GAME OVER!";
}

//Scorecounter function
function getScores() {
  //Render score count to page
  currentScoreEl.textContent = currentScore;
}

// Updates score count on screen and sets score count to client storage
function setScores() {
  currentScoreEl.textContent = currentScore;
  localStorage.setItem("currentScore", currentScore);
}
//If user choice is correct do this
function onClickCorrect(event) {
  event.target.setAttribute("style", " color:white; background-color:green;");
  currentScore++;
  setScores();
  nextQuestionWait();
}
//If user choice is incorrect do this
function onClickIncorrect(event) {
  event.target.setAttribute("style", " color:white; background-color:red;");
  secondsLeft = secondsLeft - 5; //substruct 5 sec if answer incorrect
  nextQuestionWait();
}
//Questions & answers
function startQuestion(indexQuestion) {
  var quizTask = questionsArray[indexQuestion];
  h2El.textContent = quizTask.question;
  while (listEl.firstChild) {
    listEl.removeChild(listEl.lastChild);
  }
  for (var i = 0; i < quizTask.answers.length; i++) {
    var li = document.createElement("li");
    listEl.appendChild(li);
    li.textContent = quizTask.answers[i];
    if (i == quizTask.correct) {
      li.addEventListener("click", onClickCorrect);
    } else {
      li.addEventListener("click", onClickIncorrect);
    }
  }
}


//Next question
function nextQuestionSwitch() {
  questionNumber++;
  if (questionNumber < questionsArray.length) {
    startQuestion(questionNumber);
  } else {
    gameOver();
  }
}
//Next question time delay
function nextQuestionWait() {
  setTimeout(() => nextQuestionSwitch(), 1000);
}
//Game starts, timer starts, scorecounter starts
startQuiz.addEventListener("click", function () {
  questions.setAttribute("class", "show");
  questionNumber = 0;
  setTime();
  startQuestion(0);
  //hide start-screen
  startScreen.classList.add("hide");
  setScores();
});

// Function to create text when time is out
function sendMessage() {
  finalScoreEl.textContent = currentScore;
  questions.classList.add("hide");
  questions.classList.remove("show");
  endScreen.setAttribute("class", "show");
  highscoresEl.setAttribute("class", "show");
  highscoresEl.classList.remove("hide");
  winner();
}
//Show winner image if user unsweres all question  or lose image
function winner() {
  if (currentScore === 6) {
    win.setAttribute("class", "show");
    win.classList.remove("hide");
  } else {
    lose.setAttribute("class", "show");
    lose.classList.remove("hide");
  }
}

//Highscores
// The following function renders items in a score list as <li> elements
function renderScores() {
  // Clear score list element and update highscoreCountSpan
  scoreList.innerHTML = "";
  // highscoreCountSpan.textContent = todos.length;

  // Render a new li for each score
  for (var i = 0; i < scores.length; i++) {
    var score = scores[i];

    var li = document.createElement("li");
    li.textContent = score.score + " - " + score.initials;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Remove";

    li.appendChild(button);
    scoreList.appendChild(li);
  }
}

// This function is being called below and will run when the page loads.
function init() {
  // Get stored scores from localStorage
  var storedScores = JSON.parse(localStorage.getItem("scores"));

  // If scores were retrieved from localStorage, update the scores array
  if (storedScores !== null) {
    scores = storedScores;
  }

  // This is a helper function that will render scores to the DOM
  renderScores();
}

function storeScores() {
  // Stringify and set key in localStorage to scores array
  localStorage.setItem("scores", JSON.stringify(scores));
}

// Add submit event when end-screen is visible
submitEl.addEventListener("click", function (event) {
  event.preventDefault();
  var initials = initialsEl.value.trim();

  // Return from function early if submitted initials input is blank
  if (initials === "") {
    return;
  }

  // Add new initials  to initials list array, clear the input
  scores.push({ initials: initials, score: currentScore });
  initialsEl.value = "";

  // Store updated scores in localStorage, re-render the list
  storeScores();
  renderScores();
});

// Add click event to score list element
scoreList.addEventListener("click", function (event) {
  var element = event.target;

  // Checks if element is a button
  if (element.matches("button") === true) {
    // Get its data-index value and remove the scores element from the list
    var index = element.parentElement.getAttribute("data-index");
    scores.splice(index, 1);

    // Store updated scores in localStorage, re-render the list
    storeScores();
    renderScores();
  }
});

// Calls init to retrieve data and render it to the page on load
init();
//View highscores section
viewHighscoresEl.addEventListener("click", function (event) {
  startScreen.classList.add("hide");
  questions.classList.add("hide");
  questions.classList.remove("show");
  highscoresEl.setAttribute("class", "show");
  highscoresEl.classList.remove("hide");
});

//Reload the page - reset game
resetGameEl.addEventListener("click", function (event) {
  location.reload();
});
