import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../admin/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getCustomerOrders(customerId: string) {
    return this.http.get(`/order/customer/${customerId}`);
  }

  createCustomerOrder(customerId: string, categoryId: string, orderName: string, orderDescription: string, invoice: number, productId: string) {
    return this.http.post(
      '/order/customer',
      { customerId, categoryId, orderName, orderDescription, invoice, productId }
    )
  }

  createTestimoniOrder(orderId: string, rating: number, testimoni: string) {
    const decodedToken: any = this.authService.decodedToken(localStorage.getItem('token') || '');
    const customerId = decodedToken.customerId;
    return this.http.post(
      `/testimoni/customer/${orderId}`,
      { customerId, rating, testimoni }
    )
  }

  getAllTestimoniOrders() {
    return this.http.get('/testimoni')
  }

  getAllProducts() {
    return this.http.get('/product');
  }

  createPaymentToken(productId: string, quantity: number, customerId: string) {
    return this.http.post(
      '/order/payment-tokenizer',
      { productId, quantity, customerId }
    );
  }

  onPendingPayment(data: any) {
    return this.http.post(
      '/order/payment-pending',
      data
    )
  }

  onSuccessPayment(data: any) {
    return this.http.post(
      '/order/payment-success',
      data
    );
  }
}
