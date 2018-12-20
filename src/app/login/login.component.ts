import { AuthService } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl
} from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  errors: string;
  signinForm: FormGroup;
  submitted: boolean = false;
  email: AbstractControl;
  password: AbstractControl;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        )
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
    this.email = this.signinForm.controls.email;
    this.password = this.signinForm.controls.password;
  }

  // f() {
  //   return this.signinForm.controls;
  // }

  signIn() {
    this.submitted = true;

    // console.log(this.signinForm);
    if (this.signinForm.invalid) {
      return;
    }

    this.authService.login(this.signinForm.value).subscribe(result => {
      if (result) {
        let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
        this.router.navigate([returnUrl || "/home"]);
      } else {
        this.invalidLogin = true;
      }
    });
  }

  onClear() {
    this.invalidLogin = false;
  }
}
