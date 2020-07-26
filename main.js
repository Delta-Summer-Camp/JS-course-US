const square = document.getElementById('square');
document.addEventListener('keydown', getKey);

const STEP = 10;
const GA_SIZE = 800;
const SQ_SIZE = 40;

function init() {
    square.style.width = square.style.height = SQ_SIZE + 'px';
    const ga = document.getElementById('gameArea');
    ga.style.width = ga.style.height = GA_SIZE + 'px';
}

function getKey(event) {
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