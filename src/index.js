import PerlinNoiseLayer from './perlin_noise_layer';
import ParticleCanvas from './particle_canvas';
import ParticleGenerator from './particle_generator';

(function(window){
  window.ParticleTracks = {};

  ParticleTracks.init = ({container = ''})=>{
    ParticleTracks.container = document.getElementById(container);

    // Initialize Perlin Noise Layer
    ParticleTracks.noiseLayer = new PerlinNoiseLayer(ParticleTracks.container);
    ParticleTracks.noiseLayer.init();

    // Iniialize Particle Canvas
    ParticleTracks.particleCanvas = new ParticleCanvas(ParticleTracks.container);
    ParticleTracks.particleCanvas.init();

    // Initialize active particles list
    ParticleTracks.activeParticles = [];

    // Initialize particle generator
    ParticleTracks.generator = new ParticleGenerator();
    ParticleTracks.generator.init();


    // MODULES:

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