import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray
} from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmpassword: ["", Validators.required],
      chinesename: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]]
    });
  }

  onRegister() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    // console.log(this.registerForm);
  }
}
