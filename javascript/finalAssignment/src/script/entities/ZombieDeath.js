class ZombieDeath {
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

        this.numberOfZombie = 0;
    }
    /**
     * draw vehicle on screen
     * 
     * @param {*} ctx 
     */
    draw() {
        let obstacleImg = new Image();
        if (this.type == "car") {
            obstacleImg.src = "./src/assets/images/vehicle1.png"
            this.img = obstacleImg;
            ctx.drawImage(this.img, this.x, this.y, this.width + 60, this.height)
            // } else if (this.type == "debris") {
            //     obstacleImg.src = "./src/assets/images/dustbin.png"
            //     this.img = obstacleImg;
        } else if (this.type == "bomb") {
            obstacleImg.src = "./src/assets/images/bomb.png"
            this.img = obstacleImg;
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
    }
}
