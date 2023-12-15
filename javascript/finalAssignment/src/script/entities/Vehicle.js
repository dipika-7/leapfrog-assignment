class Vehicle {
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

        this.color = 'red';

        this.img = null;

        this.vy = 0.2

        this.numberOfZombie = 0;

        // let vehicleImg = new Image();
        // vehicleImg.src = "./src/assets/images/vehicle3.jpg"
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
}
