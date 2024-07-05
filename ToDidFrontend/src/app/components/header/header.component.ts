import { Component } from '@angular/core';
import {LogoComponent} from "../logo/logo.component";
import {RouterLink} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LogoComponent,
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
constructor(public authenticationService: AuthenticationService) {
}
}
