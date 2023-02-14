import Particle from "./Particle";
import QuadTree from "./QuadTree";
import Rectangle from "./Rectangle";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const fpsLabel = document.querySelector("#fps") as HTMLSpanElement;
const particlesLabel = document.querySelector("#particles") as HTMLSpanElement;
const checksLabel = document.querySelector("#checks") as HTMLSpanElement;
const addButton = document.querySelector("#add") as HTMLButtonElement;

const useQuadTree = document.querySelector("#useQuadTree") as HTMLInputElement;
const showQuadTree = document.querySelector(
  "#showQuadTree"
) as HTMLInputElement;

let qT = new QuadTree(0, 0, 600, 600, 1);

const particles: Particle[] = [];

const add = () => {
  for (let i = 0; i < 200; i++) {
    particles.push(
      new Particle(Math.random() * 500 + 50, Math.random() * 500 + 50, 10)
    );
  }
  particlesLabel.innerHTML = particles.length.toString();
};

addButton.addEventListener("click", add);

const update = (progress: number) => {
  fpsLabel.innerHTML = Math.round(1000 / progress).toString();
  qT = new QuadTree(0, 0, 600, 600, 1);
  let checks = 0;
  particles.forEach((p) => {
    p.update(progress);
    p.color = "#C00";

    let found = [];
    if (useQuadTree.checked) {
      found = qT.queryRectangles(new Rectangle(p.x, p.y, p.r, p.r), []);
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

  checksLabel.innerHTML = checks.toString();
};

const draw = () => {
  ctx.clearRect(0, 0, 600, 600);
  if (showQuadTree.checked) {
    qT.draw(ctx);
  } else {
    particles.forEach((p) => p.draw(ctx, p.color));
  }
};

const loop = (timestamp: number) => {
  const progress = timestamp - lastRender;

  update(progress);
  draw();

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
};

let lastRender = 0;
window.requestAnimationFrame(loop);
add();
