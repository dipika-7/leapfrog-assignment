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

initialPlatform();

let zombieSpriteIndex = 0;
let humanSpriteIndex = 0;

const backgroundSound = new Audio("./src/assets/sounds/background-music.mp3");
backgroundSound.volume = 0.75;

let frameCount = 0;
let animationSpeed = 10;
let currentFrame = 0;

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isSoundOn) {
        background.loop = true
        backgroundSound.play();
    } else {
        backgroundSound.pause();
    }
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

    if (!zombie.canJump) {
        frameCount++;
        if (frameCount % animationSpeed === 0) {
            currentFrame = (currentFrame + 1) % zombieCordinate.length;
        }
    }

    zombies.forEach((zombie, index) => {
        checkZombieCollideWithPower(zombie);
        collisionDetectionWithCoin(zombie);
        zombie.moveZombie(zombies);
        zombie.draw(ctx, currentFrame);
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
    showScoreCard();

    if (!gameOver) {
        checkGameOver()
    }
    resetGame()

    requestAnimationFrame(animate);
};