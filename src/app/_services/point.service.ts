import {Injectable} from '@angular/core';

import {Point} from '../_models/point';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {packParams} from '../utils/packParams';

@Injectable()
export class PointService {

    constructor(private httpClient: HttpClient) { }

    private dots: Point[] = [];

    getPoints() {
        this.getDots();
        return this.dots;
    }

    addPoint(dot: Point) {
        this.dots.unshift(dot);
    }


    getDots() {
        let points: Point[] = [];
     this.httpClient.get('http://localhost:26180/api/v1/points/get', { headers: { 'Content-Type': 'http://localhost:26180/application/x-www-form-urlencoded',
             'Authorization': 'Basic ' + btoa(
                 localStorage.getItem('currentName') + ':' + localStorage.getItem('currentPass'))}}
                 ).subscribe(value => {
         Object.keys(value).map(function (k) {
             points.push(value[k]);
         });
     });
     this.dots = points;
     return points;
    }

    addDot(dot: Point) {
        this.addPoint(dot);
        return  this.httpClient.post('http://localhost:26180/api/v1/points/add', packParams({x: dot.x, y: dot.y, r: dot.r}),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(localStorage.getItem('currentName') + ':' + localStorage.getItem('currentPass'))}});
    }
}
