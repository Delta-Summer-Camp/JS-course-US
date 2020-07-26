const square = document.getElementById('square');
document.addEventListener('keydown', getKey);

const STEP = 10;

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

    square.style.left = x + 'px';
    square.style.top = y + 'px';
}