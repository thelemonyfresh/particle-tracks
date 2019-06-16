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

    window.onresize = () => {
      ParticleTracks.noiseLayer.resize();
      ParticleTracks.particleCanvas.prepareContext(ParticleTracks.container);
    };

    console.log('Particle tracks visualization initiated.');
  };

})(window);