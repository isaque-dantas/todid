import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from "@angular/common";
import {AlertListComponent} from "./components/alert-list/alert-list.component";
import {AuthenticationService} from "./services/authentication.service";
import {UserData} from "./interfaces/user-data";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, AlertListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ToDid'
}
