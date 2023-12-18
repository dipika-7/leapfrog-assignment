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
 * check collision between two rectangle
 * 
 * @param {Array} listOfrec1 
 * @param {Array} listofrect2 
 */
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

//human section
/**
 * add humans in array 
 */
const generateHuman = () => {
    let currentHumanTime = new Date();
    const platformIndex = Math.round(getRandom(2, platforms.length - 1));
    if (currentHumanTime - lastHumanTime >= HUMAN_INTERVAL) {
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
        lastHumanTime = currentHumanTime;
    }
}

/**
 * check whether zombie collide with human or not
 * 
 * @param {humanObject} human 
 */
const checkZombieCollideWithHuman = (human) => {
    const lastZombie = zombies[zombies.length - 1]
    for (const zombie of zombies) {
        if (collisionDetection(zombie, human)) {
            if (isSoundOn) {
                const eatSound = new Audio("./src/assets/sounds/explosion.mp3");
                eatSound.play();
            }

            const humanIndex = humans.indexOf(human)
            human.angle = ROTATE_ANGLE;
            humans.splice(humanIndex, 1);

            const newZombie = new Zombie(minValueObject(zombies) - ZOMBIE_DISTANCE, ZOMBIE_Y, ZOMBIE_WIDTH, ZOMBIE_HEIGHT)
            if (lastZombie.power) {
                newZombie.power = lastZombie.power
            }
            zombies.push(newZombie);
            score += 1;
            break;
        }
    }
}

/**
 * Add power up for power 
 */
const generatePower = () => {
    let currentPowerTime = new Date();
    const platformIndex = Math.round(getRandom(2, platforms.length - 1));
    const powerTypeIndex = Math.round(getRandom(0, POWER_TYPE.length - 1));
    if (currentPowerTime - lastPowerTime >= POWER_INTERVAL) {
        if (!platforms[platformIndex].hasHuman && !platforms[platformIndex].hasVehicle && !platforms[platformIndex].hasZombieDeathObject) {
            const power = new Power(
                platforms[platformIndex].x + platforms[platformIndex].width / 4,
                POWER_POSITIONY,
                POWER_WIDTH,
                POWER_HEIGHT,
                POWER_TYPE[powerTypeIndex]
            )
            powers.push(power)
        }
        lastPowerTime = currentPowerTime;
    }
}

/**
 * Generates a new vehicle object 
 */
const generateVehicle = () => {
    const currentVehicleTime = new Date();
    const platformIndex = Math.round(getRandom(2, platforms.length - 1));
    if (currentVehicleTime - lastVehicleTime >= VEHICLE_INTERVAL) {
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
        lastVehicleTime = currentVehicleTime;
    }
}

/**
 * Generates a new zombie obstacle object
 */
const generateZombieDeathObject = () => {
    const currentObstacleTime = new Date();
    const platformIndex = Math.round(getRandom(2, platforms.length - 1));
    const obstacleTypeIndex = Math.round(getRandom(0, OBSTACLE_TYPE.length - 1));
    if (currentObstacleTime - lastObstacleTime >= OBSTACLE_INTERVAL) {
        if (!platforms[platformIndex].hasHuman && !platforms[platformIndex].hasVehicle && !platforms[platformIndex].hasZombieDeathObject) {
            let zombieDeathObject = new ZombieDeath(
                platforms[platformIndex].x + platforms[platformIndex].width / 2,
                CHARACTER_POSITIONY,
                OBSTACLE_WIDTH,
                OBSTACLE_HEIGHT,
                OBSTACLE_TYPE[obstacleTypeIndex]
            )
            platforms[platformIndex].hasZombieDeathObject = true;
            zombieDeathObjects.push(zombieDeathObject)
        }
    }
    lastObstacleTime = currentObstacleTime;
}

/**
 * generate coins randomly
 */
const generateCoins = () => {
    const platformIndex = Math.round(getRandom(2, platforms.length - 1));
    const coinIndex = Math.round(getRandom(0, coinPattern.length - 1));
    let currentCoinTime = new Date();
    if (currentCoinTime - lastCoinTime >= COIN_INTERVAL && !gameOver) {
        if (!platforms[platformIndex].hasHuman && !platforms[platformIndex].hasVehicle && !platforms[platformIndex].hasZombieDeathObject) {
            coinPattern[coinIndex].forEach((coin) => {
                const coinObj = new Coin(
                    coin.x + CANVAS_WIDTH,
                    coin.y,
                    COIN_WIDTH,
                    COIN_HEIGHT
                )
                coinsArray.push((coinObj));
            })
            lastCoinTime = currentCoinTime;
        }
    }
}

/**
 * Checks for collision detection between zombie and zombie obstacle
 * 
 * @param {obstacleObject} zombieDeathObject 
 */
const checkZombieCollideWithZombieDeathObject = (zombieDeathObject) => {
    for (const zombie of zombies) {
        if (collisionDetection(zombie, zombieDeathObject)) {
            if (isSoundOn) {
                const bombSound = new Audio("./src/assets/sounds/bomb.mp3");
                bombSound.play();
            }
            if (zombie.power == "protection") {
                const zombieDeathObjectIndex = zombieDeathObjects.indexOf(zombieDeathObject);
                zombieDeathObjects.splice(zombieDeathObjectIndex, 1);
                break;
            } else {
                const zombieIndex = zombies.indexOf(zombie)
                zombie.angle = ROTATE_ANGLE;
                updateArray(zombies, zombieIndex);
                zombies.splice(zombieIndex, 1)
                const zombieDeathObjectIndex = zombieDeathObjects.indexOf(zombieDeathObject);
                zombieDeathObjects.splice(zombieDeathObjectIndex, 1)
                break;
            }
        }
    }
}

/**
 * Checks for collision detection between power and zombie 
 * 
 * @param {object} zombie 
 */
const checkZombieCollideWithPower = (zombie) => {
    for (const power of powers) {
        if (collisionDetection(zombie, power)) {
            if (isSoundOn) {
                const powerSound = new Audio("./src/assets/sounds/gotitem.mp3");
                powerSound.play();
            }

            const powerIndex = powers.indexOf(power);
            powers.splice(powerIndex, 1)

            zombies.forEach((zombie) => {
                zombie.power = power.type;
            })

            setTimeout(() => {
                zombies.forEach((zombie) => {
                    zombie.power = null;
                })
            }, POWER_TIME)
            break;
        }
    }
}

/**
 * Checks for collision detection between coin and zombie 
 * 
 * @param {object} zombie 
 */
const collisionDetectionWithCoin = (zombie) => {
    for (const coin of coinsArray) {
        if (collisionDetection(zombie, coin)) {
            if (isSoundOn) {
                const coinSound = new Audio("./src/assets/sounds/coin.wav");
                coinSound.play();
            }
            const coinIndex = coinsArray.indexOf(coin);
            coinsArray.splice(coinIndex, 1);
            collectedCoinsScore += 1
        }
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

//check if game is over or not
const checkGameOver = () => {
    if (zombies.length <= 0) {
        gameOver = true;
    } else {
        zombies.forEach((zombie) => {
            if (zombie.x + zombie.width >= CANVAS_WIDTH) {
                gameOver = true;
            }
        })
    }
}

/**
 * set all values to default and restart game
 */
const resetGame = () => {
    if (keys.Enter && gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        score = 1;
        gameOver = false;

        platforms = [];
        vehicles = [];
        zombies = [];
        humans = [];
        zombieDeathObjects = [];
        powers = [];
        coinsArray = [];

        initialPlatform();

        zombie = new Zombie(ZOMBIE_X, ZOMBIE_Y, ZOMBIE_WIDTH, ZOMBIE_HEIGHT);
        zombie.vx = ZOMBIE_VX;
        zombie.isRunning = true;
        zombie.power = null;
        zombies.push(zombie)
    }
}

/**
 * animate the background image
 */
const moveBackground = () => {
    // for (const zombie of zombies) {
    if (zombies.length > 0) {
        if (!zombies[0].isRunning) {
            background.update();
            // break;
        }
    }
}

/**
 * attract coins towards zombie
 */
const getMagnetPower = () => {
    coinsArray.forEach((coin) => {
        if (coin.x + coin.width + 20 <= CANVAS_WIDTH) {
            if (zombie.x < coin.x) {
                coin.vx = VELOCITY.x * 2;
            } else {
                coin.vx = -VELOCITY.x * 2;
            }
            // if (zombie.y - coin.y < 0 || zombie.y - coin.y > -5) {
            //     coin.vy = 0
            // } else 
            if (zombie.y < coin.y) {
                coin.vy = -VELOCITY.x / 3;
            } else {
                coin.vy = VELOCITY.x / 3;
            }
            coin.y += coin.vy;
        } else {
            coin.vx = VELOCITY.x
        }
    })
}