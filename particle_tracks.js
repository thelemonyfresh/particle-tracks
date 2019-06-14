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

  setInterval(drawPaths,25);
  setInterval(updateBg,500);
  setInterval(fadeOut,250);
  setInterval(createParticle,2000 + Math.random()*1000);
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
function draw(particle) {
  console.log(particle.constructor.name);
  //console.log(`absvel: ${particle.absVelocity()}`);
  // don't draw massless particles
  if (particle.mass == 0 || particle.absVelocity() == 0) return;

  console.log("still drawing");

  let ctx = ParticleTracks.ctx;
  let lineWidth = 10 + (0.0075 * particle.mass) - particle.z;
  //console.log(`lw: ${lineWidth}`);
  //ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.beginPath();

  let elementRect = ParticleTracks.canvas.getBoundingClientRect();

  ctx.moveTo(particle.x_prev, particle.y_prev);
  ctx.lineTo(particle.x, particle.y);

  ctx.strokeStyle = particleTrackGradient(particle.x_prev, particle.x, particle.y_prev, particle.y, lineWidth);
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
  ParticleTracks.activeParticles.forEach(particle => {
    draw(particle);
    particle.updatePosition();

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
  constructor(x_0, y_0, vel_x, vel_y, charge, mass) {
    this.x_prev = x_0;
    this.y_prev = y_0;

    this.v_x = vel_x;
    this.v_y = vel_y;


    this.mass = mass;
    this.charge = charge;

    this.chargeToMassRatio = charge/mass;

    this.x = this.x_prev + this.v_x;
    this.y = this.y_prev + this.v_y;
    this.z = Math.random();
    this.v_z = 0.1*Math.random() * -1 * this.z/Math.abs(this.z);
  };

  absVelocity(){
    return(Math.sqrt(Math.pow(this.v_x, 2) + Math.pow(this.v_y, 2)));
  };

  updatePosition() {
    // possibly particle decay
    if(this.decayProbability != undefined && this.decayProbability > Math.random()){
      this.decay();
      return;
    }

    // stop rending this particle if out of bounds or stopped
    let out_of_x = this.x > 2 * ParticleTracks.width || this.x < -1 * ParticleTracks.width;
    let out_of_y = this.y > 2* ParticleTracks.height || this.y < -1 * ParticleTracks.height;
    let stopped = this.absVelocity() <= 2;
    if( out_of_x || out_of_y || stopped){
      // remove from list of active particles if way off canvas
      let index = ParticleTracks.activeParticles.indexOf(this);
      ParticleTracks.activeParticles.splice(index,1);
      return;
    }

    //console.log(`x: ${this.x}, y: ${this.y}`);
    //console.log(`vx: ${this.v_x}, vy: ${this.v_y}`);

    this.x_prev = this.x;
    this.y_prev = this.y;

    // update the position
    this.x = this.x_prev + this.v_x;
    this.y = this.y_prev + this.v_y;
    this.z = this.z + this.v_z;

    // don't update velocity for massless particles
    if (this.mass != 0) {

      // v_z TEST

      // update the velocity
      let chargeToMassRatio = this.charge/this.mass;

      let B_x = 0.1; //+ 0.02*Math.abs(this.x /  ParticleTracks.width );
      let B_y = 0.11; //+ 0.02*Math.abs(this.y / ParticleTracks.height );

      let a_x = this.chargeToMassRatio * this.v_y * B_x;
      let a_y = -1 * this.chargeToMassRatio * this.v_x * B_y;

      let drag = 0.8; // * (1/this.mass) * (Math.pow(this.v_x, 2) + Math.pow(this.v_y, 2));
      console.log(`drag: ${drag}`);
      let sign_x = this.v_x == 0 ? 1 : this.v_x / Math.abs(this.v_x);
      let sign_y = this.v_y == 0 ? 1 : this.v_y / Math.abs(this.v_y);

      this.v_x = this.v_x + a_x - drag * sign_x;
      this.v_y = this.v_y + a_y - drag * sign_y;

      console.log("AFTER");
      console.log(`delt vx: ${a_x}`);
      console.log(`delt vy: ${a_y}`);
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
    this.decayProbability = 0.01;
  }

  // decays into one electron
  decay() {
    console.log("muon decay");
    let e = new Electron(this.x, this.y, this.v_x*0.5, this.v_y*0.5);
    ParticleTracks.activeParticles.push(e);
    this.v_x = 0;
    this.v_y = 0;
  }
}

class Photon extends Particle {
  constructor(pos_x, pos_y, vel_x, vel_y) {
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

class Proton extends Particle {
  constructor(pos_x, pos_y, vel_x, vel_y) {
    super(pos_x, pos_y, vel_x, vel_y, 1, 900);
  };
}

class Neutron extends Particle {
  constructor(pos_x, pos_y, vel_x, vel_y) {
    super(pos_x, pos_y, vel_x, vel_y, 0, 900);
    this.decayProbability = 0.1;
  };

  // free neutron beta decay
  decay() {
    let e = new Electron(this.x, this.y, this.v_x*0.6, this.v_y*0.6);
    let p = new Proton(this.x, this.y, this.v_x*0.7, this.v_y*0.7);
    ParticleTracks.activeParticles.push(e,p);
    this.v_x = 0;
    this.v_y = 0;
  }
}

// Container for particles
ParticleTracks.activeParticles = [
  //new Positron(200,100,100,5),
  //new Electron(200,100,100,5),
  //new Neutron(0,500,50,0)
];


ParticleTracks.particleTypes = [Muon, Muon, Photon, Proton, Neutron];

function createParticle() {
  let particleClass = selectFromArray(ParticleTracks.particleTypes);

  let x_0 = (2 * Math.random() - 1) * ParticleTracks.width;
  let y_0 = (2 * Math.random() - 1) * ParticleTracks.height;
  let v_x = (2 * Math.random() - 1) * 100;
  let v_y = (2 * Math.random() - 1) * 100;

  // TODO: choose random energies, use momentum to decide velocity
  vMax = 25;
  vMin = 20;
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