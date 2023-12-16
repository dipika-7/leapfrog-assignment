class Background {
    constructor(canvas, x, y, ctx) {
        this.x = x;
        this.y = y;
        this.canvas = canvas
        this.ctx = ctx;

        let backgroundImg = new Image();
        backgroundImg.src = "./src/assets/images/background4.jpeg"
        this.img = backgroundImg;
    }
    draw() {
        this.ctx.drawImage(this.img, this.x, this.y, this.canvas.width, CANVAS_HEIGHT)
        this.ctx.drawImage(this.img, this.x + this.canvas.width, this.y, this.canvas.width, CANVAS_HEIGHT)
    }
    update() {
        if (gameOver) return;

        this.draw();
        this.x -= VELOCITY.x;

        if (this.x <= -this.canvas.width) {
            this.x = 0;
        }
    }
}