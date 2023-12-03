const SPEED = 5;

const COLORS = ['green', 'blue', 'red']

const GRAVITY = 0.5;

let PLATFORM_STARTX = 50;
let PLATFORM_STARTY = 550;
const PLATFORM_WIDTH = 80;
const PLATFORM_HEIGHT = 20;

let CHARACTER_STARTX = 50;
let CHARACTER_STARTY = PLATFORM_STARTY - 80;

let MAX_JUMP_HEIGHT = 8;

let score = 0;
let maxScore = 0;
let gameOver = false