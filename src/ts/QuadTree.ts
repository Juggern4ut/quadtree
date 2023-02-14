import Point from "./Point";
import Particle from "./Particle";
import Rectangle from "./Rectangle";

export default class QuadTree extends Rectangle {
  capacity: number;
  points: Point[] = [];
  recs: Particle[] = [];
  isSplit: boolean = false;
  TL: QuadTree | null = null;
  TR: QuadTree | null = null;
  BR: QuadTree | null = null;
  BL: QuadTree | null = null;

  constructor(x: number, y: number, w: number, h: number, capacity: number) {
    super(x, y, w, h);
    this.capacity = capacity;
  }

  /**
   * Inserts a point into the QuadTree and splits the tree if neccessary
   * @param p The point to add
   */
  addPoint(p: Point) {
    if (!this.contains(p)) return;

    if (this.points.length < this.capacity) {
      this.points.push(p);
    } else {
      if (!this.isSplit) {
        this.split();
      }

      this.TL?.addPoint(p);
      this.TR?.addPoint(p);
      this.BR?.addPoint(p);
      this.BL?.addPoint(p);
    }
  }

  queryRectangles(area: Rectangle, results: Particle[]) {
    if (this.intersects(area)) {
      results.push(...this.recs);
      this.TR?.queryRectangles(area, results);
      this.TL?.queryRectangles(area, results);
      this.BR?.queryRectangles(area, results);
      this.BL?.queryRectangles(area, results);
    }
    return results;
  }

  /**
   * Inserts a point into the QuadTree and splits the tree if neccessary
   * @param r The point to add
   */
  addParticle(r: Particle) {
    if (!this.intersects(r)) {
      return;
    }

    if (this.recs.length < this.capacity) {
      this.recs.push(r);
    } else {
      if (!this.isSplit) {
        this.split();
      }

      this.TL?.addParticle(r);
      this.TR?.addParticle(r);
      this.BR?.addParticle(r);
      this.BL?.addParticle(r);
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
  draw(ctx: CanvasRenderingContext2D, color?: string | undefined): void {
    this.points.forEach((p) => p.draw(ctx));
    this.recs.forEach((r) => r.draw(ctx, r.color));
    if (!this.isSplit) {
      super.draw(ctx, color);
    } else {
      this.TL?.draw(ctx, color);
      this.TR?.draw(ctx, color);
      this.BR?.draw(ctx, color);
      this.BL?.draw(ctx, color);
    }
  }
}
