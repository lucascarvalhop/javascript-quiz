// Variáveis auxiliares
const optionsContainer = document.querySelector('.options');
let aux = 0;
let answers = [];
let acertos = 0;

// A função abaixo é responsável por preencher a tela com as perguntas do quiz
function renderQuestions(currentQuestion) {
  /* Primeiro é setado a barra de progresso do quiz e após é preenchido a pergunta,
  a variável questions abaixo está em outro arquivo javascript "questions.js" */
  let progress = (currentQuestion / questions.length) * 100;
  document.querySelector('.progress--bar').style.width = `${progress}%`;
  document.querySelector('.question').innerHTML =
    questions[currentQuestion].question;
  /* Depois de setada a barra de progresso é resetado o innerHtml da área onde vão as opções de resposta para 
  quando a função seja ativada novamente não acumule as respostas na tela */
  optionsContainer.innerHTML = '';
  /* Aqui é dado um forEach em cada opção de resposta e é preenchido no html com a letra de cada alternativa
  e a alternativa em sí
  O switch é feito para adicionar uma letra a cada alternativa, por exemplo, primeira alternativa A, segunda
  B e assim por diante, no caso como todas as perguntas só tem no máximo 4 alternativas, ele só faz até a letra D */
  questions[currentQuestion].options.forEach((option, index) => {
    let letter;
    switch (index) {
      case 0:
        letter = 'A';
        break;
      case 1:
        letter = 'B';
        break;
      case 2:
        letter = 'C';
        break;
      case 3:
        letter = 'D';
        break;
    }
    optionsContainer.innerHTML =
      optionsContainer.innerHTML +
      `
    <div class="option-container">
    <div class="tag">${letter}</div>
    <span class="option" data-letter="${letter}">${option}</span>
    </div>`;
  });

  /* O trecho de código abaixo é responsável por identificar qual alternativa o usuário marcou
  e preencher em um array (answers) cada resposta. Os três IFS estão presentes porque o usuário
  pode clicar tanto na letra que representa a alternativa, tanto como no box da alternativa
  tanto como no texto da alternativa, em cada caso é usado um método pra saber qual é a resposta em sí */

  const options = document.querySelectorAll('.option-container');
  options.forEach((option, index) => {
    option.addEventListener('click', (event) => {
      let tag;
      // Caso o click seja no box da alternativa
      if (event.target.querySelector('.tag')) {
        tag = event.target.querySelector('.tag').innerHTML;
        // Caso o click seja direto na letra que representa a alternativa
      } else if (event.target.classList[0] == 'tag') {
        tag = event.target.innerHTML;
        /* Caso o click seja no texto da alternativa, que é um span que possui um
      data attribute de acordo com a letra que representa a alternativa */
      } else {
        tag = event.target.getAttribute('data-letter');
      }
      /* Após saber qual foi a resposta a resposta é adicionada a array de respostas, o procedimento acima
      é feito com cada pergunta do quiz */
      answers.push(tag);
      /* Após a array de respostas estar preenchida com as respostas de todas as perguntas, o código abaixo
      compara o valor da resposta do usuário com o valor da resposta correta, presente na array de questões
      se a resposta estiver certa ele soma +1 na variavel acertos */
      if (answers.length == questions.length) {
        questions.forEach((question, index) => {
          if (answers[index] == question.answer) {
            acertos = acertos + 1;
          }
        });
      }
      /* O if abaixo verifica se a pergunta não é a ultima pergunta do quiz e caso não seja ele roda a função
      novamente fazendo com que seja passada para a próxima pergunta do quiz */
      if (aux < questions.length - 1) {
        aux = aux + 1;
        renderQuestions(aux);
        /* Caso seja a última pergunta do quiz, quando o usuário der a ultima resposta é ativado o código
      abaixo, que calcula quantas perguntas o usuário acertou e mostra na tela um comentário sobre a pontuação
      seguido da porcentagem de acertos do usuário e a quantidade exatas de perguntas que ele acertou, antes
      de aparecer o resultado é mostrado um loading na tela por 1,5 segundos para simular que o quiz
      está calculando a quantidade de acertos do usuário */
      } else if (answers.length == questions.length) {
        let resultado;
        let quantidade = `Você respondeu um total de ${questions.length} questões e acertou ${acertos}`;
        let color;
        switch (acertos) {
          case 0:
          case 1:
          case 2:
            resultado = 'Tá ruim em?!';
            color = 'red';
            break;
          case 3:
          case 4:
          case 5:
            resultado = 'Precisa melhorar!';
            color = '#FF6347';
            break;
          case 6:
            resultado = 'Na média!';
            color = '#FFFF00';
            break;
          case 7:
          case 8:
          case 9:
            resultado = 'Ótimo! Você teve um excelente desempenho!';
            color = '	#008000';
            break;
          case 10:
            resultado = 'Perfeito! Você é um mago do JavaScript!';
            color = '	#0000FF';
            break;
        }
        document.querySelector('.modal-loading').style.display = 'flex';
        document.querySelector('.progress--bar').style.width = '0%';
        setTimeout(() => {
          document.querySelector('.modal-loading').style.display = 'none';
          document.querySelector('.classificacao').innerHTML = resultado;
          document.querySelector('.classificacao').style.color = color;
          document.querySelector('.porcentagem').innerHTML = `Acertos: ${
            (acertos / questions.length) * 100
          }%`;
          document.querySelector('.quantidade').innerHTML = quantidade;
          document.querySelector('.questions-container').style.display = 'none';
          document.querySelector('.end-container').style.display = 'flex';
        }, 1500);
      }
    });
  });
}

// Essa linha ativa todo o código acima
renderQuestions(0);

/* O código abaixo faz funcionar o botão de "Resetar quiz", resetando todas as varíaveis auxiliares
e ativando a função com o valor 0 fazendo o quiz voltar para a primeira pergunta*/

function restartQuiz() {
  aux = 0;
  progress = -10;
  answers = [];
  acertos = 0;
  document.querySelector('.end-container').style.display = 'none';
  document.querySelector('.questions-container').style.display = 'block';
  renderQuestions(0);
}

document.querySelector('.refazer').addEventListener('click', restartQuiz);
