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
            this.y = this.y + 20;
            obstacleImg.src = "./src/assets/images/bomb.png"
            this.img = obstacleImg;
        } else if (this.type == "debris") {
            this.y = this.y + 20;
            obstacleImg.src = "./src/assets/images/bomb.png"
            this.img = obstacleImg;
        } else if (this.type == "bomb") {
            this.y = this.y + 20;
            obstacleImg.src = "./src/assets/images/bomb.png"
            this.img = obstacleImg;
        }
        // this.ctx = ctx;
        // ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        // ctx.fillStyle = "rgba(255,0,0,0.2)"
        // ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    remove() {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}
