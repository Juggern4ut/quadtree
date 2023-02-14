"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rectangle_1 = __importDefault(require("./Rectangle"));
const Vector2D_1 = __importDefault(require("./Vector2D"));
class Particle extends Rectangle_1.default {
    constructor(x, y, r) {
        super(x, y, r, r);
        this.color = "#000";
        this.r = r;
        this.speed = new Vector2D_1.default(Math.random() * 10 - 5, Math.random() * 10 - 5);
    }
    update(progress) {
        this.x += (this.speed.x * progress) / 20;
        this.y += (this.speed.y * progress) / 20;
        if (this.x < this.r || this.x > 600 - this.r) {
            this.speed.x *= -1;
        }
        if (this.y < this.r || this.y > 600 - this.r) {
            this.speed.y *= -1;
        }
    }
    draw(ctx, color) {
        super.draw(ctx, this.color, true);
    }
}
exports.default = Particle;
//# sourceMappingURL=Particle.js.map