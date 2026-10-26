// 1. Store all questions in an array of objects

const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        correctAnswer: 0
    },

    {
        question: "Which language is used to style web pages?",
        options: [
            "Java",
            "Python",
            "CSS",
            "C++"
        ],
        correctAnswer: 2
    },

    {
        question: "Which language makes web pages interactive?",
        options: [
            "HTML",
            "JavaScript",
            "SQL",
            "CSS"
        ],
        correctAnswer: 1
    },

    {
        question: "Which HTML tag is used for the largest heading?",
        options: [
            "<head>",
            "<h6>",
            "<heading>",
            "<h1>"
        ],
        correctAnswer: 3
    },

    {
        question: "Which keyword declares a block-scoped variable that can be reassigned?",
        options: [
            "const",
            "let",
            "static",
            "fixed"
        ],
        correctAnswer: 1
    },

    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: [
            "<!-- -->",
            "#",
            "//",
            "**"
        ],
        correctAnswer: 2
    },

    {
        question: "Which method displays a message in the browser console?",
        options: [
            "console.log()",
            "print()",
            "display()",
            "show()"
        ],
        correctAnswer: 0
    },

    {
        question: "Which method adds an element to the end of an array?",
        options: [
            "shift()",
            "pop()",
            "push()",
            "remove()"
        ],
        correctAnswer: 2
    },

    {
        question: "Which operator checks both value and data type for equality?",
        options: [
            "=",
            "==",
            "===",
            "!="
        ],
        correctAnswer: 2
    },

    {
        question: "Which method selects an element using its ID?",
        options: [
            "document.getElementById()",
            "document.getElementsByClassName()",
            "document.createElement()",
            "document.write()"
        ],
        correctAnswer: 0
    }
];


// 2. Create variables to store quiz state

let currentIndex = 0;
let score = 0;
let selectedAnswer = null;
let userAnswers = [];


// 3. Select HTML elements

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const themeBtn = document.getElementById("themeBtn");

const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");

const questionCounter = document.getElementById("questionCounter");
const scoreDisplay = document.getElementById("scoreDisplay");
const progressBar = document.getElementById("progressBar");

const feedback = document.getElementById("feedback");

const finalScore = document.getElementById("finalScore");
const percentage = document.getElementById("percentage");
const resultMessage = document.getElementById("resultMessage");
const reviewContainer = document.getElementById("reviewContainer");
const bestScoreDisplay = document.getElementById("bestScore");


// 4. Get saved best score

let bestScore = Number(localStorage.getItem("bestScore")) || 0;

bestScoreDisplay.textContent =
    `Best Score: ${bestScore}/${questions.length}`;


// 5. Show a question

function showQuestion() {

    // Get the current question object
    const currentQuestion = questions[currentIndex];

    // Reset selected answer
    selectedAnswer = null;

    // Update question text and counter
    questionText.textContent = currentQuestion.question;

    questionCounter.textContent =
        `Question ${currentIndex + 1} of ${questions.length}`;

    scoreDisplay.textContent = `Score: ${score}`;

    // Update progress bar
    const progress =
        ((currentIndex + 1) / questions.length) * 100;

    progressBar.style.width = `${progress}%`;

    // Clear previous options
    optionsContainer.innerHTML = "";

    // Clear previous feedback
    feedback.textContent = "";

    // Disable Next until an answer is selected
    nextBtn.disabled = true;

    // Change button text on the last question
    if (currentIndex === questions.length - 1) {
        nextBtn.textContent = "Finish Quiz";
    } else {
        nextBtn.textContent = "Next Question";
    }

    // Create option buttons dynamically
    currentQuestion.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.textContent = `${index + 1}. ${option}`;

        button.classList.add("option-btn");

        // Handle the option click
        button.addEventListener("click", () => {
            checkAnswer(index);
        });

        optionsContainer.appendChild(button);

    });

}


// 6. Check the selected answer

function checkAnswer(selectedIndex) {

    // Prevent answering the same question twice
    if (selectedAnswer !== null) {
        return;
    }

    selectedAnswer = selectedIndex;

    const currentQuestion = questions[currentIndex];

    const optionButtons =
        optionsContainer.querySelectorAll(".option-btn");

    const isCorrect =
        selectedIndex === currentQuestion.correctAnswer;

    // Save the user's answer for the review screen
    userAnswers[currentIndex] = selectedIndex;

    // Increase score only if the answer is correct
    if (isCorrect) {
        score++;

        feedback.textContent = "Correct! Great job!";
    } else {
        feedback.textContent =
            "Wrong answer! Check the green option for the correct answer.";
    }

    // Highlight the correct answer
    optionButtons[currentQuestion.correctAnswer]
        .classList.add("correct");

    // Highlight the selected answer in red if it is wrong
    if (!isCorrect) {
        optionButtons[selectedIndex].classList.add("wrong");
    }

    // Disable all options after selection
    optionButtons.forEach((button) => {
        button.disabled = true;
    });

    // Update score
    scoreDisplay.textContent = `Score: ${score}`;

    // Enable the Next button
    nextBtn.disabled = false;

}


// 7. Move to the next question

function nextQuestion() {

    // Do not move forward without answering
    if (selectedAnswer === null) {
        return;
    }

    // If this is the last question, show results
    if (currentIndex === questions.length - 1) {
        showResult();
    } else {

        currentIndex++;

        showQuestion();

    }

}


// 8. Show the final result

function showResult() {

    // Hide the quiz screen
    quizScreen.classList.add("hidden");

    // Show the result screen
    resultScreen.classList.remove("hidden");

    // Calculate percentage
    const resultPercentage =
        Math.round((score / questions.length) * 100);

    // Display score and percentage
    finalScore.textContent =
        `Your Score: ${score}/${questions.length}`;

    percentage.textContent =
        `Percentage: ${resultPercentage}%`;

    // Display a message based on the score
    if (resultPercentage >= 80) {
        resultMessage.textContent = "Excellent! Great job!";
    } else if (resultPercentage >= 50) {
        resultMessage.textContent = "Good effort! Keep practising!";
    } else {
        resultMessage.textContent = "Keep learning! Try again!";
    }

    // Update the best score if necessary
    if (score > bestScore) {

        bestScore = score;

        localStorage.setItem("bestScore", bestScore);

    }

    // Update the best score on the start screen
    bestScoreDisplay.textContent =
        `Best Score: ${bestScore}/${questions.length}`;

    // Show the answer review
    showReview();

}


// 9. Display the answer review

function showReview() {

    // Remove any previous review
    reviewContainer.innerHTML = "";

    // Loop through all questions
    questions.forEach((question, index) => {

        // Create a review item
        const item = document.createElement("div");

        item.classList.add("review-item");

        // Get the user's answer
        const userAnswer = userAnswers[index];

        // Create question text
        const questionHeading = document.createElement("h4");

        questionHeading.textContent =
            `${index + 1}. ${question.question}`;

        // Create user's answer text
        const answerText = document.createElement("p");

        answerText.textContent =
            `Your answer: ${
                userAnswer === undefined
                    ? "Not answered"
                    : question.options[userAnswer]
            }`;

        // Create correct answer text
        const correctText = document.createElement("p");

        correctText.textContent =
            `Correct answer: ${
                question.options[question.correctAnswer]
            }`;

        // Colour-code the review
        if (userAnswer === question.correctAnswer) {
            item.classList.add("correct");
        } else {
            item.classList.add("wrong");
        }

        // Add elements to the review item
        item.appendChild(questionHeading);
        item.appendChild(answerText);
        item.appendChild(correctText);

        // Add the review item to the page
        reviewContainer.appendChild(item);

    });

}


// 10. Start or restart the quiz

function startQuiz() {

    // Reset quiz state
    currentIndex = 0;
    score = 0;
    selectedAnswer = null;

    // Reset previous answers
    userAnswers = [];

    // Show the quiz screen
    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    // Display the first question
    showQuestion();

}


// 11. Dark and Light mode

function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add("dark");

        themeBtn.textContent = "☀️ Light Mode";

    } else {

        document.body.classList.remove("dark");

        themeBtn.textContent = "🌙 Dark Mode";

    }

}


// Load the saved theme when the app opens

const savedTheme = localStorage.getItem("theme") || "light";

applyTheme(savedTheme);


// Switch themes when the button is clicked

themeBtn.addEventListener("click", () => {

    const isDark =
        document.body.classList.contains("dark");

    const newTheme = isDark ? "light" : "dark";

    applyTheme(newTheme);

    // Remember the user's theme choice
    localStorage.setItem("theme", newTheme);

});


// 12. Add event listeners

startBtn.addEventListener("click", startQuiz);

nextBtn.addEventListener("click", nextQuestion);

restartBtn.addEventListener("click", startQuiz);


// Print the questions in the console for testing

console.log("Quiz questions:", questions);