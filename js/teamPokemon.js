
  var pokemon = ''

  const returnPreviousPage = () =>{
    window.history.back();
  }

  const getData = async () => {
      const teamPokemon = JSON.parse(localStorage.getItem('teamPokemon')) || [];
      console.log(teamPokemon);

      let totalAttack = 0; // Para armazenar o ataque total
      let totalHP = 0; // Para armazenar o HP total
    
      for (let i = 0; i < teamPokemon.length; i++) {
        const pokemon = teamPokemon[i];
        
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
          const pokemonData = await response.json();
          console.log(pokemonData);
    
          const card = document.querySelector(`#card${i + 1}`);
          if (!card) {
            console.warn(`Card com ID #card${i + 1} não encontrado.`);
            continue;
          }
    
          const nonePokemon = card.querySelector('.nonePokemon');
          if (nonePokemon) nonePokemon.style.display = 'none';
    
          const imgCard = card.querySelector('.image-card-pokemon');
          if (imgCard) imgCard.src = pokemonData.sprites.other["official-artwork"].front_default;
    
          const nameCard = card.querySelector('h1');
          if (nameCard) nameCard.innerHTML = pokemonData.name;
    
          const hpCard = card.querySelector('.valueHp');
          if (hpCard) hpCard.innerHTML = pokemonData.stats[0].base_stat;
    
          const attackCard = card.querySelector('.valueAttack');
          if (attackCard) attackCard.innerHTML = pokemonData.stats[1].base_stat;
    
          const types = pokemonData.types;
          const typePokemon = card.querySelector('.typePokemon');
          const iconsTypes = [];
    
          card.style.background = `var(--${pokemonData.types[0].type.name})`;
    
          for (let j = 0; j < types.length; j++) {
            iconsTypes.push(types[j].type.name);
          }
    
          if (iconsTypes.length === 2) {
            typePokemon.innerHTML = `
              <img src='../icons/${iconsTypes[0]}.svg'>
              <img src='../icons/${iconsTypes[1]}.svg'>
            `;
          } else {
            typePokemon.innerHTML = `
              <img src='../icons/${iconsTypes[0]}.svg'>
            `;
          }
    

          totalAttack += pokemonData.stats[1].base_stat; // Attack stat
          totalHP += pokemonData.stats[0].base_stat; // HP stat



          // Cria botão para remover Pokémon
          const removeButton = document.createElement('button');
          removeButton.innerHTML ="<img src='../icons/excluir.png'> ";
          removeButton.classList.add('remove-pokemon-button');
          removeButton.onclick = () => removePokemon(pokemon, i);
          card.appendChild(removeButton);
    
        } catch (error) {
          console.error(`Erro ao carregar dados do Pokémon ${pokemon}:`, error);
        }
      }
    };
    
    // Função para remover o Pokémon do localStorage
    const removePokemon = (pokemon, index) => {
      const teamPokemon = JSON.parse(localStorage.getItem('teamPokemon')) || [];
    
      // Remove o Pokémon específico da lista
      const updatedTeam = teamPokemon.filter((p, i) => i !== index);
    
      // Atualiza o localStorage
      localStorage.setItem('teamPokemon', JSON.stringify(updatedTeam));
    
      // Atualiza a página para refletir as mudanças
      alert(`${pokemon} foi removido do time!`);
      window.location.reload(); // Recarrega a página para atualizar os cards
    };
    
    // Use "DOMContentLoaded" para garantir que a página esteja completamente carregada antes de chamar getData
    document.addEventListener('DOMContentLoaded', getData);
    