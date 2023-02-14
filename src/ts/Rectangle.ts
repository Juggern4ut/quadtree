import Point from "./Point";

export default class Rectangle {
  x: number;
  y: number;
  w: number;
  h: number;

  constructor(x: number, y: number, w: number, h: number) {
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
  contains(p: Point): boolean {
    return (
      p.x >= this.x &&
      p.x <= this.x + this.w &&
      p.y >= this.y &&
      p.y <= this.y + this.h
    );
  }

  /**
   * Checks if a given Rectangle overlaps the current one
   * @param o The other rectangle to check against
   * @returns True if the Rectangles overlap, false otherwise
   */
  intersects(o: Rectangle): boolean {
    const horIntersect =
      (this.x + this.w > o.x && this.x + this.w < o.x + o.w) ||
      (this.x < o.x && this.x + this.w > o.x + o.w) ||
      (this.x > o.x && this.x < o.x + o.w);

    const verIntersect =
      (this.y + this.h > o.y && this.y + this.h < o.y + o.h) ||
      (this.y < o.y && this.y + this.h > o.y + o.h) ||
      (this.y > o.y && this.y < o.y + o.h);

    return horIntersect && verIntersect;
  }

  /**
   * Draws the Rectangle unto the given context
   * @param ctx The context to draw unto
   */
  draw(ctx: CanvasRenderingContext2D, color?: string, fill?: boolean) {
    if (fill) {
      ctx.fillStyle = color || "#000";
      ctx.fillRect(this.x, this.y, this.w, this.h);
    } else {
      ctx.strokeStyle = color || "#000";
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.w, this.h);
      ctx.stroke();
    }
  }
}
