// Управление состоянием игры

class GameState {
    constructor() {
        this.levels = ['Начальный', 'Средний', 'Продвинутый'];
        this.reset();
    }

    reset() {
        this.currentLevel = 0;
        this.currentQuestion = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.usedQuestions = new Set();
        this.timeLeft = 180; // 3 минуты в секундах
        this.timerInterval = null;
    }

    nextQuestion() {
        this.currentQuestion++;
    }

    recordCorrect() {
        this.correctAnswers++;
    }

    recordWrong() {
        this.wrongAnswers++;
    }

    decreaseTime() {
        this.timeLeft--;
        return this.timeLeft;
    }

    isTimeUp() {
        return this.timeLeft <= 0;
    }

    isLevelPassed() {
        return (this.correctAnswers / 10) >= 0.8;
    }

    canAdvance() {
        return this.isLevelPassed() && this.currentLevel < 2;
    }

    isGameCompleted() {
        return this.currentLevel === 2 && this.currentQuestion >= 10;
    }

    getCurrentLevelName() {
        return this.levels[this.currentLevel];
    }

    startTimer(callback) {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            const remaining = this.decreaseTime();
            callback(remaining);
            if (this.isTimeUp()) {
                clearInterval(this.timerInterval);
                callback(0, true); // true = время вышло
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
}