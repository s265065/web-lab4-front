import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CanvasService} from '../_services/canvas.service';
import {Point} from '../_models/point';
import {PointService} from '../_services';
import {HistoryTableComponent} from '../history-table/history-table.component';

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

    ngOnInit() {
        const ctx = this.canvasRef.nativeElement.getContext('2d');
        this.canvasServ.setContext(ctx);
        this.canvasServ.clearCtx();
        this.canvasServ.dotService = this.dotService;
    }

    onClick(event: any) {
        this.canvasServ.onClick(event);
    }

}
