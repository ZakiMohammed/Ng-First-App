import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setData(user: User) {
    localStorage.setItem('AUTH_DATA', JSON.stringify(user));
  }
  getData(): User {
    return JSON.parse(localStorage.getItem('AUTH_DATA'));
  }  
  clearData(): void {
    localStorage.clear();
  }
  isLoggedIn(): boolean {
    let user = JSON.parse(localStorage.getItem('AUTH_DATA'));
    return user !== null;
  }
}
