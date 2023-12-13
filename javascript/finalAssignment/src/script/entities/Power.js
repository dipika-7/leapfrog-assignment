export class Power {
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

        if (this.type == "protection") {
            this.color = 'purple';
        } else {
            this.color = 'gray';
        }

        this.img = null;

        this.vy = 0.2
    }

    /**
     * draw power on screen
     * 
     * @param {*} ctx 
     */
    draw(ctx) {
        this.ctx = ctx;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    remove() {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}
