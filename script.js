// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');

navToggle.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Generate a subtle dot-grid inside the hero map SVG
const dotGrid = document.querySelector('.dot-grid');
if (dotGrid) {
  const ns = 'http://www.w3.org/2000/svg';
  const spacing = 26;
  const radius = 260;
  const cx = 260, cy = 260;

  for (let x = 20; x <= 500; x += spacing) {
    for (let y = 20; y <= 500; y += spacing) {
      const d = Math.hypot(x - cx, y - cy);
      if (d < radius && Math.random() > 0.45) {
        const dot = document.createElementNS(ns, 'circle');
        dot.setAttribute('cx', x);
        dot.setAttribute('cy', y);
        dot.setAttribute('r', 1.3);
        dot.setAttribute('fill', '#8B93A1');
        dot.setAttribute('opacity', (0.15 + Math.random() * 0.25).toFixed(2));
        dotGrid.appendChild(dot);
      }
    }
  }
}

// Gentle parallax on hero visual (disabled for reduced-motion users)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const heroVisual = document.querySelector('.hero-visual');

if (heroVisual && !prefersReducedMotion) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    heroVisual.style.transform = `translate(${x}px, ${y}px)`;
  });
}
