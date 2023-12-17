class Vehicle {
    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     */
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.img = null;

        this.vx = 5;
        this.vy = 0.2;

        this.sw = 243;
        this.sh = 186;

        this.numberOfZombie = 0;

        this.frameCount = 0;
        this.currentFrame = 0;
        this.animationSpeed = 40;

        let vehicleImg = new Image();
        vehicleImg.src = "./src/assets/images/vehicle.png";
        this.img = vehicleImg;
    }

    /**
     * draw vehicle on screen
     *
     * @param {*} ctx
     */
    draw(index) {
        ctx.drawImage(this.img, vehicleCordinate[index].sx, vehicleCordinate[index].sy, this.sw, this.sh, this.x, this.y, this.width, this.height);

        let vehicleDescImg = new Image();
        vehicleDescImg.src = "./src/assets/images/vehicleImg.png";
        ctx.drawImage(vehicleDescImg, this.x - 50, this.y - 140, this.width, this.height);

        this.x -= this.vx;
    }
    checkVerticalCollisions(zombies) {
        for (const zombie of zombies) {
            if (collisionDetection(this, zombie) && zombie.y + zombie.height < this.y + 10) {
                zombie.y = this.y - zombie.height;
                zombie.isGrounded = true;
                zombie.canJump = true;
            }
        }
    }
    checkHorizontalCollisions(zombies) {
        let collidedZombie = 0;
        for (const zombie of zombies) {
            if (collisionDetection(this, zombie)) {
                if (this.numberOfZombie <= collidedZombie) {
                    const vehicleIndex = vehicles.indexOf(this);
                    vehicles.splice(vehicleIndex, 1);

                    zombies.push(new Zombie(minValueObject(zombies) - ZOMBIE_DISTANCE, ZOMBIE_Y, ZOMBIE_WIDTH, ZOMBIE_HEIGHT))
                    score += 1;
                    return;
                } else if (zombie.x + zombie.width < this.x + 10) {
                    collidedZombie++;
                    zombie.x = this.x - zombie.width - 0.01;
                    if (zombie.x + zombie.width <= 0) {
                        const zombieIndex = zombies.indexOf(zombie);
                        updateArray(zombies, zombieIndex);
                        zombies.splice(zombieIndex, 1);
                    }
                }
            }
        }
    }
    update() {
        this.frameCount++;

        if (this.frameCount % this.animationSpeed === 0) {
            this.currentFrame = (this.currentFrame + 1) % vehicleCordinate.length;
        }
        this.draw(this.currentFrame);
    }
}