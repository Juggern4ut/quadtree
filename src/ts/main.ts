import Particle from "./Particle";
import QuadTree from "./QuadTree";
import Rectangle from "./Rectangle";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const fpsLabel = document.querySelector("#fps") as HTMLSpanElement;
const particlesLabel = document.querySelector("#particles") as HTMLSpanElement;
const checksLabel = document.querySelector("#checks") as HTMLSpanElement;

const addButton = document.querySelector("#add") as HTMLButtonElement;
const toggleButton = document.querySelector("#toggle") as HTMLButtonElement;
const clearButton = document.querySelector("#clear") as HTMLButtonElement;

const useQuadTree = document.querySelector("#useQuadTree") as HTMLInputElement;
const showQuadTree = document.querySelector(
  "#showQuadTree"
) as HTMLInputElement;

let qT = new QuadTree(0, 0, 600, 600, 1);
let checks = 0;
let animate = true;

const particles: Particle[] = [];

/**
 * Adds 200 random placed particles into the system
 */
const add = () => {
  for (let i = 0; i < 200; i++) {
    particles.push(
      new Particle(Math.random() * 500 + 50, Math.random() * 500 + 50, 10)
    );
  }
  particlesLabel.innerHTML = particles.length.toString();
};

/**
 * Updates all particles in the system
 * @param progress The time in milliseconds since the last draw
 */
const update = (progress: number) => {
  if (!animate) return;

  updateDom(progress);

  qT = new QuadTree(0, 0, 600, 600, 1);
  checks = 0;
  particles.forEach((p) => {
    p.update(progress);
    p.color = "#C00";

    let found = [];
    if (useQuadTree.checked) {
      found = qT.queryRectangles(new Rectangle(p.x, p.y, p.r * 2, p.r * 2), []);
    } else {
      found = particles;
    }

    found.forEach((p2) => {
      checks++;
      if (p !== p2 && p.intersects(p2)) {
        p.color = "#0C0";
      }
    });
    qT.addParticle(p);
  });
};

/**
 * Draws all the particles in the correct color to the canvas
 */
const draw = () => {
  ctx.clearRect(0, 0, 600, 600);
  if (showQuadTree.checked) {
    qT.draw(ctx);
  } else {
    particles.forEach((p) => p.draw(ctx, p.color));
  }
};

/**
 * The main animation-loop
 * @param timestamp The current timestamp
 */
const loop = (timestamp: number) => {
  const progress = timestamp - lastRender;

  update(progress);
  draw();

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
};

/**
 * Updates the labels below the animation
 * @param progress The time it took to render the last frame in ms
 */
const updateDom = (progress: number) => {
  fpsLabel.innerHTML = `${Math.round(1000 / progress)} / ${Math.floor(
    progress
  )}ms`;
  checksLabel.innerHTML = checks.toString();
};

/**
 * Stops/Starts the animation
 */
const toggleAnimate = () => {
  animate = !animate;
  toggleButton.innerHTML = animate ? "Stop" : "Start";
};

toggleButton.addEventListener("click", toggleAnimate);
addButton.addEventListener("click", add);
clearButton.addEventListener("click", () =>
  particles.splice(0, particles.length)
);

let lastRender = 0;
window.requestAnimationFrame(loop);
add();
