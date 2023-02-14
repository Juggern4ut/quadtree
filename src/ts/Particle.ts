import Point from "./Point";
import Rectangle from "./Rectangle";
import Vector2D from "./Vector2D";

export default class Particle extends Rectangle {
  speed: Vector2D;
  r: number;
  color: string = "#000";
  constructor(x: number, y: number, r: number) {
    super(x, y, r, r);
    this.r = r;
    this.speed = new Vector2D(Math.random() * 10 - 5, Math.random() * 10 - 5);
  }

  update(progress: number) {
    this.x += (this.speed.x * progress) / 20;
    this.y += (this.speed.y * progress) / 20;

    if (this.x < this.r || this.x > 600 - this.r) {
      this.speed.x *= -1;
    }

    if (this.y < this.r || this.y > 600 - this.r) {
      this.speed.y *= -1;
    }
  }

  draw(ctx: CanvasRenderingContext2D, color?: string | undefined): void {
    super.draw(ctx, this.color, true);
  }
}
