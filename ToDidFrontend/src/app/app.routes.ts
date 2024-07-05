import {Routes} from '@angular/router';
import {DashboardComponent} from "./components/pages/dashboard/dashboard.component";
import {HomeComponent} from "./components/pages/home/home.component";
import {LoginComponent} from "./components/pages/login/login.component";
import {SignupComponent} from "./components/pages/signup/signup.component";

export const routes: Routes = [
  {'path': '', component: HomeComponent},
  {'path': 'login', component: LoginComponent},
  {'path': 'signup', component: SignupComponent},
  {'path': 'dashboard', component: DashboardComponent},
];

