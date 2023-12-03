class Character {
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

        this.isGrounded = false;

        this.velocity = {
            x: 5,
            y: 80
        }

        this.img = null;

        let characterRightImg = new Image();
        characterRightImg.src = "./src/assets/image/right-stand.png"
        this.img = characterRightImg;
    }

    /**
     * draw character on screen
     * 
     * @param {*} ctx 
     */
    draw(ctx) {
        this.ctx = ctx;
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    /**
     * jump character at certain level
     */
    jump() {
        if (!this.isGrounded) {
            this.y += this.velocity.y;
            this.velocity.y += GRAVITY;
        } else {
            const jump = new Audio("./src/assets/mp3/jump.wav");
            jump.play();
            this.isGrounded = false;
            this.velocity.y = -MAX_JUMP_HEIGHT;
        }
    }

    /**
     * move to left with left stand image
     */
    left() {
        let characterLeftImg = new Image();
        characterLeftImg.src = "./src/assets/image/left-stand.png"
        this.img = characterLeftImg;

        this.draw(this.ctx);
        this.x -= this.velocity.x;
    }

    /**
     * move to right with right stand image
     */
    right() {
        let characterRightImg = new Image();
        characterRightImg.src = "./src/assets/image/right-stand.png"
        this.img = characterRightImg;

        this.draw(this.ctx);
        this.x += this.velocity.x;
    }
}