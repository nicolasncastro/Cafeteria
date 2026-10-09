const timeline = document.querySelector('.linha-do-tempo');
const btnHistoria = document.querySelector('.verMais');

const galeriaSection = document.querySelector('.galeria-cafe');
const galeria = document.querySelector('.galeria');
const imagens = document.querySelectorAll('.galeria .imagem img');

const menuToggle = document.querySelector('.menu-toggle');
const menuHeader = document.querySelector('.menu-header');
const linksMenu = document.querySelectorAll('.menu-header a');


// BOTÃO "VER MAIS"

btnHistoria.addEventListener('click', () => {

    const posicaoScroll = window.scrollY;
    const estavaAberto = timeline.classList.contains('expandir');

    timeline.classList.toggle('expandir');

    btnHistoria.textContent =
        timeline.classList.contains('expandir')
            ? 'Ver menos'
            : 'Ver mais';

    if (estavaAberto) {
        setTimeout(() => {
            window.scrollTo(0, posicaoScroll);
        }, 500);
    }

});

// ROLAGEM DAS IMAGENS

window.addEventListener('scroll', () => {

    const posicao = galeriaSection.getBoundingClientRect();

    const distanciaPercorrida = -posicao.top;

    const distanciaTotal =
        galeriaSection.offsetHeight - window.innerHeight;

    let progresso = distanciaPercorrida / distanciaTotal;

    progresso = Math.max(0, Math.min(1, progresso));

    // Movimento horizontal da galeria
    const deslocamento = progresso * -200;

    galeria.style.transform = `translateX(${deslocamento}vw)`;


    // ZOOM DAS IMAGENS
    imagens.forEach((imagem, indice) => {

        const inicio = indice / 3;
        const fim = (indice + 1) / 3;

        let progressoImagem =
            (progresso - inicio) / (fim - inicio);

        progressoImagem = Math.max(
            0,
            Math.min(1, progressoImagem)
        );

        // Zoom máximo no meio da imagem
        const distanciaDoCentro =
            Math.abs(progressoImagem - 0.5) * 2;

        const zoom =
            1.10 - (distanciaDoCentro * 0.10);

        imagem.style.transform = `scale(${zoom})`;
    });

});




menuToggle.addEventListener('click', () => {
    const aberto = menuHeader.classList.toggle('ativo');

    menuToggle.setAttribute('aria-expanded', aberto);
    menuToggle.setAttribute(
        'aria-label',
        aberto ? 'Fechar menu' : 'Abrir menu'
    );
});

linksMenu.forEach(link => {
    link.addEventListener('click', () => {
        menuHeader.classList.remove('ativo');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
    });
});