(function () {
  const canvas = document.getElementById('globeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  let size = 0;
  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    size = Math.min(rect.width, 480);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  // Evenly distributed points on a sphere (Fibonacci sphere)
  const COUNT = 620;
  const points = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
  }

  function latLonToXYZ(latDeg, lonDeg) {
    const lat = (latDeg * Math.PI) / 180;
    const lon = (lonDeg * Math.PI) / 180;
    return {
      x: Math.cos(lat) * Math.sin(lon),
      y: Math.sin(lat),
      z: Math.cos(lat) * Math.cos(lon),
    };
  }

  const markers = [
    { p: latLonToXYZ(21, 105), accent: false },
    { p: latLonToXYZ(40, -74), accent: true },
    { p: latLonToXYZ(-14, -51), accent: false },
  ];

  let rotY = 0;
  let tiltX = 0.32;
  let targetTiltX = 0.32;
  const rotSpeed = reduceMotion ? 0 : 0.0018;

  window.addEventListener('mousemove', (e) => {
    const ny = e.clientY / window.innerHeight - 0.5;
    targetTiltX = 0.32 + ny * 0.28;
  });

  function project(p, rot, tilt) {
    const x1 = p.x * Math.cos(rot) - p.z * Math.sin(rot);
    const z1 = p.x * Math.sin(rot) + p.z * Math.cos(rot);
    const y1 = p.y;
    const y2 = y1 * Math.cos(tilt) - z1 * Math.sin(tilt);
    const z2 = y1 * Math.sin(tilt) + z1 * Math.cos(tilt);
    return { x: x1, y: y2, z: z2 };
  }

  function draw() {
    tiltX += (targetTiltX - tiltX) * 0.04;
    rotY += rotSpeed;
    ctx.clearRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size / 2;
    const R = size * 0.4;

    const glow = ctx.createRadialGradient(cx, cy, R * 0.15, cx, cy, R * 1.2);
    glow.addColorStop(0, 'rgba(240,180,41,0.16)');
    glow.addColorStop(1, 'rgba(240,180,41,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.2, 0, Math.PI * 2);
    ctx.fill();

    const projected = points.map((p) => project(p, rotY, tiltX));
    projected.sort((a, b) => a.z - b.z);

    projected.forEach((pp) => {
      const depth = (pp.z + 1.3) / 2.3;
      const px = cx + pp.x * R;
      const py = cy - pp.y * R;
      const radius = 0.5 + depth * 1.3;
      const alpha = 0.08 + depth * 0.5;
      ctx.beginPath();
      ctx.fillStyle = `rgba(147,156,173,${alpha.toFixed(2)})`;
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    const mk = markers.map((m) => ({ ...project(m.p, rotY, tiltX), accent: m.accent }));

    ctx.strokeStyle = 'rgba(79,169,232,0.5)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([2, 6]);
    for (let i = 0; i < mk.length; i++) {
      for (let j = i + 1; j < mk.length; j++) {
        if (mk[i].z > -0.25 && mk[j].z > -0.25) {
          const ax = cx + mk[i].x * R, ay = cy - mk[i].y * R;
          const bx = cx + mk[j].x * R, by = cy - mk[j].y * R;
          const mx = (ax + bx) / 2, my = (ay + by) / 2 - R * 0.12;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.quadraticCurveTo(mx, my, bx, by);
          ctx.stroke();
        }
      }
    }
    ctx.setLineDash([]);

    mk.forEach((m) => {
      if (m.z < -0.45) return;
      const px = cx + m.x * R;
      const py = cy - m.y * R;
      const color = m.accent ? '#F0B429' : '#4FA9E8';
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 1;
      ctx.arc(px, py, 7.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    });

    requestAnimationFrame(draw);
  }
  draw();
})();
