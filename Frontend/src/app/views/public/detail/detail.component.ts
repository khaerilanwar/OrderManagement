import { Component, OnInit } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { PanelModule } from 'primeng/panel';
import { OrderService } from '../../../services/admin/order.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { DividerModule } from 'primeng/divider';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-detail',
  imports: [PanelModule, ToastModule, CardModule, ButtonModule, BadgeModule, DividerModule, TimelineModule, DialogModule, CurrencyPipe, DatePipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  order: any
  orderId: string = '';
  events: any[] = [];
  openPendingPayment: boolean = false;
  paymentDataTransferBank: any = {
    bank_name: '',
    account_number: ''
  }
  paymentDataCStore: any = {
    store_name: '',
    payment_code: '',
    invoice_file: ''
  }

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['id'];
    this.getOrderDetail(this.orderId);
  }

  payPending() {
    this.openPendingPayment = true;
  }

  downloadInvoice() {
    window.open(this.paymentDataCStore.invoice_file);
  }

  payConfirm() {
    this.spinner.show();
    this.orderService.customerPayConfirm(this.orderId).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.messageService.add({
          severity: 'success',
          summary: 'Berhasil',
          detail: 'Berhasil mengkonfirmasi pembayaran. Silakan tunggu konfirmasi dari admin.'
        })

        this.getOrderDetail(this.orderId);
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Gagal mengkonfirmasi pembayaran. Silakan coba lagi.'
        })
      }
    )
  }

  getOrderDetail(orderId: string) {
    this.spinner.show();
    this.orderService.getOrderById(orderId).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.order = res.data;
        this.paymentDataTransferBank =
          this.order?.payment_type === 'bank_transfer' ?
            JSON.parse(this.order.payment_data)[0] : this.paymentDataTransferBank

        if (this.order?.payment_type === 'cstore') {
          const payStore = JSON.parse(this.order.payment_data);
          this.paymentDataCStore = {
            store_name: payStore.payment_code.startsWith('20') ? 'Alfamart' : 'Indomaret',
            payment_code: payStore.payment_code || '',
            invoice_file: payStore.pdf_url || ''
          }
        }

        console.log(this.paymentDataCStore)
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
      }
    )
  }

  onCopyToken(token: any) {
    navigator.clipboard.writeText(token).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Token copied to clipboard'
      });
    }).catch((err) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to copy token'
      });
    });
  }

  getIconTimeline(status: string): string {
    switch (status) {
      case 'Pesanan Baru':
        return 'pi pi-shopping-bag';
      case 'Menunggu Pembayaran':
        return 'pi pi-wallet';
      case 'Menunggu Konfirmasi':
        return 'pi pi-hourglass';
      case 'Sedang Diproses':
        return 'pi pi-spinner';
      case 'Pesanan Selesai':
        return 'pi pi-check';
      case 'Pesanan Dibatalkan':
        return 'pi pi-times';
      default:
        return 'secondary';
    }
  }

  getColorTimeline(status: string): string {
    switch (status) {
      case 'Pesanan Baru':
        return '#9C27B0';
      case 'Menunggu Pembayaran':
        return '#673AB7';
      case 'Menunggu Konfirmasi':
        return '#FF9800';
      case 'Sedang Diproses':
        return '#607D8B';
      case 'Pesanan Selesai':
        return '#4CAF50';
      case 'Pesanan Dibatalkan':
        return '#F44336';
      default:
        return '#9E9E9E'; // Default color for unknown status
    }
  }
}
