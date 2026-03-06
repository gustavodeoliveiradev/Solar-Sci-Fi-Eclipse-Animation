const stars = document.getElementById("parallax-stars");

// Função única para calcular o movimento
const moveStars = (clientX, clientY) => {
    let x = clientX / window.innerWidth;
    let y = clientY / window.innerHeight;
    stars.style.transform = `translate(-${x * 50}px, -${y * 50}px)`;
};

// Para Computador (Mouse)
document.addEventListener("mousemove", (e) => {
    moveStars(e.clientX, e.clientY);
});

// Para Celular (Touch)
document.addEventListener("touchmove", (e) => {
    // No touch, pegamos a posição do primeiro dedo (touches[0])
    const touch = e.touches[0];
    moveStars(touch.clientX, touch.clientY);
});

const colorPicker = document.getElementById('colorPicker');

colorPicker.addEventListener('input', (e) => {
    const newColor = e.target.value;

    // Altera a variável --primary-neon no :root do CSS
    document.documentElement.style.setProperty('--primary-neon', newColor);

    // Opcional: faz a borda do painel mudar junto
    document.querySelector('.controls').style.borderColor = newColor;
});

const btnAudio = document.getElementById('btn-audio');
const bgAmbient = document.getElementById('bg-ambient');
const glitchSfx = document.getElementById('glitch-sfx');
// Selecionamos o elemento que tem a animação no CSS
const glitchElement = document.querySelector('.glitch-effect');

let isPlaying = false;

// 1. O BOTÃO: Ele apenas liga o sistema e o som de fundo
btnAudio.addEventListener('click', () => {
    if (!isPlaying) {
        bgAmbient.play();
        bgAmbient.volume = 0.4;

        btnAudio.innerText = "SISTEMAS ONLINE 🚀";
        btnAudio.classList.add('active');
        isPlaying = true;
    } else {
        bgAmbient.pause();
        glitchSfx.pause(); // Garante que o som do glitch pare também

        btnAudio.innerText = "SISTEMAS OFFLINE 📡";
        btnAudio.classList.remove('active');
        isPlaying = false;
    }
});

// 2. O MAESTRO: Ele vigia a animação e solta o som no momento certo
// 'animationiteration' acontece toda vez que a animação de 4s reseta
glitchElement.addEventListener('animationiteration', () => {
    if (isPlaying) {
        // Como o glitch visual no CSS acontece entre 91% e 95%...
        // ...nós esperamos 3.6 segundos (90% de 4s) para soltar o som!
        setTimeout(() => {
            if (isPlaying) { // Verifica se o usuário não desligou o som nesse meio tempo
                glitchSfx.currentTime = 0; // Volta o som para o início
                glitchSfx.volume = 0.2;
                glitchSfx.play();
            }
        }, 3600);
    }
});

