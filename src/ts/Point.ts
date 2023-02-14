export default class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Draws the Point unto the given context
   * @param ctx The context to draw unto
   */
  draw(ctx: CanvasRenderingContext2D, width?: number, color?: string) {
    ctx.fillStyle = color || "#000";
    const w = width || 1;
    ctx.fillRect(this.x - w / 2, this.y - w / 2, w, w);
  }
}
