const readline = require('readline');

// Definindo perguntas e respostas
const originalQuestions = [
    {
        question: "Qual é o maior planeta do sistema solar?",
        options: ["Terra", "Júpiter", "Vênus"],
        correctAnswer: "Júpiter"
    },
    {
        question: "Quem foi o primeiro presidente do Brasil?",
        options: ["Getúlio Vargas", "Juscelino Kubitschek", "Marechal Deodoro da Fonseca"],
        correctAnswer: "Marechal Deodoro da Fonseca"
    },
    {
        question: "Qual é a capital da Austrália?",
        options: ["Sydney", "Melbourne", "Camberra"],
        correctAnswer: "Camberra"
    },
    {
        question: "Quem escreveu Dom Quixote?",
        options: ["Miguel de Cervantes", "William Shakespeare", "Fyodor Dostoevsky"],
        correctAnswer: "Miguel de Cervantes"
    },
    {
        question: "Qual é o símbolo químico do ouro?",
        options: ["O", "Au", "Ag"],
        correctAnswer: "Au"
    },
    {
        question: "Quem pintou a Mona Lisa?",
        options: ["Vincint van Gogh", "Leonardo da Vince", "Pablo Picasso"],
        correctAnswer: "Camberra"
    },
    {
        question: "Qual é a capital da França?",
        options: ["Berlim", "Madri", "Paris"],
        correctAnswer: "Paris"
    },
    {
        question: "Quantos continentes existem no mundo?",
        options: ["5", "6", "7"],
        correctAnswer: "7"
    },
    {
        question: "Em que ano ocorreu a independência do Brasil?",
        options: ["1808", "1822", "1889"],
        correctAnswer: "1822"
    },
    {
        question: "Qual é o maior oceano do mundo?",
        options: ["Atlântico", "Índico", "Pacífico"],
        correctAnswer: "Pacífico"
    },
    {
        question: "Quem foi o líder do movimento pelos direitos civis nos Estados Unidos na década de 1960?",
        options: ["Martin Luther King Jr.", "Malcolm X", "Rosa Parks"],
        correctAnswer: "Martin Luther King Jr."
    },
    {
        question: "Qual é o segundo maior país do mundo em área territorial?",
        options: ["China", "Rússia", "Estados Unidos"],
        correctAnswer: "Rússia"
    },
    {
        question: "Quem foi o inventor da lâmpada elétrica?",
        options: ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell"],
        correctAnswer: "Thomas Edison"
    },
    {
        question: "Qual é o rio mais longo do mundo?",
        options: ["Nilo", "Amazonas", "Yangtzé"],
        correctAnswer: "Amazonas"
    },
    {
        question: "Quem escreveu 'Romeu e Julieta'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen"],
        correctAnswer: "William Shakespeare"
    }
];

let playerName;
let score = 0;
let currentStage = 1;
let roundNumber = 1;
let lastCorrectAnswer;
let lastCorrectStageValue = 0; // Adicionado para armazenar o valor da última etapa correta

function shuffleQuestions() {
    return originalQuestions.sort(() => Math.random() - 0.5);
}

const assignQuestionValues = () => {
    const baseValue = 100;
    return shuffleQuestions().map((question, index) => {
        const questionValue = baseValue * Math.pow(10, currentStage - 1);
        return { ...question, value: questionValue };
    });
};

let availableQuestions = assignQuestionValues();

function displayQuestion() {
    const currentQuestion = availableQuestions[0];
    const optionsText = currentQuestion.options.map((option, index) => `${index + 1}. ${option}`).join('\n');

    console.log(`\nRodada ${roundNumber} - Etapa ${currentStage} - Pergunta (Valor: R$ ${currentQuestion.value})`);
    console.log(`${currentQuestion.question}\n${optionsText}`);
}

function checkAnswer(selectedIndex) {
    const currentQuestion = availableQuestions.shift();

    if (currentQuestion.options[selectedIndex - 1] === currentQuestion.correctAnswer) {
        score += currentQuestion.value;
        console.log(`Resposta correta! Você ganhou R$ ${currentQuestion.value}!`);
        lastCorrectAnswer = currentQuestion.correctAnswer;
        lastCorrectStageValue = currentQuestion.value; // Atualiza o valor da última etapa correta
    } else {
        console.log("Resposta incorreta! O jogo acabou.");
        // Zera o score apenas se o jogador errar a última pergunta da última etapa (etapa 4)
        if (currentStage === 5) {
            score = 0;
        } else {
            // Subtrai 70% do valor da última etapa correta, apenas se não for a última pergunta da etapa
            const reducedValue = Math.round(lastCorrectStageValue * 0.7);
            score -= reducedValue; // Subtrair o valor reduzido ao score
        }
        console.log(`Parabéns, ${playerName}! Você ganhou um total de R$ ${score} reais na rodada ${roundNumber}.`);
        displayGameSummary();
        askPlayAgain();
        return;
    }

    currentStage++;
    roundNumber++;

    if (currentStage <= 5) {
        availableQuestions = assignQuestionValues();
        displayQuestion();
        if (currentStage > 1) {
            askDecision();
        } else {
            askQuestion();
        }
    } else {
        console.log(`Parabéns, ${playerName}! Você completou todas as etapas e ganhou R$ ${score} reais!`);
        displayGameSummary();
        askPlayAgain();
    }
}

function askDecision() {
    rl.question('Deseja parar (p) ou continuar (c)? ', (decision) => {
        if (decision.toLowerCase() === 'p') {
            console.log(`Parabéns, ${playerName}! Você decidiu parar. Você ganhou um total de R$ ${score} reais na rodada ${roundNumber}.`);
            displayGameSummary();
            askPlayAgain();
        } else if (decision.toLowerCase() === 'c') {
            displayQuestion();
            askQuestion();
        } else {
            console.log('Opção inválida. Por favor, digite "p" para parar ou "c" para continuar.');
            askDecision();
        }
    });
}

function displayGameSummary() {
    console.log(`\nResumo do Jogo:`);
    console.log(`- Nome do jogador: ${playerName}`);
    console.log(`- Rodada em que parou: ${roundNumber}`);
    console.log(`- Perguntas restantes: ${5 - roundNumber}`);
    console.log(`- Resposta correta da última pergunta: ${lastCorrectAnswer}`);
    console.log(`- Ganho Final: R$ ${score} reais`);
}

function askPlayAgain() {
    rl.question('Deseja jogar novamente? (s/n): ', (decision) => {
        if (decision.toLowerCase() === 's') {
            resetGame();
            startGame();
        } else {
            console.log('Obrigado por jogar! Até a próxima.');
            process.exit();
        }
    });
}

function resetGame() {
    score = 0;
    currentStage = 1;
    roundNumber = 1;
    lastCorrectAnswer = null;
    lastCorrectStageValue = 0;
    availableQuestions = assignQuestionValues(); // Adicione esta linha para reatribuir novas perguntas
}

function startGame() {
    console.clear(); // Limpar o console antes de iniciar um novo jogo

    rl.question('Informe seu nome: ', (name) => {
        playerName = name;
        displayQuestion();
        askQuestion();
    });
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

startGame();

function askQuestion() {
    rl.question('Escolha a opção correta (digite o número): ', (answer) => {
        checkAnswer(parseInt(answer));
    });
}