import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    constructor(private http: HttpClient) {}

    getAllCategories() {
        return this.http.get('/products');
    }
}
