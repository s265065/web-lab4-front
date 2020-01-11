import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CanvasService} from '../_services/canvas.service';
import {Dot} from '../_models/dot';
import {CanvasComponent} from '../canvas/canvas.component';

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

  constructor( private canvasComponent: CanvasComponent = new CanvasComponent(new CanvasService)) { }

  ngOnInit() {
    // const ctx = this.canvasRef.nativeElement.getContext('2d');
    // this.canvasServ.setContext(ctx);
    // this.canvasServ.draw(0);
  }

  changeR(selectR) {
     this.canvasComponent.canvasServ.redraw(selectR);
  }

  submitDot() {
    if (this.selectedR.length === 1) {
      let dots: Dot[] = [];
      for (let i: number = 0; i < this.selectedX.length; i++) {
        dots.push( new Dot(this.selectedX[i], parseFloat(this.selectedY), this.selectedR[0], Date.now()));
        this.canvasComponent.canvasServ.drawDots(dots);
      }
    } else { console.log('too many Rs'); }

  }

  // onClick(event: any) {
  //   let dot: number[];
  //   dot = this.canvasServ.onClick(event);
  //   this.selectX = dot[0];
  //   this.selectY = dot[1];
  // }
}
