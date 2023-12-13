class Score {
    constructor() {
        this.highScore = +localStorage.getItem("high_score") ?? 0;
        this.coins = +localStorage.getItem("coins") ?? 0;
    }
    getScore() {
        return {
            highScore: this.highScore,
            coins: this.coins
        }
    }
    setScore(score) {
        this.highScore = score;
        localStorage.setItem("high_score", score.toString())
    }
    setCoins(coins) {
        this.coins = coins;
        localStorage.setItem("coins", coins.toString())
    }
    updateScore(score, coins) {
        if (score > this.highScore) {
            this.setScore(score)
        }
        this.setCoins(coins)
    }

}