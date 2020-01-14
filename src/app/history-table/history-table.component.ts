import {Component, Input, OnInit} from '@angular/core';
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

    constructor(private dotService: PointService) {
    }

    ngOnInit() {
        this.dots = this.dotService.getPoints();
        this.cols = [
            {data: 'x', header: 'X'},
            {data: 'y', header: 'Y'},
            {data: 'r', header: 'R'},
            {data: 'result', header: 'Чего ты добился'},
            {data: 'time', header: 'Время запуска'}
        ];
    }

    getPoints() {
        return this.dotService.getPoints();
    }

}
