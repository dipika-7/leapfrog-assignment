class Platform {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     */
    constructor(x, y, width, height,) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /**
     * draw platform on screen
     * 
     * @param {*} ctx 
     */
    draw(ctx) {
        let tile = new Image();
        tile.src = "./src/assets/images/tile.png"
        this.img = tile;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}