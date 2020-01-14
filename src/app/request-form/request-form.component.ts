import {Component, OnInit} from '@angular/core';
import {CanvasService} from '../_services/canvas.service';
import {Point} from '../_models/point';
import {CanvasComponent} from '../canvas/canvas.component';
import {PointService} from '../_services';

@Component({
    selector: 'app-request-form',
    templateUrl: './request-form.component.html',
    styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {

    selectedX: number[] = [];
    selectedY: string;
    selectedR: number[] = [];
    AVAILABLE_R: number[] = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
    AVAILABLE_X: number[] = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

    constructor(private canvasServ: CanvasService) {}

    ngOnInit() { }

    changeR(selectR) {
        this.canvasServ.redraw(selectR);
    }

    submitDot() {
        let numberY: number;
        if (isNaN(parseFloat(this.selectedY))){
             numberY = -10;
        } else {numberY = parseFloat(this.selectedY);}
        for (let i = 0; i < this.selectedR.length; i++) {
          for (let j = 0; j < this.selectedX.length; j++) {
              const point = new Point(this.selectedX[j], numberY, this.selectedR[i], Date.now());
              this.canvasServ.drawDot(point);
          }
      }
    }
}
