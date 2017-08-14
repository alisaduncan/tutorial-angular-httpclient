import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch'; 

import { User } from './user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<Array<any>>('https://jsonplaceholder.typicode.com/users', {
      headers: new HttpHeaders().set('Accept', 'application/json')
    })
    .map(body => {
      return body.filter(user => user['id'] <= 5);
    })
    .map(this.mapUser)
    .catch( error => Observable.throw(error))

  }

  private mapUser(body: Array<any>) {
    let users: User[] = [];
    body.forEach(element => {
      users.push({
        id: element.id,
        name: element.name,
        email: element.email,
        catchPhrase: element.company.catchPhrase,
        bs: element.company.bs,
        avatar: `svg-${element.id}`
      });
    });
    return users;
  }
}
