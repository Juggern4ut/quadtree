"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    /**
     * Checks if a point is inside the rectangle
     * @param p The Point to check
     * @returns true if the point is contained within the boundaries of the rectangle false otherwise
     */
    contains(p) {
        return (p.x >= this.x &&
            p.x <= this.x + this.w &&
            p.y >= this.y &&
            p.y <= this.y + this.h);
    }
    /**
     * Checks if a given Rectangle overlaps the current one
     * @param o The other rectangle to check against
     * @returns True if the Rectangles overlap, false otherwise
     */
    intersects(o) {
        const horIntersect = (this.x + this.w > o.x && this.x + this.w < o.x + o.w) ||
            (this.x < o.x && this.x + this.w > o.x + o.w) ||
            (this.x > o.x && this.x < o.x + o.w);
        const verIntersect = (this.y + this.h > o.y && this.y + this.h < o.y + o.h) ||
            (this.y < o.y && this.y + this.h > o.y + o.h) ||
            (this.y > o.y && this.y < o.y + o.h);
        return horIntersect && verIntersect;
    }
    /**
     * Draws the Rectangle unto the given context
     * @param ctx The context to draw unto
     */
    draw(ctx, color, fill) {
        if (fill) {
            ctx.fillStyle = color || "#000";
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }
        else {
            ctx.strokeStyle = color || "#000";
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.w, this.h);
            ctx.stroke();
        }
    }
}
exports.default = Rectangle;
//# sourceMappingURL=Rectangle.js.map