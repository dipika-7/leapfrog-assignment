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
        coinImg.src = "./src/assets/images/coin.png";
        this.img = coinImg;

        this.vx = VELOCITY.x;
        this.vy = 0;

        this.frameCount = 0;
        this.currentFrame = 0;
        this.animationSpeed = 10;
    }

    /**
     * draw coin on screen
     *
     * @param {*} ctx
     */
    draw(index) {
        ctx.drawImage(
            this.img,
            coinCoordinate[index].sx,
            coinCoordinate[index].sy,
            coinCoordinate[index].sw,
            coinCoordinate[index].sh,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
    /**
     * update coins on screen
     */
    update() {
        this.frameCount++;

        if (this.frameCount % this.animationSpeed === 0) {
            this.currentFrame = (this.currentFrame + 1) % coinCoordinate.length;
        }

        this.draw(this.currentFrame)
        this.x -= this.vx;
    }
}
