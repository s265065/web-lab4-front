export class Point {
  constructor(x: number, y: number, r: number, created: any) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.hit = false;
    this.created = created;
  }

  x: number;
  y: number;
  r: number;
  hit?: boolean;
  created: any;

  public setResult(result: boolean) {
    this.hit = result;
  }
}
