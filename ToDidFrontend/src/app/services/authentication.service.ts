import {inject, Injectable} from '@angular/core'
import {AuthResult} from "../interfaces/auth-result"
import {Router} from "@angular/router"
import {UserData} from "../interfaces/user-data"
import {UserService} from "./user.service"
import dayjs from "dayjs"

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  idTokenKey = "id_token"
  expirationKey = "expires_at"
  loggedUserDataKey = "logged_user_data"

  router: Router = inject(Router)
  userService = inject(UserService)

  constructor() {
  }

  tokenExists(): boolean {
    return localStorage.getItem(this.idTokenKey) !== null && localStorage.getItem(this.expirationKey) !== null
  }

  getToken(): string {
    return 'Bearer ' + localStorage.getItem(this.idTokenKey)
  }

  setToken(authResult: AuthResult) {
    const expiresAt = dayjs().add(authResult.expiresIn, 'second')

    localStorage.setItem(this.idTokenKey, authResult.idToken)
    localStorage.setItem(this.expirationKey, JSON.stringify(expiresAt.valueOf()))

    this.onUserChanging()
  }

  logout() {
    localStorage.removeItem(this.idTokenKey)
    localStorage.removeItem(this.expirationKey)

    this.onUserChanging()
    this.router.navigateByUrl("/login")
  }

  isLoggedIn() {
    if (!this.tokenExists())
      return false

    return dayjs().isBefore(this.getExpiration())
  }

  isLoggedOut() {
    return !this.isLoggedIn()
  }

  getExpiration() {
    const expiration = localStorage.getItem(this.expirationKey)!

    const expiresAt = JSON.parse(expiration)
    return dayjs(expiresAt)
  }

  onUserChanging() {
    if (this.isLoggedIn()) {
      this.userService.get().subscribe(data => {
        data.password = undefined
        data.todoLists = undefined
        localStorage.setItem(this.loggedUserDataKey, JSON.stringify(data))
      })
    } else {
        localStorage.setItem(this.loggedUserDataKey, "")
    }
  }

  get user() {
    const loggedUserStringed = localStorage.getItem(this.loggedUserDataKey)
    if (loggedUserStringed) {
      return JSON.parse(loggedUserStringed) as UserData
    } else {
      return undefined
    }
  }
}
