import { Game } from "./entities/Game";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../script/constants";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const game = new Game(ctx);

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    game.start()
}
animate();