import {Injectable,} from '@angular/core';
import {Point} from '../_models/point';
import {PointService} from './point.service';

@Injectable({providedIn: 'root'})

export class CanvasService {
  private AVAILABLE_R: number[] = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
  private selectX: number;
  private selectY: number;
  private selectedR: number[] = [];
  private context: any;
  public dotService: PointService;

  CANVAS_WIDTH = 500;
  CANVAS_HEIGHT = 500;
  CANVAS_STEP_X = this.CANVAS_WIDTH / 2 / 5;
  CANVAS_STEP_Y = this.CANVAS_HEIGHT / 2 / 5;
  LINE_COLOR = '#ffffff';

    getSelectedR(){
        return this.selectedR;
    }

    clearCtx() {
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    }

  setContext(ctx: any) {
    this.context = ctx;
      const background = document.getElementById('blackBackgroundImage');
      const backptrn = this.context.createPattern(background, 'no-repeat');
      this.context.fillStyle = backptrn;
  }

  draw(r: number, alpha: number) {
      this.context.globalAlpha = alpha;
    const R = r;
    const halfR = r / 2;

    const foreground = document.getElementById('violetBackgroundImage');

    const graphptrn = this.context.createPattern(foreground, 'no-repeat');

    this.context.fillStyle = graphptrn;
    this.context.beginPath();
    this.context.moveTo(this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2);
    this.context.lineTo(this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2 - this.CANVAS_STEP_Y * halfR);
    this.context.lineTo(this.CANVAS_WIDTH / 2 + this.CANVAS_STEP_X * R, this.CANVAS_HEIGHT / 2 - this.CANVAS_STEP_Y * halfR);
    this.context.lineTo(this.CANVAS_WIDTH / 2 + this.CANVAS_STEP_X * R, this.CANVAS_HEIGHT / 2);
    this.context.lineTo(this.CANVAS_WIDTH / 2 + this.CANVAS_STEP_X * halfR, this.CANVAS_HEIGHT / 2);
    this.context.arcTo(this.CANVAS_WIDTH / 2 + this.CANVAS_STEP_X * halfR, this.CANVAS_HEIGHT / 2 + this.CANVAS_STEP_Y * halfR,
      this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2 + this.CANVAS_STEP_Y * halfR,
      Math.abs((this.CANVAS_STEP_X + this.CANVAS_STEP_Y) / 2 * halfR));
    this.context.lineTo(this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2 + this.CANVAS_STEP_Y * R);
    this.context.lineTo(this.CANVAS_WIDTH / 2 - this.CANVAS_STEP_X * halfR, this.CANVAS_HEIGHT / 2);
    this.context.fill();

    this.context.lineWidth = 2;
    this.context.strokeStyle = this.LINE_COLOR;
    this.context.beginPath();
    this.context.moveTo(this.CANVAS_STEP_X / 2, this.CANVAS_HEIGHT / 2);
    this.context.lineTo(this.CANVAS_WIDTH - this.CANVAS_STEP_X / 2, this.CANVAS_HEIGHT / 2);
    this.context.moveTo(this.CANVAS_WIDTH - this.CANVAS_STEP_X, this.CANVAS_HEIGHT / 2 - this.CANVAS_STEP_Y / 4);
    this.context.lineTo(this.CANVAS_WIDTH - this.CANVAS_STEP_X / 2, this.CANVAS_HEIGHT / 2);
    this.context.lineTo(this.CANVAS_WIDTH - this.CANVAS_STEP_X, this.CANVAS_HEIGHT / 2 + this.CANVAS_STEP_Y / 4);

    this.context.moveTo(this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT - this.CANVAS_STEP_Y / 2);
    this.context.lineTo(this.CANVAS_WIDTH / 2, this.CANVAS_STEP_X / 2);
    this.context.moveTo(this.CANVAS_WIDTH / 2 - this.CANVAS_STEP_X / 4, this.CANVAS_STEP_Y);
    this.context.lineTo(this.CANVAS_WIDTH / 2, this.CANVAS_STEP_Y / 2);
    this.context.lineTo(this.CANVAS_WIDTH / 2 + this.CANVAS_STEP_X / 4, this.CANVAS_STEP_Y);
    this.context.stroke();

  }

  redraw(r) {
    const intR = parseInt(r, 10);
    if (!isNaN(intR)) {
      if (this.AVAILABLE_R.indexOf(intR) !== -1) {
        if (this.selectedR.indexOf(intR) === -1) {
          this.selectedR.push(intR);
        } else {
          // remove r from selected
          this.selectedR = this.selectedR.filter(e => e !== intR);
        }
        if (this.selectedR.length < 1) {
            console.log('choose r!');
        } else {
          // redraw with new r
            this.clearCtx();
            for (let i = 0; i < this.selectedR.length; i++) {
                this.draw(this.selectedR[i], (i + 1) / this.selectedR.length);
            }
         // this.draw(this.selectedR[0], 1);
        }
      } else {
        console.log('unavailable r!');
      }
    } else {
      console.log('r is not a number!');
    }
   // console.log(this.selectedR);
  }

  onClick(event: any) {

    const centerX = this.CANVAS_WIDTH / 2;
    const centerY = this.CANVAS_HEIGHT / 2;

    const zoomX = this.CANVAS_WIDTH / 10;
    const zoomY = this.CANVAS_HEIGHT / 10;

    const visualX = (event.offsetX - centerX) / zoomX;
    const visualY = (centerY - event.offsetY) / zoomY;

    // console.log(visualX, ';', visualY);

    const rightPoint = new Image();
    rightPoint.src = 'assets/img/flashes/green-flash.png';

    const wrongPoint =  new Image();
    wrongPoint.src = 'assets/img/flashes/miss-flash.png';

    // console.log(event.offsetX, ';', event.offsetY);
    //   for (let i = 0; i < this.selectedR.length; i++) {
    //       this.dotService.addDot(new Point(visualX, visualY, this.selectedR[i], Date.now()));
    //   }
    this.context.drawImage( rightPoint, event.offsetX - 10, event.offsetY - 10, 15, 15);
    // this.context.fillStyle = '#00ff00';
    // this.context.fillRect(event.offsetX - 5, event.offsetY - 5, 10, 10);

   // this.dotService.addDot(new Point(visualX, visualY, this.selectedR[0], Date.now()));

    // console.log(this.context);
    return [visualX, visualY];
  }

  drawDots(dots: Point[]) {
      const centerX = this.CANVAS_WIDTH / 2;
      const centerY = this.CANVAS_HEIGHT / 2;

      const zoomX = this.CANVAS_WIDTH / 10;
      const zoomY = this.CANVAS_HEIGHT / 10;

      const rightPoint = new Image();
      rightPoint.src = 'assets/img/flashes/green-flash.png';

      const wrongPoint =  new Image();
      wrongPoint.src = 'assets/img/flashes/miss-flash.png';

    // dots.forEach(function (value) {
    //   this.context.fillStyle = '#00ff00';
    //   this.context.fillRect(value.x * zoomX - centerX - 10, centerY - value.y * zoomY - 10, 15, 15);
    //   console.log(value.x * zoomX + centerX, centerY - value.y * zoomY );
    // });

    let i: number;
    for (i = 0; i < dots.length; i++) {
      this.context.fillStyle = '#00ff00';
      this.context.fillRect(dots[i].x * zoomX - centerX - 10, centerY - dots[i].y * zoomY - 10, 10, 10);
      // console.log(dots[i].x * zoomX + centerX, centerY - dots[i].y * zoomY );
      // console.log(dots[i].x, dots[i].y);
      // console.log(this.context);
      //   for (let i = 0; i < this.selectedR.length; i++) {
      //       this.dotService.addDot(new Point(dots[i].x, dots[i].y, this.selectedR[i], Date.now()));
      //   }
    }
  }
  //
  // drawDot(dot: Dot) {
  //
  //   const centerX = this.CANVAS_WIDTH / 2;
  //   const centerY = this.CANVAS_HEIGHT / 2;
  //
  //   const zoomX = this.CANVAS_WIDTH / 10;
  //   const zoomY = this.CANVAS_HEIGHT / 10;
  //
  //   const rightPoint = new Image();
  //   rightPoint.src = 'assets/img/flashes/green-flash.png';
  //
  //   const wrongPoint =  new Image();
  //   wrongPoint.src = 'assets/img/flashes/miss-flash.png';
  //
  //   // const numberY = parseInt(dot.y, 10);
  //
  //   // let i: number;
  //
  //  // for (i = 0; i < dot.x.length; i++) {
  //    // this.context.drawImage(rightPoint, dot.x[i] * zoomX - centerX - 10, centerY - numberY * zoomY - 10, 15, 15);
  //     this.context.fillStyle = '#00ff00';
  //     this.context.fillRect(dot.x * zoomX - centerX - 10, centerY - dot.y * zoomY - 10, 15, 15);
  //   console.log(dot.x * zoomX + centerX, centerY - dot.y * zoomY );
  //  // }
  // }

}
