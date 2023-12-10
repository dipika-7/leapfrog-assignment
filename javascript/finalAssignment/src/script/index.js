const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const platforms = [];

const zombie = new Zombie(30, 400, 100, 120);
const zombie1 = new Zombie(-10, 300, 100, 120);
const zombies = [zombie];

const humans = [];

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

const checkZombieInPlatform = () => {
    // platforms.forEach(platform => {
    for (const zombie of zombies) {
        for (const platform of platforms) {
            if (collisionDetection(zombie, platform)) {
                if (zombie.y >= platform.y) {
                    zombie.y += zombie.vy;
                    zombie.vy += GRAVITY;
                } else {
                    zombie.y = platform.y - zombie.height;
                    zombie.isGrounded = true;
                    zombie.canJump = true;
                    break;
                }
            } else {
                zombie.isGrounded = false;
            }
        }
    }
};

const setPosition = (zombie, index) => {
    // zombies.forEach((zombie) => {
    // for (let i = 0; i <= zombies.length - 1; i++) {
    if (zombie.x >= canvas.clientWidth / 3) {
        //     zombie.x += VELOCITY.x;
        // } else {
        zombie.x = canvas.clientWidth / 3 - index + 20;
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
    // console.log(platforms, platforms.length)
    if (platforms.length >= 10) {
        platforms.shift();
    }
}

const generateHuman = () => {
    const platformIndex = Math.round(getRandom(0, platforms.length - 1));
    // const platform = platforms[platformIndex];
    const human = new Human(
        platforms[platformIndex].x + platforms[platformIndex].width / 2,
        CHARACTER_POSITIONY,
        CHARACTER_WIDTH,
        CHARACTER_HEIGHT
    )
    humans.push(human)
}

const checkZombieCollideWithHuman = (human) => {
    // for (let i = 0; i < humans.length; i++) {
    //     const human = humans[i];
    for (let j = 0; j < zombies.length; j++) {
        const zombie = zombies[j];
        // const distance = Math.sqrt((human.x - zombie.x) * 2 + (human.y - zombie.y) * 2);
        // if (distance < 10) { // Assuming a collision occurs if the distance is less than 20 pixels
        if (collisionDetection(zombie, human)) {
            // humans.splice(i, 1);

            human.angle = Math.random() * Math.PI * 2;

            // zombies.push(new Zombie(human.x, human.y, human.width, human.height));

            // i--;
            break;
        }
    }
    // }
}

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // generatePlatform()
    platforms.forEach((platform) => {
        platform.draw(ctx);
        if (!zombie.isRunning) {
            platform.x -= VELOCITY.x;
        }
        if (platform.x + platform.width < 0) {
            generatePlatform(CANVAS_WIDTH);
            generateHuman();

        }
    });
    removePlatform();

    zombies.forEach((zombie, index) => {
        zombie.draw(ctx);
        checkZombieInPlatform();
        zombieMovement();
        zombie.applyGravity();
        zombie.rightMove(ctx);
        setPosition(zombie, index);
    });

    humans.forEach((human) => {
        human.draw(ctx);
        human.x -= VELOCITY.x;
        // checkZombieCollideWithHuman(human)
    });

    requestAnimationFrame(animate);
};
animate();
