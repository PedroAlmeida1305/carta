const titleText = "Feliz Aniversário, Meu amor! 💖";
const messages = [
    "Hoje é um dia muito especial, o dia em que o mundo foi presenteado com você.",
    "Amor, você é a razão do meu sorriso, o abraço que conforta e o amor que aquece minha alma.",
    "Cada momento ao seu lado é um capítulo lindo da nossa história.",
    "Quero que saiba que, neste dia e em todos os outros, você é a minha prioridade e meu maior presente.",
    "Que sua vida seja repleta de sorrisos sinceros, sonhos realizados e momentos inesquecíveis.",
    "Eu prometo estar ao seu lado para celebrar as vitórias e segurar sua mão nos desafios.",
    "Você é incrível, maravilhosa e perfeita do jeito que é.",
    "Eu ti amo mais do que estrelas no céu podem brilhar. ❤️",
    "Feliz aniversário, meu amor! Que venham muitos outros ao seu lado. 🎂💖",
    "Eu ti amo ETERNAMENTE, e nada neste mundo poderá separar nossos corações ",
];

const title = document.getElementById('title');
const messageEl = document.getElementById('message');
const nextBtn = document.getElementById('nextBtn');
const card = document.getElementById('card');

let messageIndex = 0;

// Digitação
function typeWriter(text, element, speed = 50, callback) {
    let i = 0;
    element.innerHTML = '';
    const interval = setInterval(() => {
        element.innerHTML += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            if(callback) callback();
        }
    }, speed);
}

// Mudança de cor do card
function changeCardColor() {
    const colors = ['#fff0f6', '#ffe6f0', '#ffd1e6', '#ffb3d9', '#ff99cc'];
    card.style.background = colors[messageIndex % colors.length];
}

// Corações flutuantes
function createHearts() {
    const heartsContainer = document.querySelector('.hearts');
    setInterval(() => {
        for(let j=0; j<3; j++){
            const heart = document.createElement('div');
            heart.classList.add('heart');
            const size = 10 + Math.random() * 20; // menor
            heart.style.width = size + 'px';
            heart.style.height = size + 'px';
            heart.style.backgroundColor = `hsl(${Math.random()*360}, 80%, 70%)`;
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (3 + Math.random() * 4) + 's';
            heartsContainer.appendChild(heart);
            setTimeout(() => heart.remove(), 7000);
        }
    }, 200);
}

// Explosão final
function finalExplosion() {
    const heartsContainer = document.querySelector('.hearts');
    for(let i = 0; i < 100; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        const size = 10 + Math.random() * 20; // menor
        heart.style.width = size + 'px';
        heart.style.height = size + 'px';
        heart.style.backgroundColor = `hsl(${Math.random()*360}, 80%, 70%)`;
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDuration = (2 + Math.random() * 2) + 's';
        heartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }
}

// Avançar mensagens
nextBtn.addEventListener('click', () => {
    if (messageIndex < messages.length) {
        typeWriter(messages[messageIndex], messageEl, 50, () => {
            changeCardColor();
            if(messageIndex === messages.length -1){
                finalExplosion();
            }
        });
        messageIndex++;
        if (messageIndex === messages.length) nextBtn.innerText = "Fim 💖";
    } else {
        nextBtn.style.display = 'none';
    }
});

// Inicialização
typeWriter(titleText, title, 100, () => nextBtn.style.display = 'inline-block');
createHearts();

// Confete
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiParticles = [];
for(let i=0; i<150; i++){
    confettiParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 6 + 2,
        d: Math.random() * 10 + 1,
        color: `hsl(${Math.random()*360}, 100%, 50%)`,
        tilt: Math.random() * 10 - 10
    });
}

function drawConfetti(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confettiParticles.forEach(p => {
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r/2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r/2);
        ctx.stroke();
        p.y += Math.cos(p.d) + 1 + p.r/2;
        p.x += Math.sin(p.d);
        if(p.y > canvas.height){ p.y = -10; p.x = Math.random()*canvas.width; }
    });
    requestAnimationFrame(drawConfetti);
}

drawConfetti();

// Interação por toque/click
document.querySelector('.card').addEventListener('click', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for(let i=0; i<5; i++){
        const heart = document.createElement('div');
        heart.classList.add('heart');
        const size = 10 + Math.random() * 20; // menor
        heart.style.width = size + 'px';
        heart.style.height = size + 'px';
        heart.style.left = x + Math.random()*30 -15 + 'px';
        heart.style.top = y + Math.random()*30 -15 + 'px';
        heart.style.backgroundColor = `hsl(${Math.random()*360}, 80%, 70%)`;
        heart.style.animationDuration = (2 + Math.random() * 2) + 's';
        document.querySelector('.hearts').appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }
});
