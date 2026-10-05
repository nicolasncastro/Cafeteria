const timeline =document.querySelector('.linha-do-tempo');
const btnHistoria = document.querySelector('.verMais');

btnHistoria.addEventListener('click', () => {
    timeline.classList.toggle('expandir');
    btnHistoria.textContent = timeline.classList.contains('expandir') ? 'Ver menos' : 'Ver mais';
});

