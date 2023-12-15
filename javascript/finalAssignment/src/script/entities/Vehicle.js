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

        this.color = "red";

        this.img = null;

        this.vx = 4;
        this.vy = 0.2;

        this.numberOfZombie = 0;

        let vehicleImg = new Image();
        vehicleImg.src = "./src/assets/images/vehicle.png";
        this.img = vehicleImg;
    }

    /**
     * draw vehicle on screen
     *
     * @param {*} ctx
     */
    draw() {
        // ctx.fillStyle = "rgba(255,0,0,0.2)"
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        this.ctx = ctx;
        this.x -= this.vx;
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
        for (const zombie of zombies) {
            if (collisionDetection(this, zombie)) {
                if (this.numberOfZombie <= zombies.length) {
                    const vehicleIndex = vehicles.indexOf(this);
                    vehicles.splice(vehicleIndex, 1);

                    zombies.push(new Zombie(minValueObject(zombies) - ZOMBIE_DISTANCE, ZOMBIE_Y, ZOMBIE_WIDTH, ZOMBIE_HEIGHT))
                    score += 1;
                    // return;
                } else if (zombie.x + zombie.width < this.x + 10) {
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
}