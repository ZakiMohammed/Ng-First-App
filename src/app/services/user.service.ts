import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = environment.fakeApiUrl + 'users/';
  headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getUsers() : Observable<User[]> {
    return this.http.get(this.url, { headers: this.headers })
      .pipe(map(response => <User[]>response));
  }

  getUser(id: number) : Observable<User> {
    return this.http.get(this.url + id, { headers: this.headers })
      .pipe(map(response => <User>response));
  }
}
