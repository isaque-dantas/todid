import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {authorizationInterceptor} from "./interceptors/authorization.interceptor";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {responseLoggerInterceptor} from "./interceptors/responseLoggerInterceptor";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes),
    provideHttpClient(withInterceptors([authorizationInterceptor, responseLoggerInterceptor])),
    provideAnimationsAsync()
  ]
};
