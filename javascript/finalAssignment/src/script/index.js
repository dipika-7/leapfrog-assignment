const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const platforms = [];

const zombie = new Zombie(30, 400, ZOMBIE_WIDTH, ZOMBIE_HEIGHT);
const zombie1 = new Zombie(-10, 300, ZOMBIE_WIDTH, ZOMBIE_HEIGHT);
const zombies = [zombie];

const human1 = new Human(600, 400, 100, 100);
const humans = [];

const vehicle1 = new Vehicle(380, 400, 100, 100);
const vehicles = [];

const zombieDeathObjects = []

let gameOver = false;

let score = 1;
const scores = new Score();

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

    let secondPLatformX =
        firstPlatform.x + firstPlatform.width + PLATFORM_DISTANCE;
    let secondPlatform = new Platform(
        secondPLatformX,
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

const setPosition = (zombie, index) => {
    if (zombie.x >= canvas.clientWidth / 3 && zombie.isRunning) {
        //     zombie.x += VELOCITY.x;
        // } else {
        zombie.x = canvas.clientWidth / 3 - index * 40;
        zombie.isRunning = false
        // console.log(index, zombie.x)
    }
    // }
    // });
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

/**
 * movement of zombie
 */
const zombieMovement = () => {
    zombies.forEach((zombie) => {
        if (keys.Space == true && zombie.canJump) {
            if (zombie.isGrounded) {
                zombie.jumpStart = zombie.y;
            }
            zombie.jump();
        } else {
            zombie.canJump = false;
        }
    })
};

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
            CHARACTER_POSITIONY,
            VEHICLE_WIDTH,
            VEHICLE_HEIGHT
        )
        vehicle.numberOfZombie = 2;
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
            VEHICLE_WIDTH,
            VEHICLE_HEIGHT,
            OBSTACLE_TYPE[obstacleTypeIndex]
        )
        zombieDeathObjects.push(zombieDeathObject)
        platforms[platformIndex].hasVehicle = true;
    }
}

const checkZombieCollideWithHuman = (human) => {
    for (const zombie of zombies) {
        const lastZombie = zombies[zombies.length - 1]
        if (collisionDetection(zombie, human)) {
            const humanIndex = humans.indexOf(human)
            human.angle = ROTATE_ANGLE;
            humans.splice(humanIndex, 1);
            // human.remove()
            zombies.push(new Zombie(lastZombie.x + lastZombie.width + ZOMBIE_DISTANCE, lastZombie.y, ZOMBIE_WIDTH, ZOMBIE_HEIGHT))
            score += 1;
            break;
            // return;
        }
    }
}

const checkZombieCollideWithVehicle = (vehicle) => {
    for (const zombie of zombies) {
        const lastZombie = zombies[zombies.length - 1]
        if (collisionDetection(zombie, vehicle)) {
            if (vehicle.numberOfZombie <= zombies.length) {
                const vehicleIndex = vehicles.indexOf(vehicle)
                vehicles.splice(vehicleIndex, 1);

                zombies.push(new Zombie(lastZombie.x + lastZombie.width + ZOMBIE_DISTANCE, lastZombie.y, ZOMBIE_WIDTH, ZOMBIE_HEIGHT))
                score += 1;
                break;
                // return;
            } else {
                // if (zombie.x <= vehicle.x) {
                zombie.x = vehicle.x - zombie.width;
                if (zombie.x + zombie.width <= 0) {
                    const zombieIndex = zombies.indexOf(zombie)
                    zombies.splice(zombieIndex, 1)
                }
                // }
            }
        }
    }
}

const checkZombieCollideWithZombieDeathObject = () => {
    zombieDeathObjects.forEach((zombieDeathObject) => {
        zombies.forEach((zombie, index) => {
            if (collisionDetection(zombie, zombieDeathObject)) {
                zombie.angle = ROTATE_ANGLE;
                zombie.remove()
                zombies.splice(index, 1)
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
            // console.log(zombie.x, zombie.width, CANVAS_WIDTH)
            if (zombie.x + zombie.width >= CANVAS_WIDTH) {
                gameOver = true;
            }
        })
    }
}

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    platforms.forEach((platform) => {
        platform.draw(ctx);
        // zombies.forEach((zombie) => {
        if (!zombie.isRunning) {
            platform.x -= VELOCITY.x;
        }
        if (platform.x + platform.width < 0) {
            generatePlatform(CANVAS_WIDTH);
            generateHuman();
            generateVehicle();
            generateZombieDeathObject();
        }
        // })
    });

    humans.forEach((human) => {
        checkCollision(humans, platforms);
        checkZombieCollideWithHuman(human)
        human.x -= VELOCITY.x;
        human.draw()
    });

    vehicles.forEach((vehicle) => {
        checkCollision(vehicles, platforms);
        checkZombieCollideWithVehicle(vehicle)
        vehicle.x -= VELOCITY.x;
        vehicle.draw();
    });

    zombieDeathObjects.forEach((zombieDeathObject) => {
        checkCollision(zombieDeathObjects, platforms);
        zombieDeathObject.x -= VELOCITY.x;
        zombieDeathObject.draw();
    });

    zombies.forEach((zombie, index) => {
        checkZombieCollideWithZombieDeathObject()
        zombie.draw(ctx);
        checkCollision(zombies, platforms);
        zombieMovement();
        zombie.applyGravity();
        zombie.rightMove(ctx);
        setPosition(zombie, index);
    });

    removePlatform();
    removeZombie();

    scores.updateHighScore(score);
    ctx.fillStyle = "black";
    ctx.font = "16px sans-serif";
    ctx.fillText(`Score: ${score}`, 5, 20);
    ctx.fillText(`High Score: ${scores.getHighScore()}`, 5, 50);

    if (gameOver) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillText(`Your Score is: ${score}`, CANVAS_WIDTH / 2 - 50, CANVAS_HEIGHT * 3 / 8)
        ctx.fillText(`Your High Score is: ${scores.getHighScore()}`, CANVAS_WIDTH / 2 - 80, CANVAS_HEIGHT * 3.5 / 8)
        // ctx.fillText("Game Over: Press 'Space' to Restart", CANVAS_WIDTH / 4, CANVAS_HEIGHT * 5 / 8)
    }

    if (!gameOver) {
        checkGameOver()
    }

    requestAnimationFrame(animate);
};
animate();