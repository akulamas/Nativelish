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
        question: 'In which country do people have a passion for tattoos?',
        choice1: 'Great Britain',
        choice2: 'New Zealand',
        choice3: 'Australia',
        choice4: 'Canada',
        answer: 2,
    },
    {
        question: "Phonetic feature in New Zealand?",
        choice1: "The short vowel i, (as in kit) is a central vowel close to [ə] or [ɘ]",
        choice2: " eros, such as pronouncing r in all positions of the word river",
        choice3: "eros in here, beer",
        choice4: "special positional longitude rules [a] in bad, bath, ie no distinction between short [ae] and long [a]",
        answer: 1,
    },
    {
        question: "What is the form of shall in New Zealand?",
        choice1: "Narrative",
        choice2: "Only incentive",
        choice3: "Incentive and Interrogative",
        choice4: "Only interrogative",
        answer: 3,
    },
    {
        question: "Phonetic feature in New Zealand?",
        choice1: "The short vowel a /ae/ (as in trap) approaches [E] in quality, which sounds like a short e to most English speakers",
        choice2: "Special positional longitude rules [a] in bad, bath, ie no distinction between short [ae] and long [a]",
        choice3: "[x] in loch (Loch Ness, Loch Lomond)",
        choice4: "[c] is another consonant that resembles the German ich-laut, for example in light",
        answer: 1,
    },
    {
        question: "New Zealand traditional dance?",
        choice1: 'Maka',
        choice2: 'Haka',
        choice3: 'Voka',
        choice4: 'Toka',
        answer: 2,
    },
    {
        question: "The culture of New Zealand arose from the fusion of two cultures",
        choice1: "USA and Canada",
        choice2: "Britain and Canada",
        choice3: 'Maori tribe and Britain',
        choice4: 'Maori tribe and USA',
        answer: 3,
    },
    {
        question: "What number is the word data used in New Zealand?",
        choice1: "Singular",
        choice2: "Singular and Plural",
        choice3: "Plural",
        choice4: 'Not used',
        answer: 3,
    },
    {
        question: "What number of verb is used after the word data?",
        choice1: "Plural",
        choice2: "Singular",
        choice3: 'Singular and Plural',
        choice4: 'Not used',
        answer: 2,
    },
    {
        question: "What is the difference between New Zealand dialect and English?",
        choice1: "Professions",
        choice2: "Household items, representatives of flora and fauna",
        choice3: 'Names of institutions',
        choice4: 'nothing is correct',
        answer: 2, 
    },
    {
        question: "New Zealand greeting",
        choice1: "Tilt head down",
        choice2: "Shake hands",
        choice3: "Touching the tips of the noses",
        choice4: 'Give five',
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


