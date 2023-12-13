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

        this.color = "darkyellow"

        this.img = null;
        let coinImg = new Image();
        coinImg.src = "./src/assets/images/coin-icon.png"
        this.img = coinImg;

        this.vx = VELOCITY.x
    }

    /**
     * draw power on screen
     * 
     * @param {*} ctx 
     */
    draw() {
        this.ctx = ctx;
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    update() {
        this.draw();
        this.x -= this.vx;
    }
    remove() {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}