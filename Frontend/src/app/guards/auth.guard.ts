import { inject } from '@angular/core';
import { CanActivateFn, Router, Route } from '@angular/router';
import { AuthService } from '../services/admin/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.isAuthenticated()) {
        return true;
    }
    router.navigate(['/login']);
    return false;
};

export const authCustomerGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.isAuthCustomer()) return true;

    router.navigate(['/masuk']);
    return false;
};
