async function fetchPokemonGif(pokemonName) {
    try {
        // Normalize o nome do Pokémon para minúsculas
        const normalizedName = pokemonName.toLowerCase();

        // URLs para o sprite padrão e a versão shiny
        const baseSpriteUrl = `https://play.pokemonshowdown.com/sprites/ani/${normalizedName}.gif`;
        const shinySpriteUrl = `https://play.pokemonshowdown.com/sprites/ani-shiny/${normalizedName}.gif`;

        // Verificar se o sprite padrão existe
        const baseResponse = await fetch(baseSpriteUrl);
        const shinyResponse = await fetch(shinySpriteUrl);

        console.log(baseResponse);
        console.log(shinyResponse);
        

        if (!baseResponse.ok || !shinyResponse.ok) {
            throw new Error("Pokémon não encontrado ou sprite não disponível.");
        }

        // Retornar URLs dos sprites para uso em uma página
        return {
            normal: baseSpriteUrl,
            shiny: shinySpriteUrl
            
        };
    } catch (error) {
        console.error("Erro ao buscar sprites do Pokémon:", error);
    }
}

const loadDetails = () =>{
    const urlParams = new URLSearchParams(window.location.search)
    const name = urlParams.get('namePokemon')
    const id = urlParams.get('idPokemon')

    fetchPokemonGif(name)
}


document.addEventListener("DOMContentLoaded", loadDetails)