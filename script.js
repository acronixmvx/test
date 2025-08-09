
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(draw, 33);

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('open');
        }
    });
});

function copyTokenID() {
    navigator.clipboard.writeText('NIX-de14cc').then(() => {
        alert('Token ID copied to clipboard!');
    });
}

function revealEmail() {
    const email = document.getElementById('email');
    email.style.display = 'inline';
}

async function fetchTokenData() {
    try {
        const response = await fetch('https://api.multiversx.com/tokens/NIX-de14cc');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        const supply = parseFloat(data.supply) / Math.pow(10, data.decimals);
        const circulatingSupply = parseFloat(data.circulatingSupply) / Math.pow(10, data.decimals);

        document.getElementById('price').textContent = 'N/A'; // API does not provide price
        document.getElementById('mcap').textContent = 'N/A'; // API does not provide market cap
        document.getElementById('supply').textContent = `${supply.toLocaleString()} $NIX`;
        document.getElementById('transfers').textContent = data.transfers.toLocaleString();
    } catch (error) {
        console.error('Error fetching token data:', error);
        document.getElementById('price').textContent = 'Loading...';
        document.getElementById('mcap').textContent = 'Loading...';
        document.getElementById('supply').textContent = 'Loading...';
        document.getElementById('transfers').textContent = 'Loading...';
    }
}

fetchTokenData();

window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});