/**
 * generate random value
 * 
 * @param {number} minValue 
 * @param {number} maxValue 
 * @returns number
 */
const getRandomNumber = (minValue, maxValue) => {
    return minValue + Math.random() * (maxValue - minValue)
}

/**
 * calculate distance between two points
 * 
 * @param {number} x1 
 * @param {number} y1 
 * @param {number} x2 
 * @param {number} y2 
 * @returns number
 */
const distanceBetweenTwoPoints = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
}
