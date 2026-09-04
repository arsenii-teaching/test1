// ============================================================
// Prompt 3: basic game loop setup
// ============================================================

// Get the canvas and 2D context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width;   // 400
const CANVAS_HEIGHT = canvas.height; // 600

// ===== Constants =====
const PLAYER_WIDTH = 30;
const PLAYER_HEIGHT = 60;
const PLAYER_SPEED = 5;      // px per frame
const ENEMY_WIDTH = 30;      // same size as player
const ENEMY_HEIGHT = 60;
const ENEMY_SPEED = 3;       // px per frame
const SPAWN_INTERVAL = 60;   // frames between enemy spawns
const ROAD_LINE_SPEED = 3;   // px per frame (road scroll speed)
const DASH_LENGTH = 30;
const DASH_GAP = 25;
const RETRO_FONT = '"Press Start 2P", "Courier New", monospace';

// ===== Game state =====
let player;
let enemies;
let score;
let frameCount;
let roadOffset;
let gameOver;
let animationId = null;
const keys = { left: false, right: false };

// Reset all variables (also used for the Spacebar restart)
function resetGame() {
    // Player car: 30x60 rectangle starting at the bottom center
    player = {
        x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2,
        y: CANVAS_HEIGHT - PLAYER_HEIGHT - 20,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
    };
    enemies = [];
    score = 0;
    frameCount = 0;
    roadOffset = 0;
    gameOver = false;
    keys.left = false;
    keys.right = false;
}

// ============================================================
// Prompt 3: input handling (with Prompt 5: preventDefault)
// ============================================================

document.addEventListener('keydown', (event) => {
    // Prevent the page from scrolling with arrow keys (and space)
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
    }
    if (event.key === 'ArrowLeft') keys.left = true;
    if (event.key === 'ArrowRight') keys.right = true;

    // Prompt 5: restart the game when the player presses the Spacebar
    if (event.key === ' ' && gameOver) {
        if (animationId !== null) cancelAnimationFrame(animationId);
        resetGame();          // reset all variables + clear enemies
        gameLoop();           // restart the loop
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') keys.left = false;
    if (event.key === 'ArrowRight') keys.right = false;
});

// ============================================================
// Prompt 4: enemy cars (obstacles)
// ============================================================

function spawnEnemy() {
    enemies.push({
        x: Math.random() * (CANVAS_WIDTH - ENEMY_WIDTH), // random x position
        y: -ENEMY_HEIGHT,                                // start just above the canvas
        width: ENEMY_WIDTH,
        height: ENEMY_HEIGHT,
    });
}

// ===== Update =====
function update() {
    // Move the player car (5px per frame)
    if (keys.left) player.x -= PLAYER_SPEED;
    if (keys.right) player.x += PLAYER_SPEED;

    // Keep the player inside the canvas
    player.x = Math.max(0, Math.min(CANVAS_WIDTH - player.width, player.x));

    // Spawn a new enemy every 60 frames
    frameCount++;
    if (frameCount % SPAWN_INTERVAL === 0) {
        spawnEnemy();
    }

    // Move enemies downward at 3px per frame
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.y += ENEMY_SPEED;

        // When an enemy goes off the bottom, remove it and increase the score
        if (enemy.y > CANVAS_HEIGHT) {
            enemies.splice(i, 1);
            score++;
        }
    }

    // Scroll the road center dashes downward
    roadOffset = (roadOffset + ROAD_LINE_SPEED) % (DASH_LENGTH + DASH_GAP);

    // Prompt 4: simple AABB collision detection between player and each enemy
    for (const enemy of enemies) {
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            gameOver = true; // collision occurred
            break;
        }
    }
}

// ===== Draw =====

// Road: two gray lanes + dashed white center lines scrolling downward
function drawRoad() {
    // Two gray lanes (left and right of the center line)
    ctx.fillStyle = '#454545';
    ctx.fillRect(0, 0, CANVAS_WIDTH / 2, CANVAS_HEIGHT);                // left lane
    ctx.fillStyle = '#3d3d3d';
    ctx.fillRect(CANVAS_WIDTH / 2, 0, CANVAS_WIDTH / 2, CANVAS_HEIGHT); // right lane

    // Solid white road edges
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(6, 0, 4, CANVAS_HEIGHT);
    ctx.fillRect(CANVAS_WIDTH - 10, 0, 4, CANVAS_HEIGHT);

    // Dashed white center line that scrolls downward to simulate forward motion
    const centerX = CANVAS_WIDTH / 2;
    ctx.fillStyle = '#ffffff';
    for (let y = roadOffset - DASH_LENGTH; y < CANVAS_HEIGHT; y += DASH_LENGTH + DASH_GAP) {
        ctx.fillRect(centerX - 3, y, 6, DASH_LENGTH);
    }
}

function drawPlayer() {
    ctx.fillStyle = '#e63946'; // red player car
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'; // windshield detail
    ctx.fillRect(player.x + 5, player.y + 12, player.width - 10, 12);
}

function drawEnemies() {
    for (const enemy of enemies) {
        ctx.fillStyle = '#ffb703'; // yellow enemy cars
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)'; // windshield detail
        ctx.fillRect(enemy.x + 5, enemy.y + 12, enemy.width - 10, 12);
    }
}

// Prompt 4: display the current score at the top left of the canvas
function drawScore() {
    ctx.fillStyle = '#ffffff';
    ctx.font = `14px ${RETRO_FONT}`;
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${score}`, 12, 32);
}

// Prompt 5: show a "Game Over" message with the final score
function drawGameOver() {
    // Dim the last frame
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ff4444';
    ctx.font = `28px ${RETRO_FONT}`;
    ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30);

    ctx.fillStyle = '#ffffff';
    ctx.font = `16px ${RETRO_FONT}`;
    ctx.fillText(`Final Score: ${score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);

    ctx.fillStyle = '#ffff66';
    ctx.font = `12px ${RETRO_FONT}`;
    ctx.fillText('Press SPACE to restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 60);
}

function draw() {
    drawRoad();
    drawEnemies();
    drawPlayer();
    drawScore();
}

// ============================================================
// Prompt 3: game loop with requestAnimationFrame
// ============================================================

function gameLoop() {
    // Prompt 5: when gameOver is true, stop the game loop
    if (gameOver) {
        drawGameOver();
        return; // no further requestAnimationFrame -> loop stops
    }

    update();
    draw();
    animationId = requestAnimationFrame(gameLoop);
}

// ===== Start the game =====
resetGame();
gameLoop();
