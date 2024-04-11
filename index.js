const canvas = document.getElementById('main');
const ctx = canvas.getContext('2d');

let painting = false;

function startPosition(e) {
  painting = true;
  draw(e);
}

function finishedPosition() {
  painting = false;
  ctx.beginPath();
  saveState();
}

function draw(e) {
  if (!painting) return;
  ctx.lineWidth = document.getElementById('slider').value;
  ctx.lineCap = 'round';

  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);

const eraseButton = document.getElementById('erase');
const blackButton = document.getElementById('black');
const pinkButton = document.getElementById('pink');
const blueButton = document.getElementById('blue');
const yellowButton = document.getElementById('yellow');

eraseButton.addEventListener('click', () => {
  ctx.strokeStyle = '#fff';
});

blackButton.addEventListener('click', () => {
  ctx.strokeStyle = '#000';
});

pinkButton.addEventListener('click', () => {
  ctx.strokeStyle = '#F50057';
});

blueButton.addEventListener('click', () => {
  ctx.strokeStyle = '#2979FF';
});

yellowButton.addEventListener('click', () => {
  ctx.strokeStyle = '#FFD600';
});

const newButton = document.getElementById('new');
newButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  saveState();
});

const slider = document.getElementById('slider');
const brushSize = document.getElementById('brushSize');
brushSize.textContent = slider.value;
slider.addEventListener('input', () => {
  brushSize.textContent = slider.value;
});

function saveState() {
  localStorage.setItem('canvasState', canvas.toDataURL());
}

function restoreState() {
  const restoredCanvas = new Image();
  restoredCanvas.src = localStorage.getItem('canvasState');
  restoredCanvas.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(restoredCanvas, 0, 0);
  };
}

restoreState();