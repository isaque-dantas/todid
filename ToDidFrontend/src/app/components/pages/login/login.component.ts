import {Component} from '@angular/core';
import {FooterComponent} from "../../footer/footer.component";
import {HeaderComponent} from "../../header/header.component";
import {NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {StaticFormComponent} from "../../static-form/static-form.component";
import {StaticFormData} from "../../../interfaces/static-form-data";
import {UserService} from "../../../services/user.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {HttpResponse} from "@angular/common/http";
import {AuthResult} from "../../../interfaces/auth-result";
import {RequiredValidator, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    NgOptimizedImage,
    RouterLink,
    StaticFormComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  staticFormData!: StaticFormData

  constructor(private userService: UserService, public authenticationService: AuthenticationService, private router: Router) {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl("/dashboard")
    }

    this.staticFormData = {
      title: "Login",
      subtitle: "Welcome! Have a great stay.",
      formControls: [
        {name: "email", type: "email", value: "", placeholder: "Email", validators: [Validators.required, Validators.email]},
        {name: "password", type: "password", value: "", placeholder: "Password", validators: [Validators.required, Validators.minLength(8)]}
      ],
      serviceMethod: this.userService.login.bind(this.userService),
      responseHandler:
        (response: HttpResponse<AuthResult>) => {
          if (response.body) {
            this.authenticationService.setToken(response.body)
          }
        },
      errorAlerts: {
        401: [{message: "Email or password not valid.", type: "error"}],
        404: [{message: 'Email or password not valid. Maybe you want to <a routerLink="/signup" class="underline cursor-pointer">sign-up</a>?', type: "error"}]
      },
      successAlerts: [{message: "User logged successfully", type: "success"}],
      next: '/dashboard'
    }
  }
}
