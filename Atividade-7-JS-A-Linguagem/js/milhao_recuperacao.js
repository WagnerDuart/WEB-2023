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

let score = 0;
let currentStage = 1;
let playerName = '';

// Função para embaralhar perguntas e selecionar uma para a última etapa
function shuffleQuestions() {
    return originalQuestions.sort(() => Math.random() - 0.5);
}

// Atribuir valores específicos a cada pergunta
const assignQuestionValues = () => {
    const baseValue = 10; // Valor inicial da pergunta
    return shuffleQuestions().map((question, index) => {
        const questionValue = baseValue * Math.pow(10, currentStage - 1); // Valor da pergunta baseado na etapa
        return { ...question, value: questionValue };
    });
};

let availableQuestions = assignQuestionValues(); // Inicializa as perguntas com valores

// Função para exibir a pergunta atual
function displayQuestion() {
    const currentQuestion = availableQuestions[0];
    const optionsText = currentQuestion.options.map((option, index) => `${index + 1}. ${option}`).join('\n');

    console.log(`\n${playerName}, Etapa ${currentStage} - Pergunta (Valor: ${currentQuestion.value})`);
    console.log(`${currentQuestion.question}\n${optionsText}`);
}

// Função para verificar a resposta
function checkAnswer(selectedIndex) {
    const currentQuestion = availableQuestions.shift(); // Remove a pergunta da lista de perguntas disponíveis

    if (currentQuestion.options[selectedIndex - 1] === currentQuestion.correctAnswer) {
        score = currentQuestion.value; // Apenas atribui o valor da pergunta à pontuação
        console.log(`Resposta correta! Você ganhou ${currentQuestion.value} nesta etapa!`);
    } else {
        console.log(`Resposta incorreta! Você não ganhou nada nesta etapa.`);
    }

    // Avance para a próxima etapa
    currentStage++;

    if (currentStage <= 5) {
        availableQuestions = assignQuestionValues(); // Reembaralha as perguntas para a próxima etapa
        displayQuestion();
        askQuestion();
    } else {
        console.log(`Parabéns, ${playerName}! Você completou todas as etapas e ganhou um total de ${score} pontos!`);
        process.exit(); // Encerra o jogo
    }
}

// Função para perguntar ao jogador e verificar a resposta
function askQuestion() {
    rl.question('Escolha a opção correta (digite o número), ou digite "parar" para encerrar: ', (answer) => {
        if (answer.toLowerCase() === 'parar') {
            console.log(`Parabéns, ${playerName}! Você decidiu parar na Etapa ${currentStage - 1} e ganhou ${score} nesta etapa!`);
            process.exit(); // Encerra o jogo
        } else {
            checkAnswer(parseInt(answer));
        }
    });
}

// Função para perguntar o nome do jogador
function askPlayerName() {
    rl.question('Digite o seu nome: ', (name) => {
        playerName = name;
        console.log(`Bem-vindo, ${playerName}! Vamos começar o Show do Milhão!\n`);
        displayQuestion();
        askQuestion();
    });
}

// Configura a leitura da linha de comando
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Inicie o jogo perguntando o nome do jogador
askPlayerName();