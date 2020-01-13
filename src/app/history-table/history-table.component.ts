import {Component, OnInit} from '@angular/core';
import {Point} from '../_models/point';
import {CanvasService, PointService} from '../_services';

@Component({
    selector: 'app-history-table',
    templateUrl: './history-table.component.html',
    styleUrls: ['./history-table.component.css']
})
export class HistoryTableComponent implements OnInit {

    dots: Point[];
    cols: any[];

    constructor(private canvasService: CanvasService,
                private dotService: PointService) {
    }

    ngOnInit() {
        // this.dots = this.canvasService.dotService.getDots();
        // this.dots = this.historyService.getPoints(localStorage.getItem('currentName')).
        // map(response => {
        // });
        this.dotService.getDots(localStorage.getItem('currentName')).subscribe(value => {
            // make points array from response
            console.log(value);

            // Array.prototype.forEach(value, function(val, key) {
            //     this.dots.push(new Point(val.x, val.y, val.r, val.created).setResult(val.hit));
            // }, );
             });
       // this.dotService.getDots(localStorage.getItem('currentName'));

        this.cols = [
            {data: 'x', header: 'X'},
            {data: 'y', header: 'Y'},
            {data: 'r', header: 'R'},
            {data: 'result', header: 'Чего ты добился'},
            {data: 'time', header: 'Время запуска'}
        ];
    }

}
