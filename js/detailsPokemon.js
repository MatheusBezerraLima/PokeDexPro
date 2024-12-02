// async function fetchPokemonGif() {
//     try {
//         // Normalize o nome do Pokémon para minúsculas

//         // URLs para o sprite padrão e a versão shiny
//         const baseSpriteUrl = `https://play.pokemonshowdown.com/sprites/ani/pikachu.gif`;
//         const shinySpriteUrl = `https://play.pokemonshowdown.com/sprites/ani-shiny/pikachu.gif`;

//         // Verificar se o sprite padrão existe
//         const baseResponse = await fetch(baseSpriteUrl);
//         const shinyResponse = await fetch(shinySpriteUrl);

//         console.log(baseResponse);
//         console.log(shinyResponse);
        

//         if (!baseResponse.ok || !shinyResponse.ok) {
//             throw new Error("Pokémon não encontrado ou sprite não disponível.");
//         }

//         // Retornar URLs dos sprites para uso em uma página
//         return {
//             normal: baseSpriteUrl,
//             shiny: shinySpriteUrl
            
//         };
//     } catch (error) {
//         console.error("Erro ao buscar sprites do Pokémon:", error);
//     }
// }

// document.addEventListener("DOMContentLoaded", fetchPokemonGif)

const params = new URLSearchParams(window.location.search);
const pokemon = params.get("name");

const slides = document.querySelector('.slides');
const buttons = document.querySelectorAll('.controls button');

const pokemonsTeam = []

const returnPreviousPage = () =>{
  window.history.back();
}

const addPokemonTeam = () => {
  const namePokemon = document.querySelector('.name-pokemon').innerHTML;

  // Verifica se o time já tem 5 Pokémons
  if (pokemonsTeam.length >= 5) {
    // Exibe a mensagem visual se o time já tiver 5 Pokémons
    const messageElement = document.getElementById('pokemon-limit-message');
    messageElement.style.display = 'block';

    // Esconde a mensagem após 3 segundos
    setTimeout(() => {
      messageElement.style.display = 'none';
    }, 3000);
    
    return;
  }

  // Adiciona o Pokémon ao time
  pokemonsTeam.push(namePokemon);

  // Verifica se já existe um time salvo no localStorage
  const existingTeam = JSON.parse(localStorage.getItem('teamPokemon'));

  if (existingTeam) {
    // Atualiza o time no localStorage
    localStorage.setItem('teamPokemon', JSON.stringify(pokemonsTeam));
  } else {
    // Cria um novo time no localStorage
    localStorage.setItem('teamPokemon', JSON.stringify(pokemonsTeam));
  }
};


buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Move o slider para o slide correspondente
    slides.style.transform = `translateX(-${index * 100}%)`;
    console.log(  slides.style.transform);
    
    if(slides.style.transform == 'translateX(-200%)'){
        const slide3 = document.querySelector('#slide3')
        console.log('entrou');

        const titlesMove = document.createElement("div");
        titlesMove.classList.add("titles-move");

        const nameMove = document.createElement("div");
        nameMove.classList.add("name-move");

        const nameParagraph = document.createElement("p");
        nameParagraph.textContent = "Name";

        nameMove.appendChild(nameParagraph);
        titlesMove.appendChild(nameMove);

        const boxMoveStats = document.createElement("div");
        boxMoveStats.classList.add("box-move-stats");

        const stats = ["Type", "Lvl", "Pow", "Acc", "PP"];
        stats.forEach(stat => {
            const title = document.createElement("div");
            title.classList.add("title");

            const paragraph = document.createElement("p");
            paragraph.textContent = stat;

            title.appendChild(paragraph);
            boxMoveStats.appendChild(title);
        });

        // Adicionando box-move-stats ao titlesMove
        titlesMove.appendChild(boxMoveStats);

        // Adicionando titlesMove ao corpo ou a algum outro elemento da página
        slide3.appendChild(titlesMove);

    }
    
    // Atualiza estilos dos botões (opcional)
    buttons.forEach(btn => {
        btn.classList.remove('active') 
        btn.classList.add('disable')
    });

    button.classList.add('active');
    button.classList.remove('disable')
  });
});

const loadGraphPercentageSex = async(data) => {
  const Ctx = document.querySelector('.graph-percentage-sex')
  const genderRate = data.gender_rate;
  let femalePercentage = 0;
  let malePercentage = 0;


  if (genderRate === -1) {
    // Pokémon sem sexo (lendário, etc.)
    femalePercentage = 50; // Ou qualquer valor padrão que você desejar
    malePercentage = 50;
} else if (genderRate >= 0 && genderRate <= 8) {
    // Calcular a porcentagem baseada no genderRate
    femalePercentage = (genderRate / 8) * 100;
    malePercentage = 100 - femalePercentage;
} else {
    console.error("Valor de genderRate inválido:", genderRate);
}

  new Chart(Ctx, {
    type: 'doughnut',
    data: {
      labels: [
        'Female',
        'Male',
      ],
      datasets: [{
        label: '',
        data: [femalePercentage, malePercentage],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ],
        hoverOffset: 4
      }]
    },
    options: {
      plugins: {
          legend: {
              labels: {
                  color: '#fff',
                  font: {
                      size: 14,      
                      family: 'Arial' 
                  },
                  padding: 5, // Adiciona espaçamento entre as labels 
                  align: 'start', // Controla alinhamento: 'start', 'center', ou 'end'
                  fullSize: true, 
              },
              position: 'top',
          }
      }
  }
  })
}

const loadWeightSizePokemon = async(pokemonName) =>{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) {
        throw new Error("Erro ao buscar dados do Pokémon");
    }

    const data = await response.json();

    const firstType = document.querySelectorAll('.type')
    // const slide3 = document.querySelector('#slide3')
    const colorIndex = window.getComputedStyle(firstType[0]).backgroundColor
    // Pegando altura e peso
    const heightInMeters = (data.height / 10).toFixed(2); // Decímetros para metros
    const weightInKg = (data.weight / 10); // Hectogramas para quilogramas

    const weight = document.querySelector('.weight')  
    weight.style.backgroundColor = colorIndex

    const size = document.querySelector('.size')  
    size.style.backgroundColor = colorIndex

    const boxGraph = document.querySelector('.percentage-sex')  
    boxGraph.style.backgroundColor = colorIndex

    const textPokemon = document.querySelector('.box-text-pokemon')  
    textPokemon.style.backgroundColor = colorIndex

    const pWeight = document.querySelector('.p-weight')  
    pWeight.innerHTML = `${weightInKg}kg`

    const pSize = document.querySelector('.p-size')
    pSize.innerHTML = `${heightInMeters}m`

    const speciesResponse = await fetch(data.species.url);
    if (!speciesResponse.ok) {
        throw new Error("Erro ao buscar informações da espécie do Pokémon");
    }
    const speciesData = await speciesResponse.json();
    console.log(speciesData);
    
    const flavorTextEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === "en");
    const flavorText = flavorTextEntry ? flavorTextEntry.flavor_text.replace(/\n|\f/g, " ") : "Descrição não disponível.";
    
    const pText = document.querySelector('.text-pokemon')
    pText.innerHTML = flavorText
}

const loadAboutPokemon = async(pokemon) =>{
  const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`)
  const speciesData = await speciesResponse.json()
  
  const evolutionChainUrl = speciesData.evolution_chain.url;

  console.log(evolutionChainUrl);
  const evolutionResponse = await fetch(evolutionChainUrl);
  const evolutionData = await evolutionResponse.json();

  const evolutions = []
  var currentEvolution = evolutionData.chain
  console.log(currentEvolution);
  var currentPokemon =''
  
  const evolution_chain = document.querySelector('.evolution_chain')
  var cont = 0

  const firstType = document.querySelectorAll('.type')
  // const slide3 = document.querySelector('#slide3')
  const colorIndex = window.getComputedStyle(firstType[0]).backgroundColor
  
  while (currentEvolution) {
    evolutions.push(currentEvolution.species.name);
    currentPokemon = currentEvolution.species.name
    const currentPokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemon}`);
    const currentPokemonData = await currentPokemonResponse.json()
    console.log(currentPokemonData);

    const divEvolution = document.createElement('div')
    divEvolution.classList.add('evolutions')
    divEvolution.style.backgroundColor  = colorIndex
    
    divEvolution.innerHTML = `
      <img src="${currentPokemonData.sprites.other["official-artwork"].front_default}" alt="">
      <p>${currentPokemonData.name}</p>
      `
    evolution_chain.appendChild(divEvolution)

    if(cont <= 1){
      const seta = document.createElement('img')
      seta.src = '../icons/seta-direita.png'
      seta.classList.add('right')
      evolution_chain.appendChild(seta)
    }

    cont++
   
    currentEvolution = currentEvolution.evolves_to[0]; // Avança para o próximo estágio
    
  }
  
  console.log("Evoluções:", evolutions);
  loadGraphPercentageSex(speciesData)
  loadWeightSizePokemon(pokemon)
  return evolutions;
}

const loadGraphPokemon = (hp,defence,attack,speed,spAttack,spDefence,colorIndex) => {
  var ctx = document.querySelector('.slide-stats');

new Chart(ctx, {
  type: 'bar',
  data: {
   labels: ['HP', 'Attack', 'Defence', 'Sp.atk', 'Sp.def', 'Speed'],
    datasets: [
      {
        label: 'Preenchido',
        data: [hp, attack, defence, spAttack, spDefence, speed], // Valores reais
        backgroundColor: colorIndex
      },
      {
        label: 'Vazio',
        data: [255-hp, 255-attack, 255-defence, 255-spAttack, 255-spDefence, 255-speed], // Espaço restante para completar 100
        backgroundColor: 'rgba(0, 0, 0, 0.1)' // Cor semi-transparente ou invisível
      }
    ]
  },
  options: {
    plugins: {
      legend: {
        display: false // Oculta a legenda completamente
      },
      tooltip: {
        // Filtra tooltips para mostrar apenas quando o mouse passar sobre a parte verde
        callbacks: {
          label: function(tooltipItem) {
            // Exibe o valor do dataset 'Preenchido' (parte verde)
            if (tooltipItem.datasetIndex === 0) {
              return tooltipItem.raw; // Mostra o valor da parte verde
            }
            return null; // Não exibe tooltip para a parte cinza
          }
        }
      }
    },
    scales: {
      y: {
        stacked: true, // Ativa empilhamento no eixo Y
        beginAtZero: true,
        grid: {
          display: false,
        },
        max: 255, // Limite máximo para simular preenchimento total
        ticks: {
          display: false // Remove os valores do eixo Y
        }
      },
      x: {
        stacked: true, // Ativa empilhamento no eixo X
        grid: {
          display: false,
        },
      }
    }
  }
});
}


const loadMovesPokemon = (data) =>{
  const boxMoves = document.querySelector('#slide3')
   const moves = data.moves
        // Iterar sobre os primeiros 5 movimentos (para exemplo)
    moves.forEach(move => {
        fetch(move.move.url)
            .then(response => response.json())
            .then(moveData => {

                const levelLearned = move.version_group_details[0].level_learned_at;

               // Criação do elemento principal
              const itemMove = document.createElement('div');
              itemMove.classList.add('item_move');
              itemMove.style.backgroundColor = `var(--${moveData.type.name})`

              // Criação do elemento name-type-move
              const nameTypeMove = document.createElement('div');
              nameTypeMove.classList.add('name-type-move');

              const moveName = document.createElement('p');
              moveName.textContent = move.move.name; // Adicione o nome do movimento aqui
              nameTypeMove.appendChild(moveName);

              // Adiciona name-type-move ao itemMove
              itemMove.appendChild(nameTypeMove);

              // Criação do elemento box-infos-move
              const boxInfosMove = document.createElement('div');
              boxInfosMove.classList.add('box-infos-move');

              // Criação do elemento icons-move
              const iconsMove = document.createElement('div');
              iconsMove.classList.add('icons-move');

              const iconImage = document.createElement('img');
              iconImage.src = `../icons/${moveData.type.name}.svg`; // Adicione o tipo do movimento aqui
              iconImage.alt = '';
              iconsMove.appendChild(iconImage);

              // Adiciona icons-move ao boxInfosMove
              boxInfosMove.appendChild(iconsMove);

              // Criação das informações de nível, power, accuracy e pp
              const levelDiv = document.createElement('div');
              levelDiv.classList.add('move', 'lvl');

              const levelText = document.createElement('p');
              levelText.textContent = levelLearned; // Adicione o nível aqui
              levelDiv.appendChild(levelText);
              boxInfosMove.appendChild(levelDiv);

              const powerDiv = document.createElement('div');
              powerDiv.classList.add('move', 'pow');

              const powerText = document.createElement('p');
              powerText.textContent = moveData.power; // Adicione o poder aqui
              powerDiv.appendChild(powerText);
              boxInfosMove.appendChild(powerDiv);

              const accuracyDiv = document.createElement('div');
              accuracyDiv.classList.add('move', 'acc');

              const accuracyText = document.createElement('p');
              accuracyText.textContent = moveData.accuracy; // Adicione a precisão aqui
              accuracyDiv.appendChild(accuracyText);
              boxInfosMove.appendChild(accuracyDiv);

              const ppDiv = document.createElement('div');
              ppDiv.classList.add('move', 'pp');

              const ppText = document.createElement('p');
              ppText.textContent = moveData.pp; // Adicione os PP aqui
              ppDiv.appendChild(ppText);
              boxInfosMove.appendChild(ppDiv);

              // Adiciona box-infos-move ao itemMove
              itemMove.appendChild(boxInfosMove);

              // Adicione itemMove ao elemento pai desejado
              boxMoves.appendChild(itemMove); // Substitua `.parent-container` pelo seletor do elemento pai 
                    
            });

    });
  
}

const statsPokemon = async () => {
  const boxNormalDamage = document.querySelector('#box-normal-damage');
  const boxHalfDamage = document.querySelector('#box-half-damage');
  const boxDoubleDamage = document.querySelector('#box-double-damage');
  const boxNoDamage = document.querySelector('#box-no-damage');

  // Limpar as caixas no início
  boxNormalDamage.innerHTML = '';
  boxHalfDamage.innerHTML = '';
  boxDoubleDamage.innerHTML = '';
  boxNoDamage.innerHTML = '';

  if (!pokemon) {
    alert('Por favor, insira um nome de Pokémon.');
    return;
  }

  try {
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!pokemonResponse.ok) throw new Error('Pokémon não encontrado.');
    const pokemonData = await pokemonResponse.json();
    const types = pokemonData.types.map(type => type.type.name);
    

    const hp = pokemonData.stats[0].base_stat
    const attack = pokemonData.stats[1].base_stat
    const defence = pokemonData.stats[2].base_stat
    const spAttack = pokemonData.stats[3].base_stat
    const spDefence = pokemonData.stats[4].base_stat
    const speed = pokemonData.stats[5].base_stat
    
    // Preenchendo o nome do pokemon
    const namePokemon = document.querySelector('.name-pokemon')
    namePokemon.innerHTML = pokemon

    const idPokemon = document.querySelector('.id')
    // Adiciona '0' a frente do numero para que sele sempre tenha 4 casas
    idPokemon.innerHTML = pokemonData.id.toString().padStart(4,'0')
    
    // Carregar os tipos do pokemon
    const typesPokemon = pokemonData.types
    const boxTypes = document.querySelector('.type-pokemon')
    boxTypes.innerHTML = ''
   

    for (i = 0; i < typesPokemon.length; i++ ){
      const typeIcon = document.createElement('div')
      typeIcon.classList.add('type')
      typeIcon.classList.add(typesPokemon[i].type.name)
      const p = document.createElement('p')
      p.innerHTML = typesPokemon[i].type.name
      typeIcon.appendChild(p)
      boxTypes.appendChild(typeIcon)
    }
    


    const damageRelations = {
      half_damage_from: new Set(),
      double_damage_from: new Set(),
      no_damage_from: new Set(),
      normal_damage: new Set(),
    };

    // Processar tipos
    for (const type of types) {
      const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const typeData = await typeResponse.json();

      typeData.damage_relations.half_damage_from.forEach(t => 
        damageRelations.half_damage_from.add(t.name)
      );
      typeData.damage_relations.double_damage_from.forEach(t => 
        damageRelations.double_damage_from.add(t.name)
      );
      typeData.damage_relations.no_damage_from.forEach(t => 
        damageRelations.no_damage_from.add(t.name)
      );
    }

    // Determinar danos normais
    const allTypeNames = [];
    for (let id = 1; id <= 18; id++) {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${id}`);
      const data = await response.json();
      allTypeNames.push(data.name);
    }

    allTypeNames.forEach(t => {
      if (
        !damageRelations.half_damage_from.has(t) &&
        !damageRelations.double_damage_from.has(t) &&
        !damageRelations.no_damage_from.has(t)
      ) {
        damageRelations.normal_damage.add(t);
      }
    });

    // Adicionar os tipos às caixas
    damageRelations.normal_damage.forEach(type => {
      const listItem = document.createElement('img');
      listItem.classList.add('icon');
      listItem.src = `../icons/${type}.svg`;
      boxNormalDamage.appendChild(listItem);
    });

    damageRelations.double_damage_from.forEach(type => {
      const listItem = document.createElement('img');
      listItem.classList.add('icon');
      listItem.src = `../icons/${type}.svg`;
      boxDoubleDamage.appendChild(listItem);
    });

    damageRelations.half_damage_from.forEach(type => {
      const listItem = document.createElement('img');
      listItem.classList.add('icon');
      listItem.src = `../icons/${type}.svg`;
      boxHalfDamage.appendChild(listItem);
    });

    damageRelations.no_damage_from.forEach(type => {
      const listItem = document.createElement('img');
      listItem.classList.add('icon');
      listItem.src = `../icons/${type}.svg`;
      boxNoDamage.appendChild(listItem);
    });



    const firstType = document.querySelectorAll('.type')
    const titlesMove = document.querySelector('.titles-move')
    // const slide3 = document.querySelector('#slide3')
    
    
    const colorIndex = window.getComputedStyle(firstType[0]).backgroundColor
    const body  = document.body
    body.style.backgroundColor = colorIndex

    // titlesMove.style.backgroundColor = colorIndex
    // slide3.style.border = `3px solid ${colorIndex}`
    
    const root = document.documentElement;
    root.style.setProperty('--padrao', colorIndex); // Define nova cor


    const imgPokemon = document.querySelector('.img_pokemon')
    imgPokemon.src = pokemonData.sprites.other["official-artwork"].front_default

    loadGraphPokemon(hp,defence,attack,speed,spAttack,spDefence,colorIndex)
    loadMovesPokemon(pokemonData)
    loadAboutPokemon(pokemon)
  } catch (error) {
    console.error('Erro ao buscar dados do Pokémon:', error);
  }
};

statsPokemon();
