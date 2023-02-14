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
const useQuadTree = document.querySelector("#useQuadTree");
const showQuadTree = document.querySelector("#showQuadTree");
let qT = new QuadTree_1.default(0, 0, 600, 600, 1);
const particles = [];
const add = () => {
    for (let i = 0; i < 200; i++) {
        particles.push(new Particle_1.default(Math.random() * 500 + 50, Math.random() * 500 + 50, 10));
    }
    particlesLabel.innerHTML = particles.length.toString();
};
addButton.addEventListener("click", add);
const update = (progress) => {
    fpsLabel.innerHTML = Math.round(1000 / progress).toString();
    qT = new QuadTree_1.default(0, 0, 600, 600, 1);
    let checks = 0;
    particles.forEach((p) => {
        p.update(progress);
        p.color = "#C00";
        let found = [];
        if (useQuadTree.checked) {
            found = qT.queryRectangles(new Rectangle_1.default(p.x, p.y, p.r, p.r), []);
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
    checksLabel.innerHTML = checks.toString();
};
const draw = () => {
    ctx.clearRect(0, 0, 600, 600);
    if (showQuadTree.checked) {
        qT.draw(ctx);
    }
    else {
        particles.forEach((p) => p.draw(ctx, p.color));
    }
};
const loop = (timestamp) => {
    const progress = timestamp - lastRender;
    update(progress);
    draw();
    lastRender = timestamp;
    window.requestAnimationFrame(loop);
};
let lastRender = 0;
window.requestAnimationFrame(loop);
add();
//# sourceMappingURL=main.js.map