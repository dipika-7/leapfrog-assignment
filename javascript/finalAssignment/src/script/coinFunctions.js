/**
 * generate coins randomly
 */
const generateCoins = () => {
    const platformIndex = Math.round(getRandom(2, platforms.length - 1));
    const coinIndex = Math.round(getRandom(0, coinPattern.length - 1));
    let currentCoinTime = new Date();
    if (currentCoinTime - lastCoinTime >= COIN_INTERVAL) {
        if (!platforms[platformIndex].hasHuman && !platforms[platformIndex].hasVehicle && !platforms[platformIndex].hasZombieDeathObject) {
            coinPattern[coinIndex].forEach((coin) => {
                const coinObj = new Coin(
                    coin.x + CANVAS_WIDTH,
                    coin.y,
                    COIN_WIDTH,
                    COIN_HEIGHT
                )
                coinsArray.push((coinObj));
            })
            lastCoinTime = currentCoinTime;
        }
    }
}

const collisionDetectionWithCoin = (zombie) => {
    for (const coin of coinsArray) {
        if (collisionDetection(zombie, coin)) {
            const coinIndex = coinsArray.indexOf(coin);
            coinsArray.splice(coinIndex, 1);
            collectedCoinsScore += 1
            coin.remove();
        }
    }
}
