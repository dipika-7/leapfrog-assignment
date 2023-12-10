class Zombie {
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

        this.color = '#49c';

        this.isRunning = true
        this.isGrounded = false;
        this.canJump = false;

        this.vx = 4;
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
        this.ctx = ctx;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    rightMove() {
        this.x += this.vx;
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
}
