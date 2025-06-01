import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient
  ) { }

  getAllCustomers() {
    return this.http.get('/customer')
  }

  getAllTokenLicenses() {
    return this.http.get('/license')
  }

  createNewTokenLicense(
    name: string,
    description: string,
    customerId: string,
    limit: number,
    expire: Date
  ) {
    return this.http.post(
      '/license', { name, description, customerId, limit, expire }
    )
  }

  changeTokenLicense(licenseId: string, addedLimit: number, expire: Date) {
    return this.http.patch(
      `/license/${licenseId}`, { limit: addedLimit, expire }
    )
  }
}
