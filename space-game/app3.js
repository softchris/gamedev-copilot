// Get the canvas and context
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

// Define the player and monster ships
var player = { x: 400, y: 300, img: null, dx: 0, dy: 0};
var monsters = [
    { x: 100, y: 100, width: 50, height: 50, color: 'green' },
    { x: 300, y: 200, width: 50, height: 50, color: 'green' },
    { x: 500, y: 300, width: 50, height: 50, color: 'green' }
];

// Function to draw a ship
function drawShip(ship) {
    if (ship.img) {
        ctx.drawImage(ship.img, ship.x, ship.y);
    } else {
        ctx.fillRect(ship.x, ship.y, 50, 50); // Fallback if image is not loaded
    }
}

function drawMonsters() {
    monsters.forEach(function(monster) {
        drawShip(monster);
    });
}



async function init() {
    // Load the image and start the game loop
    player.img = await loadImage('assets/player.png')
    console.log("game started");
    gameLoop();
}

// Start the game loop
init();

// Add keyboard controls
window.addEventListener('keydown', function(e) {
    e.preventDefault();
    switch(e.key) {
        case 'ArrowUp': player.dy = -2; break;
        case 'ArrowDown': player.dy = 2; break;
        case 'ArrowLeft': player.dx = -2; break;
        case 'ArrowRight': player.dx = 2; break;
    }
});

window.addEventListener('keyup', function(e) {
    e.preventDefault();
    switch(e.key) {
        case 'ArrowUp':
        case 'ArrowDown': player.dy = 0; break;
        case 'ArrowLeft':
        case 'ArrowRight': player.dx = 0; break;
    }
});



function gameLoop() {
    // console.log('gameLoop');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.x += player.dx;
    player.y += player.dy;

    drawShip(player);
    drawMonsters();

    requestAnimationFrame(gameLoop);
}

 

async function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image at ${url}`));
        img.src = url;
    });
}
