import { User } from './../model/user';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

const api = "http://localhost:8082"
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {
    return this.http.post(`${api}/api/users`, user)
  }
  getUserProfile(id: number): Observable<User> {
    return this.http.get(`${api}/api/users/${id}`)
  }
}
