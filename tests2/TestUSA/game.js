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
        question: 'In American English, the word duty is read as:',
        choice1: '[`da:ti]',
        choice2: '[`du:ti]',
        choice3: '[`dy:ti]',
        choice4: 'nothing is correct',
        answer: 2,
    },
    {
        question:
            'New Yorkers live in ... , Londoners live in flats',
            choice1: 'apartments',
            choice2: 'flats',
            choice3: 'houses',
            choice4: 'nothing is correct',
        answer: 1,
    },
    {
        question: "penknife:",
        choice1: "british version",
        choice2: "canadian version",
        choice3: "american version",
        choice4: 'nothing is correct',
        answer: 3,
    },
    {
        question: "Americans go on vacation, while Brits go on …?",
        choice1: "holiday",
        choice2: "weekend",
        choice3: 'vocation',
        choice4: 'nothing is correct',
        answer: 1,
    },
    {
    question: "American version-...; British version - dustbin/bin",
        choice1: "bucket",
        choice2: "tub",
        choice3: "garbage can",
        choice4: 'nothing is correct',
    answer: 3,
    },
   
    {
    question: "Which country does not have an official language?",
        choice1: "Canada",
        choice2: "America",
        choice3: "New Zeland",
        choice4: 'nothing is correct',
    answer: 2,
    },
    {
    question: "How to pronounce the word fate?",
        choice1: "[fi:t]",
        choice2: "[fe:t]",
        choice3: "[fe:d]",
        choice4: 'nothing is correct',
    answer: 2,
    },
    {
    question: "suspenders?",
        choice1: "British version",
        choice2: "American version",
        choice3: "New Zeland version",
        choice4: 'nothing is correct',
    answer: 2,
    },
    {
        question: "The sound [ro] after the vowel at the end of the word is pronounced without tongue trembling.",
            choice1: "true",
            choice2: "false",
            choice3: "I do not know",
            choice4: 'nothing is correct',
        answer: 2,
        },
    {
    question: "In American English, the vowel [a] is noticeably higher in elevation than in the British version?",
    choice1: "true",
    choice2: "false",
    choice3: "I do not know",
    choice4: 'nothing is correct',
    answer: 1,
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


