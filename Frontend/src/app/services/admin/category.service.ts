import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(private http: HttpClient) {}

    getAllCategories() {
        return this.http.get('/category');
    }

    postNewCategory(data: any) {
        return this.http.post('/category', data);
    }

    putUpdateCategory(id: string, data: any) {
        return this.http.put(`/category/${id}`, data);
    }

    deleteCategory(id: string) {
        return this.http.delete(`/category/${id}`);
    }
}
