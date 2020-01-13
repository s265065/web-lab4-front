
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Point } from '../_models/point';

@Injectable()
export class DotService {

  constructor() {}

  private dots: Point[] = [];

  getDots() {
    return this.dots;
  }

  addDot(dot: Point) {
    console.log(this.dots);
    this.dots.push(dot);
  }
}
