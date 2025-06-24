import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    authenticate(username: string, password: string) {
        return this.http.post('/auth/login', { username, password });
    }

    createNewToken(): Observable<any> {
        return this.http.get('/auth/token');
    }

    logOut() {
        return this.http.delete('/auth/logout');
    }

    isAuthenticated() {
        const token = localStorage.getItem('token');
        if (!token) return false;

        return true;
    }

    decodedToken(token: string) {
        const decodedToken = jwtDecode(token);
        return token ? decodedToken : null;
    }

    // user public
    customerLogin(credential: string) {
        return this.http.post('/auth/customer-login', { credential });
    }

    customerRegister(name: string, email: string, address: string, phone: string, hasWhatsapp: boolean) {
        return this.http.post('/auth/customer-register', { name, email, address, phone, hasWhatsapp });
    }

    isAuthCustomer() {
        const customerToken = localStorage.getItem('token');
        const decodedToken: any = customerToken ? jwtDecode(customerToken || '') : '';
        const customerId = decodedToken?.customerId;
        if (!customerToken || !customerId) return false;

        return true;
    }
}
