class Human {
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
        this.angle = angle;

        this.color = 'blue';

        this.jumpStart = 0;

        this.img = null;

        let humanImg = new Image();
        // humanImg.src = "./src/assets/images/human.png"
        // this.img = humanImg;
    }

    /**
     * draw human on screen
     * 
     * @param {*} ctx 
     */
    draw(ctx) {
        this.ctx = ctx;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.angle) {
            this.ctx.rotate(this.angle);
        }
        // ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}
