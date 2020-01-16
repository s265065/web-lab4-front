import {Injectable} from '@angular/core';
import {User} from '../model/model.user';
import 'rxjs/add/operator/map';
import {AppComponent} from '../app.component';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {
    constructor(public http: HttpClient) {
    }

    public logIn(user: User) {
        console.log('so we in logIn');
        let base64Credential: string = btoa(user.username + ':' + user.password);
        // const response = this.http.get(AppComponent.API_URL + 'api/v1/user/login', {
        //   headers: {'Authorization': 'Basic ' + base64Credential}
        // });
        // console.log('next must be response from server');
        // console.log(response);
        //
        // if (response) {
        //   // store user details  in local storage to keep user logged in between page refreshes
        //   localStorage.setItem('userHash', base64Credential);
        //   localStorage.setItem('currentUser', JSON.stringify(user));
        //   console.log('so login sucsess')
        // }
        // return response;
        return this.http.get(AppComponent.API_URL + '/api/v1/user/login', {
            headers: {'Authorization': 'Basic ' + base64Credential}
        });
    }

    logOut() {
        // remove user from local storage to log user out
        localStorage.removeItem('userHash');
        localStorage.removeItem('currentUser');
        return this.http.post(AppComponent.API_URL + '/logout', {});
    }
}
