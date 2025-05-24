import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../services/admin/auth.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const baseUrl = environment.apiUrl;
    const authService = inject(AuthService);
    const router = inject(Router);
    const token = localStorage.getItem('token');

    const newRequest = req.clone({
        url: `${baseUrl}${req.url}`,
        withCredentials: true,
        headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next(newRequest).pipe(
        // Success Response
        tap((event) => {}),
        // Error Response
        catchError((err: HttpErrorResponse) => {
            if (err.status === 401) {
                // authService.logOut();
                localStorage.removeItem('token');
                router.navigate(['/login']);
            }
            return throwError(err);
        })
    );
};
