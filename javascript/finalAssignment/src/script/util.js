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