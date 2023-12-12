export class Human {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     */
    constructor(x, y, width, height, angle) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = 0;
        this.rotationSpeed = 1

        this.color = 'blue';

        this.jumpStart = 0;

        this.img = null;

        this.vy = 0.2
        this.rotationSpeed = 0.5;
        let humanImg = new Image();
        humanImg.src = "./src/assets/images/human.png"
        this.img = humanImg;
    }

    /**
     * draw human on screen
     * 
     * @param {*} ctx 
     */
    draw() {
        // this.ctx = ctx;
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.angle) {
            ctx.save()
            ctx.translate(this.x, this.y);
            ctx.rotate((this.angle * Math.PI) / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, this.width, this.height);
            // ctx.drawImage(this.img, 0, 0, this.width, this.height)
            ctx.restore()
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            // ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
        // ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    remove() {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }
    update() {
        this.angle += this.rotationSpeed
        this.draw();
    }
}
