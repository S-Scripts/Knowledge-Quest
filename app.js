const questions= [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyperlink and Text Markup Language", correct: false },
            { text: "Hypertext Management Language", correct: false }
        ]
    },
    {
        question: "Which of the following is a JavaScript framework?",
        answers: [
            { text: "Django", correct: false },
            { text: "Angular", correct: true },
            { text: "Ruby on Rails", correct: false },
            { text: "Laravel", correct: false }
        ]
    },
    {
        question: "What is the role of the browser in web development?",
        answers: [
            { text: "To create web applications", correct: false },
            { text: "To interpret and display HTML, CSS, and JavaScript", correct: true },
            { text: "To manage databases", correct: false },
            { text: "To host web servers", correct: false }
        ]
    },
    {
        question: "What is the primary function of middleware in a Node.js application?",
        answers: [
            { text: "To manage databases", correct: false },
            { text: "To handle HTTP requests and responses", correct: true },
            { text: "To serve static files", correct: false },
            { text: "To log application errors", correct: false }
        ]
    },
    {
        question: "Which of the following is a disadvantage of using a monolithic architecture?",
        answers: [
            { text: "Easy deployment", correct: false },
            { text: "Scalability challenges", correct: true },
            { text: "Improved performance", correct: false },
            { text:  "Simplified debugging", correct: false }
        ]
    },
    {
        question: "Which of the following is NOT a type of SQL join?",
        answers: [
            { text: "INNER JOIN", correct: false },
            { text: "OUTER JOIN", correct: false },
            { text: "CROSS JOIN", correct: false },
            { text: "DIRECT JOIN", correct: true }
        ]
    },
    {
        question: "In RESTful API design, what HTTP status code indicates that a resource was successfully created?",
        answers: [
            { text: 200 , correct: false },
            { text: 201 , correct: true },
            { text: 204 , correct: false },
            { text: 400 , correct: false }
        ]
    },
    {
        question: "What does the 'key' prop do in React?",
        answers: [
            { text: "It identifies the component's state", correct: false},
            { text: "It uniquely identifies elements in a list to optimize rendering", correct: true },
            { text: "It defines the component's style", correct: false },
            { text: "It handles events for components", correct: false }
        ]
    },
    {
        question: "In React, what is the purpose of the 'context' API?",
        answers: [
            { text: "To manage state across multiple components", correct: true },
            { text: "To perform side effects in components", correct: false },
            { text: "To optimize performance during rendering", correct: false },
            { text: "To handle API calls", correct: false }
        ]
    },
    {
        question: "What is a common way to optimize performance in a large React application?",
        answers: [
            { text: "Using synchronous state updates", correct: false },
            { text: "Implementing code splitting with React.lazy", correct: true },
            { text: "Avoiding functional components", correct: false},
            { text: "Using inline styles for all components", correct: false}
        ]
    }

];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
let currentQuestionIndex, score;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button'); 
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`; 
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

// Start the quiz when the page loads
startQuiz();
