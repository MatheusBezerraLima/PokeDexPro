
var pokemon = ''

const getData = async() =>{
    const teamPokemon = JSON.parse(localStorage.getItem('teamPokemon')) || [];
    console.log(teamPokemon);
    
    for(i = 0; i <= teamPokemon.length; i++){
        pokemon = teamPokemon[i]
    
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);        
        const pokemonData = await response.json()
        console.log(pokemonData);

        const card = document.querySelector(`#card${i+1}`)
        const imgCard = card.querySelector('img')
        imgCard.src = pokemonData.sprites.other["official-artwork"].front_default

        const nameCard = card.querySelector('h1')
        nameCard.innerHTML = pokemonData.name

        const hpCard = card.querySelector('.valueHp')
        hpCard.innerHTML = pokemonData.stats[0].base_stat

        const attackCard = card.querySelector('.valueAttack')
        attackCard.innerHTML = pokemonData.stats[1].base_stat

        console.log(pokemonData.types[0].type.name);
        

        card.style.background =  `var(--${pokemonData.types[0].type.name})`

    }
}



document.addEventListener('load', getData())