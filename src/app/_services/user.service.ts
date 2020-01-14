import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {packParams} from '../utils/packParams';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    create(username: string, password: string) {
        console.log(password);
      return this.http.post('http://localhost:26180/api/v1/user/register', packParams({ username, password }),
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
      // return this.http.get('//localhost:8080/api/v1/user/register', {
      //   params: new HttpParams().set(`username`, username).set('password', password)
      // });
    }

}
