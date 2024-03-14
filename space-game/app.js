// draw a rectangle 40 x 40 pixels, should be red, on the canvas
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.color = 'red';
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

// add monster class, should be blue, there are 3 monsters, all 40 x 40 pixels, evenly spaced across the top of the canvas
class Monster {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.color = 'blue';
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

let canvasWidth = 600;
let numberOfMonsters = 3;
let spacing = 60;

let monsters = [
    new Monster(-100, 0),
    new Monster(-200, 0),
    new Monster(-300 * 2, 0)
];

class Laser {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 10;
        this.color = 'red';
        this.speed = 0.05;
    }

    draw() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    move() {
        this.y -= this.speed;
    }

    offScreen() {
        return this.y <= 0;
    }
}

let lasers = [];

// move the rectangle with arrow keys
let player = new Player(0, 0);



document.addEventListener('keydown', function(event) {
    // override browser's default behavior
    event.preventDefault();
   
    if (event.key === 'd') {
        player.x += 5;
    } else if (event.key === 'a') {
        player.x -= 5;
    } else if (event.key === 'w') {
        player.y -= 5;
    } else if (event.key === 's') {
        player.y += 5;
    } else if (event.code === 'Space') {
        lasers.push(new Laser(player.x + player.width / 2, player.y));
    }
});

// call request animation frame 20 times per second
setInterval(function() {
    window.requestAnimationFrame(gameLoop);
}, 1000 / 20);


function renderPlayer() {
    player.draw(context);
}

// create a game loop
function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    renderPlayer();

    for (let i = 0; i < lasers.length; i++) {
        lasers[i].draw(context);
        lasers[i].move();

        if (lasers[i].offScreen()) {
            lasers.splice(i, 1);
            i--;
        }
    }

    // draw monsters
    for (let i = 0; i < monsters.length; i++) {
        monsters[i].draw(context);
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();