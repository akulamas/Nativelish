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
        question: 'What are the main thematic groups of use in the Canadian version of English?',
        choice1: 'animals',
        choice2: 'names of state, political and administrative realities (Liberal progressive - a political party in Manitoba)',
        choice3: 'medicine',
        choice4: 'nothing is correct',
        answer: 2,
    },
    {
        question: "Do Canadianisms exist?",
        choice1: "Yes",
        choice2: "No",
        choice3: 'I do not know',
        choice4: 'nothing is correct',
        answer: 1,
    },
    {
        question: "There are also many words borrowed from Native American languages. For example, caribou -",
        choice1: "fish",
        choice2: "horse",
        choice3: "deer",
        choice4: 'dog',
        answer: 3,
    },
    {
        question: "Actually Canadian word formations: fog - eater -?",
        choice1: "rainbow in the dissipating fog",
        choice2: "The one who eats frogs",
        choice3: 'frog',
        choice4: 'nothing is correct',
        answer: 1,
    },
    {
        question: "Cat driver - tractor driver?",
        choice1: 'No',
        choice2: 'Yes',
        choice3: 'I do not know',
        choice4: 'nothing is correct',
        answer: 2,
    },
    {
        question: "The letter z in Canada is called ",
        choice1: "In British [zed]",
        choice2: "American style [zi]",
        choice3: 'Australian [z]',
        choice4: 'nothing is correct',
        answer: 1,
    },
    {
        question: "Prefixes anti-, semi-, multi- pronounced in Canada",
        choice1: "[ia]",
        choice2: "[ai]",
        choice3: "[i]",
        choice4: 'nothing is correct',
        answer: 3,
    },
    {
        question: "The word vase is pronounced in Canada",
        choice1: "[veiz]",
        choice2: "[va:z]",
        choice3: '[veaz]',
        choice4: '[vaze]',
        answer: 2,
    },
    {
        question: "A typical Canadian feature is the lack of distinction between the length and brevity of a vowel",
        choice1: "no",
        choice2: "yes",
        choice3: 'I do not know',
        choice4: 'nothing is correct',
        answer: 2, 
    },
    {
        question: "The only significant difference between Canadian grammar and British grammar is the almost complete exclusion of the Past Perfect Continuous tense from use",
        choice1: "yes",
        choice2: "no",
        choice3: 'I do not know',
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


