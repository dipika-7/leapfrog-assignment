import {
    setPosition,
    removeZombie,
    generateHuman,
    initialZombie,
    generatePower,
    checkCollision,
    zombieMovement,
    removePlatform,
    initialPlatform,
    generateVehicle,
    generatePlatform,
    generateZombieDeathObject,
    checkZombieCollideWithHuman,
    checkZombieCollideWithPower,
    checkZombieCollideWithVehicle,
    checkZombieCollideWithZombieDeathObject,
    // checkGameOver,
    // resetGame
} from "./entities/Game.js";
import { Score } from "./entities/Score.js";
import { Zombie } from "./entities/Zombie.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let platforms = [];

// let zombie = new Zombie(ZOMBIE_X, ZOMBIE_Y, ZOMBIE_WIDTH, ZOMBIE_HEIGHT);
// const zombie1 = new Zombie(-10, 300, ZOMBIE_WIDTH, ZOMBIE_HEIGHT);
let zombies = [];

// const human1 = new Human(600, 400, 100, 100);
let humans = [];

// const vehicle1 = new Vehicle(380, 400, 100, 100);
let vehicles = [];

let zombieDeathObjects = [];
let powers = [];

let gameOver = false;

let score = 1;
const scores = new Score();

initialPlatform(platforms);
initialZombie(zombies);

//check if game is over or not
const checkGameOver = (zombies) => {
    if (zombies.length <= 0) {
        gameOver = true;
    } else {
        zombies.forEach((zombie) => {
            // console.log(zombie.x, zombie.width, CANVAS_WIDTH)
            if (zombie.x + zombie.width >= CANVAS_WIDTH) {
                gameOver = true;
            }
        })
    }
}

const resetGame = () => {
    if (keys.Enter && gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        score = 1;
        gameOver = false;

        platforms = [];
        vehicles = [];
        zombies = [];
        humans = [];
        zombieDeathObjects = []

        initialPlatform(platforms);

        let zombie = new Zombie(ZOMBIE_X, ZOMBIE_Y, ZOMBIE_WIDTH, ZOMBIE_HEIGHT);
        zombie.vx = ZOMBIE_VX;
        zombies.push(zombie)
    }
}

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    platforms.forEach((platform) => {
        platform.draw(ctx);
        // zombies.forEach((zombie) => {
        if (!zombies[0]?.isRunning) {
            platform.x -= VELOCITY.x;
        }
        if (platform.x + platform.width < 0) {
            generatePlatform(platforms);
            generateHuman(platforms, humans);
            generatePower(platforms, powers);
            generateVehicle(platforms, vehicles);
            generateZombieDeathObject(platforms, zombieDeathObjects);
        }
        // })
    });
    powers.forEach((power) => {
        checkCollision(powers, platforms);
        power.x -= VELOCITY.x;
        power.draw(ctx);
    });

    humans.forEach((human) => {
        checkCollision(humans, platforms);
        checkZombieCollideWithHuman(zombies, human);
        human.x -= VELOCITY.x;
        human.draw(ctx);
    });

    vehicles.forEach((vehicle) => {
        checkCollision(vehicles, platforms);
        checkZombieCollideWithVehicle(zombies, vehicle);
        vehicle.x -= VELOCITY.x;
        vehicle.draw(ctx);
    });

    zombieDeathObjects.forEach((zombieDeathObject) => {
        checkCollision(zombieDeathObjects, platforms);
        checkZombieCollideWithZombieDeathObject(zombies, zombieDeathObject);
        zombieDeathObject.x -= VELOCITY.x;
        zombieDeathObject.draw(ctx);
    });

    zombies.forEach((zombie, index) => {
        zombie.draw(ctx);
        checkCollision(zombies, platforms);
        checkZombieCollideWithPower(zombie, powers);
        zombieMovement(zombies);
        zombie.applyGravity();
        zombie.rightMove(ctx);
        setPosition(zombie, index);
    });

    removePlatform(platforms);
    removeZombie(platforms, zombies);
    scores.updateHighScore(score);
    ctx.fillStyle = "black";
    ctx.font = "16px sans-serif";
    ctx.fillText(`Score: ${score}`, 5, 20);
    ctx.fillText(`High Score: ${scores.getHighScore()}`, 5, 50);

    if (gameOver) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillText(
            `Your Score is: ${score}`,
            CANVAS_WIDTH / 2 - 50,
            (CANVAS_HEIGHT * 3) / 8
        );
        ctx.fillText(
            `Your High Score is: ${scores.getHighScore()}`,
            CANVAS_WIDTH / 2 - 80,
            (CANVAS_HEIGHT * 3.5) / 8
        );
        ctx.fillText(
            "Game Over: Press 'Enter' to Restart",
            CANVAS_WIDTH / 2 - 120,
            (CANVAS_HEIGHT * 4) / 8
        );
    }

    if (!gameOver) {
        checkGameOver(zombies);
    }
    resetGame();

    requestAnimationFrame(animate);
};

animate();
