
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let correct = 0;
let incorrect = 0;

// Manually created question bank - future implement quiz upon new game to create question bank
let questionBank = [
    {
        question: "What is your friend's favorite color?",
        choice1: "Green",
        choice2: "Red",
        choice3: "Orange",
        choice4: "Purple",
        answer: 2
    },
    {
        question: "What are two of your friend's favorite foods?",
        choice1: "Wings and oranges",
        choice2: "Ice cream and crackers",
        choice3: "Lasagna and chicken parm",
        choice4: "Pretzels and twix",
        answer: 3
    },
    {
        question: "What is your friend's favorite sport?",
        choice1: "Basketball",
        choice2: "Soccer",
        choice3: "Football",
        choice4: "Baseball",
        answer: 1
    },
    {
        question: "What is your friend's favorite movie?",
        choice1: "Blow",
        choice2: "Catch Me If You Can",
        choice3: "Remember the Titans",
        choice4: "Coach Carter",
        answer: 1
    }
]

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

// Start
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questionBank];
    getNewQuestion();
}

// If there are any new questions or questions asked is less than max questions, show new question
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        alert(`Game over! You got ${correct} right!`)
    }

    questionCounter++;
    const questionIdx = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIdx];
    question.innerText = currentQuestion.question;
    
    // iterating thru buttons to add innertext choices from selected question
    choices.forEach((choice, i) => { 
        i++;
        choice.id = i;
        choice.innerText = currentQuestion["choice"+i];
    });
    
    availableQuestions.splice(questionIdx, 1);
    acceptingAnswers = true;
};

// If correct answer was clicked, add correct class to show styling, else add incorrect class for styling
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.id;
    
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        document.getElementById(selectedAnswer).classList.add(classToApply);

        // increment score if correct 
        classToApply == "correct" ? correct++ : incorrect++; 
    
        // set timeout to show css then go to next question
        setTimeout(() => {
            document.getElementById(selectedAnswer).classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

startGame();