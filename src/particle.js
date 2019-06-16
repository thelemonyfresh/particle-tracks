// Particles
class Particle {
  //# abstract out position3D, velocity3D from Vectors
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

export { Electron, Positron, Muon, Photon, Proton, Neutron };