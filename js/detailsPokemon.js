// async function fetchPokemonGif(pokemonName) {
//     try {
//         // Normalize o nome do Pokémon para minúsculas
//         const normalizedName = pokemonName.toLowerCase();

//         // URLs para o sprite padrão e a versão shiny
//         const baseSpriteUrl = `https://play.pokemonshowdown.com/sprites/ani/${normalizedName}.gif`;
//         const shinySpriteUrl = `https://play.pokemonshowdown.com/sprites/ani-shiny/${normalizedName}.gif`;

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

// const loadDetails = () =>{
//     const urlParams = new URLSearchParams(window.location.search)
//     const name = urlParams.get('namePokemon')
//     const id = urlParams.get('idPokemon')

//     fetchPokemonGif(name)
// }


// document.addEventListener("DOMContentLoaded", loadDetails)

const slides = document.querySelector('.slides');
const buttons = document.querySelectorAll('.controls button');

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Move o slider para o slide correspondente
    slides.style.transform = `translateX(-${index * 100}%)`;

    // Atualiza estilos dos botões (opcional)
    buttons.forEach(btn => {
        btn.classList.remove('active') 
        btn.classList.add('disable')
    });

    button.classList.add('active');
    button.classList.remove('disable')
  });
});


var ctx = document.querySelector('.slide-stats');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['HP', 'Attack', 'Defence', 'Sp.atk', 'Sp.def', 'Speed'],
    datasets: [
      {
        label: 'Preenchido',
        data: [20, 45, 10, 50, 20, 60], // Valores reais
        backgroundColor: 'green'
      },
      {
        label: 'Vazio',
        data: [80, 55, 90, 50, 80, 40], // Espaço restante para completar 100
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
        max: 100, // Limite máximo para simular preenchimento total
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


const typePokemon = async() => {
  const boxNormalDamage = document.querySelector('#box-normal-damage')
  const boxHalfDamage = document.querySelector('#box-half-damage')
  const boxDoubleDamage = document.querySelector('#box-double-damage')
  const boxNoDamage = document.querySelector('#box-no-damage')
  boxNormalDamage.innerHTML = ''
  console.log(boxNormalDamage);
  
  const pokemon = 'pikachu'

  if(!pokemon){
    alert('Por favor, insira um nome de pokemon')
    return
  }

  try{
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(!pokemonResponse.ok) throw new Error('Pokemon nao encontrado')
    const pokemonData = await pokemonResponse.json()
    console.log(pokemonData); 
    const types = pokemonData.types.map(type => type.type.name)
    console.log(types);
    
    const damageRelations = {
      half_damage_from: new Set(),
      double_damage_from: new Set(),
      no_damage_from: new Set(),
      normal_damage: new Set(),
  };

    for(const type of types){
      const typeResponse =  await fetch(`https://pokeapi.co/api/v2/type/${type}`)
      const typeData = await typeResponse.json()
      console.log(typeData);
      
      typeData.damage_relations.half_damage_from.forEach(t =>
        damageRelations.half_damage_from.add(t.name))
    
        console.log(damageRelations.half_damage_from);
        
      typeData.damage_relations.double_damage_from.forEach(t =>
        damageRelations.double_damage_from.add(t.name))

      typeData.damage_relations.no_damage_from.forEach(t =>
      damageRelations.no_damage_from.add(t.name))

      // Obtenha os nomes dos 18 tipos de Pokémon
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

      damageRelations.normal_damage.forEach(type => {
        const listItem = document.createElement('img');
        listItem.classList.add('icon');
        listItem.src = `../icons/${type}.svg`
        boxNormalDamage.appendChild(listItem);
      });
      damageRelations.double_damage_from.forEach(type => {
        const listItem = document.createElement('img');
        listItem.classList.add('icon');
        listItem.src = `../icons/${type}.svg`
        boxDoubleDamage.appendChild(listItem);
      });
      damageRelations.half_damage_from.forEach(type => {
        const listItem = document.createElement('img');
        listItem.classList.add('icon');
        listItem.src = `../icons/${type}.svg`
        boxHalfDamage.appendChild(listItem);
      });
      damageRelations.no_damage_from.forEach(type => {
        const listItem = document.createElement('img');
        listItem.classList.add('icon');
        listItem.src = `../icons/${type}.svg`
        boxNoDamage.appendChild(listItem);
    });
 
    }
 
    }catch{
      console.error()
      
    }
}

typePokemon()