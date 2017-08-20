import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { UserService } from './user.service';
import { User } from './user';
import { AuthInterceptor } from './auth.interceptor';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }]
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  describe('getting all users', () => {
    it('returns users with an id <= 5', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
      const mockResponse = [
        {
          id: 5,
          name: 'Test5',
          company: {
            bs: 'blah'
          }
        },
        {
          id: 6,
          name: 'Test6',
          company: {
            bs: 'blah'
          }
        }
      ];

      const userService = getTestBed().get(UserService);
      userService.getUsers().subscribe(
        actualUsers => {
          expect(actualUsers.length).toBe(1);
          expect(actualUsers[0].id).toEqual(5);
        }
      );

      const req = httpMock.expectOne((req) => {
        return req.url === userService.apiEndpoint && req.headers.has('Authorization')
      });
      expect(req.request.method).toEqual('GET');

      req.flush(mockResponse);
      httpMock.verify();
    }));

    it('returns User[] mapped to correct properties', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
      const mockResponse = [
        {
          id: 1,
          name: 'Test Name',
          company: {
            bs: 'synergy'
          }
        }
      ];

      const expectedResults:User[] = [
        {
          id: 1,
          name: 'Test Name',
          bs: 'synergy',
          avatar: 'svg-1'
        }
      ];

      const userService = getTestBed().get(UserService);
      userService.getUsers().subscribe(
        actualResults => {
          expect(actualResults).toEqual(expectedResults);
        }
      );

      const req = httpMock.expectOne((req) => {
        return req.url === userService.apiEndpoint && req.headers.has('Authorization')
      });
      expect(req.request.method).toEqual('GET');

      req.flush(mockResponse);
      httpMock.verify();
    }));

    it('should throw with an error message when API returns an error', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
      const userService = getTestBed().get(UserService);
      userService.getUsers()
      .catch(actualError => {
        expect(Observable.of(actualError)).toBeTruthy();
        expect(actualError).not.toBeNull;
        expect(actualError).not.toBeUndefined;
        return Observable.of(actualError);
      })
      .subscribe();

      const req = httpMock.expectOne((req) => {
        return req.url === userService.apiEndpoint && req.headers.has('Authorization')
      });
      expect(req.request.method).toEqual('GET');

      req.flush({errorMessage: 'Uh oh!'}, { status: 500, statusText: 'Server Error'});
      httpMock.verify();
    }));
  });

describe('adding a new user', () => {
    it('returns the newly added user', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
      const mockResponse =
        {
          id: 100,
          name: 'A new user',
          company: {
            bs: 'blah blah'
          }
        };

      const expectedResult: User = {
        id: 1,
        name: 'A new user',
        bs: 'blah blah',
        avatar: 'svg-1'
      };

      const userService = getTestBed().get(UserService);
      userService.addUser(expectedResult).subscribe(
        actualResult => {
          expect(actualResult.name).toEqual(expectedResult.name);
          expect(actualResult.bs).toEqual(expectedResult.bs);
          expect(actualResult.id).toBeUndefined();
          expect(actualResult.avatar).toBeUndefined();
        }
      );

      const req = httpMock.expectOne((req) => {
        return req.url === userService.apiEndpoint && req.headers.has('Authorization') && req.headers.has('Accept')
      });
      expect(req.request.method).toEqual('POST');

      req.flush(mockResponse);
      httpMock.verify();
    }));

    it('should throw with an error message when API returns an error', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
      const expectedResult: User = {
        id: 1,
        name: 'A new user',
        bs: 'blah blah',
        avatar: 'svg-1'
      };
      
      const userService = getTestBed().get(UserService);
      userService.addUser(expectedResult)
      .catch(actualError => {
        expect(Observable.of(actualError)).toBeTruthy();
        expect(actualError).not.toBeNull;
        expect(actualError).not.toBeUndefined;
        return Observable.of(actualError);
      })
      .subscribe();

      const req = httpMock.expectOne((req) => {
        return req.url === userService.apiEndpoint && req.headers.has('Authorization') && req.headers.has('Accept')
      });
      expect(req.request.method).toEqual('POST');

      req.flush({errorMessage: 'Uh oh!'}, { status: 500, statusText: 'Server Error'});
      httpMock.verify();
    }));
  });
});
