/*

 */

// Set up global namespace.
var ParticleTracks = {};

// Set up drawing canvas.
window.onload = function() {
  ParticleTracks.width = 0;
  ParticleTracks.height = 0;

  ParticleTracks.filterTurbulence = filterTurbulence = document.getElementById('bg-turbulence');
  ParticleTracks.canvas = document.getElementById("particle-tracks-canvas");
  ParticleTracks.ctx = prepareCanvas(ParticleTracks.canvas);
  ParticleTracks.dpRatio = window.devicePixelRatio;

  ParticleTracks.ctx.fillStyle = "yellow";
  ParticleTracks.ctx.fillRect(0, 0, ParticleTracks.canvas.width, ParticleTracks.canvas.height);

  setInterval(drawPaths,50);
  setInterval(updateBg,500);
  setInterval(fadeOut,250);
  setInterval(createParticle,500 + Math.random()*1000);
};

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

  ParticleTracks.width = rect.width;
  ParticleTracks.height = rect.height;

  return context;
}

// Drawing functions.
function draw(x_i, y_i, x_f, y_f, mass) {
  // don't draw massless particles
  if (mass == 0) return;
  let ctx = ParticleTracks.ctx;
  let lineWidth = 10 + (0.0075 * mass);
  //console.log(`lw: ${lineWidth}`);
  //ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.beginPath();

  let elementRect = ParticleTracks.canvas.getBoundingClientRect();

  // x_i = x_i - elementRect.left;
  // x_f = x_f - elementRect.left;
  // y_i = y_i - elementRect.top;
  // y_f = y_f - elementRect.top;

  ctx.moveTo(x_i, y_i);
  ctx.lineTo(x_f, y_f);

  ctx.strokeStyle = particleTrackGradient(x_i, x_f, y_i, y_f, lineWidth);
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.closePath();
}

function particleTrackGradient(x_i,x_f,y_i,y_f,lineWidth) {
  // calculate and prepare linear gradient perpendicular to particle path
  dx = x_i-x_f;
  dy = y_i-y_f;
  dist = Math.sqrt(dx*dx + dy*dy);
  dx = dx/dist;
  dy = dy/dist;
  x3 = x_i + (lineWidth/2)*dy;
  y3 = y_i - (lineWidth/2)*dx;
  x4 = x_i - (lineWidth/2)*dy;
  y4 = y_i + (lineWidth/2)*dx;

  // particle tracks are blue in the center, with rough black edges
  let gradient = ParticleTracks.ctx.createLinearGradient(x4,y4,x3,y3);
  gradient.addColorStop(0,'#ffffff00');
  gradient.addColorStop(0.25 + Math.random()*0.1,'black');
  gradient.addColorStop(0.45,'#01A1FE');
  gradient.addColorStop(0.55,'#01A1FE');
  gradient.addColorStop(0.75 + Math.random()*0.1,'black');
  gradient.addColorStop(1,'#ffffff00');


  return gradient;
};

function fadeOut() {
  ParticleTracks.ctx.fillStyle = "rgba(255,255,0,0.2)";
  ParticleTracks.ctx.fillRect(0, 0, ParticleTracks.canvas.width, ParticleTracks.canvas.height);
  //ParticleTracks.ctx.globalAlpha = 0.5;
  //ParticleTracks.ctx.drawImage(ParticleTracks.svg, 0, 0);
}

function drawPaths() {
  ParticleTracks.activeParticles.forEach(part => {
    part.updatePosition();
    draw(part.x,part.y,part.x_f,part.y_f, part.mass);
  });
};

// Make the Perlin noise background dynamic
let seed = 1;
function getSeed(){
  seed = (seed + 1) % 100;
  return seed;
};

function updateBg() {
  filterTurbulence.setAttribute('seed',getSeed());
};

// Particles
class Particle {
  constructor(pos_x, pos_y, vel_x, vel_y, charge, mass) {
    this.x = pos_x;
    this.y = pos_y;

    this.v_x = vel_x;
    this.v_y = vel_y;

    this.mass = mass;
    this.charge = charge;

    this.chargeToMassRatio = charge/mass;

    this.x_f = this.x;
    this.y_f = this.y;
  };

  absVelocity(){
    return(Math.sqrt(Math.pow(this.v_x, 2) + Math.pow(this.v_y, 2)));
  };

  updatePosition() {
    console.log(`x: ${this.x}, y: ${this.y}`);
    console.log(`vx: ${this.v_x}, vy: ${this.v_y}`);

    this.x = this.x_f;
    this.y = this.y_f;

    // update the position
    this.x_f = this.x + this.v_x;
    this.y_f = this.y + this.v_y;

    // don't update velocity for massless particles
    if (this.mass != 0) {

      // update the velocity
      let chargeToMassRatio = this.charge/this.mass;
      let drag = 0.002 * (1/this.mass) * (Math.pow(this.v_x, 2) + Math.pow(this.v_y, 2));
      let delta_v_x = this.chargeToMassRatio * this.v_y * 0.05;
      let delta_v_y = -1 * this.chargeToMassRatio * this.v_x * 0.05;

      //console.log(`abs vel: ${ this.absVelocity() } `);
      //console.log(`decay: ${decay}`);
      //console.log(`delt vx: ${delta_v_x}`);
      //console.log(`delt vy: ${delta_v_y}`);

      this.v_x = this.v_x + delta_v_x - (drag * 0.25 * this.v_x / this.absVelocity());
      this.v_y = this.v_y + delta_v_y - (drag * this.v_y / this.absVelocity());
    }
    // possibly particle decay
    if(this.decayProbability != undefined && this.decayProbability > Math.random()){
      this.decay();
    }

    let out_of_x = this.x > 2 * ParticleTracks.width || this.x < -1 * ParticleTracks.width;
    let out_of_y = this.y > 2* ParticleTracks.height || this.y < -1 * ParticleTracks.height;
    let stopped = this.absVelocity() <= 2.5;
    if( out_of_x || out_of_y || stopped){
      // remove from list of active particles if way off canvas
      let index = ParticleTracks.activeParticles.indexOf(this);
      ParticleTracks.activeParticles.splice(index,1);
    }

  };
};

class Electron extends Particle {
  constructor(pos_x, pos_y, vel_x, vel_y) {
    super(pos_x, pos_y, vel_x, vel_y, -1, 0.5);
  };
}

class Positron extends Particle {
  constructor(pos_x, pos_y, vel_x, vel_y) {
    super(pos_x, pos_y, vel_x, vel_y, 1, 0.5);
  };
}

class Muon extends Particle {
  constructor(pos_x, pos_y, vel_x, vel_y){
    super(pos_x, pos_y, vel_x, vel_y, -1, 500);
    this.decayProbability = 0.05;
  }

  // decays into one electron
  decay() {
    let e = new Electron(this.x, this.y, this.v_x, this.v_y);
    ParticleTracks.activeParticles.push(e);
    this.v_x = 0;
    this.v_y = 0;
  }
}
class Photon extends Particle {
  constructor(pos_x, pos_y, vel_x, vel_y){
    super(pos_x, pos_y, vel_x, vel_y, 0, 0);
    this.decayProbability = 0.1;
  };

  // decays into an electron/positron pair
  decay(){
    let e = new Electron(this.x, this.y, this.v_x*0.7, this.v_y*0.7);
    let p = new Positron(this.x, this.y, this.v_x*0.7, this.v_y*0.7);
    ParticleTracks.activeParticles.push(e,p);
    this.v_x = 0;
    this.v_y = 0;
  }
};

// Container for particles
ParticleTracks.activeParticles = [
  //new Positron(200,100,100,5),
  //new Electron(200,100,100,5),
  new Photon(500,500,-10,-50)
];

ParticleTracks.particleTypes = [Muon, Muon, Photon];

function createParticle() {
  let particleClass = selectFromArray(ParticleTracks.particleTypes);

  let x_0 = (2 * Math.random() - 1) * ParticleTracks.width;
  let y_0 = (2 * Math.random() - 1) * ParticleTracks.height;
  let v_x = (2 * Math.random() - 1) * 100;
  let v_y = (2 * Math.random() - 1) * 100;

  vMax = 25;
  vMin = 65;
  xMax = ParticleTracks.width;
  yMax = ParticleTracks.height;

  possibleStartingPositions = [
    //right
    [0, Math.random()*yMax, vMin + Math.random()*vMax, vMin + (0.25 + 0.5*Math.random())*vMax],
    //top
    [Math.random()*xMax, 0, vMin + (0.25 + 0.5*Math.random())*vMax, vMin + Math.random()*vMax],
    //left
    [xMax, Math.random()*yMax, -1*(vMin + Math.random()*vMax), 0.25 + 0.5*Math.random()*vMax],
    //bottom
    [Math.random()*xMax, yMax, vMin + (0.25 + 0.5*Math.random())*vMax, -(vMin + Math.random()*vMax)],
  ];

  startArgs = selectFromArray(possibleStartingPositions);

  ParticleTracks.activeParticles.push(new particleClass(...startArgs));
};

function selectFromArray(array){
  return(array[Math.floor(Math.random() * array.length)]);
};