import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch'; 

import { User } from './user';

@Injectable()
export class UserService {
  private apiEndpoint = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<Array<any>>(this.apiEndpoint, {
      headers: new HttpHeaders().set('Accept', 'application/json')
    })
    .map(body => {
      return body.filter(user => user['id'] <= 5);
    })
    .map(this.mapUsers)
    .catch( error => Observable.throw(error))

  }

  public addUser(user: User): Observable<User> {
    const postBody = {
      name: user.name,
      company: {
        bs: user.bs
      }
    };

    return this.http.post<any>(this.apiEndpoint, postBody, {
        headers: new HttpHeaders().set('Accept', 'application/json')
        .set('Content-Type', 'application/json'),
    })
    .map ( response => {
      return {
        name: response.name,
        bs: response.company.bs
      }
    })
    .catch(error => Observable.throw(error));
  }

  private mapUsers(body: Array<any>) {
    let users: User[] = [];
    body.forEach(element => {
      users.push({
        id: element.id,
        name: element.name,
        bs: element.company.bs,
        avatar: `svg-${element.id}`
      });
    });
    return users;
  }
}
