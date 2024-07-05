import {HttpEventType, HttpInterceptorFn} from '@angular/common/http';
import {tap} from "rxjs";

export const responseLoggerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(tap(event => {
    if (event.type === HttpEventType.Response) {
      console.log()
      console.log(req)
      console.log(req.method, req.url, event.status);
      console.log()
    }
  }))
};
