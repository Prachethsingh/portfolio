/**
 * Dependency-free 3D point-cloud renderer.
 * Points live on a torus in world space, rotate in 3D, and are perspective-projected
 * onto Canvas 2D. No WebGL download is needed; the document works without it.
 */
export function initializeNetworkScene(canvas, motionButton) {
  const context = canvas.getContext('2d');
  if (!context) { canvas.hidden = true; motionButton.hidden = true; return; }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  let visible = true;
  let rotation = 0.35;
  let tilt = -0.35;
  let width = 1;
  let height = 1;
  let dragging = false;
  let previousPointer = null;
  let previousTime = 0;
  let animationFrame = null;
  const points = [];
  const rings = 44;
  const sides = 15;

  for (let ring = 0; ring < rings; ring++) {
    const u = ring / rings * Math.PI * 2;
    for (let side = 0; side < sides; side++) {
      const v = side / sides * Math.PI * 2;
      const radius = 1.58 + 0.65 * Math.cos(v);
      points.push({ x: radius * Math.cos(u), y: radius * Math.sin(u), z: 0.65 * Math.sin(v) });
    }
  }

  function project(point) {
    const x = point.x * Math.cos(rotation) + point.z * Math.sin(rotation);
    const z = -point.x * Math.sin(rotation) + point.z * Math.cos(rotation);
    const y = point.y * Math.cos(tilt) - z * Math.sin(tilt);
    const depth = point.y * Math.sin(tilt) + z * Math.cos(tilt);
    const perspective = 6 / (6 + depth);
    const scale = Math.min(width, height) * 0.19;
    return { x: width * 0.53 + x * scale * perspective, y: height * 0.48 + y * scale * perspective, depth };
  }

  function draw() {
    context.clearRect(0, 0, width, height);
    const projected = points.map(project);
    for (let ring = 0; ring < rings; ring++) {
      for (let side = 0; side < sides; side++) {
        const index = ring * sides + side;
        const point = projected[index];
        const opacity = Math.max(0.1, Math.min(0.65, (3 - point.depth) / 7));
        for (const neighbor of [ring * sides + (side + 1) % sides, ((ring + 1) % rings) * sides + side]) {
          const end = projected[neighbor];
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(end.x, end.y);
          context.strokeStyle = `rgba(151, 169, 123, ${opacity * 0.6})`;
          context.lineWidth = 0.65;
          context.stroke();
        }
        context.beginPath();
        context.arc(point.x, point.y, point.depth < 0 ? 1.6 : 1, 0, Math.PI * 2);
        context.fillStyle = index % 17 === 0 ? `rgba(225, 176, 128, ${opacity + 0.2})` : `rgba(180, 198, 148, ${opacity})`;
        context.fill();
      }
    }
  }

  function tick(time) {
    animationFrame = null;
    if (!paused && visible && !document.hidden) {
      const elapsed = previousTime ? Math.min(time - previousTime, 40) : 16;
      if (!dragging) rotation += elapsed * 0.00012;
      previousTime = time;
      draw();
      animationFrame = requestAnimationFrame(tick);
    }
  }

  function synchronizeAnimation() {
    if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    animationFrame = null;
    previousTime = 0;
    motionButton.textContent = paused ? 'Play motion ▷' : 'Pause motion Ⅱ';
    motionButton.setAttribute('aria-pressed', String(paused));
    draw();
    if (!paused && visible && !document.hidden) animationFrame = requestAnimationFrame(tick);
  }

  new ResizeObserver(() => {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
  }).observe(canvas);

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    synchronizeAnimation();
  }).observe(canvas);

  motionButton.addEventListener('click', () => { paused = !paused; synchronizeAnimation(); });
  reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; synchronizeAnimation(); });
  document.addEventListener('visibilitychange', synchronizeAnimation);
  // Keyboard access provides the same rotation controls as dragging.
  canvas.addEventListener('keydown', (event) => {
    const directions = {
      ArrowLeft: [-0.12, 0],
      ArrowRight: [0.12, 0],
      ArrowUp: [0, -0.12],
      ArrowDown: [0, 0.12],
    };
    const direction = directions[event.key];
    if (!direction) return;
    event.preventDefault();
    rotation += direction[0];
    tilt += direction[1];
    draw();
  });

  canvas.addEventListener('pointerdown', (event) => {
    dragging = true;
    previousPointer = { x: event.clientX, y: event.clientY };
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    rotation += (event.clientX - previousPointer.x) * 0.008;
    tilt += (event.clientY - previousPointer.y) * 0.006;
    previousPointer = { x: event.clientX, y: event.clientY };
    draw();
  });
  for (const eventName of ['pointerup', 'pointercancel']) canvas.addEventListener(eventName, () => { dragging = false; });
  synchronizeAnimation();
}
