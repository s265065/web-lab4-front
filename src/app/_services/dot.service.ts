
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Dot } from '../_models/dot';

@Injectable()
export class DotService {

  constructor() {}

  private dots: Dot[] = [];

  getDots() {
    return this.dots;
  }

  addDot(dot: Dot) {
    console.log(this.dots);
    this.dots.push(dot);
  }
}
