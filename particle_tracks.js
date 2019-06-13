/*

*/

// Assign html elements:
//function init()
let svg = document.getElementById("particle-tracks-svg");
let filterTurbulence = document.getElementById('bg-turbulence');

let canvas = document.getElementById("particles-canvas");
let ctx = prepareCanvas(canvas);
const dpRatio = window.devicePixelRatio;

function draw(x_i, y_i, x_f, y_f, lineWidth) {
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.beginPath();

  let elementRect = canvas.getBoundingClientRect();

  ctx.moveTo(x_i - elementRect.left, y_i - elementRect.top);
  ctx.lineTo(x_f - elementRect.left, y_f - elementRect.top);

  // calculate correct gradient points
  dx = x_i-x_f;
  dy = y_i-y_f;
  dist = Math.sqrt(dx*dx + dy*dy);
  dx = dx/dist;
  dy = dy/dist;
  x3 = x_i + (lineWidth/2)*dy;
  y3 = y_i - (lineWidth/2)*dx;
  x4 = x_i - (lineWidth/2)*dy;
  y4 = y_i + (lineWidth/2)*dx;

  // stroke using a linear gradient
  let gradient = ctx.createLinearGradient(x4,y4,x3,y3);

  gradient.addColorStop(0,'#ffffff00');
  gradient.addColorStop(0.25,'black');
  gradient.addColorStop(0.45,'#01A1FE');
  gradient.addColorStop(0.55,'#01A1FE');

  gradient.addColorStop(0.75,'black');
  gradient.addColorStop(1,'#ffffff00');

  ctx.strokeStyle = gradient;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.closePath();
}

var w = 0;
var h = 0;

function prepareCanvas(canvasElem) {
  // Initialize canvas to the correct size
  // https://github.com/zxlee618/drawing-on-a-html-canvas/blob/master/js/index.js
  const dpr = window.devicePixelRatio || 1;
  const rect = canvasElem.getBoundingClientRect();


  // TODO: store canvas on resize and redraw existing state, so we can redraw all the time:
  // https://stackoverflow.com/questions/5517783/preventing-canvas-clear-when-resizing-window
  canvasElem.width = rect.width * dpr;
  canvasElem.height = rect.height * dpr;

  let context = canvasElem.getContext("2d");
  context.scale(dpr, dpr);

  w = rect.width;
  h = rect.height;

  console.log(`canvas w: ${canvas.width}`);
  console.log(`context w: ${context.width}`);
  console.log(`dpi: ${dpr}`);


  return context;
}


class Particle {
  constructor(pos_x, pos_y, vel_x, vel_y) {
    this.x = pos_x;
    this.y = pos_y;

    this.v_x = vel_x;
    this.v_y = vel_y;

    this.x_f = this.x;
    this.y_f = this.y;
  };

  updatePosition() {
    //console.log(`x: ${this.x}, y: ${this.y}`);
    this.x = this.x_f;
    this.y = this.y_f;

    this.x_f = this.x + this.v_x;
    this.y_f = this.y + this.v_y;
  };
}


function drawPaths() {
  //updateCanvasSize();
  particles.forEach(part => {
    part.updatePosition();
    draw(part.x,part.y,part.x_f,part.y_f, 7);
  });
};


// Container for particles
let particles = [
  new Particle(0,0, 2, 2),
  new Particle(w/2,h/2, 3, 1),
];

let seed = 1;
function getSeed(){
  seed = (seed + 1) % 100;
  return seed;
};


function advanceFrame(){
  drawPaths();
};

function updateBg() {
  filterTurbulence.setAttribute('seed',getSeed());
};

svg.addEventListener("load",function(){
  setInterval(advanceFrame,25);
  setInterval(updateBg,250);
});