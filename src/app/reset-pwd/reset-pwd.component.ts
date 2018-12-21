import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { UserDataService } from './../services/user-data.service';
import { Component, OnInit } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.scss']
})
export class ResetPwdComponent implements OnInit {
  private emailStr: string;
  private email: AbstractControl;
  private resetForm: FormGroup;
  private password: AbstractControl;
  private confirmPassword: AbstractControl;
  private submitted: boolean = false;
  private invalidReset: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userDataService: UserDataService,
    private http: Http,
    private router: Router) { 
    this.resetForm = this.formBuilder.group(
      { 
        email: ["123"],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: this.matchPassword.bind(this)
      }
    );
    this.email = this.resetForm.controls.email;
    this.password = this.resetForm.controls.password;
    this.confirmPassword = this.resetForm.controls.confirmPassword;
  }
  
  ngOnInit() {
    this.emailStr = this.userDataService.getForgetEmail();
  }

  matchPassword(control: AbstractControl) {
    let password = control.get("password").value;
    let confirmPassword = control.get("confirmPassword").value;
    if (password !== confirmPassword) {
      control.get("confirmPassword").setErrors({ passwordnotmatch: true });
      return { passwordnotmatch: true };
    } else {
      return null;
    }
  }

  reset() {
    this.submitted = true;
    if (this.resetForm.invalid)
      return;
    if (this.emailStr == null || this.emailStr == "") {
      this.invalidReset = true;
      return;
    }

    let url = "/resetpwd";
    let body = this.resetForm.value;
    delete body.confirmPassword;
    console.log(body);
    this.http.post(url, JSON.stringify(body))
    .pipe(map(response => {
      if (response && response.json().res) {
        return true;
      } else {
        return false;
      }
    },
    catchError((error) => {
      // it's important that we log an error here.
      // Otherwise you won't see an error in the console.
      console.error('error loading the list of users', error);
      // loadingError$.next(true);
      return of();
    })))
    .subscribe(res => {
      if (res)
        this.router.navigate(['/login']);
    });
  }

}
