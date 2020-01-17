import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {PointsService} from '../../services/points.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InfoComponent implements OnInit {

  @Input() username: string;

  AVAILABLE_R: number[] = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

  pointsAmount: number;
  hitPercentage: number;

  pointsAmountR: number[] = [];
  hitPercentageR: number[] = [];

  constructor(private service: PointsService) {
  }

  ngOnInit() {
    console.log('initStatistic');
    this.service.getPointsAmount().subscribe(
      data => {
        this.pointsAmount = parseInt(data.toString(), 10);
        console.log(data);
      });
    this.service.getPointsHit().subscribe(
      data => {
        this.hitPercentage = parseInt(data.toString(), 10);
      }
    );
    for (let i = 0; i < this.AVAILABLE_R.length; i++) {
      this.service.getPointsAmountR(this.AVAILABLE_R[i]).subscribe(
        data => {
          this.pointsAmountR[i] = parseInt(data.toString(), 10);
          console.log(data);
        });
      this.service.getPointsHitR(this.AVAILABLE_R[i]).subscribe(
        data => {
          this.hitPercentageR[i] = parseInt(data.toString(), 10);
        }
      );
    }
  }

}
