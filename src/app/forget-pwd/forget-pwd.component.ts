import { UserDataService } from './../services/user-data.service';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-forget-pwd',
  templateUrl: './forget-pwd.component.html',
  styleUrls: ['./forget-pwd.component.scss']
})
export class ForgetPwdComponent implements OnInit {

  private email: string = "";
  private emailExist: boolean = true;
  private submitted: boolean = false;

  constructor(private http: Http,
              private userDataService: UserDataService,
              private router: Router) { }

  ngOnInit() {
  }

  submit(form: NgForm) {
    // console.log(form);
    this.submitted = true;
    if (form.invalid) return;

    this.authenticateEmail(form.value)
    .subscribe(result => {
      if (result) {
        this.router.navigate(["/resetpwd"]);
      } else {
        this.emailExist = false;
      }
    });
  }

  authenticateEmail(form) {
    return this.http.post('/forgetpwd', JSON.stringify(form))
            .pipe(map(response => {
              let result = response.json();
              if (result && result.exist) {
                // user exist
                this.userDataService.updateForgetEmail(form.email);
                return true;
              }
              else {
                return false;
              }
            },
            catchError((error) => {
              // it's important that we log an error here.
              // Otherwise you won't see an error in the console.
              console.error('error loading the list of users', error);
              // loadingError$.next(true);
              return of();
            })));
  }

  onClear() {
    this.emailExist = true;
  }

}
