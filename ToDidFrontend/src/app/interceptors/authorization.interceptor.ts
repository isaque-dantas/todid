import {HttpInterceptorFn} from '@angular/common/http';
import {AuthenticationService} from "../services/authentication.service";
import {inject} from "@angular/core";

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const service = inject(AuthenticationService);
  if (service.tokenExists()) {
    const authorizedRequest = req.clone(
      { headers: req.headers.set("Authorization", service.getToken()) }
    );

    return next(authorizedRequest);
  } else {
    return next(req);
  }
};
