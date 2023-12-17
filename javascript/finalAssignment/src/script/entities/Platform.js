class Platform {
    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     */
    constructor(x, y, height, width = getRandom(PLATFORM_MIN_WIDTH, PLATFORM_MAX_WIDTH)) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = "green";
        this.hasHuman = false;
        this.hasVehicle = false;
        this.hasZombieDeathObject = false;
        this.img = null;
    }

    /**
     * draw platform on screen
     *
     * @param {*} ctx
     */
    draw(ctx) {
        let tile = new Image();
        tile.src = "./src/assets/images/tile4.png";
        this.img = tile;
        ctx.drawImage(this.img, this.x, this.y - 20, this.width, this.height);
    }
}
