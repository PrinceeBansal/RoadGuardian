const questions = [
    {
        question: "which percentage of road accidents caused due to driver's negligence?",
        answers: [
            {text: "25%", correct: false},
            {text: "50%", correct: false},
            {text: "75%", correct: true},
            {text: "100%", correct: false}
        ]
    },

    {
        question: "while travelling, the motorist must maintain a following distance of how many seconds?",
        answers: [
            {text: "1 seconds", correct: false},
            {text: "2 seconds", correct: false},
            {text: "3 seconds", correct: false},
            {text: "4 seconds", correct: true}
        ]
    },

    {
        question: "Use of hand signal/ indicator to show signs of turning before",
        answers: [
            {text: "5 seconds", correct: true},
            {text: "10 seconds", correct: false},
            {text: "20 seconds", correct: false},
            {text: "30 seconds", correct: false}
        ]
    },

    {
        question: "zebra/ cross walkways of road are the property of",
        answers: [
            {text: "Vehicle drivers", correct: false},
            {text: "pedestrians", correct: true}
            
        ]
    },

    {
        question: "Compulsory signs are exhibited in what shape?",
        answers: [
            {text: "Circular shape", correct: true},
            {text: "Triangular shape", correct: false},
            {text: "Rectangular shape", correct: false},
            {text: "None of the above", correct: false}
        ]
    },

    {
        question: "Defensive driving is",
        answers: [
            {text: "An attitude about driving", correct: true},
            {text: "Not required at all times", correct: false},
            {text: "A way to drive faster", correct: false},
            {text: "Required by law", correct: false}
        ]
    },

    {
        question: "Driving in a trucks blind-spot means",
        answers: [
            {text: "You will get better gas mileage", correct: false},
            {text: "The truck driver cannot see you", correct: true},
            {text: "Others cannot pass you", correct: false},
            {text: "You are in the safe zone", correct: false}
        ]
    },

    {
        question: "who should wear seatbelts in a moving 4-wheeler vehicle?",
        answers: [
            {text: "None", correct: false},
            {text: "driver", correct: false},
            {text: "All the occupants in the vehicle", correct: true},
            {text: "Driver and the passenger in front", correct: false}
        ]
    },

    {
        question: "When should all drivers undergo refresher training?",
        answers: [
            {text: "Once in 3 years", correct: false},
            {text: "Once in 2 years or even earlier as decided by the driver's supervisor", correct: true},
            {text: "No need for refresher training", correct: false},
            {text: "Once in 2 years", correct: false}
        ]
    },

    {
        question: "While driving, if the driver wishes to use mobile he can:",
        answers: [
            {text: "Use mobile on hands-free mode", correct: false},
            {text: "Use headphones", correct: false},
            {text: "Only use text messaging", correct: false},
            {text: "None of the above can be used", correct: true}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQueestion();
}

function showQueestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
};

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQueestion();
    } else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
})

startQuiz();