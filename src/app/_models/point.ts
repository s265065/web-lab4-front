export class Dot {
  constructor(x: number, y: number, r: number, time: any) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.result = false;
    this.time = time;
  }

  x: number;
  y: number;
  r: number;
  result?: boolean;
  time: any;

  public setResult(result: boolean) {
    this.result = result;
  }
}
