import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserLogin } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(body: User): Observable<User> {
    const url = "http://localhost:3001/user/register"
    return this.http.post<User>(url, body);
  }

  login(body: User): Observable<UserLogin> {
    const url = "http://localhost:3001/user/login"
    return this.http.post<UserLogin>(url, body)
  }

}
