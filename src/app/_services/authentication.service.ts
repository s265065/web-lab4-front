import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        console.log(password);
        return this.http.get('//localhost:8080/api/v1/user/login', {
            headers: { 'Authorization': 'Basic ' + btoa(username + ':' + password) }
        });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentName');
    }
}
