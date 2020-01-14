import {Component, OnInit} from '@angular/core';
import {AuthenticationService, CanvasService, PointService, UserService} from '../_services/index';
import {CanvasComponent} from '../canvas/canvas.component';
import {HistoryTableComponent} from '../history-table/history-table.component';
import {RequestFormComponent} from '../request-form/request-form.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {

    currentUser: String;

    constructor(private userService: UserService,
                private authenticationService: AuthenticationService,
                private canvasComponent: CanvasComponent,
                private canvasService: CanvasService,
                private historyTableComponent: HistoryTableComponent,
                private pointService: PointService,
                private requestFormComponent: RequestFormComponent) {
        this.currentUser = localStorage.getItem('currentName');
    }

    ngOnInit() {
        this.historyTableComponent = new HistoryTableComponent(this.pointService);
        console.log(this.historyTableComponent.getPoints());
        this.canvasService.loadPoints(this.historyTableComponent.getPoints());
        this.canvasComponent = new CanvasComponent(this.canvasService, this.pointService);
        this.requestFormComponent = new RequestFormComponent(this.canvasService);
        this.canvasService.setHistoryTable(this.historyTableComponent);
    }

    logout() {
        this.authenticationService.logout();
    }
}
