class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.r = radius;

        this.dx = getRandomNumber(-1, 1);
        this.dy = getRandomNumber(-1, 1);

        this.element = document.createElement("div");
        this.element.style.width = this.r * 2 + "px";
        this.element.style.height = BALL_HEIGHT + "px";

        const colorIndex = Math.round(getRandomNumber(0, (COLORS.length - 1)));
        console.log([colorIndex])
        this.element.style.background = `${COLORS[colorIndex]}`;

        this.element.classList.add("ball")
    }

    /**
     * 
     * @returns HTMLdivElement
     */
    getElement = () => this.element;

    /**
     * get value of y
     * 
     * @returns {number}
     */
    getX = () => this.X;

    /**
     * get value of x
     * 
     * @returns {number}
     */
    getY = () => this.Y;

    /**
     * set value of x
     * 
     * @param {number} x 
     */
    setX = (x) => this.x = x;

    /**
     * set value of y
     * 
     * @param {number} y 
     */
    sety = (y) => this.y = y;

    /**
     * draw ball at certain position 
     */
    draw = () => {
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
    }

    /**
     * move ball to set position
     */
    move = () => {
        this.x += this.dx * SPEED;
        this.y += this.dy * SPEED;
    }

    /**
     * check wall collison
     * 
     * @param {number} boundaryLeft 
     * @param {number} boundaryTop 
     * @param {number} boundaryWidth 
     * @param {number} boundaryHeight 
     */
    checkWallCollision = (boundaryLeft, boundaryTop, boundaryWidth, boundaryHeight) => {
        if (this.x < boundaryLeft || this.x + this.r * 2 > boundaryWidth) {
            this.dx = -this.dx;
            this.x = this.x < boundaryLeft ? boundaryLeft : boundaryWidth - this.r * 2
        }
        if (this.y < boundaryTop || this.y + this.r * 2 > boundaryHeight) {
            this.dy = -this.dy;
            this.y = this.y < boundaryTop ? boundaryTop : boundaryHeight - this.r * 2
        }
    }

    /**
     * check ball collison with another wall
     * 
     * @param {Ball} ball 
     */
    checkBallCollision = (ball) => {
        const distance = distanceBetweenTwoPoints(this.x, this.y, ball.x, ball.y);
        const sumOfRadius = this.r + ball.r;
        if (distance <= sumOfRadius) {
            const tx = this.dx;
            const ty = this.dy;

            this.dx = ball.dx;
            this.dy = ball.dy;

            ball.dx = tx;
            ball.dy = ty;

            const overlap = sumOfRadius - distance;
            const overlapX = ((this.x - ball.x) / distance) * overlap * 0.5;
            const overlapY = ((this.y - ball.y) / distance) * overlap * 0.5;

            this.x += overlapX;
            this.y += overlapY;

            ball.x -= overlapX;
            ball.y -= overlapY;
        }
    }
}