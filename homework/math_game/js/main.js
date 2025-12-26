document.addEventListener('DOMContentLoaded', () => {
    const gameState = new GameState();
    const ui = new UI();

    let currentCorrectAnswer = '';

    const startGame = () => {
        gameState.reset();
        ui.showGame();
        ui.updateTimer(180);
        startLevel();
    };

    const startLevel = () => {
        gameState.currentQuestion = 0;
        nextQuestion();
        // ui.updateTimer(remaining, timeUp);
        gameState.startTimer((remaining, timeUp = false) => {
            ui.updateTimer(remaining, timeUp);
            if (timeUp) {
                endLevelDueToTime();
            }
        });
    };

    const nextQuestion = () => {
        if (gameState.currentQuestion >= 10) {
            gameState.stopTimer();
            endLevel();
            return;
        }

        gameState.nextQuestion();
        ui.updateStats(gameState);

        const { question, answer } = generateQuestion(gameState.currentLevel, gameState.usedQuestions);
        ui.displayQuestion(question);
        currentCorrectAnswer = answer.toLowerCase();
    };

    const checkAnswer = () => {
        const userAnswer = ui.elements.answer.value.trim().toLowerCase();
        if (!userAnswer) return;

        if (userAnswer === currentCorrectAnswer) {
            gameState.recordCorrect();
            ui.showFeedback('Правильно!', true);
        } else {
            gameState.recordWrong();
            ui.showFeedback(`Неправильно. Правильно: ${currentCorrectAnswer}`, false);
        }

        ui.updateStats(gameState);
        setTimeout(nextQuestion, 1500);
    };

    const endLevel = () => {
        const percentage = Math.round((gameState.correctAnswers / 10) * 100);

        ui.showResult();

        if (gameState.canAdvance()) {
            gameState.currentLevel++;
            
            ui.showResultMessage('Отлично!', 
                `Вы набрали ${gameState.correctAnswers}/10 (${percentage}%). Время осталось: ${formatTime(gameState.timeLeft)}.\nПереход на уровень "${gameState.getCurrentLevelName()}"!`);
            setTimeout(() => {
                gameState.timeLeft = 180;
                ui.showGame();
                startLevel(); // новый уровень — новый таймер
            }, 2000);
        } else if (gameState.currentLevel === 2 && gameState.isLevelPassed()) {
            ui.showResultMessage('Поздравляем!', 
                `Вы успешно прошли все уровни!\nФинальный счёт: ${gameState.correctAnswers}/10 на последнем уровне.`);
        } else {
            ui.showResultMessage('Уровень не пройден', 
                `Вы дали ${gameState.correctAnswers}/10 правильных (${percentage}%).\nНужно минимум 80% для перехода.`);
        }
    };

    const endLevelDueToTime = () => {
        gameState.stopTimer();
        ui.showResult();
        ui.showResultMessage('Время вышло!', 
            `К сожалению, время на уровень закончилось.\nВы ответили правильно на ${gameState.correctAnswers} из ${gameState.currentQuestion} вопросов.\nПопробуйте снова!`);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    // Обработчики
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('restart-btn').addEventListener('click', startGame);
    document.getElementById('quit-btn').addEventListener('click', () => {
        gameState.stopTimer();
        ui.showStart();
    });
    document.getElementById('submit-btn').addEventListener('click', checkAnswer);
    ui.elements.answer.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkAnswer();
    });

    ui.showStart();
});