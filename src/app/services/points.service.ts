import {Injectable} from '@angular/core';
import {Point} from '../model/model.point';
import {HttpClient} from '@angular/common/http';
import {AppComponent} from '../app.component';
import {Observable} from 'rxjs';
import {packParams} from '../utils/packParams';

@Injectable()
export class PointsService {

    constructor(public http: HttpClient) {
    }

    public getPointsRecalculated(r): Observable<any> {
        return this.http.get(AppComponent.API_URL + '/api/v1/points/get/' + r, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + localStorage.getItem('userHash')
            }
        });
    }

    public getPoints(): Observable<any> {

        return this.http.get(AppComponent.API_URL + '/api/v1/points/get', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + localStorage.getItem('userHash')
            }
        });
    }

    public addPoint(point: Point) {
        return this.http.post(AppComponent.API_URL + '/api/v1/points/add',
            packParams({x: point.x, y: point.y, r: point.r,}),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + localStorage.getItem('userHash')
                }
            });

    }

    public getPointsAmount() {
        return this.http.get(AppComponent.API_URL + '/api/v1/points/get/amount', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + localStorage.getItem('userHash')
            }
        });
    }

    public getPointsAmountR(r: number) {
        return this.http.get(AppComponent.API_URL + '/api/v1/points/get/amount/' + r, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + localStorage.getItem('userHash')
            }
        });
    }

    public getPointsHit() {
        return this.http.get(AppComponent.API_URL + '/api/v1/points/get/hit', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + localStorage.getItem('userHash')
            }
        });
    }

    public getPointsHitR(r: number) {
        return this.http.get(AppComponent.API_URL + '/api/v1/points/get/hit/' + r, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + localStorage.getItem('userHash')
            }
        });
    }


}
