const quizQuestions = [
    { q: "Qual é o maior planeta do Sistema Solar?", a: ["Saturno", "Júpiter", "Urano", "Netuno"], correct: 1 },
    { q: "Em que ano o homem pisou na Lua pela primeira vez através da missão Apollo 11?", a: ["1965", "1969", "1972", "1961"], correct: 1 },
    { q: "Qual é a galáxia espiral mais próxima da nossa Via Láctea?", a: ["Andrômeda", "Nuvem de Magalhães", "Galáxia do Sombreiro", "Triângulo"], correct: 0 },
    { q: "O que define fundamentalmente um ano-luz?", a: ["O tempo de rotação solar", "A velocidade máxima de um cometa", "Uma unidade métrica de distância", "O brilho de uma supernova"], correct: 2 },
    { q: "Qual planeta do Sistema Solar é conhecido popularmente como o 'Planeta Vermelho'?", a: ["Vênus", "Marte", "Mercúrio", "Saturno"], correct: 1 },
    { q: "Qual super telescópio espacial sucedeu o Hubble no final de 2021?", a: ["Kepler Space Telescope", "James Webb Space Telescope", "Chandra X-ray", "Voyager Probes"], correct: 1 },
    { q: "Qual é o elemento químico mais abundante na composição do Sol?", a: ["Oxigênio", "Hélio", "Carbono", "Hidrogênio"], correct: 3 },
    { q: "O que causa diretamente a ocorrência de um Eclipse Solar?", a: ["A Terra se posicionar entre o Sol e a Lua", "A Lua se posicionar entre o Sol e a Terra", "O Sol se alinhar entre a Terra e a Lua", "A passagem de asteroides massivos"], correct: 1 },
    { q: "Qual sonda fabricada por humanos foi a primeira a cruzar a Fronteira Interestelar?", a: ["Voyager 1", "New Horizons", "Pioneer 10", "Cassini-Huygens"], correct: 0 },
    { q: "Qual a distância média estimada entre o planeta Terra e o Sol?", a: ["50 milhões de quilômetros", "150 milhões de quilômetros", "1 bilhão de quilômetros", "300 mil quilômetros"], correct: 1 }
];

// Função responsável por renderizar o HTML dentro do container correto
function generateQuizHTML(quizWrapper) {
    if (!quizWrapper) return;
    
    quizWrapper.innerHTML = quizQuestions.map((item, index) => `
        <div class="quiz-question">
            <h3>${index + 1}. ${item.q}</h3>
            ${item.a.map((option, i) => `
                <label>
                    <input type="radio" name="question${index}" value="${i}">
                    ${option}
                </label>
            `).join('')}
        </div>
    `).join('');
}

// OBRIGATÓRIO: Aguarda que o HTML da página seja totalmente processado pelo navegador
document.addEventListener('DOMContentLoaded', () => {
    const quizWrapper = document.getElementById('quiz-container');
    const submitQuizBtn = document.getElementById('submit-quiz');
    const resultDisplay = document.getElementById('quiz-result');

    // Executa a criação das perguntas com segurança
    generateQuizHTML(quizWrapper);

    // Configura o escutador do botão de envio
    if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', () => {
            let finalScore = 0;
            let questionsAnswered = 0;

            quizQuestions.forEach((item, index) => {
                const selectedRadio = document.querySelector(`input[name="question${index}"]:checked`);
                if (selectedRadio) {
                    questionsAnswered++;
                    if (parseInt(selectedRadio.value) === item.correct) {
                        finalScore++;
                    }
                }
            });

            // Impede o envio se houver perguntas em branco
            if (questionsAnswered < quizQuestions.length) {
                resultDisplay.style.color = "var(--error-color)";
                resultDisplay.innerHTML = "⚠️ Operação cancelada. Responda a todas as 10 perguntas antes de submeter!";
                return;
            }

            // Geração de feedbacks customizados por faixa de acertos
            resultDisplay.style.color = "var(--success-color)";
            let systemFeedback = "";
            if (finalScore === 10) systemFeedback = "🚀 Fantástico! Obteve pontuação máxima. É um autêntico astrofísico!";
            else if (finalScore >= 7) systemFeedback = "✨ Muito bom! Os seus conhecimentos sobre o cosmos estão afiados.";
            else if (finalScore >= 5) systemFeedback = "👨‍🚀 Bom esfoço! Mas ainda há muito espaço para explorar.";
            else {
                resultDisplay.style.color = "var(--error-color)";
                systemFeedback = "🛰️ Órbita baixa! Que tal dar uma leitura na nossa aba Explorar e tentar de novo?";
            }

            resultDisplay.innerHTML = `<h3>Acertou ${finalScore} de 10!</h3><p>${systemFeedback}</p>`;
        });
    }
});