import {Injectable} from '@angular/core';

import {Point} from '../_models/point';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {packParams} from '../utils/packParams';

@Injectable()
export class PointService {

    constructor(private httpClient: HttpClient) { }

    private dots: Point[] = [];

    getDots(username) {
     return this.httpClient.get('//localhost:8080/api/v1/points/get', { headers: { 'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization': 'Basic ' + btoa(
                 localStorage.getItem('currentName') + ':' + localStorage.getItem('currentPass'))}}
                 );
     // .map((res: HttpResponse<any>) =>  console.log(res.body.json));
    }

    addDot(dot: Point) {
        return  this.httpClient.post('//localhost:8080/api/v1/points/add', packParams({x: dot.x, y: dot.y, r: dot.r}),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(localStorage.getItem('currentName') + ':' + localStorage.getItem('currentPass'))}});

        // return  this.httpClient.post('//localhost:8080/api/v1/points/add', packParams({dot.x, dot.y, dot.r}),
        //      { headers: { 'Content-Type': 'application/x-www-form-urlencoded',
        //             'Authorization': 'Basic ' + btoa(localStorage.getItem('currentName') + ':' + localStorage.getItem('currentPass'))}});

    }
}
