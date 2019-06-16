import svgNoise from 'svg-inline-loader?classPrefix!./perlin_noise.svg';

class PerlinNoiseLayer {
  constructor(container){
    this.targetContainer = container;
    this.perlinSeed = 0;
    this.filterTurbulence = null;
  };

  init() {
    this.targetContainer.innerHTML += svgNoise;
    this.filterTurbulence = document.getElementById('particle-tracks-perlin-turbulence');
    setInterval(() => this.updateNoise(),500);
  };

  // Make the Perlin noise background dynamic
  getPerlinSeed(){
    this.perlinSeed = (this.perlinSeed + 1) % 100;
    return this.perlinSeed;
  };

  updateNoise() {
    this.filterTurbulence.setAttribute('seed',this.getPerlinSeed());
  };

};

export default PerlinNoiseLayer;