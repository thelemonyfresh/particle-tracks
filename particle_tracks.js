/*

*/

// Assign html elements:
//function init()
let svg = document.getElementById("particle-tracks-svg");
let filterTurbulence = document.getElementById('bg-turbulence');

let canvas = document.getElementById("particles-canvas");
ctx = canvas.getContext("2d");


function draw(x_i, y_i, x_f, y_f) {
  ctx.lineWidth = 1;
  ctx.beginPath();
  let elementRect = canvas.getBoundingClientRect();

  ctx.moveTo(x_i - elementRect.left, y_i - elementRect.top);
  ctx.lineTo(x_f - elementRect.left, y_f - elementRect.top);
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.closePath();
}

function updateCanvasSize(){
  // Initialize canvas to the correct size
  const rect = canvas.getBoundingClientRect();
  const dpRatio = window.devicePixelRatio;

  // TODO: store canvas on resize and redraw existing state, so we can redraw all the time:
  // https://stackoverflow.com/questions/5517783/preventing-canvas-clear-when-resizing-window
  canvas.width = rect.width * dpRatio;
  canvas.height = rect.height * dpRatio;
  w = canvas.width;
  h = canvas.height;
}

updateCanvasSize();

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
    this.x = this.x_f;
    this.y = this.y_f;

    let new_x = this.x + this.v_x;
    let new_y = this.y + this.v_y;

    this.x_f = new_x;
    this.y_f = new_y;
  };
}


function drawPaths() {
  //updateCanvasSize();
  particles.forEach(part => {
    part.updatePosition();
    draw(part.x,part.y,part.x_f,part.y_f);
  });
};


// Container for particles
let particles = [
  new Particle(w/2,h/2, 2, 2),
  new Particle(w/5,h/5, 4, 1)
];

let seed = 1;
function getSeed(){
  seed = (seed + 1) % 100;
  return seed;
};


function advanceFrame(){
  drawPaths();
  filterTurbulence.setAttribute('seed',getSeed());
};

svg.addEventListener("load",function(){
  setInterval(advanceFrame,250);
});