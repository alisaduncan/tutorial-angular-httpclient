
import { throwError as observableThrowError, Observable } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


import { User } from './user';

@Injectable()
export class UserService {
  public apiEndpoint = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<Array<any>>(this.apiEndpoint, {
      headers: new HttpHeaders().set('Accept', 'application/json')
    }).pipe(
      map(this.mapUsers),
      catchError(error => {
        return observableThrowError('An error occurred');
      }),
    );
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
    }).pipe(
      map(response => {
        return {
          name: response.name,
          bs: response.company.bs
        };
      }),
      catchError(error => {
        return observableThrowError('An error occurred');
      }),
    );
  }

  private mapUsers(body: Array<any>) {
    const filteredBody = body.filter(user => user['id'] <= 5);
    const users: User[] = [];
    filteredBody.forEach(element => {
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
