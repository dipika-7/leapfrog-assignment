export class ZombieDeath {
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

        if (this.type == "car") {
            this.color = 'yellow';
        } else if (this.type == "debris") {
            this.color = "black"
        } else {
            this.color = 'lightblue';
        }

        this.img = null;

        this.vy = 0.2

        this.numberOfZombie = 0;

        // let vehicleImg = new Image();
        // vehicleImg.src = "./src/assets/images/vehicle.png"
        // this.img = vehicleImg;
    }

    /**
     * draw vehicle on screen
     * 
     * @param {*} ctx 
     */
    draw() {
        this.ctx = ctx;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    remove() {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}
