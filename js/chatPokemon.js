import { GoogleGenerativeAI } from "@google/generative-ai";

// Fetch my API_KEY
const API_KEY = "AIzaSyBFFLcHCMHkl_v3lf8drAnR7gpbQGjoUdk";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

async function generateContentWithRetry(genAI, prompt, maxRetries = 5) {
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      return result.response.text(); // Retorna o texto gerado
    } catch (error) {
      if (error.message.includes("503") && attempts < maxRetries) {
        const waitTime = Math.pow(2, attempts) * 1000; // Tempo de espera exponencial
        console.warn(`Tentativa ${attempts + 1} falhou. Tentando novamente em ${waitTime / 1000} segundos...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        attempts++;
      } else {
        throw error; // Se não for um erro de sobrecarga ou exceder as tentativas, lançar o erro
      }
    }
  }

  throw new Error("Não foi possível acessar o modelo após várias tentativas.");
}

  async function run(message) {
    const prompt = `
    Você é o Professor Carvalho, um especialista no mundo Pokémon. Responda de forma didática e amigável, como se estivesse falando com um treinador iniciante. Use exemplos do universo Pokémon e seja direto.Não precisa se apresentar e nem comprimentar o usúario ao menos que ele peça.
    Pergunta: ${message}
    `;
    
  
    // Adiciona a animação de carregamento
    const loadingMessage = addMessageLoading();
  
    try {
      // O objeto genAI precisa estar inicializado antes de ser passado
      const responseText = await generateContentWithRetry(genAI, prompt);
      
      // Remove a mensagem de carregamento
      boxMessages.removeChild(loadingMessage);
      
      // Adiciona a resposta da API
      addMessage(responseText, false);
    } catch (error) {
      // Remove a mensagem de carregamento caso ocorra um erro
      boxMessages.removeChild(loadingMessage);
  
      if (error.message.includes("503")) {
        console.error("O modelo está sobrecarregado. Tente novamente mais tarde.");
        addMessage("O modelo está sobrecarregado. Tente novamente mais tarde.", false);
      } else {
        console.error("Erro inesperado ao acessar o modelo:", error.message);
        addMessage("Erro inesperado ao acessar o modelo. Por favor, tente novamente.", false);
      }
    }
  }

const boxMessages = document.querySelector('.box-messages');
const sendButton = document.querySelector('.send-button');
const formQuestion = document.querySelector('#formQuestionChat');

// Função para rolar para a última mensagem
function scrollToLastMessage() {
  boxMessages.scrollTop = boxMessages.scrollHeight;
  return
}

// Exemplo: Adicionar nova mensagem e rolar automaticamente
function addMessage(messageText, isUser = true) {
  document.querySelector('.message-input').value = ''

  const messageDiv = document.createElement('div');
  messageDiv.className = isUser ? 'message-user' : 'message-openIa';
  messageDiv.textContent = messageText;

  boxMessages.appendChild(messageDiv);

  // Rolar para a última mensagem
  scrollToLastMessage();
  return
}
// Função para adicionar a mensagem de carregamento e retornar o elemento criado
function addMessageLoading() {
  document.querySelector('.message-input').value = '';

  const messageDiv = document.createElement('div');
  messageDiv.className = 'message-openIa';
  messageDiv.innerHTML = `
    <div class="loading">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  `;

  boxMessages.appendChild(messageDiv);

  // Rolar para a última mensagem
  scrollToLastMessage();

  return messageDiv; // Retorna o elemento criado para poder removê-lo posteriormente
}

const textarea = document.querySelector('.message-input');

// Calcula a altura de 8 linhas baseado na altura da linha atual
const maxHeight = parseInt(getComputedStyle(textarea).lineHeight, 10) * 8;

textarea.addEventListener('input', function () {
  this.style.height = 'auto'; // Reseta a altura para recalcular corretamente
  const newHeight = this.scrollHeight;

  if (newHeight > maxHeight) {
    this.style.height = `${maxHeight}px`; // Fixa na altura máxima
    this.style.overflowY = 'scroll'; // Adiciona barra de rolagem vertical
  } else {
    this.style.height = `${newHeight}px`; // Ajusta a altura dinamicamente
    this.style.overflowY = 'hidden'; // Remove a barra de rolagem se altura estiver dentro do limite
  }
});



formQuestion.addEventListener('submit' , (e)=>{
  e.preventDefault()
  const messageUser = document.querySelector('.message-input').value
  const currentMessage = messageUser
  addMessage(messageUser)
  run(currentMessage)
})