const grid = document.getElementById("gridPokemons");
const carregarMais = document.getElementById("carregarMais");
const input = document.getElementById("inputBusca");
const filtroBotao = document.getElementById("filtroBotao");
const filtroMenu = document.getElementById("filtroMenu");
let offset = 0, limite = 25, tipoSelecionado = null;

const tipos = [
  "grass", "fire", "water", "bug", "normal", "poison", "electric",
  "ground", "fairy", "psychic", "rock", "ice", "ghost", "dragon",
  "dark", "steel", "fighting", "flying"
];

const criarFiltro = () => {
  tipos.forEach((tipo) => {
    const item = document.createElement("div");
    item.className = "filtroItem";
    item.innerHTML = `
      <img src="https://raw.githubusercontent.com/partywhale/pokemon-type-icons/fcbe6978c61c359680bc07636c3f9bdc0f346b43/icons/${tipo}.svg" alt="${tipo}">
      <span>${tipo}</span>
    `;
    item.addEventListener("click", () => filtrarPorTipo(tipo));
    filtroMenu.appendChild(item);
  });
};

filtroBotao.addEventListener("click", () => {
  filtroMenu.classList.toggle("expanded");
});

const buscarPokemon = async (idOuNome) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOuNome}`);
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
};

const criarCard = (pokemon) => {
  const tipoPrincipal = pokemon.types[0].type.name;
  const card = document.createElement("div");
  card.className = "cardPokemon";
  card.style.background = `linear-gradient(to bottom, ${obterCor(tipoPrincipal)} 40%, #1e1e1e 100%)`;
  card.innerHTML = `
    <div class="numero">#${pokemon.id.toString().padStart(3, "0")}</div>
    <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
    <div class="info">
      <div class="nome">${pokemon.name}</div>
      <div class="tipos">${pokemon.types.map((t) => `<div class="tipo ${t.type.name}">${t.type.name}</div>`).join("")}</div>
    </div>
  `;
  grid.appendChild(card);
};

const carregarPokemons = async () => {
  for (let i = offset + 1; i <= offset + limite; i++) {
    const pokemon = await buscarPokemon(i);
    if (pokemon) criarCard(pokemon);
  }
  offset += limite;
};

const filtrarPorTipo = async (tipo) => {
  tipoSelecionado = tipo;
  grid.innerHTML = "";
  offset = 0;
  for (let i = 1; i <= 1000; i++) {
    const pokemon = await buscarPokemon(i);
    if (pokemon && pokemon.types.some((t) => t.type.name === tipo)) {
      criarCard(pokemon);
    }
  }
  filtroMenu.classList.remove("expanded");
};

const obterCor = (tipo) => ({
  grass: "#78c850", fire: "#f08030", water: "#6890f0", bug: "#a8b820",
  normal: "#a8a878", poison: "#a040a0", electric: "#f8d030", ground: "#e0c068",
  fairy: "#ee99ac", psychic: "#f85888", rock: "#b8a038", ice: "#98d8d8",
  dragon: "#7038f8", ghost: "#705898", dark: "#705848", steel: "#b8b8d0",
  fighting: "#c03028", flying: "#a890f0"
}[tipo] || "#ccc");

input.addEventListener("input", async () => {
  const busca = input.value.trim().toLowerCase();
  grid.innerHTML = "";
  if (busca) {
    const pokemon = await buscarPokemon(busca);
    if (pokemon) criarCard(pokemon);
  } else {
    offset = 0;
    carregarPokemons();
  }
});

carregarMais.addEventListener("click", carregarPokemons);

carregarPokemons();
criarFiltro();
