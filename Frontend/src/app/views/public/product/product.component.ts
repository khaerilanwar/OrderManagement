import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { Product, ProductService } from '../../../pages/service/product.service';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/public/order.service';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { CustomerService } from '../../../services/public/customer.service';
import { AuthService } from '../../../services/admin/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product',
  imports: [CommonModule, DataViewModule, SelectButtonModule, FormsModule, TagModule, ButtonModule, DialogModule, InputNumberModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  providers: [ProductService]
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  resourceUrl: string = 'http://localhost:3000/static/images/';
  openModal: boolean = false;
  productSelected: any = null;
  quantity: number = 1;
  subTotal: number = 0;
  customer: any = null;
  // stateOptions: any[] = [
  //   { label: 'All', value: 'all' },
  //   { label: 'Bot', value: 'bot' },
  //   { label: 'Web', value: 'web' },
  //   { label: 'Design', value: 'design' }
  // ];
  // value: string = 'all';

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    if (this.authService.isAuthCustomer()) {
      this.getCustomer();
    }
  }

  onOpenModal(product: any) {
    if (!this.authService.isAuthCustomer()) {
      this.router.navigate(['/masuk']);
      return;
    }

    this.quantity = 1;
    this.subTotal = 0;
    this.openModal = true;
    this.productSelected = product;
    this.subTotal = this.productSelected.price * this.quantity;
  }

  changeSubTotal() {
    this.subTotal = this.quantity * this.productSelected.price;
  }

  pesanProduk() {
    if (this.authService.isAuthCustomer()) {
      if (this.customer.balance < this.subTotal) {
        this.messageService.add({ severity: 'error', summary: 'Saldo tidak cukup', detail: 'Silakan isi saldo terlebih dahulu' });
        return;
      }

      this.spinner.show();
      this.orderService.createCustomerOrder(
        this.customer.id,
        '1',
        this.productSelected.name,
        this.productSelected.description,
        this.subTotal,
        this.productSelected.id
      ).subscribe(
        (res: any) => {
          this.spinner.hide();
          this.openModal = false;
          this.messageService.add({ severity: 'success', summary: 'Pesanan berhasil dibuat', detail: 'Berhasil! Silakan konfirmasi ke admin leat fitur chatting' });
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
          this.openModal = false;
          this.messageService.add({ severity: 'error', summary: 'Gagal membuat pesanan', detail: err.error.message || 'Terjadi kesalahan, silakan coba lagi' });
        }
      )
    }
  }

  getAllProducts() {
    this.orderService.getAllProducts().subscribe(
      (res: any) => {
        this.products = res.data
      }
    )
  }

  getCustomer() {
    const token = localStorage.getItem('token');
    const decoded: any = this.authService.decodedToken(token ?? '');
    const customerId = decoded?.customerId;
    this.customerService.getCustomerById(customerId).subscribe(
      (res: any) => {
        this.customer = res.data
      }
    )
  }

}
