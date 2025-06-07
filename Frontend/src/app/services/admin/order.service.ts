import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private http: HttpClient) { }

    getListOrders() {
        return this.http.get('/order');
    }

    getOrderById(id: string) {
        return this.http.get(`/order/${id}`);
    }

    editOrder(id: string, data: any) {
        return this.http.put(`/order/detail/${id}`, data);
    }

    editInvoice(id: string, data: any) {
        return this.http.put(`/order/invoice/${id}`, data);
    }

    deleteOrder(id: string) {
        return this.http.delete(`/order/${id}`);
    }

    customerPayConfirm(orderId: string) {
        return this.http.patch(`/order/customer/${orderId}`, {});
    }

    getAllProducts() {
        return this.http.get('/product');
    }

    getAllProductCategories() {
        return this.http.get('/product/category');
    }

    getDataDashboard() {
        return this.http.get('/dashboard');
    }

    createProductCategory(data: any) {
        return this.http.post('/product/category', data);
    }

    updateProductCategory(id: string, data: any) {
        return this.http.put(`/product/category/${id}`, data);
    }

    deleteProductCategory(id: string) {
        return this.http.delete(`/product/category/${id}`);
    }
}
