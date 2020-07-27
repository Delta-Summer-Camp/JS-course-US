const square = document.getElementById('square');
document.addEventListener('keydown', getKey);

const STEP = 10;
const GA_SIZE = 800;
const SQ_SIZE = 30;
const BL_SIZE = 20;
let bx = 200;
let by = 150;
let bvx;
let bvy;
const VMIN = 5;
const VMAX = 20;
const BL_TIME = 100;
const bl = document.getElementById('ball');
let isMoving = false;


function init() {
    square.style.width = square.style.height = SQ_SIZE + 'px';
    const ga = document.getElementById('gameArea');
    ga.style.width = ga.style.height = GA_SIZE + 'px';

    bl.style.height = bl.style.width = BL_SIZE + 'px';
    bl.style.left = bx + 'px';
    bl.style.top = by + 'px';
    bl.style.borderRadius = Math.floor(BL_SIZE / 2) + 'px';

    bvx = Math.floor((Math.random() * (VMAX - VMIN)) + VMIN);
    bvy = Math.floor((Math.random() * (VMAX - VMIN)) + VMIN);
}

function getKey(event) {
    if(!isMoving) {
        setInterval(moveTheBall, BL_TIME);
        isMoving = true;
    }

    let x = square.offsetLeft;
    let y = square.offsetTop;

    let key = event.keyCode;

    switch (key) {
        case 37: // left
            x -= STEP;
            break;
        case 38: // up
            y -= STEP;
            break;
        case 39: // right
            x += STEP;
            break;
        case 40: // down
            y += STEP;
            break;
        default:
            return false;
    }

    if (x < 0) x = 0;
    else if (x > GA_SIZE - SQ_SIZE) x = GA_SIZE - SQ_SIZE;
    if (y < 0) y = 0;
    else if (y > GA_SIZE - SQ_SIZE) y = GA_SIZE - SQ_SIZE;

    square.style.left = x + 'px';
    square.style.top = y + 'px';
}

function moveTheBall() {
    bx += bvx;
    by += bvy;

    if (bx < 0) {
        bx = 0;
        bvx *= -1;
    } else if (bx > GA_SIZE - BL_SIZE) {
        bx = GA_SIZE - BL_SIZE;
        bvx *= -1;
    }
    if (by < 0) {
        by = 0;
        bvy *= -1;
    } else if (by > GA_SIZE - BL_SIZE) {
        by = GA_SIZE - BL_SIZE;
        bvy *= -1;
    }

    bl.style.left = bx + 'px';
    bl.style.top = by + 'px';
}