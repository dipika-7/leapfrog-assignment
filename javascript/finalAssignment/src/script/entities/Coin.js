class Coin {
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

        this.color = "darkyellow";

        this.img = null;
        let coinImg = new Image();
        coinImg.src = "./src/assets/images/coin-icon.png";
        this.img = coinImg;

        this.vx = VELOCITY.x;
        this.vy = 0;

        // this.lastFrameTime = new Date();
        // this.currentSpriteIndex = 0;
        // this.sheet = coinCordinate.map((coins) => new Sprite(this.img, ...coins));
    }

    /**
     * draw power on screen
     *
     * @param {*} ctx
     */
    draw() {
        // const currentSprite = this.sheet[this.currentSpriteIndex];
        this.ctx = ctx;
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.drawImage(
        //     this.img,
        //     currentSprite.sx,
        //     currentSprite.sy,
        //     currentSprite.width,
        //     currentSprite.height,
        //     this.x,
        //     this.y,
        //     this.width,
        //     this.height
        // );
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    update() {
        this.draw()
        // const currentTime = new Date();
        // if (currentTime - this.lastFrameTime >= COIN_INTERVAL) {
        //     this.currentSpriteIndex = (this.currentSpriteIndex + 1) % this.sheet.length;
        //     console.log(this.currentSpriteIndex)
        //     this.lastFrameTime = currentTime;
        // }
        // let gameFrame = 0;
        // let staggerFrames = 10;
        // if (gameFrame % staggerFrames == 0) {
        //     if (zombieSpriteIndex >= zombieCordinate.length - 1) zombieSpriteIndex = 0;
        //     zombieSpriteIndex++;
        // }
        // gameFrame++
        this.x -= this.vx;
    }
    remove() {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}
