// const openPokemonPage = (name, id) => {
//     console.log("entrou");
//     window.location.href = `../html/pokemonMain.html?namePokemon=${encodeURIComponent(name)}&idPokemon=${encodeURIComponent(id)}`;
// };


const Carousel = () =>{
    // Direita -> Esquerda
    const imageLeft = document.querySelector('#image-left')
    imageLeft.style.right = 0
    imageLeft.style.transform = 'translateX(0)'
    imageLeft.style.zIndex = '1'
    

    // Esquerda -> Meio
    const imageRight = document.querySelector('#image-right')
    imageRight.style.width  = '456px' 
    imageRight.style.right = '50%'
    imageRight.style.top = '10%'
    imageRight.style.transform = 'TranslateX(50%)'
    imageRight.style.filter = 'none'
    imageRight.style.zIndex = '998'

    // Meio -> Direita
    const imageCenter = document.querySelector('#image-center')
    imageCenter.style.right = 'calc(100% - 300px)' 
    imageCenter.style.top = 0 
    imageCenter.style.transform = 'none'
    imageCenter.style.filter = 'blur(0.15rem)'
    imageCenter.style.width = '300px'   
    imageCenter.style.zIndex = '1' 

    imageLeft.id = ''
    imageLeft.id = 'image-right'

    imageRight.id = ''
    imageRight.id = 'image-center'

    imageCenter.id = ''
    imageCenter.id = 'image-left'

    const main = document.querySelector('main')
    const colorBg = imageRight.getAttribute('data-color')
    console.log(colorBg);
    
    main.style.backgroundColor = `${colorBg}`
}

const teste = () => {
    // Direita -> Esquerda
    const imageLeft = document.querySelector('#image-left');
    imageLeft.style.right = 0;
    imageLeft.style.transform = 'translateX(0)';
    imageLeft.style.zIndex = '1';

    // Esquerda -> Meio
    const imageRight = document.querySelector('#image-right');
    imageRight.style.width = '456px';
    imageRight.style.right = '50%';
    imageRight.style.top = '10%';
    imageRight.style.transform = 'translateX(50%)';
    imageRight.style.filter = 'none';
    imageRight.style.zIndex = '998';

    // Meio -> Direita
    const imageCenter = document.querySelector('#image-center');
    imageCenter.style.right = 'calc(100% - 300px)';
    imageCenter.style.top = 0;
    imageCenter.style.transform = 'none';
    imageCenter.style.filter = 'blur(0.15rem)';
    imageCenter.style.width = '300px';
    imageCenter.style.zIndex = '1';

    // Atualizando os IDs
    imageLeft.id = 'image-right';
    imageRight.id = 'image-center';
    imageCenter.id = 'image-left';

    // Alterando a cor do fundo
    const main = document.querySelector('main');
    const colorBg = imageRight.getAttribute('data-color');
    console.log(colorBg);

    main.style.backgroundColor = `${colorBg}`;
};

// Inicia o loop infinito com intervalo de 5 segundos
setInterval(Carousel, 5000);

