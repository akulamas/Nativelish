const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'In which country is it customary to drink tea at 5 pm?',
        choice1: 'New Zealand',
        choice2: 'Great Britain',
        choice3: 'Australia',
        choice4: 'Canada',
        answer: 2,
    },
    {
        question:
            "What is the pronunciation of such a phonetic feature:  [u] instead of short [^] in cut, much, love?",
        choice1: "Northern pronunciation",
        choice2: "Scottish pronunciation",
        choice3: "Irish pronunciation",
        choice4: "American pronunciation",
        answer: 1,
    },
    {
        question: "Apologise",
        choice1: "American version",
        choice2: "Australian version",
        choice3: "British version",
        choice4: "Canadian version",
        answer: 3,
    },
    {
        question: "Government?",
        choice1: "British translation",
        choice2: "American translation",
        choice3: "Canadian translation",
        choice4: "Australian translation",
        answer: 1,
    },
    {
        question: "What is the pronunciation of such a phonetic feature: palatalized [l] at the end of a word and after a consonant: people, milk?",
        choice1: "Northern pronunciation",
        choice2: "Scottish pronunciation",
        choice3: "Irish pronunciation",
        choice4: "American pronunciation",
        answer: 3,
    },
    {
        question: "Centre",
        choice1: "American version",
        choice2: "Australian version",
        choice3: "British version",
        choice4: "Canadian version",
        answer: 3,
    },
    {
        question: "What is the pronunciation of such a phonetic feature: stunned [hw] in which, where, why?",
        choice1: "Northern pronunciation",
        choice2: "Scottish pronunciation",
        choice3: "Irish pronunciation",
        choice4: "American pronunciation",
        answer: 2,
    },
    {
        question: "Apartment",
        choice1: "British translation",
        choice2: "American translation",
        choice3: "Canadian translation",
        choice4: "Australian translation",
        answer: 2, 
    },
    {
        question: "Baggage",
        choice1: "British version",
        choice2: "Australian version",
        choice3: "American version",
        choice4: "Canadian version",
        answer: 3, 
    },
    
    {
        question: "Honour",
        choice1: "American version",
        choice2: "Australian version",
        choice3: "British version",
        choice4: "Canadian version",
        answer: 3, 
    },
]


const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()


