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

        this.img = null;

        this.vy = 0.2
    }

    /**
     * draw power on screen
     * 
     * @param {*} ctx 
     */
    draw() {
        let powerImg = new Image();

        //image as per power type
        if (this.type == "protection") {
            powerImg.src = "./src/assets/images/shield.png"
            this.img = powerImg;
        } else if (this.type == "magnetic") {
            powerImg.src = "./src/assets/images/magnet.png"
            this.img = powerImg;
        }

        this.x -= VELOCITY.x
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}
