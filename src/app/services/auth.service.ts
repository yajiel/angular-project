import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: Http) {}

  login(credentials) {
    return this.http
      .post("/api/authenticate", JSON.stringify(credentials))
      .pipe(
        map(response => {
          console.log(response.json());
          let result = response.json();
          if (result && result.login) {
            localStorage.setItem("user", JSON.stringify(result.user));
            return true;
          }
          return false;
        })
      );
  }

  logout() {
    localStorage.removeItem("user");
  }

  isLoggedIn() {
    let user = localStorage.getItem("user");
    if (!user) return false;
    return true;
  }

  getCurrentUser() {
    let user = localStorage.getItem("user");
    if (!user) return null;
    return JSON.parse(user);
  }
}
