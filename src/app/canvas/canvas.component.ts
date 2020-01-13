import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CanvasService} from '../_services/canvas.service';
import {Point} from '../_models/point';
import {PointService} from '../_services';

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

    @ViewChild('myCanvas', {static: true}) canvasRef: ElementRef;

    constructor(public canvasServ: CanvasService, private dotService: PointService) {
    }

    selectX: number;
    selectY: number;
    selectR: number[];
    currentR = 0;

    ngOnInit() {
        const ctx = this.canvasRef.nativeElement.getContext('2d');
        this.canvasServ.setContext(ctx);
        this.canvasServ.draw(this.currentR, 1);
    }

    onClick(event: any) {
        let dot: number[];
        dot = this.canvasServ.onClick(event);
        this.selectX = dot[0];
        this.selectY = dot[1];
        this.selectR = this.canvasServ.getSelectedR();
        for (let i = 0; i < this.selectR.length; i++) {
            this.dotService.addDot(new Point(this.selectX, this.selectY, this.selectR[i], Date.now()));
        }
        // this.dotService.addDot(new Point(dot[0], dot[1], this.currentR, Date.now())).subscribe(value => {
        //  console.log(value); });
        // this.dotService.addDot(new Dot(dot[0], dot[1], this.currentR));
    }

}
