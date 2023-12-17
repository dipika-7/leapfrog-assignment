class Score {
    constructor() {
        this.highScore = +localStorage.getItem("high_score") ?? 0;
        this.coins = +localStorage.getItem("coins") ?? 0;
    }
    /**
     * get score from localStorage
     * 
     * @returns highScore, coins
     */
    getScore() {
        return {
            highScore: this.highScore,
            coins: this.coins
        }
    }
    /**
     * set score in localStorage
     * 
     * @param {number} score 
     */
    setScore(score) {
        this.highScore = score;
        localStorage.setItem("high_score", score.toString())
    }
    /**
     * set coins in localstorage
     * 
     * @param {number} coins 
     */
    setCoins(coins) {
        this.coins = coins;
        localStorage.setItem("coins", coins.toString())
    }
    /**
     * update score and coins of players
     * 
     * @param {number} score 
     * @param {number} coins 
     */
    updateScore(score, coins) {
        if (score > this.highScore) {
            this.setScore(score)
        }
        this.setCoins(coins)
    }

}