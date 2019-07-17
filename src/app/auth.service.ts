import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/model/User';
import { AuthUser } from 'src/model/AuthUser';

/**
 * Service used to execute authentication procedure and 
 * maintain the user data logged in the application.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUser: AuthUser = null;
  constructor(private http: HttpClient) { }
  isLoggedIn(): boolean {
    return this.authUser !== null;
  }
  
  authenticate(user: User): Observable<any> {
    const options = {};
    const url = '/api/login';
    return this.http.post(url, user, options);
  }

  setAuthUser(authUsr: AuthUser) {
    this.authUser = authUsr;
  }

  getToken(): String {
    return this.authUser.token;
  }
}
