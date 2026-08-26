/* =====================================================
   MENU MOBILE
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


/* Fechar menu ao clicar em um link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


/* =====================================================
   SIMULADOR DE INTERFERÊNCIA
===================================================== */

const canvas = document.getElementById("interferenceCanvas");
const ctx = canvas.getContext("2d");

const slider = document.getElementById("pathDifference");
const pathValue = document.getElementById("pathValue");
const status = document.getElementById("interferenceStatus");


function drawInterference() {

    const difference = parseFloat(slider.value);

    pathValue.textContent = difference.toFixed(1);

    /*
        Para diferença de caminho:

        Δd = nλ
        → construtiva

        Δd = (2n + 1)λ/2
        → destrutiva
    */

    const twiceDifference = Math.round(difference * 2);

    const constructive = twiceDifference % 2 === 0;

    if (constructive) {

        status.textContent = "Construtiva";

    } else {

        status.textContent = "Destrutiva";

    }


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /* Linha central */

    ctx.beginPath();

    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);

    ctx.stroke();


    /*
        Desenho das ondas
    */

    const center = canvas.height / 2;

    const amplitude = constructive ? 55 : 30;

    const wavelength = 80;


    ctx.beginPath();

    for (let x = 0; x < canvas.width; x++) {

        const y =
            center +
            Math.sin(
                (x / wavelength) * Math.PI * 2
            ) * amplitude;

        if (x === 0) {

            ctx.moveTo(x, y);

        } else {

            ctx.lineTo(x, y);

        }

    }

    ctx.stroke();


    /*
        Segunda onda deslocada
    */

    const phase =
        difference * Math.PI * 2;


    ctx.beginPath();

    for (let x = 0; x < canvas.width; x++) {

        const y =
            center +
            Math.sin(
                (x / wavelength) * Math.PI * 2 +
                phase
            ) * amplitude;

        if (x === 0) {

            ctx.moveTo(x, y);

        } else {

            ctx.lineTo(x, y);

        }

    }

    ctx.stroke();


    /*
        Resultado
    */

    ctx.beginPath();

    for (let x = 0; x < canvas.width; x++) {

        const y1 =
            Math.sin(
                (x / wavelength) * Math.PI * 2
            );

        const y2 =
            Math.sin(
                (x / wavelength) * Math.PI * 2 +
                phase
            );

        const result =
            (y1 + y2) / 2;

        const y =
            center +
            result * amplitude * 1.7;

        if (x === 0) {

            ctx.moveTo(x, y);

        } else {

            ctx.lineTo(x, y);

        }

    }

    ctx.stroke();

}


slider.addEventListener(
    "input",
    drawInterference
);

drawInterference();


/* =====================================================
   QUIZ
===================================================== */

const questions = [

    {
        question:
            "Em uma transformação isotérmica, qual grandeza permanece constante?",

        answers: [
            "A) Pressão",
            "B) Volume",
            "C) Temperatura",
            "D) Quantidade de matéria"
        ],

        correct: "C",

        explanation:
            "Isotérmica significa temperatura constante."
    },


    {
        question:
            "Qual equação representa a relação de Clapeyron para um gás ideal?",

        answers: [
            "A) P = m/V",
            "B) PV = nRT",
            "C) E = mc²",
            "D) F = ma"
        ],

        correct: "B",

        explanation:
            "A equação de Clapeyron é PV = nRT."
    },


    {
        question:
            "Na interferência construtiva, a diferença de caminho pode ser:",

        answers: [
            "A) Δd = nλ",
            "B) Δd = λ/3",
            "C) Δd = (2n + 1)λ/2",
            "D) Δd = 2n + 1"
        ],

        correct: "A",

        explanation:
            "Para interferência construtiva, Δd = nλ."
    },


    {
        question:
            "Qual é a relação entre os ângulos de incidência e reflexão?",

        answers: [
            "A) i > r",
            "B) i < r",
            "C) i = r",
            "D) i = 2r"
        ],

        correct: "C",

        explanation:
            "A segunda lei da reflexão estabelece que i = r."
    },


    {
        question:
            "Como é a imagem formada por um espelho plano?",

        answers: [
            "A) Real e invertida",
            "B) Virtual, direita e do mesmo tamanho",
            "C) Real e maior",
            "D) Virtual e menor"
        ],

        correct: "B",

        explanation:
            "A imagem no espelho plano é virtual, direita, simétrica e possui o mesmo tamanho."
    }

];


let currentQuestion = 0;
let score = 0;


const questionElement =
    document.getElementById("question");

const answersContainer =
    document.querySelector(".answers");

const questionNumber =
    document.querySelector(".question-number");

const progressBar =
    document.getElementById("progressBar");

const quizResult =
    document.getElementById("quizResult");


function loadQuestion() {

    const question =
        questions[currentQuestion];


    questionNumber.textContent =
        `QUESTÃO ${currentQuestion + 1}`;


    questionElement.textContent =
        question.question;


    answersContainer.innerHTML = "";


    question.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        const letter =
            String.fromCharCode(65 + index);

        button.textContent =
            answer;

        button.dataset.answer =
            letter;

        button.addEventListener(
            "click",
            () => selectAnswer(button)
        );

        answersContainer.appendChild(button);

    });


    const progress =
        ((currentQuestion) / questions.length) * 100;

    progressBar.style.width =
        `${progress}%`;

}


function selectAnswer(button) {

    const question =
        questions[currentQuestion];


    const buttons =
        document.querySelectorAll(
            ".answers button"
        );


    buttons.forEach(btn => {

        btn.disabled = true;

    });


    if (
        button.dataset.answer ===
        question.correct
    ) {

        button.classList.add("correct");

        score++;

    } else {

        button.classList.add("wrong");


        buttons.forEach(btn => {

            if (
                btn.dataset.answer ===
                question.correct
            ) {

                btn.classList.add("correct");

            }

        });

    }


    setTimeout(() => {

        currentQuestion++;


        if (
            currentQuestion <
            questions.length
        ) {

            loadQuestion();

        } else {

            finishQuiz();

        }

    }, 1200);

}


function finishQuiz() {

    progressBar.style.width = "100%";

    document.getElementById("quizContent")
        .classList.add("hidden");


    quizResult.classList.remove("hidden");


    let message;


    if (score === 5) {

        message =
            "🔥 Excelente! Você dominou os principais conceitos.";

    } else if (score >= 3) {

        message =
            "👏 Muito bem! Você está no caminho certo. Revise os pontos em que teve dificuldade.";

    } else {

        message =
            "📚 Vale uma revisão extra. Volte aos módulos e tente novamente.";

    }


    quizResult.innerHTML = `

        <h3>
            Você acertou ${score} de ${questions.length}.
        </h3>

        <p>
            ${message}
        </p>

        <button
            class="btn btn-primary"
            onclick="restartQuiz()">

            Refazer quiz

        </button>

    `;

}


function restartQuiz() {

    currentQuestion = 0;
    score = 0;

    document.getElementById("quizContent")
        .classList.remove("hidden");

    quizResult.classList.add("hidden");

    loadQuestion();

}


loadQuestion();
