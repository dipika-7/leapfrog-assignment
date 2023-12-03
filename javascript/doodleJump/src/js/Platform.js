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

        const colorIndex = Math.round(getRandom(0, COLORS.length - 1))
        this.color = COLORS[colorIndex];
    }

    /**
     * draw platform on screen
     * 
     * @param {*} ctx 
     */
    draw(ctx) {
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        let characterRightImg = new Image();
        characterRightImg.src = "./src/assets/image/platform.png"
        this.img = characterRightImg;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    cleanUp = () => {
        this.imageSrc = null;
    };
}