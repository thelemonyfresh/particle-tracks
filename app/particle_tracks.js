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

  ParticleTracks.perlinSeed = 1;

  setInterval(drawParticles,25);
  setInterval(updateNoise,500);
  setInterval(fadeOut,250);
  setInterval(createParticle,1000 + Math.random()*1000);

  // Container for particles
  ParticleTracks.activeParticles = [];
};

function prepareCanvas(canvasElem) {
  // Initialize canvas to the correct size
  const dpr = window.devicePixelRatio || 1;
  const rect = canvasElem.getBoundingClientRect();

  // TODO: store canvas redraw after resize instead of sclaing:
  // https://stackoverflow.com/questions/5517783/preventing-canvas-clear-when-resizing-window
  canvasElem.width = rect.width * dpr;
  canvasElem.height = rect.height * dpr;

  let context = canvasElem.getContext("2d");
  context.scale(dpr, dpr);

  ParticleTracks.width = rect.width;
  ParticleTracks.height = rect.height;

  return context;
}

function drawParticles() {
  ParticleTracks.activeParticles.forEach(particle => {
    draw(particle);
    particle.update();
  });
};

// Set up and draw a particle for one frame of movement.
function draw(particle) {
  // Don't draw massless particles, stopped particles
  if (particle.mass == 0 || particle.stopped()) return;

  let ctx = ParticleTracks.ctx;

  // Line Width based on particle size, z position
  let lineWidth = 10 + (0.0075 * particle.mass) - particle.z;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.beginPath();

  let elementRect = ParticleTracks.canvas.getBoundingClientRect();
  ctx.moveTo(particle.x_prev, particle.y_prev);
  ctx.lineTo(particle.x, particle.y);

  ctx.strokeStyle = particleTrackGradient(particle.x_prev, particle.x, particle.y_prev, particle.y, lineWidth);

  ctx.stroke();
  ctx.closePath();
}

function particleTrackGradient(x_i,x_f,y_i,y_f,lineWidth) {
  // prepare linear gradient perpendicular to particle path (for nice
  //   blue-to-black effect on particle tracks)
  dx = x_i-x_f;
  dy = y_i-y_f;
  dist = Math.sqrt(dx*dx + dy*dy);
  dx = dx/dist;
  dy = dy/dist;
  x3 = x_i + (lineWidth/2)*dy;
  y3 = y_i - (lineWidth/2)*dx;
  x4 = x_i - (lineWidth/2)*dy;
  y4 = y_i + (lineWidth/2)*dx;

  // Particle tracks are blue in the center, with fading black edges
  let gradient = ParticleTracks.ctx.createLinearGradient(x4,y4,x3,y3);
  gradient.addColorStop(0,'#ffffff00');
  gradient.addColorStop(0.3 - Math.random()*0.05,'black');
  gradient.addColorStop(0.45,'#01A1FE');
  gradient.addColorStop(0.55,'#01A1FE');
  gradient.addColorStop(0.7 + Math.random()*0.05,'black');
  gradient.addColorStop(1,'#ffffff00');

  return gradient;
};

// Continuously fade particle tracks.
function fadeOut() {
  ParticleTracks.ctx.fillStyle = "rgba(255,255,0,0.2)";
  ParticleTracks.ctx.fillRect(0, 0, ParticleTracks.canvas.width, ParticleTracks.canvas.height);
};

// Make the Perlin noise background dynamic
function getPerlinSeed(){
  ParticleTracks.perlinSeed = (ParticleTracks.perlinSeed + 1) % 100;
  return ParticleTracks.perlinSeed;
};

function updateNoise() {
  filterTurbulence.setAttribute('seed',getPerlinSeed());
};

// Particles
class Particle {
  constructor(x_0, y_0, z_0, vel_x, vel_y, vel_z, charge, mass) {
    // Physical properties
    this.mass = mass;
    this.charge = charge;
    this.chargeToMassRatio = charge/mass;

    // Last position, velocity, current position
    this.x_prev = x_0;
    this.y_prev = y_0;

    this.v_x = vel_x;
    this.v_y = vel_y;

    this.x = this.x_prev + this.v_x;
    this.y = this.y_prev + this.v_y;

    // Random z position, z velocity opposite to z position direction.
    this.z = z_0; // Math.random();
    this.v_z = vel_z; // 0.1*Math.random() * -1 * this.z/Math.abs(this.z);
  };

  absVelocity(){
    return(Math.sqrt(Math.pow(this.v_x, 2) + Math.pow(this.v_y, 2)));
  };

  stopped() {
    return this.absVelocity() <= 2.5;
  };

  update() {
    // Possibly particle decay
    if(this.decayProbability != undefined && this.decayProbability > Math.random()){
      this.decay();
      return;
    }

    // Stop rending this particle if out of bounds or stopped
    let out_of_x = this.x > 2 * ParticleTracks.width || this.x < -1 * ParticleTracks.width;
    let out_of_y = this.y > 2* ParticleTracks.height || this.y < -1 * ParticleTracks.height;
    let out_of_z = Math.abs(this.z) > 3;

    if( out_of_x || out_of_y || out_of_z || this.stopped()){
      let index = ParticleTracks.activeParticles.indexOf(this);
      // Remove from list of active particles
      ParticleTracks.activeParticles.splice(index,1);
      return;
    }

    this.x_prev = this.x;
    this.y_prev = this.y;

    // Update the position
    this.x = this.x_prev + this.v_x;
    this.y = this.y_prev + this.v_y;
    this.z = this.z + this.v_z;

    // Update velocity (but not for massless particles)
    if (this.mass != 0) {
      // Magnetic field
      let B_x = 0.1;
      let B_y = 0.125;

      // Acceleration
      let a_x = this.chargeToMassRatio * this.v_y * B_x;
      let a_y = -1 * this.chargeToMassRatio * this.v_x * B_y;

      // "Drag" -- velocity lost to particle interactions
      let drag = 0.5 + 0.001 * Math.pow(this.absVelocity(),2);

      let drag_x = drag * this.v_x / this.absVelocity();
      let drag_y = drag * this.v_y / this.absVelocity();

      // Update velocity
      this.v_x = this.v_x + a_x - drag_x;
      this.v_y = this.v_y + a_y - drag_y;
    }
  };
};

class Electron extends Particle {
  constructor(pos_x, pos_y, pos_z, vel_x, vel_y, vel_z) {
    super(pos_x, pos_y, pos_z, vel_x, vel_y, vel_z, -1, 0.5);
  };
}

class Positron extends Particle {
  constructor(pos_x, pos_y, pos_z, vel_x, vel_y, vel_z) {
    super(pos_x, pos_y, pos_z, vel_x, vel_y, vel_z, 1, 0.5);
  };
}

class Muon extends Particle {
  constructor(pos_x, pos_y, pos_z, vel_x, vel_y, vel_z){
    super(pos_x, pos_y, pos_z, vel_x, vel_y, vel_z, -1, 500);
    this.decayProbability = 0.02;
  }

  // Decays into one electron (and some neutrinos which we ignore)
  decay() {
    let e = new Electron(this.x, this.y, this.z, this.v_x*0.5, this.v_y*0.5, this.v_z*0.5);
    ParticleTracks.activeParticles.push(e);
    this.v_x = 0;
    this.v_y = 0;
  }
}

class Photon extends Particle {
  constructor(pos_x, pos_y, pos_z, vel_x, vel_y, vel_z) {
    super(pos_x, pos_y, pos_z, vel_x, vel_y, vel_z, 0, 0);
    this.decayProbability = 0.3;
  };

  // Really some hand-wavy pair production that looks cool
  decay(){
    let e = new Electron(this.x, this.y, this.z, this.v_x*0.5, this.v_y*0.5, this.v_z*0.5);
    let p = new Positron(this.x, this.y, this.z, this.v_x*0.5, this.v_y*0.5, this.v_z*0.5);
    ParticleTracks.activeParticles.push(e,p);
    this.v_x = 0;
    this.v_y = 0;
  }
};

class Proton extends Particle {
  constructor(pos_x, pos_y, pos_z, vel_x, vel_y, vel_z) {
    super(pos_x, pos_y, pos_z, vel_x, vel_y, vel_z, 1, 900);
  };
}

class Neutron extends Particle {
  constructor(pos_x, pos_y, pos_z, vel_x, vel_y, vel_z) {
    super(pos_x, pos_y, pos_z, vel_x, vel_y, vel_z, 0, 900);
    this.decayProbability = 0.05;
  };

  // Free neutron beta decay
  decay() {
    let e = new Electron(this.x, this.y, this.z, this.v_x*0.6, this.v_y*0.6, this.v_z*0.6);
    let p = new Proton(this.x, this.y, this.z, this.v_x*0.7, this.v_y*0.7, this.v_z*0.6);
    ParticleTracks.activeParticles.push(e,p);
    this.v_x = 0;
    this.v_y = 0;
  }
};

ParticleTracks.particleTypes = [Muon, Photon, Proton, Neutron];

function createParticle() {
  let particleClass = selectFromArray(ParticleTracks.particleTypes);

  // TODO: choose random energies, use momentum to decide velocity
  let vMax = 30;
  let vMin = 20;

  randomV = vMin + Math.random()*vMax;
  randomV2 = vMin + Math.random()*vMax;

  let xMax = ParticleTracks.width;
  let yMax = ParticleTracks.height;
  let zMax = 1;

  let randomX = xMax * Math.random();
  let randomY = yMax * Math.random();
  let randomZ = zMax * Math.random();

  randomVz = 0.1*Math.random() * -1 * randomZ/Math.abs(randomZ);

  possibleStartingPositions = [
    //left
    [0, randomY, randomZ, randomV, randomV2, randomVz],
    //top
    [randomX, 0, randomZ, randomV2, randomV, randomVz],
    //right
    [xMax, randomY, randomZ, -randomV, randomV2, randomVz],
    //bottom
    [randomX, yMax, randomZ, -randomV2, randomV, randomVz],
  ];

  startArgs = selectFromArray(possibleStartingPositions);
  ParticleTracks.activeParticles.push(new particleClass(...startArgs));
};

function selectFromArray(array){
  return(array[Math.floor(Math.random() * array.length)]);
};