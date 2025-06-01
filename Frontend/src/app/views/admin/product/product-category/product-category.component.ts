import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { OrderService } from '../../../../services/admin/order.service';
import { TextareaModule } from 'primeng/textarea';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-category',
  imports: [ConfirmDialogModule, TextareaModule, TableModule, ButtonModule, InputTextModule, IconFieldModule, InputIconModule, DialogModule, FormsModule, DatePipe],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.scss',
  providers: [ConfirmationService]
})
export class ProductCategoryComponent implements OnInit {
  productCategories: any[] = [];
  displayModal: boolean = false;
  headerModal: string = 'New Product Category';

  newCategoryName: string = '';
  newCategoryDescription: string = '';

  constructor(
    private orderService: OrderService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAllProductCategories();
  }

  onOpenNewModal() {
    this.displayModal = !this.displayModal;
  }

  onToggleModal() {
    this.displayModal = !this.displayModal;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onSaveProductCategory() {
    this.spinner.show();
    this.orderService.createProductCategory(
      {
        name: this.newCategoryName,
        description: this.newCategoryDescription
      }
    ).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.getAllProductCategories();
        this.onToggleModal();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message || 'Product category created successfully.'
        })
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message || 'An error occurred while creating the product category.'
        })
      }
    )
  }

  getAllProductCategories() {
    this.orderService.getAllProductCategories().subscribe(
      (res: any) => {
        this.productCategories = res.data;
      }
    )
  }

  deleteProductCategory(id: string) {
    this.spinner.show();
    this.orderService.deleteProductCategory(id).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.getAllProductCategories();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message
        });
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message || 'An error occurred while deleting the product category.'
        });
      }
    )
  }
}
