const out = document.getElementById('output');
const input = document.getElementById('input');

document.addEventListener('keydown', getKey);

function getKey(event) {
    let str = '';
    if (event.shiftKey === true) str += 'Shift+';
    if (event.ctrlKey === true) str += 'Ctrl+';
    if (event.altKey === true) str += 'Alt+';
    out.innerText = str +  event.code;
    return false;
}

function run() {

    out.innerText = 'Hello, World!';

}