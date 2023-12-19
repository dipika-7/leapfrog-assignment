const GRAVITY = 0.2;

const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

const PLATFORM_FIRST_XPOSITION = -40;
const PLATFORM_FIRST_WIDTH = 800;
const PLATFORM_YPOSITION = 680;

const PLATFORM_MIN_WIDTH = 750;
const PLATFORM_MAX_WIDTH = 1200;

const PLATFORM_HEIGHT = 250;

const PLATFORM_MINX = 350;
const PLATFORM_MAXY = 400;

const PLATFORM_DISTANCE = 300;

const MAX_JUMP_VELOCITY = 4;
const MAX_JUMP_HEIGHT = 180;

const CHARACTER_POSITIONY = 570;
const CHARACTER_WIDTH = 120;
const CHARACTER_HEIGHT = 120;

const VEHICLE_Y = 540;
const VEHICLE_WIDTH = 180;
const VEHICLE_HEIGHT = 150;

const OBSTACLE_WIDTH = 120;
const OBSTACLE_HEIGHT = 120;

const VELOCITY = {
    x: 5,
    y: 80,
};

const ZOMBIE_X = 30;
const ZOMBIE_Y = 550;
const ZOMBIE_VX = 5;
const ZOMBIE_WIDTH = 120;
const ZOMBIE_HEIGHT = 120;
const ZOMBIE_DISTANCE = 30;

const OBSTACLE_TYPE = ['car', 'bomb'];
const POWER_TYPE = ["magnetic", "protection"];
const POWER_TIME = 10000;

const BACKGROUND_X = 0;
const BACKGROUND_Y = 0;

const POWER_POSITIONY = 400;
const POWER_WIDTH = 100;
const POWER_HEIGHT = 100;

const COIN_WIDTH = 40;
const COIN_HEIGHT = 40;
const COIN_INTERVAL = 2000; // 2sec

const HUMAN_INTERVAL = 1000; //2sec
const POWER_INTERVAL = 10000; //10sec
const VEHICLE_INTERVAL = 1000; //1sec
const OBSTACLE_INTERVAL = 2000; //2sec

let isSoundOn = true;

const keys = {
    Space: false,
    Enter: false
};