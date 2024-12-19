// Quiz questions and answers
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2,
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correct: 1,
  },
  {
    question: "What is the color of the sky?",
    options: ["Green", "Blue", "Red", "Yellow"],
    correct: 1,
  },
  {
    question: "Which is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: 2,
  },
];

let currentQuestion = 0;
let timeLeft = 15;
let score = 0; // Initialize score
let startTime; // Start time store karne ke liye
let timer;

// HTML Elements
const timerElement = document.getElementById("time");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const messageElement = document.getElementById("message");
const scoreElement = document.getElementById("score"); // To show score

// Start the quiz
function startQuiz() {
  startTime = Date.now(); // Quiz start hone par time save karna
  loadQuestion();
}

// Load a question
function loadQuestion() {
  if (currentQuestion >= quizData.length) {
    endQuiz();
    return;
  }

  const quiz = quizData[currentQuestion];
  questionElement.textContent = quiz.question;
  optionsElement.innerHTML = ""; // Clear previous options
  messageElement.textContent = ""; // Clear previous message

  quiz.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(index);
    optionsElement.appendChild(button);
  });

  timeLeft = 15;
  timerElement.textContent = timeLeft;
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

// Timer countdown
function updateTimer() {
  timeLeft--;
  timerElement.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timer);
    messageElement.textContent = "Time's up! Moving to next question.";
    disableOptions();
    setTimeout(nextQuestion, 2000);
  }
}

// Check the selected answer
function checkAnswer(selected) {
  clearInterval(timer);
  const quiz = quizData[currentQuestion];
  if (selected === quiz.correct) {
    score++; // Increment score for correct answer
    messageElement.textContent = "Correct! 🎉";
  } else {
    messageElement.textContent = `Wrong! The correct answer is ${quiz.options[quiz.correct]}.`;
  }
  disableOptions();
  setTimeout(nextQuestion, 2000);
}

// Disable all answer buttons
function disableOptions() {
  const buttons = optionsElement.querySelectorAll("button");
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

// Move to the next question
function nextQuestion() {
  currentQuestion++;
  loadQuestion();
}

// End the quiz
function endQuiz() {
  clearInterval(timer);
  const endTime = Date.now();
  const totalTime = Math.floor((endTime - startTime) / 1000); // Total time in seconds

  questionElement.textContent = "Quiz Completed!";
  optionsElement.innerHTML = "";
  messageElement.textContent = `Thank you for playing! You completed the quiz in ${totalTime} seconds.`;
  scoreElement.textContent = `Your Score: ${score} out of ${quizData.length}`;
  timerElement.textContent = "0"; // Reset timer display
}

// Start the quiz
startQuiz();
