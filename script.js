/*Right now the way this works is the quiz only works*/ 

const btnContainer = document.getElementById("btn-container"); 
const nextBtn = document.getElementById("next-btn"); 
const questionContainer = document.getElementById("question-container"); 
const answerContainer = document.getElementById("answer-container"); 
const answerContainerArray = document.querySelectorAll("#answer-container p"); 
console.log(answerContainerArray)

let correctAnswer; 
let currentAnswer; 
let currentQuestion = 0; 
let correctAnswerTally = 0; 
let answerSelected = false; 



const questionsArray = [
    {
        question: "1. Which is the smallest continent in the world?",
        rightAnswer: "Australia",
        wrongAnswer1: "Arctic",
        wrongAnswer2: "Africa",
        wrongAnswer3: "Asia"
    },
    {
        question: "2. Which country has the highest life expectancy?",
        rightAnswer: "Hong Kong",
        wrongAnswer1: "China",
        wrongAnswer2: "Canada",
        wrongAnswer3: "Germany"
    },
    {
        question: "3. What is the most common surname in the United States?",
        rightAnswer: "Smith",
        wrongAnswer1: "John",
        wrongAnswer2: "Bob",
        wrongAnswer3: "Alex"
    },
    {
        question: "4. Aureolin is a shade of what color?",
        rightAnswer: "Yellow",
        wrongAnswer1: "Green",
        wrongAnswer2: "Blue",
        wrongAnswer3: "Orange"
    }, 
    {
        question: "5. How many faces does a Dodecahedron have?", 
        rightAnswer: "12", 
        wrongAnswer1: "13", 
        wrongAnswer2: "14", 
        wrongAnswer3: "11"
    }, 
    {
        question: "6.  What is the 4th letter of the Greek alphabet?", 
        rightAnswer: "Delta", 
        wrongAnswer1: "Alpha", 
        wrongAnswer2: "Beta", 
        wrongAnswer3: "Tango"
    }
]



const getRandomNumber = num => {
    return Math.floor(Math.random() * num); 
}

const displayQuiz = () =>{
    const {question, rightAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3} = questionsArray[currentQuestion];
    questionContainer.innerHTML = `<h1>${question}</h1>`
    correctAnswer = rightAnswer; 
    const answerArray = [rightAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3]; 
    for(let i = 0; i < questionsArray.length; i++){
        const randomAnswer = answerArray.splice(getRandomNumber(answerArray.length), 1);
        console.log(answerContainerArray[i])
        if(i <= 3){
            answerContainerArray[i].innerText = randomAnswer;
        } 
    }
}

displayQuiz()

const hightlightOrUnhighlight = () =>{
    answerContainerArray.forEach((item) => {
        if(item.innerText === correctAnswer){
            item.classList.toggle("correct")
        }
    })
    answerContainer.classList.toggle("highlight"); 
    answerContainer.classList.toggle("no-access"); 
    btnContainer.classList.toggle("hidden");
}

const finishRestartQuiz = () => {
    btnContainer.classList.toggle("hidden");
    answerContainer.classList.toggle("hidden")
    answerContainer.classList.toggle("absolute")
    btnContainer.classList.toggle("more-margin")
    
}

answerContainer.addEventListener("click", e =>{
    if(answerSelected){
        return; 
    }
    if(e.target === answerContainer){
        return; 
    } else if(e.target.innerText === correctAnswer){
        hightlightOrUnhighlight()
        answerSelected = true; 
        correctAnswerTally++
    } else {
        hightlightOrUnhighlight() 
        currentAnswer = e.target; 
        currentAnswer.classList.toggle("incorrect")
        answerSelected = true; 

    }
})

nextBtn.addEventListener("click", ()=>{
    answerSelected = false; 
    hightlightOrUnhighlight()
    if(currentAnswer){
        currentAnswer.classList.toggle("incorrect"); 
        currentAnswer = ""; 
    }
    
    currentQuestion++; 
    if(currentQuestion <= questionsArray.length - 1){
        displayQuiz(); 
    }
    
    if(currentQuestion === questionsArray.length){
        questionContainer.innerHTML = `<h1>You scored ${correctAnswerTally} out of ${questionsArray.length}</h1>`
        nextBtn.innerText = "Retake Quiz"
        finishRestartQuiz(); 
    } else if (currentQuestion === questionsArray.length + 1){
        currentQuestion = 0; 
        correctAnswerTally = 0; 
        hightlightOrUnhighlight();
        finishRestartQuiz();
        displayQuiz(); 
        nextBtn.innerText = "Next";
    }
})