import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataView } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../services/public/order.service';
import { AuthService } from '../../../services/admin/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CategoryService } from '../../../services/admin/category.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router, RouterModule } from '@angular/router';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-order',
  imports: [RouterModule, RatingModule, ButtonModule, DialogModule, Tag, CommonModule, DropdownModule, DataView, SelectModule, FormsModule, InputTextModule, TextareaModule, ToastModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  orders = signal<any>([]);
  hasOrders: boolean = false;
  displayModal: boolean = false;
  testiModal: boolean = false;
  categories: string[] = []

  // New Order Form
  orderName: string = '';
  selectedCategory: any = null;
  orderDescription: string = '';

  // Rating and Testimoni Form
  orderIdTesti!: string
  rating!: number
  testimoni: string = ''

  constructor(
    public router: Router,
    private orderService: OrderService,
    private authService: AuthService,
    private categoryService: CategoryService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getListOrderCustomer();
    this.getCategories();
  }

  onToggleModal(type: string) {
    if (type === 'order') this.displayModal = !this.displayModal;
    if (type === 'testi') this.testiModal = !this.testiModal
  }

  onDisplayTesti(orderId: string) {
    this.orderIdTesti = orderId
    this.testiModal = true
  }

  onAddOrder() {
    const decoded: any = this.authService.decodedToken(localStorage.getItem('token') || '');
    const customerId: string = decoded?.customerId || '';

    this.spinner.show();
    this.orderService.createCustomerOrder(
      customerId,
      this.selectedCategory?.id,
      this.orderName,
      this.orderDescription
    ).subscribe(
      (res: any) => {
        this.orderName = this.orderDescription = ''
        this.selectedCategory = null;

        this.spinner.hide();
        this.onToggleModal('order');
        this.getListOrderCustomer();

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Berhasil membuat order baru'
        })
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message || 'Failed to create order'
        })
      }
    )
  }

  onSaveTesti() {
    this.spinner.show();
    this.orderService.createTestimoniOrder(
      this.orderIdTesti, this.rating, this.testimoni
    ).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Berhasil membuat testimoni'
        })
        this.rating = 0;
        this.testimoni = '';
        this.onToggleModal('testi');
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message || 'Failed to create testimoni'
        })
        this.onToggleModal('testi');
      }
    )
  }

  getSeverity(order: any): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | undefined {
    switch (order.status) {
      case 'Baru':
        return 'info';
      case 'Bayar':
        return 'warn';
      case 'Konfirmasi':
        return 'secondary';
      case 'Diproses':
        return 'contrast';
      case 'Selesai':
        return 'success';
      case 'Batal':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  getListOrderCustomer() {
    const decoded: any = this.authService.decodedToken(localStorage.getItem('token') || '');
    const customerId: string = decoded?.customerId || '';

    this.spinner.show();
    this.orderService.getCustomerOrders(customerId).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.hasOrders = res.data.length > 0;
        this.orders.set(res.data);
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        if (err.status === 404) {
          this.hasOrders = false;
          this.orders.set([]);
        }
      }
    )
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res.data.map((cat: any) => ({ id: cat.id, name: cat.name }));
      }
    )
  }
}
