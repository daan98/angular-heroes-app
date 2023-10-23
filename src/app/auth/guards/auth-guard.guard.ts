import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';


export const authGuardCanActivate: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService);

  return authService.checkAuthentication()
    .pipe(
      tap((isAunthenticated) => {
        if (!isAunthenticated) {
          router.navigate(['./auth/login']);
        }
      })
    );
};

export const authGuardCanMatch: CanMatchFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService);

  return authService.checkAuthentication()
    .pipe(
      tap((isAunthenticated) => {
        if (!isAunthenticated) {
          router.navigate(['./auth/login']);
        }
      })
    );
};


/* import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate {
    
    constructor() { }

    public CanMatch(route : Route, segment : UrlSegment[]) : boolean | Observable<boolean> {
        console.log('CanMatchFn');
        console.log({route, segment});

        return true;
    }

    public canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean | Observable<boolean>  {
        console.log('CanActivateFn');
        console.log({route, state});

        return true;
    }
    
} */