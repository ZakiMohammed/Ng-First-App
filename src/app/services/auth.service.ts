import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Auth } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setData(auth: Auth) {
    localStorage.setItem('AUTH_DATA', JSON.stringify(auth));
  }
  getData(): Auth {
    return JSON.parse(localStorage.getItem('AUTH_DATA'));
  }  
  clearData(): void {
    localStorage.clear();
  }
  isLoggedIn(): boolean {
    let auth = JSON.parse(localStorage.getItem('AUTH_DATA'));
    return auth !== null;
  }
}
