const teste = async() =>{
    const data = await fetch('https://pokeapi.co/api/v2/pokemon/shuckle/')
    const response = await data.json()
    console.log(response);
    
    console.log(response);
    
}
teste()