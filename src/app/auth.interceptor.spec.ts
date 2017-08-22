import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
    const mockAuthService = {
        tokenType: 'fake',
        tokenValue: 'fake'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService
                },
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

    describe('making http calls', () => {
        it('adds Authorization header', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {

            http.get('/data').subscribe(
                response => {
                    expect(response).toBeTruthy();
                }
            );

            const req = httpMock.expectOne(req => 
                req.headers.has('Authorization') && req.headers.get('Authorization') === `${mockAuthService.tokenType} ${mockAuthService.tokenValue}`);
            expect(req.request.method).toEqual('GET');

            req.flush({ hello: 'world' });
            httpMock.verify();
        }));
    });
});
