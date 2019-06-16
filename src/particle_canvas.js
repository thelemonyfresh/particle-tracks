class ParticleCanvas {
  constructor(container) {
    // this.particleGenerator = particleGenerator;
    this.container = container;
  };

  init() {
    this.canvas = this.prepareCanvas(this.container);
    this.context = this.prepareContext();

    setInterval(() => this.drawParticles(),25);
    setInterval(() => this.fadeOut(),250);
  };

  prepareCanvas(container) {
    let canvas = document.createElement('canvas');
    canvas.id = 'particle-tracks-particle-canvas';
    container.appendChild(canvas);
    canvas = document.getElementById('particle-tracks-particle-canvas');

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    return canvas;
  };

  prepareContext() {
    // Initialize canvas to the correct size
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();

    // TODO: store canvas redraw after resize instead of sclaing:
    // https://stackoverflow.com/questions/5517783/preventing-canvas-clear-when-resizing-window
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;

    let context = this.canvas.getContext("2d");
    context.scale(dpr, dpr);

    // pass width and height to particlegenerator dirrently?
    ParticleTracks.width = rect.width;
    ParticleTracks.height = rect.height;

    context.fillStyle = "yellow";
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    return context;
  };

  //# needs context, particles this.context, this.particleGenerator.activeParticles
  drawParticles() {
    ParticleTracks.activeParticles.forEach(particle => {
      this.draw(particle);
      particle.update();
    });
  };

  //# needs context, particles
  // Set up and draw a particle for one frame of movement.
  draw(particle) {
    // Don't draw massless particles, stopped particles
    if (particle.mass == 0 || particle.stopped()) return;

    let ctx = this.context;

    // Line Width based on particle size, z position
    let lineWidth = 10 + (0.0075 * particle.mass) - particle.z;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.beginPath();

    ctx.moveTo(particle.x_prev, particle.y_prev);
    ctx.lineTo(particle.x, particle.y);

    ctx.strokeStyle = this.particleTrackGradient(particle.x_prev, particle.x, particle.y_prev, particle.y, lineWidth);

    ctx.stroke();
    ctx.closePath();
  };

  particleTrackGradient(x_i,x_f,y_i,y_f,lineWidth) {
    // prepare linear gradient perpendicular to particle path (for nice
    //   blue-to-black effect on particle tracks)
    let dx = x_i-x_f;
    let dy = y_i-y_f;
    let dist = Math.sqrt(dx*dx + dy*dy);
    dx = dx/dist;
    dy = dy/dist;
    let x3 = x_i + (lineWidth/2)*dy;
    let y3 = y_i - (lineWidth/2)*dx;
    let x4 = x_i - (lineWidth/2)*dy;
    let y4 = y_i + (lineWidth/2)*dx;

    // Particle tracks are blue in the center, with fading black edges
    let gradient = this.context.createLinearGradient(x4,y4,x3,y3);
    gradient.addColorStop(0,'#ffffff00');
    gradient.addColorStop(0.3 - Math.random()*0.05,'black');
    gradient.addColorStop(0.45,'#01A1FE');
    gradient.addColorStop(0.55,'#01A1FE');
    gradient.addColorStop(0.7 + Math.random()*0.05,'black');
    gradient.addColorStop(1,'#ffffff00');

    return gradient;
  };

  // Fade particle tracks.
  fadeOut() {
    this.context.fillStyle =  "rgba(255,255,0,0.2)";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };

};

export default ParticleCanvas;