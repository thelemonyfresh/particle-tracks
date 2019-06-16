/*

 */

// Set up drawing canvas.
window.onload = function() {
  // move this to preparecanvas
  setInterval(createParticle,1000 + Math.random()*1000);
};
