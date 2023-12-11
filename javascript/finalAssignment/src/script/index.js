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
    if (!platforms[platformIndex].hasHuman && !platforms[platformIndex].hasVehicle) {
        const human = new Human(
            platforms[platformIndex].x + platforms[platformIndex].width / 2,
            CHARACTER_POSITIONY,
            CHARACTER_WIDTH,
            CHARACTER_HEIGHT
        )
        human.status = "human"
        humans.push(human);
        platforms[platformIndex].hasHuman = true;
    }
    // }
}

const generateVehicle = () => {
    const platformIndex = Math.round(getRandom(2, platforms.length - 1));
    if (!platforms[platformIndex].hasHuman && !platforms[platformIndex].hasVehicle) {
        const vehicle = new Vehicle(
            platforms[platformIndex].x + platforms[platformIndex].width / 2,
            CHARACTER_POSITIONY,
            CHARACTER_WIDTH,
            CHARACTER_HEIGHT
        )
        vehicle.numberOfZombie = 2;
        vehicle.status = "vehicle"
        vehicles.push(vehicle)
        platforms[platformIndex].hasVehicle = true;
    }
}

let a = true;
let enemies = []
const generateRandomEnemy = () => {
    let platformIndex = Math.round(getRandom(2, platforms.length - 1));
    console.log("platformIndex", platformIndex)
    if (a) {
        const vehicle = new Vehicle(
            platforms[platformIndex].x + platforms[platformIndex].width / 2 + 30,
            CHARACTER_POSITIONY,
            CHARACTER_WIDTH,
            CHARACTER_HEIGHT
        )
        vehicle.status = "vehicle"
        enemies.push(vehicle)
        a = false
    } else {
        const human = new Human(
            platforms[platformIndex].x + platforms[platformIndex].width / 2 - 50,
            CHARACTER_POSITIONY,
            CHARACTER_WIDTH,
            CHARACTER_HEIGHT
        )
        human.status = "human"
        enemies.push(human)
        a = true
    }
    console.log(enemies)
}

const checkZombieCollideWithHuman = (human) => {
    for (const zombie of zombies) {
        const lastZombie = zombies[zombies.length - 1]
        if (collisionDetection(zombie, human)) {
            const humanIndex = humans.indexOf(human)
            humans.splice(humanIndex, 1);
            human.remove()

            zombies.push(new Zombie(lastZombie.x + lastZombie.width + ZOMBIE_DISTANCE, lastZombie.y, ZOMBIE_WIDTH, ZOMBIE_HEIGHT))
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
                break;
                // return;
            }
        }
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
        }
        // })
    });

    zombies.forEach((zombie, index) => {
        zombie.draw(ctx);
        checkCollision(zombies, platforms);
        zombieMovement();
        zombie.applyGravity();
        zombie.rightMove(ctx);
        setPosition(zombie, index);
    });

    humans.forEach((human) => {
        checkCollision(humans, platforms);
        checkZombieCollideWithHuman(human)
        human.x -= VELOCITY.x;
        human.update()
    });

    vehicles.forEach((vehicle) => {
        checkCollision(vehicles, platforms);
        checkZombieCollideWithVehicle(vehicle)
        vehicle.x -= VELOCITY.x;
        vehicle.draw();
    });
    removePlatform();
    removeZombie();

    requestAnimationFrame(animate);
};
animate();