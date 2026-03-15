/* ==========================================================================
   1. SELETORES E VARIÁVEIS GLOBAIS
   ========================================================================== */
const stars = document.getElementById("parallax-stars");
const colorPicker = document.getElementById('colorPicker');
const controlsPanel = document.querySelector('.controls');
const glitchElement = document.querySelector('.glitch-effect');

// Elementos de Áudio
const btnAudio = document.getElementById('btn-audio');
const bgAmbient = document.getElementById('bg-ambient');
const glitchSfx = document.getElementById('glitch-sfx');
const sfxStartup = document.getElementById('sfx-startup');
const sfxShutdown = document.getElementById('sfx-shutdown');

let isPlaying = false;

/* ==========================================================================
   2. SISTEMA DE ENERGIA (COLOR PICKER)
   ========================================================================== */
colorPicker.addEventListener('input', (e) => {
    const newColor = e.target.value;

    // Atualiza CSS Variable global
    document.documentElement.style.setProperty('--primary-neon', newColor);

    // Feedback visual no painel de controles
    if (controlsPanel) {
        controlsPanel.style.borderColor = newColor;
        controlsPanel.style.boxShadow = `0 0 15px ${newColor}`;
    }
});

/* ==========================================================================
   3. MOTOR DE MOVIMENTO (PARALLAX)
   ========================================================================== */
const moveStars = (x, y) => {
    const xPercent = x / window.innerWidth;
    const yPercent = y / window.innerHeight;

    // Range de movimento: -15px a +15px
    const moveX = (xPercent - 0.5) * 30;
    const moveY = (yPercent - 0.5) * 30;

    stars.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
};

// Eventos de Input (Mouse e Touch)
document.addEventListener("mousemove", (e) => moveStars(e.clientX, e.clientY));

document.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
        e.preventDefault();
        moveStars(e.touches[0].clientX, e.touches[0].clientY);
    }
}, { passive: false });

document.addEventListener("mouseleave", () => {
    stars.style.transform = "translate(0, 0)";
});

/* ==========================================================================
   4. NÚCLEO DE ÁUDIO E SINCRONIA
   ========================================================================== */
const fadeOut = (audioElement) => {
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
    }, 50);
};

// Gerenciador do Botão Principal
btnAudio.addEventListener('click', () => {
    if (!isPlaying) {
        activateSystems();
    } else {
        deactivateSystems();
    }
});

const activateSystems = () => {
    sfxStartup.play();
    setTimeout(() => {
        bgAmbient.currentTime = 0;
        bgAmbient.play();
        bgAmbient.volume = 0.4;
    }, 1000);

    btnAudio.innerText = "SISTEMAS ONLINE 🚀";
    btnAudio.classList.add('active');
    isPlaying = true;
};

const deactivateSystems = () => {
    sfxShutdown.play();
    fadeOut(bgAmbient);
    glitchSfx.pause();

    btnAudio.innerText = "SISTEMAS OFFLINE 📡";
    btnAudio.classList.remove('active');
    isPlaying = false;
};

// Maestro da Sincronia (Glitch)
glitchElement.addEventListener('animationiteration', () => {
    if (isPlaying) {
        // Dispara o som aos 90% da animação de 4s (3.6s)
        setTimeout(() => {
            if (isPlaying) {
                glitchSfx.currentTime = 0;
                glitchSfx.volume = 0.2;
                glitchSfx.play();
            }
        }, 3600);
    }
});