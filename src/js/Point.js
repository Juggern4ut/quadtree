"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * Draws the Point unto the given context
     * @param ctx The context to draw unto
     */
    draw(ctx, width, color) {
        ctx.fillStyle = color || "#000";
        const w = width || 1;
        ctx.fillRect(this.x - w / 2, this.y - w / 2, w, w);
    }
}
exports.default = Point;
//# sourceMappingURL=Point.js.map