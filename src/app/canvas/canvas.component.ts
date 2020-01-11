import { Component, OnInit } from '@angular/core';
import {CanvasService} from '../_services/canvas.service';
import { ViewChild, ElementRef } from '@angular/core';
import {DotService} from '../_services';
import {Dot} from '../_models/dot';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  @ViewChild('myCanvas', {static: true}) canvasRef: ElementRef;

  constructor( public canvasServ: CanvasService) { }
  selectX: number;
  selectY: number;

  currentR = 0;

  ngOnInit() {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    this.canvasServ.setContext(ctx);
    this.canvasServ.draw(this.currentR);
  }

  onClick(event: any) {
    let dot: number[];
    dot = this.canvasServ.onClick(event);
    this.selectX = dot[0];
    this.selectY = dot[1];
    // this.dotService.addDot(new Dot(dot[0], dot[1], this.currentR));
  }

}
