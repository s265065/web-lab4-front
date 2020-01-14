import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../_services/index';
import {User} from '../_models/user';
import {md5} from '../utils/md5';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
    model: User = new User;
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }

    login() {
        const { username, password } = this.model;

        this.loading = true;
        console.log(md5(password));
        this.authenticationService.login(username, md5(password))
            .subscribe(
                data => {
                    localStorage.setItem('currentName', username);
                    localStorage.setItem('currentPass', md5(password));
                    console.log(localStorage.getItem('currentPass'));
                    this.router.navigate([this.returnUrl]);
                },

                error => {
                    this.loading = false;
                }
                );
    }
}
