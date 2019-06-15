import svgNoise from 'svg-inline-loader?classPrefix!./perlin_noise.svg';

(function(window){
  console.log('asdf');
  window.ParticleTracks = {};

  ParticleTracks.init = ({container = ''})=>{

    ParticleTracks.container = document.getElementById(container);
    ParticleTracks.container.innerHTML += svgNoise;


  };

})(window);