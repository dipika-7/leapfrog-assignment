const main = document.getElementById('mainContainer');

const ballArray = [];

for (let i = 0; i < BALL_COUNT; i++) {
    const x = getRandomNumber(0, (CONTAINER_WIDTH - BALL_RADIUS * 2))
    const y = getRandomNumber(0, (CONTAINER_WIDTH - BALL_RADIUS * 2))
    const ball = new Ball(x, y, BALL_RADIUS);
    ballArray.push(ball);
}

ballArray.forEach((ball) => {
    main.appendChild(ball.getElement())
})

function render() {
    ballArray.forEach((ball) => {
        ball.draw();
        ball.move();
        ballArray.forEach((otherBall) => {
            if (ball === otherBall) return;
            ball.checkBallCollision(otherBall)
        })
        ball.checkWallCollision(0, 0, CONTAINER_WIDTH, CONTAINER_HEIGHT)
    })
    requestAnimationFrame(render)
}
render();