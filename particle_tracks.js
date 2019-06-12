/*

*/

console.log("js loading");

// Assign html elements:
let svg = document.getElementById("js-particle-tracks-svg");
let filterTurbulence = document.getElementById('bg-turbulence');

// Container for particles
let particles = [];

let seed = 1;
function getSeed(){
  seed = (seed + 1) % 100;
  return seed;
};

function advanceFrame(){
  filterTurbulence.setAttribute('seed',getSeed());
};

svg.addEventListener("load",function(){
  setInterval(advanceFrame,250);
});