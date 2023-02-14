"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * Adds a given Vector to this one
     * @param o The Vector to add
     */
    add(o) {
        this.x += o.x;
        this.y += o.y;
    }
    /**
     * Clones the current vector
     * @returns The new vector
     */
    clone() {
        return new Vector2D(this.x, this.y);
    }
}
exports.default = Vector2D;
//# sourceMappingURL=Vector2D.js.map