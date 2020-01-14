import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from '../_services/index';
import {User} from '../_models/user';
import {md5} from '../utils/md5';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})

export class RegisterComponent {
    model: User = new User();
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService) { }

    register() {
        this.loading = true;
        console.log(md5(this.model.password));
        this.userService.create(this.model.username, md5(this.model.password))
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    this.loading = false;
                });
    }
}
