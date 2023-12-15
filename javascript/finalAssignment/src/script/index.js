const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let platforms = [];
let lastCoinTime = new Date();

let zombie = new Zombie(ZOMBIE_X, ZOMBIE_Y, ZOMBIE_WIDTH, ZOMBIE_HEIGHT, true);
const zombie1 = new Zombie(-10, 300, ZOMBIE_WIDTH, ZOMBIE_HEIGHT);
let zombies = [zombie];

const human1 = new Human(600, 400, 100, 100);
let humans = [];

const vehicle1 = new Vehicle(380, 400, 100, 100);
let vehicles = [];

let zombieDeathObjects = []
let powers = []

const background = new Background(canvas, BACKGROUND_X, BACKGROUND_Y, ctx);

let gameOver = false;

let score = 1;
const scores = new Score();
let collectedCoinsScore = scores.getScore().coins;

let coinsArray = [];

let gameFrame = 0;
let staggerFrames = 30;
/**
 * initial platform for setup
 */
const initialPlatform = () => {
    let firstPlatform = new Platform(
        PLATFORM_FIRST_XPOSITION,
        PLATFORM_YPOSITION,
        PLATFORM_HEIGHT,
        PLATFORM_FIRST_WIDTH
    );
    let secondPlatform = new Platform(
        firstPlatform.x + firstPlatform.width + PLATFORM_DISTANCE,
        PLATFORM_YPOSITION,
        PLATFORM_HEIGHT,
        PLATFORM_FIRST_WIDTH
    );

    let thirdPlatform = new Platform(
        secondPlatform.x + secondPlatform.width + PLATFORM_DISTANCE,
        PLATFORM_YPOSITION,
        PLATFORM_HEIGHT,
        PLATFORM_FIRST_WIDTH
    );
    platforms.push(firstPlatform, secondPlatform, thirdPlatform);
};
initialPlatform();

const checkCollision = (listOfrec1, listofrect2) => {
    for (const rect1 of listOfrec1) {
        for (const rect2 of listofrect2) {
            if (collisionDetection(rect1, rect2)) {
                if (rect1.y >= rect2.y) {
                    rect1.y += rect1.vy;
                    rect1.vy += GRAVITY;
                } else {
                    rect1.y = rect2.y - rect1.height;
                    rect1.isGrounded = true;
                    rect1.canJump = true;
                    break;
                }
            } else {
                rect1.isGrounded = false;
            }
        }
    }
};

/**
 * generate platform randomly
 */
function generatePlatform() {
    const lastPlatform = platforms[platforms.length - 1];
    const platformX = lastPlatform ? lastPlatform.x + lastPlatform.width + PLATFORM_DISTANCE : canvas.width + 10;
    let platform = new Platform(
        platformX,
        PLATFORM_YPOSITION,
        PLATFORM_HEIGHT,
    )
    platforms.push(platform);
}

//remove platform from list of platforms
const removePlatform = () => {
    if (platforms.length >= 10) {
        platforms.shift();
    }
}

/**
 * removes zombie from array after falling from platform
 */
const removeZombie = () => {
    platforms.forEach((platform) => {
        zombies.forEach((zombie, index) => {
            if (zombie.y >= platform.y) {
                updateArray(zombies, index);
                zombies.splice(index, 1);
            }
        })
    })
}

const generateHuman = () => {
    // if (humans.length < 5) {
    const platformIndex = Math.round(getRandom(2, platforms.length - 1));
    if (!platforms[platformIndex].hasHuman && !platforms[platformIndex].hasVehicle && !platforms[platformIndex].hasZombieDeathObject) {
        const human = new Human(
            platforms[platformIndex].x + platforms[platformIndex].width / 2,
            CHARACTER_POSITIONY,
            CHARACTER_WIDTH,
            CHARACTER_HEIGHT
        )
        humans.push(human);
        platforms[platformIndex].hasHuman = true;
    }
    // }
}

const generateVehicle = () => {
    const platformIndex = Math.round(getRandom(2, platforms.length - 1));
    if (!platforms[platformIndex].hasHuman && !platforms[platformIndex].hasVehicle && !platforms[platformIndex].hasZombieDeathObject) {
        const vehicle = new Vehicle(
            platforms[platformIndex].x + platforms[platformIndex].width / 2,
            VEHICLE_Y,
            VEHICLE_WIDTH,
            VEHICLE_HEIGHT
        )
        vehicle.numberOfZombie = 3;
        vehicles.push(vehicle)
        platforms[platformIndex].hasVehicle = true;
    }
}

const generateZombieDeathObject = () => {
    const platformIndex = Math.round(getRandom(2, platforms.length - 1));
    const obstacleTypeIndex = Math.round(getRandom(0, OBSTACLE_TYPE.length - 1));
    if (!platforms[platformIndex].hasHuman && !platforms[platformIndex].hasVehicle && !platforms[platformIndex].hasZombieDeathObject) {
        const zombieDeathObject = new ZombieDeath(
            platforms[platformIndex].x + platforms[platformIndex].width / 2,
            CHARACTER_POSITIONY,
            OBSTACLE_WIDTH,
            OBSTACLE_HEIGHT,
            OBSTACLE_TYPE[obstacleTypeIndex]
        )
        zombieDeathObjects.push(zombieDeathObject)
        platforms[platformIndex].hasZombieDeathObject = true;
    }
}

const generatePower = () => {
    const platformIndex = Math.round(getRandom(2, platforms.length - 1));
    const powerTypeIndex = Math.round(getRandom(0, POWER_TYPE.length - 1));
    if (!platforms[platformIndex].hasHuman && !platforms[platformIndex].hasVehicle && !platforms[platformIndex].hasZombieDeathObject) {
        const power = new Power(
            platforms[platformIndex].x + platforms[platformIndex].width / 4,
            CHARACTER_POSITIONY,
            VEHICLE_WIDTH,
            VEHICLE_HEIGHT,
            POWER_TYPE[powerTypeIndex]
        )
        powers.push(power)
    }
}

const checkZombieCollideWithHuman = (human) => {
    for (const zombie of zombies) {
        if (collisionDetection(zombie, human)) {
            const humanIndex = humans.indexOf(human)
            human.angle = ROTATE_ANGLE;
            humans.splice(humanIndex, 1);
            zombies.push(new Zombie(minValueObject(zombies) - ZOMBIE_DISTANCE, ZOMBIE_Y, ZOMBIE_WIDTH, ZOMBIE_HEIGHT))
            score += 1;
            break;
        }
    }
}

const checkZombieCollideWithZombieDeathObject = (zombieDeathObject) => {
    for (const zombie of zombies) {
        if (collisionDetection(zombie, zombieDeathObject)) {
            if (zombie.power == "protection") {
                const zombieDeathObjectIndex = zombieDeathObjects.indexOf(zombieDeathObject);
                zombieDeathObject.remove();
                zombieDeathObjects.splice(zombieDeathObjectIndex, 1)
            } else {
                const zombieIndex = zombies.indexOf(zombie)
                zombie.angle = ROTATE_ANGLE;
                updateArray(zombies, zombieIndex);
                zombies.splice(zombieIndex, 1)
                const zombieDeathObjectIndex = zombieDeathObjects.indexOf(zombieDeathObject);
                // zombieDeathObject.remove();
                zombieDeathObjects.splice(zombieDeathObjectIndex, 1)
                break;
            }
        }
    }
}

const checkZombieCollideWithPower = (zombie) => {
    for (const power of powers) {
        if (collisionDetection(zombie, power)) {
            const powerIndex = powers.indexOf(power);
            powers.splice(powerIndex, 1)

            zombie.power = power.type;

            setTimeout(() => {
                zombie.power = null;
            }, POWER_TIME)
            break;
        }
    }
}

//check if game is over or not
const checkGameOver = () => {
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

        initialPlatform();

        zombie = new Zombie(ZOMBIE_X, ZOMBIE_Y, ZOMBIE_WIDTH, ZOMBIE_HEIGHT);
        zombie.vx = ZOMBIE_VX;
        zombie.isRunning = true;
        zombies.push(zombie)
    }
}

const moveBackground = () => {
    // for (const zombie of zombies) {
    if (zombies.length > 0) {
        if (!zombies[0].isRunning) {
            background.update();
            // break;
        }
    }
    // }
}

let zombieSpriteIndex = 0;
let humanSpriteIndex = 0;

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw();
    moveBackground()

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
        human.x -= VELOCITY.x;
        human.draw(humanSpriteIndex)
        if (gameFrame % staggerFrames === 0) {
            if (humanSpriteIndex >= humanCordinate.length - 1) humanSpriteIndex = -1;
            humanSpriteIndex++
        }
    });

    vehicles.forEach((vehicle) => {
        // checkCollision(vehicles, platforms);
        // checkZombieCollideWithVehicle(vehicle)
        vehicle.checkHorizontalCollisions(zombies)
        vehicle.checkVerticalCollisions(zombies);
        vehicle.draw();
    });

    zombieDeathObjects.forEach((zombieDeathObject) => {
        checkCollision(zombieDeathObjects, platforms);
        checkZombieCollideWithZombieDeathObject(zombieDeathObject)
        zombieDeathObject.x -= VELOCITY.x;
        zombieDeathObject.draw();
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

        if (!zombie.canJump) {
            zombie.draw(ctx, zombieSpriteIndex);
            if (gameFrame % staggerFrames == 0) {
                if (zombieSpriteIndex >= zombieCordinate.length - 1) zombieSpriteIndex = -1;
                zombieSpriteIndex++;
            }
        }
        gameFrame++;

        zombie.checkHorizontalCollisions(platforms);
        zombie.applyGravity();
        zombie.checkVerticalCollisions(platforms);
        zombie.rightMove(ctx);
        zombie.setPosition(zombie, index);

        if (zombie.power == "magnetic") {
            coinsArray.forEach((coin) => {
                if (coin.x + coin.width <= CANVAS_WIDTH) {
                    if (zombie.x < coin.x) {
                        coin.vx = VELOCITY.x * 2;
                    } else {
                        coin.vx = -VELOCITY.x * 2;
                    }
                    if (zombie.y < coin.y) {
                        coin.vy = -VELOCITY.y;
                    } else {
                        coin.vy = VELOCITY.y;
                    }
                    coin.y += coin.vy;
                } else {
                    coin.vx = VELOCITY.x
                }
            })
        }

        if (zombie.x < canvas.clientWidth / 3 - index * ZOMBIE_DISTANCE && !zombie.isRunning) {
            zombie.x += zombie.vx;
        }
    });

    removePlatform();
    removeZombie();

    scores.updateScore(score, collectedCoinsScore);
    ctx.fillStyle = "red";
    ctx.font = "16px sans-serif";
    ctx.fillText(`Score: ${score}`, 5, 20);
    ctx.fillText(`High Score: ${scores.getScore().highScore}`, 5, 50);
    ctx.fillText(`Collected Coins: ${collectedCoinsScore}`, 5, 80);

    if (gameOver) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillText(`Your Score is: ${score}`, CANVAS_WIDTH / 2 - 50, CANVAS_HEIGHT * 3 / 8)
        ctx.fillText(`Your High Score is: ${scores.getScore().highScore}`, CANVAS_WIDTH / 2 - 80, CANVAS_HEIGHT * 3.5 / 8)
        ctx.fillText("Game Over: Press 'Enter' to Restart", CANVAS_WIDTH / 2 - 120, CANVAS_HEIGHT * 4 / 8)
    }

    if (!gameOver) {
        checkGameOver()
    }
    resetGame()

    requestAnimationFrame(animate);
};

animate();