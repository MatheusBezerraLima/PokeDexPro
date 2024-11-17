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


var currentIndex = 4 

const moveCardRegions = (event) =>{
    const slider = document.querySelector('.box-regions')
    const cardsSlider = slider.children
    const cardWidth = cardsSlider[0].offsetWidth

    const fontSizeRoot = parseFloat(window.getComputedStyle(document.documentElement).fontSize); // Pega o font-size em pixels do root (html)
    const gap = 0.8 * fontSizeRoot;

    console.log(event);
    
    if(event.classList.contains('fa-angle-right')){
        currentIndex++

        const leftIcon = document.querySelector('.fa-angle-left')
        leftIcon.style.display = 'block'

        slider.scrollTo({
            left: slider.scrollLeft +  (cardWidth + gap),
            behavior: "smooth"
        });

        if(currentIndex == 9){
            event.style.display = 'none'
        }

    }else{
        currentIndex--

        const rightIcon = document.querySelector('.fa-angle-right')
        rightIcon.style.display = 'block'

        slider.scrollTo({
            left: slider.scrollLeft -  (cardWidth + gap),
            behavior: "smooth"
        });

        if(currentIndex == 4){
            event.style.display = 'none'
        }

    }
    

}


const expandContentRegion = (nameRegion) =>{
    const cardRegion = document.querySelector(`#${nameRegion}`)
    console.log(cardRegion);
    
}