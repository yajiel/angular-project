import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private forgetEmail: string = "";

  @Output() forgetEmailEmitter: EventEmitter<string> = new EventEmitter();
  constructor() { }

  updateForgetEmail(email) {
    this.forgetEmail = email;
    // this.forgetEmailEmitter.emit(this.forgetEmail);
  }

  getForgetEmail() {
    return this.forgetEmail;
  }
}
