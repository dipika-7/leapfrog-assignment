import { Platform } from "./Platform";
import { Zombie } from "./Zombie"

const initialSetup = (platforms, zombies) => {
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
    const zombie = new Zombie(30, 400, 100, 120);
    zombies.push(zombie)
};

export class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.platforms = [];
        this.zombies = [];
        // initialSetup(this.platforms, this.zombies);

    }
    draw() {
        this.platforms.forEach((platform) => {
            platform.draw(ctx);
        });
        this.zombies.forEach((zombie) => {
            zombie.draw(ctx);
        });
    }
    start() {
        this.draw()
    }
}