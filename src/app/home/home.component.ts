import {Component, OnInit} from '@angular/core';
import {AuthenticationService, UserService} from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {

    currentUser: String;

    constructor(private userService: UserService, private authenticationService: AuthenticationService) {
        this.currentUser = localStorage.getItem('currentName');
    }

    ngOnInit() {}

    logout() {
        this.authenticationService.logout();
    }
}
