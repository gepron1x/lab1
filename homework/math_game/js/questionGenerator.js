function generateQuestion(level, usedQuestions) {
    let questionText, answer;
    let key;

    do {
        if (level === 0) {
            const a = Math.floor(Math.random() * 20) + 1;
            const b = Math.floor(Math.random() * 20) + 1;
            const ops = ['+', '-', '*', '/'];
            const op = ops[Math.floor(Math.random() * ops.length)];

            if (op === '/') {
                const multiplier = Math.floor(Math.random() * 10) + 1;
                const newA = b * multiplier;
                questionText = `${newA} ${op} ${b}`;
                answer = multiplier;
            } else {
                questionText = `${a} ${op} ${b}`;
                if (op === '+') answer = a + b;
                if (op === '-') answer = a - b;
                if (op === '*') answer = a * b;
            }

        } else if (level === 1) {
            if (Math.random() < 0.5) {
                const a = Math.floor(Math.random() * 30) + 1;
                const b = Math.floor(Math.random() * 30) + 1;
                const ops = ['+', '-', '*', '/'];
                const op = ops[Math.floor(Math.random() * ops.length)];

                if (op === '/') {
                    const multiplier = Math.floor(Math.random() * 10) + 1;
                    const newA = b * multiplier;
                    questionText = `${newA} ${op} ${b}`;
                    answer = multiplier;
                } else {
                    questionText = `${a} ${op} ${b}`;
                    if (op === '+') answer = a + b;
                    if (op === '-') answer = a - b;
                    if (op === '*') answer = a * b;
                }
            } else {
                const a = Math.floor(Math.random() * 50);
                const b = Math.floor(Math.random() * 50);
                const ops = ['>', '<', '>=', '<=', '==', '!='];
                const op = ops[Math.floor(Math.random() * ops.length)];
                questionText = `${a} ${op} ${b}`;

                let result;
                if (op === '>') result = a > b;
                else if (op === '<') result = a < b;
                else if (op === '>=') result = a >= b;
                else if (op === '<=') result = a <= b;
                else if (op === '==') result = a === b;
                else result = a !== b;

                answer = result ? 'true' : 'false';
            }

        } else {
            if (Math.random() < 0.6) {
                const x = Math.random() < 0.5;
                const y = Math.random() < 0.5;
                const ops = ['&&', '||'];
                const op = ops[Math.floor(Math.random() * ops.length)];

                if (Math.random() < 0.2) {
                    questionText = `!${x}`;
                    answer = !x ? 'true' : 'false';
                } else {
                    questionText = `${x} ${op} ${y}`;
                    answer = (op === '&&' ? (x && y) : (x || y)) ? 'true' : 'false';
                }
            } else {
                const a = Math.floor(Math.random() * 16);
                const b = Math.floor(Math.random() * 16);
                const ops = ['&', '|', '^', '<<', '>>'];
                const op = ops[Math.floor(Math.random() * ops.length)];

                questionText = `${a.toString(2)} ${op} ${b.toString(2)} (десятичный результат)`;
                if (op === '&') answer = a & b;
                else if (op === '|') answer = a | b;
                else if (op === '^') answer = a ^ b;
                else if (op === '<<') answer = a << (Math.floor(Math.random() * 3) + 1);
                else answer = a >> (Math.floor(Math.random() * 3) + 1);
            }
        }

        key = `${questionText}=${answer}`;
    } while (usedQuestions.has(key));

    usedQuestions.add(key);
    return { question: questionText, answer: answer.toString() };
}