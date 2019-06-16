import PerlinNoiseLayer from './perlin_noise_layer';

(function(window){
  console.log('asdf');
  window.ParticleTracks = {};

  ParticleTracks.init = ({container = ''})=>{
    ParticleTracks.container = document.getElementById(container);

    // Initialize Perlin Noise Layer
    ParticleTracks.noiseLayer = new PerlinNoiseLayer(ParticleTracks.container);
    ParticleTracks.noiseLayer.init();

    // keep list of particles

    // drawParticles

    // MODULES:

    // Perlin Noise -- getPerlinSeed
    // new PerlinNoiseLayer.init(container);

    // Particle generator -- createParticle(), selectFromArray(), activeParticles
    // // imports Particle, subparticles -- Particle, Electron, etc., isStopped?
    // particleGenerator = new ParticleGenerator(optional args: freq, etc.,);
    // create partcielGenerator.collectGarbage(); (removes "stopped" particles)

    // Vector -- position.times(3), velocity.times(3);

    // Particle canvas -- prepareCanvas->init, draw, particleTrackGradient, fadeOut
    // particleCanvas = new ParticleCanvas.init(particleGeneratore;)

    // console log about particle generator started?
  };

})(window);