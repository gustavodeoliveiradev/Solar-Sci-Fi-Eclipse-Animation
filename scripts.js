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