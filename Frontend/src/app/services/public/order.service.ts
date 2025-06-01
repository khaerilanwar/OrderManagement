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

  createCustomerOrder(customerId: string, categoryId: string, orderName: string, orderDescription: string) {
    return this.http.post(
      '/order/customer',
      { customerId, categoryId, orderName, orderDescription }
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
}
