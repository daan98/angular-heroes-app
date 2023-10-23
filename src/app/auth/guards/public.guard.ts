import { CanActivateFn, CanMatchFn, Router } from "@angular/router";
import { tap, map } from "rxjs";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const publicGuardCanActivate : CanActivateFn = () => {
    const router = inject(Router)
    const authService = inject(AuthService);
    
    return authService.checkAuthentication()
        .pipe(
            tap(( isAunthenticated ) => {
                console.log('publicGuardCanActivate is auth: ', isAunthenticated);
                if (isAunthenticated) {
                    router.navigate(['./']);
                }
            }),
            map(isAuthenticated => !isAuthenticated )
        );
};

export const publicGuardCanMatch : CanMatchFn = () => {
    const router = inject(Router)
    const authService = inject(AuthService);

    return authService.checkAuthentication()
        .pipe(
            tap(( isAunthenticated ) => {
                if (isAunthenticated) {
                    router.navigate(['./']);
                }
            }),
            map(isAuthenticated => !isAuthenticated )
        );
};