import {Component} from '@angular/core';
import {FooterComponent} from "../../footer/footer.component";
import {HeaderComponent} from "../../header/header.component";
import {RouterLink} from "@angular/router";
import {StaticFormComponent} from "../../static-form/static-form.component";
import {StaticFormData} from "../../../interfaces/static-form-data";
import {UserService} from "../../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertService} from "../../../services/alert.service";
import {AlertData} from "../../../interfaces/alert-data";
import {Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterLink,
    StaticFormComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public staticFormData!: StaticFormData

  constructor(private userService: UserService) {
    this.staticFormData = {
      title: "Sign-up",
      subtitle: "Tell us about yourself.",
      formControls: [
        {name: "name", type: "text", value: "", placeholder: "Name", validators: [Validators.required]},
        {name: "username", type: "text", value: "", placeholder: "Username", validators: [Validators.required]},
        {name: "email", type: "email", value: "", placeholder: "Email", validators: [Validators.required, Validators.email]},
        {name: "password", type: "password", value: "", placeholder: "Password", validators: [Validators.required]}
      ],
      serviceMethod: this.userService.signup.bind(this.userService),
      successAlerts: [{message: "User was registered successfully", type: "success"}],
      next: '/login'
    }
  }
}
