import { AbstractControl } from "@angular/forms";

export class CustomValidators {
  static matchPassword(control: AbstractControl) {
    let password = control.get("password").value;
    let confirmPassword = control.get("confirmpassword").value;
    if (password !== confirmPassword) {
      control.get("confirmpassword").setErrors({ passwordnotmatch: true });
      return { PassswordNotMatch: true };
    } else {
      return null;
    }
  }
}
