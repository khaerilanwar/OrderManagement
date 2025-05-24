import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private http: HttpClient) {}

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
}
