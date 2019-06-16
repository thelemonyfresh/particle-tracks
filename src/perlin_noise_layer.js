import noiseSVG from 'svg-inline-loader?classPrefix!./perlin_noise.svg';

class PerlinNoiseLayer {
  constructor(container){
    this.targetContainer = container;
    this.perlinSeed = 0;
    this.filterTurbulence = null;
  };

  init() {
    this.targetContainer.innerHTML += noiseSVG;
    let svgElem = document.getElementById('particle-tracks-perlin-noise-svg');

    this.setupSVG(svgElem);

    this.filterTurbulence = document.getElementById('particle-tracks-perlin-turbulence');
    setInterval(() => this.updateNoise(),500);
  };

  setupSVG(svg) {
    let rect = this.targetContainer.getBoundingClientRect();

    svg.style.position = 'absolute';
    svg.style.top = rect.top;
    svg.style.left = rect.left;
    svg.style.width = rect.width;
    svg.style.height = rect.height;
    svg.style.zIndex = 1;
    svg.style.opacity = 0.75;
  }

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