// Luxury cosmic fantasy background: twinkling stars, floating satellites, planets.
const STAR_COLORS = ['#fff', '#19f9ff', '#ff2fd6', '#ffd700', '#bafff2', '#ffe3bb'];
const NUM_STARS = 120;
const SATELLITE_SVGS = [
  `<svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="20" cy="12" rx="13" ry="6" fill="#19f9ff" opacity="0.18"/>
    <rect x="18" y="6" width="4" height="12" fill="#fff"/>
    <rect x="9" y="11" width="6" height="2" fill="#ffd700"/>
    <rect x="25" y="11" width="6" height="2" fill="#ff2fd6"/>
  </svg>`,
];
const PLANET_SVGS = [
  `<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="18" fill="#ff2fd6" opacity="0.25"/>
    <ellipse cx="24" cy="28" rx="10" ry="4" fill="#19f9ff" opacity="0.11"/>
    <circle cx="24" cy="24" r="12" fill="#ffd700" opacity="0.23"/>
    <ellipse cx="26" cy="26" rx="8" ry="3" fill="#ffe3bb" opacity="0.17"/>
  </svg>`,
];

function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}

function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  const size = randomBetween(1, 3.8);
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.top = `${randomBetween(0, 100)}vh`;
  star.style.left = `${randomBetween(0, 100)}vw`;
  star.style.background = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
  star.style.boxShadow = `0 0 ${randomBetween(10, 40)}px ${star.style.background}`;
  star.style.opacity = randomBetween(0.7, 1);
  star.speed = randomBetween(0.05, 0.17);
  star.twinkle = randomBetween(0.9, 1.2);
  return star;
}

function animateStars(stars, t=0) {
  stars.forEach(star => {
    let top = parseFloat(star.style.top);
    top += star.speed;
    if (top > 100) {
      top = 0;
      star.style.left = `${randomBetween(0, 100)}vw`;
    }
    star.style.top = `${top}vh`;
    star.style.opacity = 0.7 + 0.3 * Math.sin(t / 5 + star.twinkle);
  });
  requestAnimationFrame((nt) => animateStars(stars, nt / 1000));
}

function createSVG(svg, size, top, left, speed, rotateSpeed) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = svg;
  wrapper.style.position = 'absolute';
  wrapper.style.width = `${size}px`;
  wrapper.style.height = `${size}px`;
  wrapper.style.top = `${top}vh`;
  wrapper.style.left = `${left}vw`;
  wrapper.style.zIndex = '-1';
  wrapper.speed = speed;
  wrapper.rotateSpeed = rotateSpeed;
  wrapper.angle = randomBetween(0, 360);
  return wrapper;
}

function animateSVGs(svgEls) {
  svgEls.forEach(el => {
    let top = parseFloat(el.style.top);
    top += el.speed;
    if (top > 100) top = -15;
    el.style.top = `${top}vh`;
    el.angle += el.rotateSpeed;
    el.style.transform = `rotate(${el.angle}deg)`;
  });
  requestAnimationFrame(() => animateSVGs(svgEls));
}

function createNebula() {
  const nebula = document.createElement('div');
  nebula.style.position = "fixed";
  nebula.style.top = "0";
  nebula.style.left = "0";
  nebula.style.width = "100vw";
  nebula.style.height = "100vh";
  nebula.style.zIndex = "-3";
  nebula.style.pointerEvents = "none";
  nebula.style.background = "radial-gradient(ellipse at 70% 30%, #ff2fd6 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, #19f9ff 0%, transparent 70%), radial-gradient(ellipse at 50% 60%, #ffe3bb 0%, transparent 80%)";
  nebula.style.opacity = "0.33";
  return nebula;
}

window.addEventListener('DOMContentLoaded', () => {
  const bg = document.getElementById('cosmic-bg');
  bg.appendChild(createNebula());
  let stars = [];
  for (let i = 0; i < NUM_STARS; i++) {
    let star = createStar();
    bg.appendChild(star);
    stars.push(star);
  }
  animateStars(stars);
  let svgEls = [];
  for (let i = 0; i < 2; i++) {
    let sat = createSVG(
      SATELLITE_SVGS[0],
      randomBetween(30, 60),
      randomBetween(5, 80),
      randomBetween(5, 90),
      randomBetween(0.04, 0.08),
      randomBetween(0.08, 0.13)
    );
    bg.appendChild(sat);
    svgEls.push(sat);
  }
  for (let i = 0; i < 2; i++) {
    let planet = createSVG(
      PLANET_SVGS[0],
      randomBetween(30, 80),
      randomBetween(10, 70),
      randomBetween(15, 85),
      randomBetween(0.02, 0.05),
      randomBetween(0.05, 0.11)
    );
    bg.appendChild(planet);
    svgEls.push(planet);
  }
  animateSVGs(svgEls);
});
