export class Zombie {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     */
    constructor(x, y, width, height, angle, power = null) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = angle;

        this.color = '#49c';

        this.isRunning = true
        this.isGrounded = false;
        this.canJump = false;

        this.power = power;

        this.vx = ZOMBIE_VX;
        this.vy = 0;

        this.jumpStart = 0;

        this.img = null;

        let zombieImg = new Image();
        zombieImg.src = "./src/assets/images/zombie.png"
        this.img = zombieImg;
    }

    /**
     * draw zombie on screen
     * 
     * @param {*} ctx 
     */
    draw(ctx) {
        if (!this.angle) {
            this.ctx = ctx;
            // ctx.fillStyle = this.color;
            // ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        } else {
            ctx.save()
            ctx.translate(this.x, this.y);
            ctx.rotate(-this.angle);
            ctx.fillStyle = this.color;
            // ctx.fillRect(0, 0, this.width, this.height);
            ctx.drawImage(this.img, 0, 0, this.width, this.height)
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
}
