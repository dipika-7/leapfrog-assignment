const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let platforms = [];
let lastCoinTime = new Date();
let lastHumanTime = new Date();
let lastPowerTime = new Date();
let lastVehicleTime = new Date();
let lastObstacleTime = new Date();

let zombie = new Zombie(ZOMBIE_X, ZOMBIE_Y, ZOMBIE_WIDTH, ZOMBIE_HEIGHT, true);
const zombie1 = new Zombie(-10, 300, ZOMBIE_WIDTH, ZOMBIE_HEIGHT);
let zombies = [zombie];

let humans = [];

let vehicles = [];

let zombieDeathObjects = []
let powers = []

const background = new Background(canvas, BACKGROUND_X, BACKGROUND_Y, ctx);

let gameOver = false;

let score = 1;
const scores = new Score();
let collectedCoinsScore = scores.getScore().coins;

let coinsArray = [];

let frameCount = 0
let currentFrame = 0;
let animationSpeed = 30;

initialPlatform();

let zombieSpriteIndex = 0;
let humanSpriteIndex = 0;

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw();
    moveBackground();

    platforms.forEach((platform) => {
        platform.draw(ctx);
        if (!zombie.isRunning) {
            platform.x -= VELOCITY.x;
        }
        if (platform.x + platform.width < 0) {
            generatePlatform(CANVAS_WIDTH);
            generateHuman();
            generatePower();
            generateVehicle();
            generateZombieDeathObject();
            generateCoins();
        }
    });

    powers.forEach((power) => {
        checkCollision(powers, platforms);
        power.x -= VELOCITY.x;
        power.draw();
    });

    humans.forEach((human) => {
        checkCollision(humans, platforms);
        checkZombieCollideWithHuman(human)
        human.update()
        human.x -= VELOCITY.x;
    });

    vehicles.forEach((vehicle) => {
        // checkCollision(vehicles, platforms);
        vehicle.checkHorizontalCollisions(zombies)
        vehicle.checkVerticalCollisions(zombies);
        vehicle.update();
    });

    zombieDeathObjects.forEach((zombieDeathObject) => {
        checkCollision(zombieDeathObjects, platforms);
        checkZombieCollideWithZombieDeathObject(zombieDeathObject)
        zombieDeathObject.update()
    });

    coinsArray.forEach((coin, index) => {
        coin.update();
        if (coin.x <= 0) {
            coinsArray.splice(index, 1)
        }
    })

    zombies.forEach((zombie, index) => {
        // zombie.checkVerticalCollisions(vehicles);
        checkZombieCollideWithPower(zombie);
        collisionDetectionWithCoin(zombie);
        zombie.moveZombie(zombies);

        // zombie.updateAnimation();
        if (!zombie.canJump) {
            frameCount++;
            zombie.draw(ctx, currentFrame);
            if (frameCount % animationSpeed === 0) {
                currentFrame = (currentFrame + 1) % zombieCordinate.length;
            }
        }

        zombie.checkHorizontalCollisions(platforms);
        zombie.applyGravity();
        zombie.checkVerticalCollisions(platforms);
        zombie.rightMove(ctx);
        zombie.setPosition(zombie, index);

        if (zombie.power == "magnetic") {
            getMagnetPower();
        }

        if (zombie.x < canvas.clientWidth / 3 - index * ZOMBIE_DISTANCE && !zombie.isRunning) {
            zombie.x += zombie.vx;
        }
    });

    removePlatform();
    removeZombie();

    updateScore();

    // if (gameOver) {
    // ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // ctx.fillText(`Your Score is: ${score}`, CANVAS_WIDTH / 2 - 50, CANVAS_HEIGHT * 3 / 8)
    // ctx.fillText(`Your High Score is: ${scores.getScore().highScore}`, CANVAS_WIDTH / 2 - 80, CANVAS_HEIGHT * 3.5 / 8)
    // ctx.fillText("Game Over: Press 'Enter' to Restart", CANVAS_WIDTH / 2 - 120, CANVAS_HEIGHT * 4 / 8)
    // }

    showScoreCard();

    if (!gameOver) {
        checkGameOver()
    }
    resetGame()

    requestAnimationFrame(animate);
};