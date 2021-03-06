const square = document.getElementById('square');
document.addEventListener('keydown', getKey);

const STEP = 10;
const GA_SIZE = 800;
const SQ_X = 250;
const SQ_Y = 30;
const BL_SIZE = 30;
let bx, by; // положение мячика
let bvx, bvy; // скорость мячика
let sqx, sqy; // положение ракетки
const VMIN = 5;
const VMAX = 20;
const BL_TIME = 50;
const BOOST = 1.05;
const bl = document.getElementById('ball');
let isMoving = false;
let score = 0;


function init() {
    const ga = document.getElementById('gameArea');
    ga.style.width = ga.style.height = GA_SIZE + 'px';

    bvx = Math.floor((Math.random() * (VMAX - VMIN)) + VMIN);
    bvy = Math.floor((Math.random() * (VMAX - VMIN)) + VMIN);

    bvx = (Math.random() < 0.5) ? -bvx : bvx;
    bvy = (Math.random() < 0.5) ? -bvy : bvy;

    bx = Math.floor(Math.random() * (GA_SIZE - BL_SIZE));
    by = Math.floor(Math.random() * (GA_SIZE - BL_SIZE));

    bl.style.height = bl.style.width = BL_SIZE + 'px';
    bl.style.left = bx + 'px';
    bl.style.top = by + 'px';
    bl.style.borderRadius = Math.floor(BL_SIZE / 2) + 'px';

    square.style.width = SQ_X + 'px';
    square.style.height = SQ_Y + 'px';
    square.style.borderRadius = Math.floor(SQ_Y / 2) + 'px';
    square.style.bottom = '0';
    square.style.left = Math.floor((GA_SIZE - SQ_X) / 2) + 'px'
}

function getKey(event) {
    if(!isMoving) {
        setInterval(moveTheBall, BL_TIME);
        isMoving = true;
    }

    sqx = square.offsetLeft;
    sqy = square.offsetTop;

    let key = event.keyCode;

    switch (key) {
        case 37: // left
            sqx -= STEP;
            break;
        case 38: // up
            sqy -= STEP;
            break;
        case 39: // right
            sqx += STEP;
            break;
        case 40: // down
            sqy += STEP;
            break;
        default:
            return false;
    }

    if (sqx < 0) sqx = 0;
    else if (sqx > GA_SIZE - SQ_X) sqx = GA_SIZE - SQ_X;
    if (sqy < 0) sqy = 0;
    else if (sqy > GA_SIZE - SQ_Y) sqy = GA_SIZE - SQ_Y;

    square.style.left = sqx + 'px';
    square.style.top = sqy + 'px';

    chkStrike();
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
        alert('Game over!');
    }

    bl.style.left = bx + 'px';
    bl.style.top = by + 'px';

    chkStrike();
}

// Проверка соударения ракетки и мячика
function chkStrike() {
    const xDistance = (sqx + SQ_X / 2) - (bx + BL_SIZE / 2);
    const yDistance = (sqy + SQ_Y / 2) - (by + BL_SIZE / 2);
    if (Math.abs(xDistance) <= ((SQ_X + BL_SIZE) / 2) &&
        Math.abs(yDistance) <= ((SQ_Y + BL_SIZE) / 2)) {
        if ((SQ_X / 2 - xDistance) < 0 && Math.abs(yDistance) < ((SQ_Y + BL_SIZE) / 2)) { // Столкновение по горизонтали
            if (xDistance < 0) doStrike('r');
            else doStrike('l');
        } else { // Столкновение по вертикали
            if (yDistance < 0 ) doStrike('b');
            else doStrike('t');
        }
    }
}

// side - указатель, с какой стороны ракетры произошёл удар: l, r, t, b
function doStrike(side) {
    switch (side) {
        case 'l':
            bvx = -1 * Math.abs(bvx);
            bx = sqx - BL_SIZE;
            if (bx < 0) bx = 0;
            break;
        case 'r':
            bvx = Math.abs(bvx);
            bx = sqx + SQ_X;
            if (bx > GA_SIZE - BL_SIZE) bx = GA_SIZE - BL_SIZE;
            break;
        case 't':
            bvy = -1 * Math.abs(bvy * BOOST);
            by = sqy - BL_SIZE;
            if (by < 0) by = 0;
            break;
        case 'b':
            bvy = Math.abs(bvy);
            by = sqy + SQ_Y;
            if (by > GA_SIZE - BL_SIZE) by = GA_SIZE - BL_SIZE;
            break;
    }
    score++;
    document.getElementById('score').innerText = 'Score: ' + score;
}