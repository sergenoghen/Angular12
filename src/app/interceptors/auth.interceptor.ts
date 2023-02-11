import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { from } from 'rxjs';
  import { mergeMap } from 'rxjs/operators';
  import { environment } from 'src/environments/environment';
  
  import { LocationService } from '../services/location.service';
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    constructor(private locationService: LocationService) {}
  
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      if (req.url.includes('i18n')) {
        return next.handle(req);
      }
  
      if (req.url.includes('https://ipapi.co/')) {
        return next.handle(req);
      }
  
      return from(this.locationService.getCurrent()).pipe(
        mergeMap((crds) => {
          let headers = req.headers
            .set('x-api-key', environment.apiKey)
            .set('x-surfer-datetime', 'America/Montreal')
            .set('Authentication', environment.fingerprint);
  
          if (!req.headers.get('X-Surfer-Position')) {
            headers = headers.set(
              'X-Surfer-Position',
              crds.latitude + ',' + crds.longitude
            );
          }
  
          const authReq = req.clone({
            headers,
          });
  
          return next.handle(authReq);
        })
      );
    }
  }
  