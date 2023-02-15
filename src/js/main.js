"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Particle_1 = __importDefault(require("./Particle"));
const QuadTree_1 = __importDefault(require("./QuadTree"));
const Rectangle_1 = __importDefault(require("./Rectangle"));
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const fpsLabel = document.querySelector("#fps");
const particlesLabel = document.querySelector("#particles");
const checksLabel = document.querySelector("#checks");
const addButton = document.querySelector("#add");
const toggleButton = document.querySelector("#toggle");
const clearButton = document.querySelector("#clear");
const useQuadTree = document.querySelector("#useQuadTree");
const showQuadTree = document.querySelector("#showQuadTree");
let qT = new QuadTree_1.default(0, 0, 600, 600, 1);
let checks = 0;
let animate = true;
const particles = [];
/**
 * Adds 200 random placed particles into the system
 */
const add = () => {
    for (let i = 0; i < 200; i++) {
        particles.push(new Particle_1.default(Math.random() * 500 + 50, Math.random() * 500 + 50, 10));
    }
    particlesLabel.innerHTML = particles.length.toString();
};
/**
 * Updates all particles in the system
 * @param progress The time in milliseconds since the last draw
 */
const update = (progress) => {
    if (!animate)
        return;
    updateDom(progress);
    qT = new QuadTree_1.default(0, 0, 600, 600, 1);
    checks = 0;
    particles.forEach((p) => {
        p.update(progress);
        p.color = "#C00";
        let found = [];
        if (useQuadTree.checked) {
            found = qT.queryRectangles(new Rectangle_1.default(p.x, p.y, p.r * 2, p.r * 2), []);
        }
        else {
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
    }
    else {
        particles.forEach((p) => p.draw(ctx, p.color));
    }
};
/**
 * The main animation-loop
 * @param timestamp The current timestamp
 */
const loop = (timestamp) => {
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
const updateDom = (progress) => {
    fpsLabel.innerHTML = `${Math.round(1000 / progress)} / ${Math.floor(progress)}ms`;
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
clearButton.addEventListener("click", () => particles.splice(0, particles.length));
let lastRender = 0;
window.requestAnimationFrame(loop);
add();
//# sourceMappingURL=main.js.map