class Zombie {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     */
    constructor(x, y, width, height, isRunning = false, angle, power = null) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = angle;

        this.color = '#49c';

        this.isRunning = isRunning
        this.isGrounded = false;
        this.canJump = false;
        this.isBackwarded = false;

        this.power = power;

        this.vx = ZOMBIE_VX;
        this.vy = 0;

        this.jumpStart = 0;

        this.img = null;
    }

    /**
     * draw zombie on screen
     * 
     * @param {*} ctx 
     */
    draw(ctx, index) {
        let zombieImg = new Image();
        if (this.power == "magnetic") {
            zombieImg.src = "./src/assets/images/zombie-spritesheet.png"
            this.img = zombieImg;
            ctx.drawImage(this.img, zombiePowerCordinate[index].sx, zombiePowerCordinate[index].sy, zombiePowerCordinate[index].sw, zombiePowerCordinate[index].sh, this.x, this.y, this.width, this.height)
        } else if (this.power == "protection") {
            zombieImg.src = "./src/assets/images/zombie-spritesheet1.png"
            this.img = zombieImg;

            // Draw protection circle
            ctx.beginPath();
            ctx.arc(this.x + 55, this.y + 55, 70, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(0, 255, 0, 0.2)'; // Green color with transparency
            ctx.fill();
            ctx.closePath();

            ctx.drawImage(this.img, zombieCordinate[index].sx, zombieCordinate[index].sy, zombieCordinate[index].sw, zombieCordinate[index].sh, this.x, this.y, this.width, this.height)
        } else {
            zombieImg.src = "./src/assets/images/zombie-spritesheet1.png"
            this.img = zombieImg;
            ctx.drawImage(this.img, zombieCordinate[index].sx, zombieCordinate[index].sy, zombieCordinate[index].sw, zombieCordinate[index].sh, this.x, this.y, this.width, this.height)
        }
    }
    /**
     * move to right position of x
     */
    rightMove() {
        if (this.isRunning) {
            this.x += this.vx;
        }
    }
    /**
     * jump character at certain level
     */
    jump() {
        this.isGrounded = false;
        const jumpHeight = this.jumpStart - this.y;
        if (jumpHeight > MAX_JUMP_HEIGHT) {
            this.canJump = false;
        }
        if (this.canJump) {
            this.vy = -MAX_JUMP_VELOCITY;
        }
    }
    /** 
     * apply gravity for zombie
     */
    applyGravity() {
        this.y += this.vy;
        if (this.isGrounded) {
            this.vy = 0;
        } else {
            this.vy += GRAVITY;
        }
    }
    /**
     * remove power of zombie
     */
    removePower() {
        this.power = null
    }
    /**
     * check horizontal collision between two rectangle
     * 
     * @param {array} platforms 
     */
    checkHorizontalCollisions(platforms) {
        for (const platform of platforms) {
            if (collisionDetection(this, platform)) {
                this.vx = 0;
                this.x = platform.x - this.width - 0.01;
                break;
            }
        }
    }
    /**
     * check vertical collision between two rectangle
     * 
     * @param {array} platforms 
     */
    checkVerticalCollisions(platforms) {
        for (const platform of platforms) {
            if (collisionDetection(this, platform)) {
                if (this.vy > 0) {
                    if (this.y >= platform.y) {
                        rect1.y += rect1.vy;
                        rect1.vy += GRAVITY;
                    } else {
                        this.vy = 0;
                        this.isGrounded = true;
                        this.canJump = true;
                        this.y = platform.y - this.height - 0.01;
                        break;
                    }
                }
            } else {
                this.isGrounded = false;
            }
        }
    }

    /**
     * movement of zombie
     * 
     * @param {array} zombies 
     */
    moveZombie = (zombies) => {
        zombies.forEach((zombie, index) => {
            if (keys.Space == true && zombie.canJump) {
                this.draw(ctx, 0)
                if (zombie.isGrounded) {
                    zombie.jumpStart = zombie.y;
                }
                setTimeout(() => { zombie.jump(); }, 100 * index)
            } else {
                zombie.canJump = false;
            }
        })
    };
    /**     
     * place fix position for zombie i.e clinet width/3
     */
    setPosition = (zombie, index) => {
        if (zombie.x >= canvas.clientWidth / 3 && zombie.isRunning) {
            zombie.x = canvas.clientWidth / 3 - index * 40;
            zombie.isRunning = false
        }
    };
}
