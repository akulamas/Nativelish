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
        question: 'The people of which country consider brevity to be the main quality?',
        choice1: 'New Zealand',
        choice2: 'Ausrtalia',
        choice3: 'Great Britain',
        choice4: 'Canada',
        answer: 2,
    },
    {
        question:"In New Zealand, <data> is only used",
        choice1: "in plural",
        choice2: "in the singular",
        choice3: 'in plural and singular',
        choice4: 'plural but with singular verbs',
        answer: 4,
    },
    {
        question: "In which country is palatalized [l] at the end of a word and after a consonant: people, milk?",
        choice1: "New Zealand",
        choice2: "Ausrtalia",
        choice3: "Great Britain",
        choice4: 'Canada',
        answer: 3,
    },
    {
        question: "Translate <runholder>",
        choice1: "бегун",
        choice2: "держатель",
        choice3: 'владелец фирмы',
        choice4: 'сотрудник',
        answer: 3,
    },
    {
        question: "What word replaces <should> almost everywhere in New Zealand?",
        choice1: "can",
        choice2: "would",
        choice3: 'must',
        choice4: 'ought',
        answer: 2,
    },
    {
        question: "Which dialect of English is characterized by using of <ground floor> instead of <1st floor>?",
        choice1: "British",
        choice2: "American",
        choice3: 'Australian',
        choice4: 'Canadian',
        answer: 1,
    },
    {
        question: "The culture of which country is the result of the mixture of two cultures - the Maori tribes and the British?",
        choice1: "Great Britain",
        choice2: "Australia",
        choice3: 'New Zealand',
        choice4: 'Canada',
        answer: 3,
    },
    {
        question: "How to pronounce <vase> in Canadian dialect?",
        choice1: "[vaiz]",
        choice2: "[va:s] ",
        choice3: '[veiz]',
        choice4: '[ve:s]',
        answer: 2,
    },
    {
        question: "Translate <try-hard person>",
        choice1: "Амбициозный, целеустремленный человек",
        choice2: "Трудолюбивый человек",
        choice3: 'Креативный человек',
        choice4: 'Человек, пытающийся что-то сделать',
        answer: 1,
    },
    {
        question: "What sound is not pronounced at the end of a word in the Austrian dialect?",
        choice1: "[r]",
        choice2: "[t] ",
        choice3: '[n]',
        choice4: '[p]',
        answer: 2,
    }
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


