document.addEventListener('DOMContentLoaded', function () {
    // Inicializar AOS
    AOS.init({
        duration: 800,
        once: true,
    });

    // Lógica do Carrossel
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    let slideWidth = slides.length > 0 ? slides[0].getBoundingClientRect().width : 0;
    let currentIndex = 0;

    const moveToSlide = (targetIndex) => {
        if(slides.length === 0) return;
        if (targetIndex < 0) targetIndex = slides.length - 1;
        if (targetIndex >= slides.length) targetIndex = 0;

        track.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';
        currentIndex = targetIndex;
    }

    nextButton.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
    });

    prevButton.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
    });
    
    // Auto-play do carrossel
    setInterval(() => {
        moveToSlide(currentIndex + 1);
    }, 5000); // Muda a cada 5 segundos

    // Ajustar largura do slide em caso de redimensionamento da janela
     window.addEventListener('resize', () => {
        if(slides.length > 0) {
           slideWidth = slides[0].getBoundingClientRect().width;
           track.style.transition = 'none'; // Desabilitar transição para ajuste instantâneo
           track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
           setTimeout(() => {
              track.style.transition = 'transform 0.5s ease-in-out';
           }, 10);
        }
     });

    // Lógica do Menu Mobile
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Fechar menu mobile ao clicar em um link
    mobileMenu.addEventListener('click', (e) => {
         if(e.target.tagName === 'A') {
              mobileMenu.classList.add('hidden');
         }
    });

    // Lógica do Botão Voltar ao Topo
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
        } else {
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
