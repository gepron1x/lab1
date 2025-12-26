class UI {
    constructor() {
        this.elements = {
            startScreen: document.getElementById('start-screen'),
            gameScreen: document.getElementById('game-screen'),
            resultScreen: document.getElementById('result-screen'),
            level: document.getElementById('level'),
            questionNumber: document.getElementById('question-number'),
            timer: document.getElementById('timer'),
            correct: document.getElementById('correct'),
            wrong: document.getElementById('wrong'),
            question: document.getElementById('question'),
            answer: document.getElementById('answer'),
            feedback: document.getElementById('feedback'),
            resultTitle: document.getElementById('result-title'),
            resultText: document.getElementById('result-text')
        };
    }

    showStart() {
        this.elements.startScreen.classList.remove('hidden');
        this.elements.gameScreen.classList.add('hidden');
        this.elements.resultScreen.classList.add('hidden');
    }

    showGame() {
        this.elements.startScreen.classList.add('hidden');
        this.elements.gameScreen.classList.remove('hidden');
        this.elements.resultScreen.classList.add('hidden');
        this.elements.answer.focus();
    }

    showResult() {
        this.elements.gameScreen.classList.add('hidden');
        this.elements.resultScreen.classList.remove('hidden');
    }


    displayQuestion(text) {
        this.elements.question.textContent = text;
        this.elements.answer.value = '';
        this.elements.feedback.textContent = '';
        this.elements.feedback.className = '';
    }

    showFeedback(message, isCorrect) {
        this.elements.feedback.textContent = message;
        this.elements.feedback.className = isCorrect ? 'correct' : 'wrong';
    }

    showResultMessage(title, text) {
        this.elements.resultTitle.textContent = title;
        this.elements.resultText.textContent = text;
    }
    updateStats(gameState) {
        this.elements.level.textContent = gameState.getCurrentLevelName();
        this.elements.questionNumber.textContent = gameState.currentQuestion;
        this.elements.correct.textContent = gameState.correctAnswers;
        this.elements.wrong.textContent = gameState.wrongAnswers;
    }

    updateTimer(seconds, timeUp = false) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        this.elements.timer.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

        if (seconds <= 30 && seconds > 0) {
            this.elements.timer.classList.add('warning');
        } else {
            this.elements.timer.classList.remove('warning');
        }

        if (timeUp) {
            this.elements.timer.textContent = '0:00';
            this.elements.timer.classList.add('warning');
        }
    }

}