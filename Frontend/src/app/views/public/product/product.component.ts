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
import { environment } from '../../../../environments/environment.development';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-product',
  imports: [CommonModule, DataViewModule, SelectButtonModule, FormsModule, TagModule, ButtonModule, DialogModule, InputNumberModule, SelectModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  providers: [ProductService]
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  resourceUrl: string = environment.resourceUrl;
  openModal: boolean = false;
  productSelected: any = null;
  quantity: number = 1;
  subTotal: number = 0;
  customer: any = null;
  clientKey: string = environment.midtransClientKey
  openDetail: boolean = false
  licenseCustomer: any[] = []
  licenseSelected: any = null;

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadMidtransScript();
    this.getAllProducts();
    if (this.authService.isAuthCustomer()) {
      this.getCustomer();
    }
  }

  onOpenDetail(item: any) {
    this.openDetail = true
    this.productSelected = item
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

    if (this.productSelected.category.id == 4) {
      this.spinner.show();
      this.orderService.getCustomerOrders(this.customer.id).subscribe(
        (res: any) => {
          this.spinner.hide();
          this.licenseCustomer = res.data.license || []
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
          this.messageService.add({ severity: 'error', summary: 'Gagal memuat lisensi', detail: err.error.message || 'Terjadi kesalahan, silakan coba lagi' });
        }
      )
    }
  }

  changeSubTotal() {
    this.subTotal = this.quantity * this.productSelected.price;
  }

  createPaymentToken() {
    this.openModal = false
    this.spinner.show();
    this.orderService.createPaymentToken(
      this.productSelected.id,
      this.quantity,
      this.customer.id
    ).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (typeof window !== 'undefined' && (window as any).snap) {
          (window as any).snap.pay(res.token, {
            onSuccess: (result: any) => {
              const data = {
                ...result,
                productId: this.productSelected.id,
                customerId: this.customer.id,
                productCategory: this.productSelected.category.id,
                licenseId: this.licenseSelected ? this.licenseSelected.id : null
              }

              this.orderService.onSuccessPayment(data).subscribe(
                (res: any) => {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Pembayaran Berhasil',
                    detail: 'Pesanan Anda telah berhasil dibuat. Silakan cek di menu My Order.',
                  });
                  this.router.navigate(['/my-order']);
                }
              )
            },
            onPending: (result: any) => {
              const data = {
                ...result,
                productId: this.productSelected.id,
                customerId: this.customer.id,
                productCategory: this.productSelected.category.id,
                licenseId: this.licenseSelected ? this.licenseSelected.id : null
              }

              this.orderService.onPendingPayment(data).subscribe(
                (res: any) => {
                  this.messageService.add({
                    severity: 'info',
                    summary: 'Pembayaran Tertunda',
                    detail: 'Mohon melakukan pembayaran melalui metode yang telah dipilih.',
                  })
                }
              )
            },
            onError: (result: any) => {
              console.error('Error:', result);
            },
            onClose: () => {
              this.messageService.add({
                severity: 'info',
                summary: 'Batalkan Pembayaran',
                detail: 'Anda telah membatalkan pembayaran.',
              })
            }
          });
        } else {
          console.error('Midtrans Snap.js belum dimuat.');
        }
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.messageService.add({ severity: 'error', summary: 'Gagal membuat token pembayaran', detail: err.error.message || 'Terjadi kesalahan, silakan coba lagi' });
      }
    )
  }

  loadMidtransScript() {
    const existingScript = document.getElementById('midtrans-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'midtrans-script';
      script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
      script.setAttribute('data-client-key', this.clientKey);
      script.async = true;
      document.body.appendChild(script);
    }
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
