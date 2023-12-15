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

        let zombieImg = new Image();
        zombieImg.src = "./src/assets/images/zombie-spritesheet1.png"
        this.img = zombieImg;
    }

    /**
     * draw zombie on screen
     * 
     * @param {*} ctx 
     */
    draw(ctx, index) {
        // ctx.fillStyle = "rgba(255,0,0,0.2)"
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        if (!this.angle) {
            this.ctx = ctx;
            // ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
            // ctx.drawImage(this.img, 32, 420, 59, 75, this.x, this.y, this.width, this.height)
            ctx.drawImage(this.img, zombieCordinate[index].sx, zombieCordinate[index].sy, zombieCordinate[index].sw, zombieCordinate[index].sh, this.x, this.y, this.width, this.height)

        } else {
            ctx.save()
            ctx.translate(this.x, this.y);
            ctx.rotate(-this.angle);
            // ctx.drawImage(this.img, 0, 0, this.width, this.height)
            ctx.drawImage(this.img, zombieCordinate[index].sx, zombieCordinate[index].sy, zombieCordinate[index].sw, zombieCordinate[index].sh, this.x, this.y, this.width, this.height)
            ctx.restore()
        }
    }
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
    applyGravity() {
        this.y += this.vy;
        if (this.isGrounded) {
            this.vy = 0;
        } else {
            this.vy += GRAVITY;
        }
    }
    remove() {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }
    removePower() {
        this.power = null
    }
    checkHorizontalCollisions(platforms) {
        for (const platform of platforms) {
            if (collisionDetection(this, platform)) {
                this.vx = 0;
                this.x = platform.x - this.width - 0.01;
                break;
            }
        }
    }
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
    setPosition = (zombie, index) => {
        if (zombie.x >= canvas.clientWidth / 3 && zombie.isRunning) {
            zombie.x = canvas.clientWidth / 3 - index * 40;
            zombie.isRunning = false
        }
    };
}
