import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

/**
 * Interceptor used to inject automatically the access_token granted to the 
 * logged in users in the application, on all requests sent to the htt server.
 * It's necessary because the spring security implementation based on JWT, in the backend
 * server grails restful services.
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService) {}
    /**
     * Injects the user's access_token in the request.
     * @param request Http request.
     * @param next Next http handler which must be executed.
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url !== '/api/login') {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${this.auth.getToken()}`
                }
            });
        }
        return next.handle(request);
  }
}