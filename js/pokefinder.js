const grid = document.getElementById("gridPokemons"); // elemento onde os cards de pokémons serão exibidos
const carregarMais = document.getElementById("carregarMais"); // botão para carregar mais pokémons
const input = document.getElementById("inputBusca"); // input de busca de pokémons
const filtroBotao = document.getElementById("filtroBotao"); // botão para abrir o menu de filtro
const filtroMenu = document.getElementById("filtroMenu"); // menu que contém as opções de filtro
const limparFiltro = document.getElementById("limparFiltro"); // botão para limpar o filtro aplicado
let offset = 0, limite = 25, tipoSelecionado = null; // controle de paginação e tipo de filtro selecionado

//lista de tipos de pokémons para criar os filtros dinamicamente
const tipos = [
  "grass", "fire", "water", "bug", "normal", "poison", "electric", // tipos de pokémons comuns
  "ground", "fairy", "psychic", "rock", "ice", "ghost", "dragon", // tipos adicionais
  "dark", "steel", "fighting", "flying" // outros tipos de pokémons
];

const criarFiltro = () => { // função que cria os itens de filtro dinamicamente
  tipos.forEach((tipo) => {
    const item = document.createElement("div"); // cria um elemento de filtro
    item.className = "filtroItem"; // classe para estilizar o item do filtro
    item.innerHTML = `
      <img src="https://raw.githubusercontent.com/partywhale/pokemon-type-icons/fcbe6978c61c359680bc07636c3f9bdc0f346b43/icons/${tipo}.svg" alt="${tipo}"> <!-- imagem do ícone do tipo -->
      <span>${tipo}</span> <!-- nome do tipo -->
    `;
    item.addEventListener("click", () => filtrarPorTipo(tipo)); // adiciona evento de clique para filtrar por tipo
    filtroMenu.appendChild(item); // adiciona o item ao menu de filtro
  });
};

filtroBotao.addEventListener("click", () => {
  filtroMenu.classList.toggle("expanded"); // alterna a classe para mostrar/ocultar o menu de filtro
});

const buscarPokemon = async (idOuNome) => { // função para buscar um pokémon pela API
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOuNome}`); // faz a requisição da API
    return res.ok ? await res.json() : null; // retorna a resposta JSON se for bem-sucedida
  } catch {
    return null; // retorna null se houver erro na requisição
  }
};

const criarCard = (pokemon) => { // função para criar e adicionar um card de pokémon
  const tipoPrincipal = pokemon.types[0].type.name; // pega o tipo principal do pokémon
  const card = document.createElement("div"); // cria um elemento de card
  
  card.className = "cardPokemon"; // classe para estilizar o card
  card.style.background = `linear-gradient(to bottom, ${obterCor(tipoPrincipal)} 40%, #1e1e1e 100%)`; // define a cor de fundo do card

  card.setAttribute('data-name', pokemon.name)
  card.addEventListener("click", () => {
    
    // Obtém o dado (neste caso, do atributo `data-valor`)
    const name = card.getAttribute("data-name");
    const body = document.querySelector("body");

    // Adiciona a classe para o efeito de saída
    body.classList.add("fade-out");

    setTimeout(() => {
      window.location.href = `./pokemonMain.html?name=${encodeURIComponent(name)}`;
    }, 500); 

  });

  card.innerHTML = `
    <div class="numero">#${pokemon.id.toString().padStart(3, "0")}</div> <!-- mostra o número do pokémon -->
    <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}"> <!-- imagem do pokémon -->
    <div class="info">
      <div class="nome">${pokemon.name}</div> <!-- nome do pokémon -->
      <div class="tipos">${pokemon.types.map((t) => `<div class="tipo ${t.type.name}">${t.type.name}</div>`).join("")}</div> <!-- tipos do pokémon -->
    </div>
  `;
  grid.appendChild(card); // adiciona o card ao grid
};

const carregarPokemons = async () => { // função para carregar pokémons
  if (tipoSelecionado) { // se um tipo for selecionado, carrega pokémons filtrados
    await carregarPorTipo();
  } else {
    for (let i = offset + 1; i <= offset + limite; i++) { // carrega pokémons por offset e limite
      const pokemon = await buscarPokemon(i);
      if (pokemon) criarCard(pokemon);
    }
    offset += limite; // atualiza o offset para a próxima página
  }
};

const filtrarPorTipo = async (tipo) => { // função para filtrar por tipo de pokémon
  tipoSelecionado = tipo; // salva o tipo selecionado
  offset = 0; // reseta o offset para a primeira página
  grid.innerHTML = ""; // limpa a grade de pokémons
  await carregarPorTipo(); // carrega pokémons do tipo selecionado
  filtroMenu.classList.remove("expanded"); // fecha o menu de filtro
};

const carregarPorTipo = async () => { // função para carregar pokémons de um tipo específico
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${tipoSelecionado}`); // requisição da API para obter pokémons do tipo selecionado
    const data = await res.json();
    const pokemonList = data.pokemon.slice(offset, offset + limite).map((p) => p.pokemon.name); // filtra os pokémons a serem exibidos

    for (const nome of pokemonList) {
      const pokemon = await buscarPokemon(nome);
      if (pokemon) criarCard(pokemon);
    }
    offset += limite; // atualiza o offset para a próxima página
  } catch (err) {
    console.error("Erro ao carregar Pokémon por tipo:", err); // exibe erro no console se algo falhar
  }
};

const limparFiltroFunc = () => { // função para limpar o filtro aplicado
  tipoSelecionado = null; // reseta o tipo selecionado
  offset = 0; // reseta o offset
  grid.innerHTML = ""; // limpa a grade de pokémons
  carregarPokemons(); // recarrega todos os pokémons
};

limparFiltro.addEventListener("click", limparFiltroFunc); // adiciona evento de clique para limpar filtro

const obterCor = (tipo) => ({ // função que retorna a cor de fundo do card de acordo com o tipo do pokémon
  grass: "#78c850", fire: "#f08030", water: "#6890f0", bug: "#a8b820",
  normal: "#a8a878", poison: "#a040a0", electric: "#f8d030", ground: "#e0c068",
  fairy: "#ee99ac", psychic: "#f85888", rock: "#b8a038", ice: "#98d8d8",
  dragon: "#7038f8", ghost: "#705898", dark: "#705848", steel: "#b8b8d0",
  fighting: "#c03028", flying: "#a890f0"
}[tipo] || "#ccc"); // retorna uma cor padrão se o tipo não for encontrado

input.addEventListener("input", async () => { // evento de input para buscar pokémons pelo nome
  const busca = input.value.trim().toLowerCase(); // pega o valor do input e transforma em minúsculo
  grid.innerHTML = ""; // limpa a grade
  if (busca) {
    const pokemon = await buscarPokemon(busca); // busca o pokémon pelo nome
    if (pokemon) criarCard(pokemon); // cria um card se o pokémon for encontrado
  } else {
    offset = 0; // reseta o offset
    carregarPokemons(); // carrega pokémons sem filtro
  }
});

carregarMais.addEventListener("click", carregarPokemons); // evento de clique para carregar mais pokémons

carregarPokemons(); // carrega os pokémons iniciais
criarFiltro(); // cria os filtros de tipo


