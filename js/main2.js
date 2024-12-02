
function showModal(title,text){

document.getElementById("modal-title").innerText = title;
document.getElementById("modal-text").innerText = text;

const elemento = document.getElementById("modal");
elemento.classList.add("show-modal");
}   

function hideModal(){
    const elemento = document.getElementById("modal");
    elemento.classList.remove("show-modal");
}