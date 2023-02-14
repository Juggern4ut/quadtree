export default class Vector2D {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Adds a given Vector to this one
   * @param o The Vector to add
   */
  add(o: Vector2D): void {
    this.x += o.x;
    this.y += o.y;
  }

  /**
   * Clones the current vector
   * @returns The new vector
   */
  clone(): Vector2D {
    return new Vector2D(this.x, this.y);
  }
}
