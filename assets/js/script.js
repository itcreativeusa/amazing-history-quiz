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

//start a quiz
var startQuiz = document.querySelector("#start");
var questions = document.querySelector("#questions");
var startScreen = document.querySelector("#start-screen");
var endScreen = document.querySelector("#end-screen");
var looseImgEl = document.querySelector("#looseImg");
var winImgEl = document.querySelector("#winimg");
var questionNumber = 0;

//Scores
var scoresEl = document.querySelector(".scores");
var finalScoreEl = document.querySelector("#final-score");
var currentScoreEl = document.querySelector("#current-score");
var currentScore = 0;

// Quiz questions
var questionsEl = document.querySelector("#questions");
var h2El = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
// Create ordered list element
var listEl = document.createElement("ol");
choicesEl.appendChild(listEl);

//Scorecounter
function getScores() {
  //Render score count to page
  currentScoreEl.textContent = currentScore;
}

// Updates score count on screen and sets score count to client storage
function setScores() {
  currentScoreEl.textContent = currentScore;

  localStorage.setItem("currentScore", currentScore);
}

function onClickCorrect(event) {
  event.target.setAttribute("style", " color:white; background-color:green;");
  currentScore++;
  setScores();
  nextQuestionWait();
}

function onClickIncorrect(event) {
  event.target.setAttribute("style", " color:white; background-color:red;");
  nextQuestionWait();
}

function startQuestion(index) {
  var quizTask = questionsArray[index];
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

function nextQuestionSwitch() {
  questionNumber++;
  if (questionNumber < questionsArray.length) {
    startQuestion(questionNumber);
  } else {
    sendMessage();
  }
}

function nextQuestionWait() {
  setTimeout(() => nextQuestionSwitch(), 1000);
}

startQuiz.addEventListener("click", function () {
  questions.setAttribute("class", "show");
  questionNumber = 0;
  startQuestion(0);
  setTime();
  //hide start-screen
  startScreen.classList.add("hide");
  setScores();
});

//Timer start
// Selects element by class
var timerEl = document.querySelector(".timer");
// Selects element by id
var mainEl = document.getElementById("time");
var secondsLeft = 20;
function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timerEl.textContent = secondsLeft + " seconds left";
    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    }
  }, 1000);
}

// Function to create text when time is out
function sendMessage() {
  timerEl.textContent = "GAME OVER!";
  finalScoreEl.textContent = currentScore;
  questions.classList.add("hide");
  questions.classList.remove("show");
  endScreen.setAttribute("class", "show");
 
}
