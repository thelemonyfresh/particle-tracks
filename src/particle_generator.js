import { Muon, Photon, Proton, Neutron } from './particle';

class ParticleGenerator {
  constructor() {
    this.generateParticleTypes = [Muon, Photon, Proton, Neutron];
  };

  init(){
    setInterval(() => this.createParticle(),1000 + Math.random()*1000);
  }

  createParticle() { // -> createRandomParticle
    let particleClass = selectFromArray(this.generateParticleTypes);

    // TODO: choose random energies, use momentum to decide velocity
    let vMax = 30;
    let vMin = 20;

    let randomV = vMin + Math.random()*vMax;
    let randomV2 = vMin + Math.random()*vMax;

    let xMax = ParticleTracks.width;
    let yMax = ParticleTracks.height;
    let zMax = 1;

    let randomX = xMax * Math.random();
    let randomY = yMax * Math.random();
    let randomZ = zMax * Math.random();

    let randomVz = 0.1*Math.random() * -1 * randomZ/Math.abs(randomZ);

    let possibleStartingPositions = [
      //left
      [0, randomY, randomZ, randomV, randomV2, randomVz],
      //top
      [randomX, 0, randomZ, randomV2, randomV, randomVz],
      //right
      [xMax, randomY, randomZ, -randomV, randomV2, randomVz],
      //bottom
      [randomX, yMax, randomZ, -randomV2, randomV, randomVz],
    ];

    let startArgs = selectFromArray(possibleStartingPositions);
    console.log(startArgs);
    ParticleTracks.activeParticles.push(new particleClass(...startArgs));
  };
};

function selectFromArray(array){
  return(array[Math.floor(Math.random() * array.length)]);
};

export default ParticleGenerator;