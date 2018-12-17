import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: Http) { }

  login(credentials) {
    return this.http.post('/api/authenticate', 
      JSON.stringify(credentials))
      .pipe(map(response => {
        console.log(response.json());
        let result = response.json();
        if (result && result.login) {
          localStorage.setItem('user', result.user);
          return true;
        }
        return false;
      }));
  }
}
