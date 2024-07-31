import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
req = req.clone({
    withCredentials: true
  });
  return next(req)
};
