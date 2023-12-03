const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let initialPlatform = new Platform(PLATFORM_STARTX, PLATFORM_STARTY, PLATFORM_WIDTH, PLATFORM_HEIGHT);
let platforms = [initialPlatform];

let character = new Character(CHARACTER_STARTX, CHARACTER_STARTY, 50, 60);

/**
 * generate platform randomly
 */
function generatePlatform() {
    let platform = new Platform(
        getRandomPlatformX(canvas.width, PLATFORM_WIDTH),
        0,
        PLATFORM_WIDTH,
        PLATFORM_HEIGHT
    )
    platforms.push(platform);
}

/**
 * animate the character and platform
 */
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    platforms.forEach((platform) => platform.draw(ctx));

    character.draw(ctx);
    character.jump();
    movement();
    getCharacterFromNextSide()
    checkCharacterInPlatform()


    while (platforms.length > 0 && platforms[0].y >= canvas.height) {
        platforms.shift();
        generatePlatform();
    }

    updateScore();
    ctx.fillStyle = "black";
    ctx.font = "16px sans-serif";
    ctx.fillText(`Score: ${score}`, 5, 20);

    if (gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText(`Your Score is: ${score}`, canvas.width / 3, canvas.height * 3 / 8)
        ctx.fillText("Game Over: Press 'Space' to Restart", canvas.width / 4, canvas.height * 4 / 8)
    }
    checkGameOver(character, canvas)
    requestAnimationFrame(animate);
}

// movement actions
const movement = () => {
    if (keys.ArrowLeft) {
        character.left();
    } else if (keys.ArrowRight) {
        character.right();
    } else if (keys.Space && gameOver) {
        reset()
    }
};

// collission detection
const checkCharacterInPlatform = () => {
    platforms.forEach(platform => {
        if (collisionDetection(character, platform)) {
            character.y = platform.y - character.height;
            character.isGrounded = true;
        }

        if (character.velocity.y < 0 && character.y < canvas.height * 3 / 4) {
            platform.y -= character.velocity.y;
        }
    });
};

//check if game is over or not
const checkGameOver = (character, canvas) => {
    if (character.y + character.height > canvas.height) {
        gameOver = true;
        // const jump = new Audio("./src/assets/mp3/diver-bomber.mp3");
        // jump.play();
    }
}

// get character from side if it goes beyond the width of context
const getCharacterFromNextSide = () => {
    if (character.x >= canvas.width) {
        character.x = 0
    } else if (character.x + character.width < 0) {
        character.x = canvas.width
    }
}

// creates the initaial platforms at certain points
const createInitialPlatforms = () => {
    for (let i = 0; i < 7; i++) {
        let platform = new Platform(
            getRandomPlatformX(canvas.width, PLATFORM_WIDTH),
            canvas.height - 75 * i - 150,
            PLATFORM_WIDTH,
            PLATFORM_HEIGHT
        )
        platforms.push(platform);
    }
}
createInitialPlatforms();

// update the score of player
const updateScore = () => {
    let points = Math.floor(50 * Math.random());
    if (character.velocity.y < 0) {
        maxScore += points;
        if (score < maxScore) {
            score = maxScore;
        }
    } else if (character.velocity.y >= 0) {
        maxScore -= points;
    }
}

// after gameover reset the game
const reset = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    score = 0;
    maxScore = 0;
    gameOver = false;
    character.x = CHARACTER_STARTX;
    character.y = CHARACTER_STARTY;
    character.velocity.y = 50;
    character.velocity.x = 5;

    platforms = []
    initialPlatform = new Platform(PLATFORM_STARTX, PLATFORM_STARTY, PLATFORM_WIDTH, PLATFORM_HEIGHT)
    platforms.push(initialPlatform)
    platforms.forEach(platform => platform.draw(ctx))

    createInitialPlatforms();
}

animate();
