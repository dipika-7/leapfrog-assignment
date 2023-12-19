let brainImg = new Image();
brainImg.src = "./src/assets/images/brain.png";

let coinImg = new Image();
coinImg.src = "./src/assets/images/coine.png"

let zombieHeadImg = new Image();
zombieHeadImg.src = "./src/assets/images/zombie-head.png"

//update score of player
const updateScore = () => {
    scores.updateScore(score, collectedCoinsScore);
    ctx.fillStyle = "white";
    ctx.font = "40px sans-serif";
    ctx.drawImage(brainImg, 15, 15, 60, 50);
    ctx.fillText(`${score}`, 95, 50);
    ctx.drawImage(coinImg, 15, 80, 50, 50);
    ctx.fillText(`${collectedCoinsScore}`, 80, 120);
    ctx.fillText(`High Score: ${scores.getScore().highScore}`, 15, 180);
    ctx.drawImage(zombieHeadImg, CANVAS_WIDTH / 2 - 80, 15, 70, 70);
    ctx.fillText(`${zombies.length}`, CANVAS_WIDTH / 2 + 10, 60);
}

/**
 * show scores of player
 */
const showScoreCard = () => {
    if (gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let gameOverImg = new Image();
        gameOverImg.src = "./src/assets/images/background-blur.png";
        ctx.drawImage(gameOverImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

        ctx.fillStyle = "#3cb3d1";
        ctx.fillRect(CANVAS_WIDTH / 2 - 250, CANVAS_HEIGHT / 2 - 200, 500, 400);

        ctx.fillStyle = "white";
        ctx.fillText(`Game Over!!`, CANVAS_WIDTH / 2 - 120, CANVAS_HEIGHT * 3 / 8)

        ctx.font = "20px sans-serif";
        ctx.fillText(`Your Score is: ${score}`, CANVAS_WIDTH / 2 - 100, CANVAS_HEIGHT * 4 / 8)
        ctx.fillText(`Your High Score is: ${scores.getScore().highScore}`, CANVAS_WIDTH / 2 - 120, CANVAS_HEIGHT * 4.5 / 8)
        ctx.fillText("Game Over: Press 'Enter' to Restart", CANVAS_WIDTH / 2 - 160, CANVAS_HEIGHT * 5 / 8)
    }
}