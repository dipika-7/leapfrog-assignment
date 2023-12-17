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
        this.angle = 0;
        this.rotationSpeed = 1

        this.color = 'blue';

        this.jumpStart = 0;

        this.img = null;

        this.frameCount = 0;
        this.currentFrame = 0;
        this.animationSpeed = 40;

        this.vy = 0.2
        this.rotationSpeed = 0.5;

        let humanImg = new Image();
        humanImg.src = "./src/assets/images/human-spritsheet2.png"
        this.img = humanImg;
    }

    /**
     * draw human on screen
     * 
     * @param {*} ctx 
     */
    draw(index) {
        ctx.drawImage(this.img, humanCordinate[index].sx, humanCordinate[index].sy, humanCordinate[index].sw, humanCordinate[index].sh, this.x, this.y, this.width, this.height)

        let helpImg = new Image();
        helpImg.src = "./src/assets/images/help.png";
        ctx.drawImage(helpImg, this.x - 60, this.y - 150, this.width, this.height + 20);
    }
    /**
     * update human animation
     */
    update() {
        this.frameCount++;

        if (this.frameCount % this.animationSpeed === 0) {
            this.currentFrame = (this.currentFrame + 1) % humanCordinate.length;
        }

        this.draw(this.currentFrame);
    }
}
