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

    // @ViewChild('myCanvas', {static: true}) canvasRef: ElementRef;

    selectedX: number[] = [];
    selectedY: string;
    selectedR: number[] = [];
    AVAILABLE_R: number[] = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
    AVAILABLE_X: number[] = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
    currentR: number;

    constructor(private canvasServ: CanvasService, private pointService: PointService) {}

    ngOnInit() {
        // const ctx = this.canvasRef.nativeElement.getContext('2d');
        // this.canvasServ.setContext(ctx);
        // this.canvasServ.draw(0);
    }



    changeR(selectR) {
        this.canvasServ.redraw(selectR);
    }

    submitDot() {
      for (let i = 0; i < this.selectedR.length; i++) {
          for (let j = 0; j < this.selectedX.length; j++) {
              console.log(new Point(this.selectedX[j], parseFloat(this.selectedY), this.selectedR[i], Date.now()));
              this.pointService.addDot(new Point(this.selectedX[j], parseFloat(this.selectedY), this.selectedR[i], Date.now())).subscribe(value => {
                  console.log(value); });
          }
      }
    }

    // onClick(event: any) {
    //   let dot: number[];
    //   dot = this.canvasServ.onClick(event);
    //   this.selectX = dot[0];
    //   this.selectY = dot[1];
    // }
}
