import { UserDataService } from './services/user-data.service';
import { LoginGuardService } from "./services/login-guard.service";
import { AuthService } from "./services/auth.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";

import { fakeBackendProvider } from "./helper/fake-backend";
import { HttpModule, Http, BaseRequestOptions } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginComponent } from "./login/login.component";
import { NavComponent } from "./nav/nav.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { ForgetPwdComponent } from './forget-pwd/forget-pwd.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    HomeComponent,
    ResetPwdComponent,
    ForgetPwdComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [
    AuthService,
    LoginGuardService,
    UserDataService,
  
    // For creating a mock back-end. You don't need these in a real app. 
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
