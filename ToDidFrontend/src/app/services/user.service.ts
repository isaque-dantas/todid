import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserData} from "../interfaces/user-data";
import {AuthResult} from "../interfaces/auth-result";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
    this.http.options("http://10.0.0.112:8000")
  }

  get() {
    return this.http.get<UserData>(`http://10.0.0.112:8000/users`)
  }

  signup(data: UserData) {
    return this.http.post<UserData>(`http://10.0.0.112:8000/users`, data, {observe: 'response'})
  }

  update(data: UserData) {
    return this.http.put<UserData>(`http://10.0.0.112:8000/users`, data)
  }

  login(loginData: { email: string, password: string }) {
    return this.http.post<AuthResult>(`http://10.0.0.112:8000/users/login`, loginData, {observe: 'response'})
  }

  delete() {
    return this.http.delete<void>(`http://10.0.0.112:8000/users`)
  }
}
