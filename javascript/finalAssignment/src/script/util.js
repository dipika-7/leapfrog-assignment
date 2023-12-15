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
 * detect collision between two objects
 * 
 * @param {object} rect1 
 * @param {object} rect2 
 * @returns boolean
 */

function collisionDetection(rect1, rect2) {
    return (
        rect1.x <= rect2.x + rect2.width &&
        rect1.x + rect1.width >= rect2.x &&
        rect1.y <= rect2.y + rect2.height &&
        rect1.y + rect1.height >= rect2.y
    );
}

function collisionDetectionTwoRect(rect1, rect2) {
    const rect1Length = rect1.offsetWidth; // Length of rect1
    const rect2Breadth = rect2.offsetHeight; // Breadth of rect2

    // Horizontal collision detection based on length and breadth
    const isCollision = rect1Length > 0 && rect2Breadth > 0 &&
        rect1.offsetLeft + rect1Length > rect2.offsetLeft &&
        rect1.offsetLeft < rect2.offsetLeft + rect2.offsetWidth &&
        rect1.offsetTop + rect1.offsetHeight > rect2.offsetTop &&
        rect1.offsetTop < rect2.offsetTop + rect2Breadth;

    if (isCollision) {
        console.log('Collision detected!');
    } else {
        console.log('No collision.');
    }
}

const minValueObject = (arrayOfObjects) => {
    return arrayOfObjects.reduce((minObject, currentObject) => {
        return currentObject.x < minObject.x ? currentObject : minObject;
    }, arrayOfObjects[0]);
}