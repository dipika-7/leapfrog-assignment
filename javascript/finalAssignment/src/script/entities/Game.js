import { Platform } from "./Platform.js";
import { Zombie } from "./Zombie.js";
import { Human } from "./Human.js";
import { Vehicle } from "./Vehicle.js";
import { Power } from "./Power.js";
import { ZombieDeath } from "./ZombieDeath.js";
import { collisionDetection, getRandom } from "../util.js";
// import { keys } from "../input.js"

/**
 * initial platform for setup
 */
export const initialPlatform = (platforms) => {
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
 * initial zombie for setup
 */
export const initialZombie = (zombies) => {
    let zombie = new Zombie(ZOMBIE_X, ZOMBIE_Y, ZOMBIE_WIDTH, ZOMBIE_HEIGHT);
    zombies.push(zombie);
};

export const checkCollision = (listOfrec1, listofrect2) => {
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

export const setPosition = (zombie, index) => {
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
export function generatePlatform(platforms) {
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
export const zombieMovement = (zombies) => {
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
export const removePlatform = (platforms) => {
    if (platforms.length >= 10) {
        platforms.shift();
    }
}

/**
 * removes zombie from array after falling from platform
 */
export const removeZombie = (platforms, zombies) => {
    platforms.forEach((platform) => {
        zombies.forEach((zombie, index) => {
            if (zombie.y >= platform.y) {
                zombies.splice(index, 1);
            }
        })
    })
}

export const generateHuman = (platforms, humans) => {
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
}


export const generateVehicle = (platforms, vehicles) => {
    const platformIndex = Math.round(getRandom(2, platforms.length - 1));
    if (!platforms[platformIndex].hasHuman && !platforms[platformIndex].hasVehicle && !platforms[platformIndex].hasZombieDeathObject) {
        const vehicle = new Vehicle(
            platforms[platformIndex].x + platforms[platformIndex].width / 2,
            CHARACTER_POSITIONY,
            VEHICLE_WIDTH,
            VEHICLE_HEIGHT
        )
        vehicle.numberOfZombie = 1;
        vehicles.push(vehicle)
        platforms[platformIndex].hasVehicle = true;
    }
}

export const generateZombieDeathObject = (platforms, zombieDeathObjects) => {
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

export const generatePower = (platforms, powers) => {
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
        // platforms[platformIndex].hasVehicle = true;
    }
}

export const checkZombieCollideWithHuman = (zombies, human) => {
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

export const checkZombieCollideWithVehicle = (zombies, vehicle) => {
    for (const zombie of zombies) {
        const lastZombie = zombies[zombies.length - 1]
        if (collisionDetection(zombie, vehicle)) {
            if (vehicle.numberOfZombie <= zombies.length) {
                const vehicleIndex = vehicles.indexOf(vehicle)
                vehicles.splice(vehicleIndex, 1);

                zombies.push(new Zombie(lastZombie.x, lastZombie.y, ZOMBIE_WIDTH, ZOMBIE_HEIGHT))
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

export const checkZombieCollideWithZombieDeathObject = (zombies, zombieDeathObject) => {
    for (const zombie of zombies) {
        if (collisionDetection(zombie, zombieDeathObject)) {
            if (zombie.power == "protection") {
                const zombieDeathObjectIndex = zombieDeathObjects.indexOf(zombieDeathObject);
                zombieDeathObject.remove();
                zombieDeathObjects.splice(zombieDeathObjectIndex, 1)
            } else {
                const zombieIndex = zombies.indexOf(zombie)
                zombie.angle = ROTATE_ANGLE;
                zombie.remove()
                zombies.splice(zombieIndex, 1)

                const zombieDeathObjectIndex = zombieDeathObjects.indexOf(zombieDeathObject);
                zombieDeathObject.remove();
                zombieDeathObjects.splice(zombieDeathObjectIndex, 1)
                break;
            }
        }
    }
}

export const checkZombieCollideWithPower = (zombie, powers) => {
    for (const power of powers) {
        if (collisionDetection(zombie, power)) {
            const powerIndex = powers.indexOf(power);
            power.remove();
            powers.splice(powerIndex, 1)

            zombie.power = power.type;

            setTimeout(() => {
                zombie.power = null;
            }, POWER_TIME)
            break;
        }
    }
}

// //check if game is over or not
// export const checkGameOver = (zombies) => {
//     if (zombies.length <= 0) {
//         gameOver = true;
//     } else {
//         zombies.forEach((zombie) => {
//             // console.log(zombie.x, zombie.width, CANVAS_WIDTH)
//             if (zombie.x + zombie.width >= CANVAS_WIDTH) {
//                 gameOver = true;
//             }
//         })
//     }
// }
