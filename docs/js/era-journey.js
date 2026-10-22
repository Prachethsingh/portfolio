/**
 * Three cinematic chapters share one pinned viewport.
 * GSAP controls a single progress value; every visual derives from that value.
 * There is no wheel interception. Native scrolling and anchor navigation remain intact.
 */
export function initializeEraJourney() {
  const journey = document.querySelector('.era-journey');
  const stage = journey.querySelector('.era-stage');
  const canvas = document.querySelector('#era-canvas');
  const context = canvas.getContext('2d');
  const copies = [...stage.querySelectorAll('.era-copy')];
  const terminal = stage.querySelector('.terminal-shell');
  const windows = [...stage.querySelectorAll('.network-window')];
  const chapters = [...stage.querySelectorAll('.era-chapters span')];
  const progressBar = stage.querySelector('.era-progress div');
  const percent = document.querySelector('#era-percent');
  const projectLink = stage.querySelector('.era-project-link');
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  let width = 1;
  let height = 1;
  let currentProgress = 0;
  let animation = null;
  let nativeHandler = null;

  const clamp = value => Math.min(1, Math.max(0, value));
  const ease = value => { const t = clamp(value); return t * t * (3 - 2 * t); };
  const blend = (start, end, value) => start + (end - start) * value;
  const nodes = Array.from({length: 240}, (_, i) => {
    const y = 1 - (i / 239) * 2;
    const radius = Math.sqrt(1 - y * y);
    const angle = i * Math.PI * (3 - Math.sqrt(5));
    return {x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius};
  });

  function drawSpace(progress) {
    if (!context) return;
    const modern = ease((progress - 0.35) / 0.5);
    const color = [Math.round(blend(197, 92, modern)), Math.round(blend(139, 218, modern)), Math.round(blend(66, 230, modern))];
    context.fillStyle = '#090b0e';
    context.fillRect(0, 0, width, height);
    const centerX = width * (width < 600 ? 0.53 : 0.7);
    const centerY = height * (width < 600 ? 0.66 : 0.5);
    const glow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, width * 0.6);
    glow.addColorStop(0, `rgba(${color},0.12)`);
    glow.addColorStop(1, `rgba(${color},0)`);
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    // Repeating depth planes move toward the camera as scroll advances.
    for (let i = 0; i < 18; i++) {
      const depth = ((i / 18 + progress * 1.8) % 1);
      const size = 0.05 + Math.pow(depth, 3) * 1.8;
      const w = width * size;
      const h = height * size;
      context.strokeStyle = `rgba(${color},${(1 - depth) * 0.14 * (1 - modern * 0.8)})`;
      context.lineWidth = 1;
      context.strokeRect(centerX - w / 2, centerY - h / 2, w, h);
    }

    // A perspective-projected neural sphere emerges from the data tunnel.
    const rotation = progress * 3;
    const scale = Math.min(width, height) * (width < 600 ? 0.23 : 0.32);
    const points = nodes.map(node => {
      const x = node.x * Math.cos(rotation) + node.z * Math.sin(rotation);
      const z = -node.x * Math.sin(rotation) + node.z * Math.cos(rotation);
      const perspective = 3.5 / (3.5 + z);
      return {x: centerX + x * scale * perspective, y: centerY + node.y * scale * perspective, z};
    });
    points.forEach((point, index) => {
      const opacity = modern * (0.3 + (1 - point.z) * 0.3);
      context.fillStyle = `rgba(${color},${opacity})`;
      context.beginPath();
      context.arc(point.x, point.y, point.z < 0 ? 2 : 1.2, 0, Math.PI * 2);
      context.fill();
      for (let offset = 1; offset <= 2; offset++) {
        const neighbor = points[(index + offset * 13) % points.length];
        if (Math.hypot(point.x - neighbor.x, point.y - neighbor.y) > scale * 0.42) continue;
        context.beginPath();
        context.moveTo(point.x, point.y);
        context.lineTo(neighbor.x, neighbor.y);
        context.strokeStyle = `rgba(${color},${opacity * 0.3})`;
        context.stroke();
      }
    });
  }

  function render(progress) {
    currentProgress = clamp(progress);
    const p = currentProgress;
    const phase = p < 0.31 ? 0 : p < 0.67 ? 1 : 2;
    const pastExit = ease((p - 0.08) / 0.19);
    const connectedIn = ease((p - 0.25) / 0.12);
    const connectedOut = ease((p - 0.54) / 0.14);
    const aiIn = ease((p - 0.64) / 0.16);
    const opacities = [1 - pastExit, connectedIn * (1 - connectedOut), aiIn];
    const colorProgress = ease((p - 0.3) / 0.5);
    stage.style.setProperty('--era-color', `rgb(${Math.round(blend(232,115,colorProgress))},${Math.round(blend(182,226,colorProgress))},${Math.round(blend(122,237,colorProgress))})`);
    copies.forEach((copy, index) => {
      copy.style.opacity = opacities[index];
      copy.style.visibility = opacities[index] < 0.01 ? 'hidden' : 'visible';
      copy.style.transform = `translateY(${(1 - opacities[index]) * -28}px)`;
      copy.setAttribute('aria-hidden', String(index !== phase));
    });
    projectLink.tabIndex = phase === 2 ? 0 : -1;
    const approach = ease(p / 0.34);
    terminal.style.transform = `translateX(${-approach * (width < 600 ? 40 : 200)}px) rotateY(${blend(-24,0,approach)}deg) rotateX(${blend(8,0,approach)}deg) scale(${1 + approach * 7})`;
    terminal.style.opacity = 1 - ease((p - 0.23) / 0.1);
    windows.forEach((panel, index) => {
      const entry = ease((p - 0.27 - index * 0.025) / 0.12);
      const exit = ease((p - 0.55 - index * 0.02) / 0.13);
      panel.style.opacity = entry * (1 - exit);
      panel.style.transform = `translateZ(${blend(-550,150,entry) + exit * 900}px) rotateY(${blend(-35,-12,entry)}deg) translateY(${exit * -100}px)`;
    });
    chapters.forEach((chapter,index) => chapter.classList.toggle('active', index === phase));
    progressBar.style.transform = `scaleX(${p})`;
    percent.textContent = `${Math.round(p * 100).toString().padStart(3,'0')}%`;
    drawSpace(p);
  }

  new ResizeObserver(() => {
    const bounds = stage.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    const pixelRatio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    context?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    render(currentProgress);
  }).observe(stage);

  function configure() {
    animation?.scrollTrigger?.kill();
    animation?.kill();
    if (nativeHandler) window.removeEventListener('scroll', nativeHandler);
    journey.classList.remove('era-native');
    if (motionPreference.matches) { render(1); return; }
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      const playhead = {progress: 0};
      animation = window.gsap.to(playhead, {
        progress: 1,
        ease: 'none',
        onUpdate: () => render(playhead.progress),
        scrollTrigger: {
          trigger: journey,
          start: 'top top',
          end: () => `+=${window.innerHeight * (window.innerWidth < 600 ? 2.8 : 3.5)}`,
          pin: stage,
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });
    } else {
      // Functional fallback if the vendored library cannot load.
      journey.classList.add('era-native');
      let scheduled = false;
      nativeHandler = () => {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(() => {
          const rect = journey.getBoundingClientRect();
          render(-rect.top / Math.max(1, journey.offsetHeight - stage.offsetHeight));
          scheduled = false;
        });
      };
      window.addEventListener('scroll', nativeHandler, {passive:true});
      nativeHandler();
    }
    render(0);
  }
  motionPreference.addEventListener('change', configure);
  // Deferred classic scripts and module execution order can differ across hosts.
  if (document.readyState === 'complete') configure();
  else window.addEventListener('load', configure, {once:true});
}
