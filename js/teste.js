const teste = async() =>{
    const data = await fetch('https://pokeapi.co/api/v2/pokemon/8/')
    const response = await data.json()
    console.log(response);
    
    console.log(response.sprites.front_default);
    
}
teste()