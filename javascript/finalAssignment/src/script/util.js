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

const minValueObject = (arrayOfObjects) => {
    let minVal = arrayOfObjects[0].x;
    arrayOfObjects.forEach((object) => {
        if (object.x < minVal) {
            minVal = object.x
        }
    })
    return minVal;
}

function updateArray(array, indexToRemove) {
    for (let i = indexToRemove + 1; i < array.length; i++) {
        array[i].x -= ZOMBIE_DISTANCE;
    }
}