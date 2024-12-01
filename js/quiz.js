const baseURL = 'https://pokeapi.co/api/v2/pokemon'; //url base da api do pokémon
const maxPkm = 1025; //total de pokémon disponíveis na api
let pkmAtual = null; //guarda o nome do pokémon atual

function IdAle() {
    return Math.floor(Math.random() * maxPkm) + 1; //gera um id aleatório entre 1 e 1025
}

async function pkmAle() {
    const id = IdAle(); //pega um id aleatório
    try {
        const resp = await fetch(`${baseURL}/${id}`); //faz a requisição do pokémon na api usando o id
        const data = await resp.json(); //converte a resposta para json
        pkmAtual = data.name; //salva o nome do pokémon atual
        escuro(data.sprites.other['official-artwork'].front_default); //mostra a silhueta do pokémon
        opcoes(data.name); //gera as opções de resposta
    } catch (err) {
        console.error(err); //mostra erros caso algo falhe
    }
}

function escuro(urlImg) {
    const imgCont = document.querySelector('.pkm_pic'); //seleciona o container da imagem
    imgCont.innerHTML = `<img src="${urlImg}" alt="Silhueta do Pokémon">`; //adiciona a imagem do pokémon no html
    const img = document.querySelector('.pkm_pic img'); //pega a imagem adicionada
    img.style.filter = 'brightness(0)'; //deixa a imagem escura para simular uma silhueta
}

function tocarSom(nome) {
    const audioURL = `https://play.pokemonshowdown.com/audio/cries/${nome}.mp3`; //URL do som do Pokémon
    const audio = new Audio(audioURL); //cria um objeto de áudio
    audio.play().catch(err => console.error("Erro ao reproduzir som:", err)); //reproduz o som
}

async function opcoes(certa) {
    try {
        const resp = await fetch(`${baseURL}?limit=${maxPkm}`); //busca todos os pokémon da api
        const data = await resp.json(); //converte a resposta para json
        const opcoes = document.querySelector('.pkm_opcoes'); //seleciona o container das opções
        const erradas = data.results
            .filter(p => p.name !== certa) //filtra os pokémon que não são a resposta certa
            .sort(() => 0.5 - Math.random()) //embaralha a lista
            .slice(0, 3) //pega 3 nomes errados
            .map(p => p.name); //extrai os nomes
        const todas = [...erradas, certa].sort(() => 0.5 - Math.random()); //junta as opções e embaralha
        opcoes.innerHTML = ''; //limpa opções antigas
        todas.forEach(nome => {
            const btn = document.createElement('button'); //cria um botão para cada nome
            btn.textContent = nome.charAt(0).toUpperCase() + nome.slice(1); //capitaliza o nome
            btn.value = nome; //define o valor do botão como o nome do pokémon
            btn.onclick = () => verifResp(btn, nome); //adiciona o evento de clique no botão
            btn.className = 'btnResp'; //define a classe do botão
            opcoes.appendChild(btn); //adiciona o botão ao container
        });
    } catch (err) {
        console.error(err); //mostra erros caso algo falhe
    }
}

function desativarBotoes() {
    const botoes = document.querySelectorAll('.btnResp'); //seleciona todos os botões de resposta
    botoes.forEach(btn => btn.disabled = true); //desativa todos os botões
}

function verifResp(btn, escolha) {
    const img = document.querySelector('.pkm_pic img'); //pega a imagem do pokémon
    desativarBotoes(); //desativa os botões após o clique
    if (escolha === pkmAtual) { //se a escolha for correta
        btn.classList.add('acerto'); //adiciona a classe de acerto ao botão
        img.style.filter = 'brightness(1)'; //revela a imagem
    } else { //se a escolha for errada
        btn.classList.add('erro'); //adiciona a classe de erro ao botão
        const botoes = document.querySelectorAll('.btnResp'); //seleciona os botões
        botoes.forEach(b => {
            if (b.value === pkmAtual) b.classList.add('acerto'); //marca a resposta correta
        });
        img.style.filter = 'brightness(1)'; //revela a imagem mesmo errando
    }

    tocarSom(pkmAtual); //toca o som do Pokémon após escolher a opção

    setTimeout(() => {
        pkmAle(); //carrega outro pokémon após 2s
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => { 
    document.getElementById('rerroll').addEventListener('click', pkmAle); //adiciona evento no botão de reload
    pkmAle(); //inicia o jogo com um pokémon aleatório
});
