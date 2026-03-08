// Captura o input de cor
const colorPicker = document.getElementById('colorPicker');

// Escuta a mudança de cor
colorPicker.addEventListener('input', (e) => {
    const newColor = e.target.value;

    // Altera a variável global --primary-neon que usamos em todo o CSS
    document.documentElement.style.setProperty('--primary-neon', newColor);

    // Faz a borda do painel de controle brilhar na mesma cor
    const controls = document.querySelector('.controls');
    if (controls) {
        controls.style.borderColor = newColor;
        controls.style.boxShadow = `0 0 15px ${newColor}`;
    }
});

// Função única para calcular o movimento
const stars = document.getElementById("parallax-stars");

const moveStars = (x, y) => {
    // Calcula porcentagem da posição (0 a 1)
    const xPercent = x / window.innerWidth;
    const yPercent = y / window.innerHeight;

    // Movimento suave inverso (parallax)
    const moveX = (xPercent - 0.5) * 30; // Range: -15px a +15px
    const moveY = (yPercent - 0.5) * 30;

    stars.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
};

// Mouse (desktop)
document.addEventListener("mousemove", (e) => {
    moveStars(e.clientX, e.clientY);
});

// Touch (mobile) - CORRIGIDO
document.addEventListener("touchmove", (e) => {
    e.preventDefault(); // Previne scroll durante o parallax
    const touch = e.touches[0];
    moveStars(touch.clientX, touch.clientY);
}, { passive: false });

// Também funciona com o toque inicial (touchstart)
document.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    moveStars(touch.clientX, touch.clientY);
}, { passive: true });

// Reset suave quando sai da tela
document.addEventListener("mouseleave", () => {
    stars.style.transform = "translate(0, 0)";
});

const btnAudio = document.getElementById('btn-audio');
const bgAmbient = document.getElementById('bg-ambient');
const glitchSfx = document.getElementById('glitch-sfx');
// Selecionamos o elemento que tem a animação no CSS
const glitchElement = document.querySelector('.glitch-effect');
const sfxStartup = document.getElementById('sfx-startup');
const sfxShutdown = document.getElementById('sfx-shutdown');

let isPlaying = false;

const fadeOut = (audioElement) => {
    // Pegamos o volume atual (ex: 0.4)
    let volume = audioElement.volume;

    const interval = setInterval(() => {
        if (volume > 0.02) {
            volume -= 0.02;
            audioElement.volume = volume;
        } else {
            audioElement.volume = 0;
            audioElement.pause();
            clearInterval(interval);
        }
    }, 50); // A cada 50ms reduz um pouco
};

// 1. O BOTÃO: Ele liga e desliga os sons, além de mudar o texto e estilo
btnAudio.addEventListener('click', () => {
    if (!isPlaying) {
        sfxStartup.play();

        setTimeout(() => {
            bgAmbient.currentTime = 0;
            bgAmbient.play();
            bgAmbient.volume = 0.4; // Volume inicial limpo
        }, 1000);

        btnAudio.innerText = "SISTEMAS ONLINE 🚀";
        btnAudio.classList.add('active');
        isPlaying = true;
    } else {
        sfxShutdown.play();

        // 2. CHAME A FUNÇÃO AQUI (Substituindo o bgAmbient.pause())
        fadeOut(bgAmbient);

        glitchSfx.pause();

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

