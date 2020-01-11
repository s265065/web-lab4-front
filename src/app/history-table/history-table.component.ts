import { Component, OnInit } from '@angular/core';
import {Dot} from '../_models/dot';
import {DotService} from '../_services/dot.service';
import {CanvasService} from '../_services';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.css']
})
export class HistoryTableComponent implements OnInit {

  dots: Dot[];
  cols: any[];

  constructor( private canvasService: CanvasService) { }

  ngOnInit() {
    this.dots = this.canvasService.dotService.getDots();

    this.cols = [
      { data: 'x', header: 'X' },
      { data: 'y', header: 'Y' },
      { data: 'r', header: 'R' },
      { data: 'result', header: 'Чего ты добился' },
      { data: 'time', header: 'Время запуска'  }
    ];
  }

}
