import {Injectable,} from '@angular/core';
import {Point} from '../_models/point';
import {PointService} from './point.service';
import {HistoryTableComponent} from '../history-table/history-table.component';

@Injectable({providedIn: 'root'})

export class CanvasService {
  private AVAILABLE_R: number[] = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
  private selectedR: number[] = [];
  private context: any;
  public dotService: PointService;
  private pointsHistory: Point[] = [];
  private historyTable: HistoryTableComponent;

  CANVAS_WIDTH = 500;
  CANVAS_HEIGHT = 500;
  CANVAS_STEP_X = this.CANVAS_WIDTH / 2 / 5;
  CANVAS_STEP_Y = this.CANVAS_HEIGHT / 2 / 5;
  LINE_COLOR = '#ffffff';
  CANVAS_COLOR_SHADOW = 'rgba(208,208,208,0.35)';

    clearCtx() {
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    }

  setContext(ctx: any) {
    this.context = ctx;
  }

  setHistoryTable(historyTable: HistoryTableComponent) {
        this.historyTable = historyTable;
  }

  loadPoints(points: Point[]) {
        this.pointsHistory = points;
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

      this.context.fillStyle = this.CANVAS_COLOR_SHADOW;

      this.context.beginPath();
      this.context.moveTo(0, 0);
      this.context.lineTo(this.CANVAS_WIDTH, 0);
      this.context.lineTo(this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
      this.context.lineTo(0, this.CANVAS_HEIGHT);
      this.context.closePath();

      this.context.moveTo(0, this.CANVAS_HEIGHT / 2 - this.CANVAS_STEP_Y * 3);
      this.context.lineTo(this.CANVAS_WIDTH, this.CANVAS_HEIGHT / 2 - this.CANVAS_STEP_Y * 3);
      this.context.lineTo(this.CANVAS_WIDTH, this.CANVAS_HEIGHT / 2 + this.CANVAS_STEP_Y * 5);
      this.context.lineTo(0, this.CANVAS_HEIGHT / 2 + this.CANVAS_STEP_Y * 5);
      this.context.closePath();
      this.context.fill('evenodd');


  }

  redraw(r) {
    const intR = parseInt(r, 10);
    if (!isNaN(intR)) {
      if (this.AVAILABLE_R.indexOf(intR) !== -1) {
        if (this.selectedR.indexOf(intR) === -1) {
          this.selectedR.push(intR);
        } else {
          this.selectedR = this.selectedR.filter(e => e !== intR);
        }
        if (this.selectedR.length < 1) {
            this.clearCtx();
            console.log('choose r!');
        } else {
            this.clearCtx();
            for (let i = 0; i < this.selectedR.length; i++) {
                this.draw(this.selectedR[i], (i + 1) / this.selectedR.length);
                this.pointsHistory.forEach(value => {
                    if (value.r === this.selectedR[i]) {
                        this.drawWTSaving(value);
                        }
                });
            }
        }
      } else {
        console.log('unavailable r!');
      }
    } else {
      console.log('r is not a number!');
    }
  }

  onClick(event: any) {

    const centerX = this.CANVAS_WIDTH / 2;
    const centerY = this.CANVAS_HEIGHT / 2;

    const zoomX = this.CANVAS_WIDTH / 10;
    const zoomY = this.CANVAS_HEIGHT / 10;

    const visualX = (event.offsetX - centerX) / zoomX;
    const visualY = (centerY - event.offsetY) / zoomY;

    const rightPoint = document.getElementById("rightPointImage");
    const wrongPoint = document.getElementById("wrongPointImage");

    for (let i = 0; i < this.selectedR.length; i++) {
        let point = new Point(visualX, visualY, this.selectedR[i], Date.now());
        this.dotService.addDot(point).subscribe(value => {
                value ? this.context.drawImage( rightPoint, event.offsetX - 10, event.offsetY - 10, 15, 15) :
                this.context.drawImage( wrongPoint, event.offsetX - 10, event.offsetY - 10, 15, 15);
                point.setResult(Boolean(value));
                this.addToHistory(point);
                console.log(point);
                // this.dotService.addPoint(point);
                // this.historyTable.dots.push(point);
        });

    }
  }

  drawDots(dots: Point[]) {
        for (let i = 0; i < dots.length; i++) {
        this.drawWTSaving(dots[i]);
    }
  }

  drawWTSaving(point: Point) {
      const centerX = this.CANVAS_WIDTH / 2;
      const centerY = this.CANVAS_HEIGHT / 2;

      const zoomX = this.CANVAS_WIDTH / 10;
      const zoomY = this.CANVAS_HEIGHT / 10;

      const rightPoint = document.getElementById("rightPointImage");
      const wrongPoint = document.getElementById("wrongPointImage");

      point.hit ? this.context.drawImage( rightPoint, centerX  + point.x * zoomX - 10, centerY - point.y * zoomY - 10, 15, 15) :
          this.context.drawImage( wrongPoint, centerX + point.x * zoomX -  10, centerY - point.y * zoomY - 10, 15, 15);
}

  drawDot(dot: Point) {

    const centerX = this.CANVAS_WIDTH / 2;
    const centerY = this.CANVAS_HEIGHT / 2;

    const zoomX = this.CANVAS_WIDTH / 10;
    const zoomY = this.CANVAS_HEIGHT / 10;

    const rightPoint = document.getElementById("rightPointImage");
    const wrongPoint = document.getElementById("wrongPointImage");

    this.dotService.addDot(dot).subscribe(value => {
         value ? this.context.drawImage( rightPoint, centerX  + dot.x * zoomX - 10, centerY - dot.y * zoomY - 10, 15, 15) :
             this.context.drawImage( wrongPoint, centerX + dot.x * zoomX -  10, centerY - dot.y * zoomY - 10, 15, 15);
        dot.setResult(Boolean(value));
        this.addToHistory(dot);
       // this.dotService.addPoint(dot);
      //  this.historyTable.dots.push(dot);
    });
  }

  addToHistory(point: Point) {
      this.pointsHistory.push(point);
    //  this.historyTable.update();
  }

}
