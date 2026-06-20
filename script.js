let slideIndex = 1;
let slideTimeout;

// Aguarda o HTML carregar completamente antes de iniciar o carrossel
document.addEventListener("DOMContentLoaded", () => {
    showSlides(slideIndex);
});

// Função ligada aos botões de setas (onclick="changeSlide(-1)" e "changeSlide(1)")
function changeSlide(n) {
    // Interrompe o temporizador automático atual para não atropelar o clique manual
    clearTimeout(slideTimeout); 
    showSlides(slideIndex += n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    
    // Se passar do último slide, volta para o primeiro
    if (n > slides.length) { slideIndex = 1; }
    // Se for menor que o primeiro, vai para o último
    if (n < 1) { slideIndex = slides.length; }
    
    // Esconde todos os slides da tela
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Exibe apenas o slide atual se ele existir
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
    }
    
    // Configura o loop contínuo automático para mudar a cada 5 segundos (5000ms)
    slideTimeout = setTimeout(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 5000);
}