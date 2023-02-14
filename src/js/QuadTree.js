"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rectangle_1 = __importDefault(require("./Rectangle"));
class QuadTree extends Rectangle_1.default {
    constructor(x, y, w, h, capacity) {
        super(x, y, w, h);
        this.points = [];
        this.recs = [];
        this.isSplit = false;
        this.TL = null;
        this.TR = null;
        this.BR = null;
        this.BL = null;
        this.capacity = capacity;
    }
    /**
     * Inserts a point into the QuadTree and splits the tree if neccessary
     * @param p The point to add
     */
    addPoint(p) {
        var _a, _b, _c, _d;
        if (!this.contains(p))
            return;
        if (this.points.length < this.capacity) {
            this.points.push(p);
        }
        else {
            if (!this.isSplit) {
                this.split();
            }
            (_a = this.TL) === null || _a === void 0 ? void 0 : _a.addPoint(p);
            (_b = this.TR) === null || _b === void 0 ? void 0 : _b.addPoint(p);
            (_c = this.BR) === null || _c === void 0 ? void 0 : _c.addPoint(p);
            (_d = this.BL) === null || _d === void 0 ? void 0 : _d.addPoint(p);
        }
    }
    queryRectangles(area, results) {
        var _a, _b, _c, _d;
        if (this.intersects(area)) {
            results.push(...this.recs);
            (_a = this.TR) === null || _a === void 0 ? void 0 : _a.queryRectangles(area, results);
            (_b = this.TL) === null || _b === void 0 ? void 0 : _b.queryRectangles(area, results);
            (_c = this.BR) === null || _c === void 0 ? void 0 : _c.queryRectangles(area, results);
            (_d = this.BL) === null || _d === void 0 ? void 0 : _d.queryRectangles(area, results);
        }
        return results;
    }
    /**
     * Inserts a point into the QuadTree and splits the tree if neccessary
     * @param r The point to add
     */
    addParticle(r) {
        var _a, _b, _c, _d;
        if (!this.intersects(r)) {
            return;
        }
        if (this.recs.length < this.capacity) {
            this.recs.push(r);
        }
        else {
            if (!this.isSplit) {
                this.split();
            }
            (_a = this.TL) === null || _a === void 0 ? void 0 : _a.addParticle(r);
            (_b = this.TR) === null || _b === void 0 ? void 0 : _b.addParticle(r);
            (_c = this.BR) === null || _c === void 0 ? void 0 : _c.addParticle(r);
            (_d = this.BL) === null || _d === void 0 ? void 0 : _d.addParticle(r);
        }
    }
    /**
     * Splits the QuadTree into 4 sub-trees
     */
    split() {
        const nW = this.w / 2;
        const nH = this.h / 2;
        this.TL = new QuadTree(this.x, this.y, nW, nH, this.capacity);
        this.TR = new QuadTree(this.x + nW, this.y, nW, nH, this.capacity);
        this.BR = new QuadTree(this.x, this.y + nH, nW, nH, this.capacity);
        this.BL = new QuadTree(this.x + nW, this.y + nH, nW, nH, this.capacity);
        this.isSplit = true;
    }
    /**
     * Draws this QuadTree and all its children and points onto a given rendering context
     * @param ctx The context to draw onto
     * @param color The color to draw
     */
    draw(ctx, color) {
        var _a, _b, _c, _d;
        this.points.forEach((p) => p.draw(ctx));
        this.recs.forEach((r) => r.draw(ctx, r.color));
        if (!this.isSplit) {
            super.draw(ctx, color);
        }
        else {
            (_a = this.TL) === null || _a === void 0 ? void 0 : _a.draw(ctx, color);
            (_b = this.TR) === null || _b === void 0 ? void 0 : _b.draw(ctx, color);
            (_c = this.BR) === null || _c === void 0 ? void 0 : _c.draw(ctx, color);
            (_d = this.BL) === null || _d === void 0 ? void 0 : _d.draw(ctx, color);
        }
    }
}
exports.default = QuadTree;
//# sourceMappingURL=QuadTree.js.map