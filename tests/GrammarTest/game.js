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
        question: 'Karina never minds ................. the movie again.',
        choice1: 'to watch',
        choice2: 'to be watched',
        choice3: 'watch',
        choice4: 'watching',
        answer: 4,
    },
    {
        question:"I have ................. butter, please, buy some.",
        choice1: "little",
        choice2: "few",
        choice3: 'a little',
        choice4: 'a few',
        answer: 1,
    },
    {
        question: "Could you possibly give me ................. ?",
        choice1: "a advice",
        choice2: "an advice",
        choice3: "some advices",
        choice4: 'a piece of advice ',
        answer: 4,
    },
    {
        question: "Find a mistake:",
        choice1: "teach – taught – taught",
        choice2: "catch – caught – caught",
        choice3: 'bring – braught – braught',
        choice4: 'seek – sought – sought',
        answer: 3,
    },
    {
        question: "... arrived when trouble started.",
        choice1: "Had I hardly",
        choice2: "Hardly had I",
        choice3: 'Hardly have I',
        choice4: 'I hardly had',
        answer: 2,
    },
    {
        question: "........ you a ride home yet since he started working in your department?",
        choice1: "Has Sam given",
        choice2: "Does Sam give",
        choice3: 'Is Sam giving',
        choice4: 'Has Sam been giving',
        answer: 1,
    },
    {
        question: "Joan likes taking care of sick animals. She is pleased ......... this kind of work all the time.",
        choice1: "to have done",
        choice2: "to be doing",
        choice3: 'to have been doing',
        choice4: 'to do',
        answer: 3,
    },
    {
        question: "I am sorry Ann can't come to the phone right now because she ......... a shower.",
        choice1: "has been taking",
        choice2: "is taking",
        choice3: 'takes',
        choice4: 'has taken',
        answer: 2,
    },
    {
        question: "I didn't like the book; it rather dull. The film is....... .",
        choice1: "the most interesting",
        choice2: "more interesting",
        choice3: 'as interesting',
        choice4: 'very interesting',
        answer: 2,
    },
    {
        question: "Lisa ......... get bored in her job. Her job is so boring.",
        choice1: "must",
        choice2: "would",
        choice3: 'should',
        choice4: "can't",
        answer: 1,
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


