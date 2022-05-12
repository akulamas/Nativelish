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
        question: 'In the diphthong [ei], the first sound is truncated almost to a neutral vowel',
        choice1: 'false',
        choice2: 'true',
        choice3: 'I do not know',
        choice4: 'nothing is correct',
        answer: 2,
    },
    {
        question:
            "We will arrive around about midnight. Is this the right sentence?",
        choice1: "Yes",
        choice2: "No",
        choice3: 'I do not know',
        choice4: 'nothing is correct',
        answer: 1,
    },
    {
        question: "The glide [a] in [ai] is somewhat wider than in the … version.",
        choice1: "american",
        choice2: "canadian",
        choice3: "british",
        choice4: 'nothing is correct',
        answer: 3,
    },
    {
        question: "Does the It is me construction go along with It is I?",
        choice1: "Yes",
        choice2: "No",
        choice3: 'I do not know',
        choice4: 'nothing is correct',
        answer: 1,
    },
    {
        question: "In American English, the vowel [a] is noticeably higher in elevation than in the British version?",
        choice1: 'false',
        choice2: 'true',
        choice3: 'I do not know',
        choice4: 'nothing is correct',
        answer: 2,
    },
    {
        question: "Australian slang has … main sources.",
        choice1: "three",
        choice2: "one",
        choice3: 'four',
        choice4: 'nothing is correct',
        answer: 3,
    },
    {
        question: "The vowel […] is almost indistinguishable in all dialects",
        choice1: "u",
        choice2: "i",
        choice3: "a",
        choice4: 'nothing is correct',
        answer: 3,
    },
    {
        question: "The glide [a] in [ai] is somewhat wider than in the British version",
        choice1: "no",
        choice2: "yes",
        choice3: 'I do not know',
        choice4: 'nothing is correct',
        answer: 2,
    },
    {
        question: "Is it possible to skip an auxiliary verb in perfect tenses?",
        choice1: "no",
        choice2: "yes",
        choice3: 'I do not know',
        choice4: 'nothing is correct',
        answer: 2, 
    },
    {
        question: "Select thematic groups dominated by canadianisms:",
        choice1: "sport",
        choice2: "gymnastics",
        choice3: "Lifestyle/ people/ customs/ sports(names of games, products, etc.",
        choice4: 'nothing is correct',
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


