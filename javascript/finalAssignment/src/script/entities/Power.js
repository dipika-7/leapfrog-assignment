class Power {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {string} type
     */
    constructor(x, y, width, height, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;

        let powerImg = new Image();
        if (this.type == "protection") {
            powerImg.src = "./src/assets/images/shield.png"
            this.img = powerImg;
        } else if (this.type == "magnetic") {
            powerImg.src = "./src/assets/images/magnet.png"
            this.img = powerImg;
        }

        this.img = null;

        this.vy = 0.2
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
    remove() {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}
