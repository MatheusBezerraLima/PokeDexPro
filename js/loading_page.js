// VARIAVEIS PRINCIAIS 

const LoadingAnimation = () => {
    // elementos da barra de carregamento
    const boxLoadingBar = document.createElement('div')
    const loadingBar = document.createElement('div')
    const fillLoadingBar = document.createElement('span')

    boxLoadingBar.classList.add('box-loading-bar')
    loadingBar.classList.add('loading-bar')
    fillLoadingBar.classList.add('fill-loading-bar')

    // Elementos da imagem do pikachu
    const boxImgPikachu = document.createElement('div')
    const pikachuIMG = document.createElement('img')

    boxImgPikachu.classList.add('box-img-pikachu')
    pikachuIMG.classList.add('img-pikachu')
    pikachuIMG.src = './images/pikachu-running.gif'

    boxLoadingBar.appendChild(boxImgPikachu)
    boxImgPikachu.appendChild(pikachuIMG)
    boxLoadingBar.appendChild(loadingBar)
    loadingBar.appendChild(fillLoadingBar)

    document.body.appendChild(boxLoadingBar)

    setTimeout(() => {
        const bottomStart = document.createElement('a')
        const imgPlay = document.createElement('img')

        bottomStart.classList.add('bottom-start')

        imgPlay.src = './images/play-icon.png'
        bottomStart.href = './html/main.html'

        bottomStart.appendChild(imgPlay)

        document.body.appendChild(bottomStart)

    }, 3100);

    console.log(boxLoadingBar);
    console.log(boxImgPikachu);
    
    
    

}


document.addEventListener('DOMContentLoaded', LoadingAnimation)