/**
 * random value
 * 
 * @param {number} minValue 
 * @param {number} maxValue 
 * @returns number
 */
const getRandom = (minValue, maxValue) => {
    return minValue + Math.random() * (maxValue - minValue);
}

/**
 * random value for platform in x
 * 
 * @param {number} canvasWidth 
 * @param {number} platformWidth 
 * @returns number
 */
const getRandomPlatformX = (canvasWidth, platformWidth) => {
    return Math.floor(Math.random() * (canvasWidth - platformWidth) * 6 / 8)
}

/**
 * 
 * @param {object} rect1 
 * @param {object} rect2 
 * @returns boolean
 */
function collisionDetection(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}