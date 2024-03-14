// Get the canvas and context
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

// Define the player and monster ships
var player = { x: 400, y: 300, width: 50, height: 50, color: 'red', dx: 0, dy: 0 };
var monsters = [
    { x: 100, y: 100, width: 50, height: 50, color: 'green' },
    { x: 300, y: 200, width: 50, height: 50, color: 'green' },
    { x: 500, y: 300, width: 50, height: 50, color: 'green' }
];

// Function to draw a ship
function drawShip(ship) {
    ctx.fillStyle = ship.color;
    ctx.fillRect(ship.x, ship.y, ship.width, ship.height);
}

// Game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the player and monster ships
    drawShip(player);
    monsters.forEach(drawShip);

    // Move the player ship
    player.x += player.dx;
    player.y += player.dy;

    // Call the game loop again on the next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

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

function drawMonsters() {
    monsters.forEach(function(monster) {
        drawShip(monster);
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.x += player.dx;
    player.y += player.dy;
    
    drawShip(player);
    drawMonsters();
    requestAnimationFrame(gameLoop);
}

 