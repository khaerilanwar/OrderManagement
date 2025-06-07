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

  categoryName: string = '';
  categoryDescription: string = '';
  categoryIdSelected: string = '';

  constructor(
    private orderService: OrderService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAllProductCategories();
  }

  onOpenNewModal(type: string, arg: string = '') {
    this.displayModal = !this.displayModal;
    if (type === 'edit') {
      this.headerModal = 'Edit Product Category';
      this.categoryIdSelected = arg;
      const selectedCategory = this.productCategories.find(category => category.id === arg);
      this.categoryName = selectedCategory?.name || '';
      this.categoryDescription = selectedCategory?.description || '';
    } else if (type === 'new') {
      this.headerModal = 'New Product Category'
      this.categoryName = '';
      this.categoryDescription = '';
    }
  }

  onToggleModal() {
    this.displayModal = !this.displayModal;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onConfirmDelete(event: Event, item: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      closeOnEscape: true,
      dismissableMask: true,
      header: 'Delete Confirmation',
      message: `Do you want to delete <span class="font-semibold">${item.name}</span> category ?`,
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary'
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },

      accept: () => {
        this.deleteProductCategory(item.id);
      }
    });
  }

  onSaveProductCategory() {
    this.spinner.show();
    if (!this.categoryName || !this.categoryDescription) {
      this.spinner.hide();
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all fields.'
      });
      return;
    }

    if (this.headerModal === 'New Product Category') {
      this.orderService.createProductCategory(
        {
          name: this.categoryName,
          description: this.categoryDescription
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
    } else if (this.headerModal === 'Edit Product Category') {
      this.orderService.updateProductCategory(
        this.categoryIdSelected,
        {
          name: this.categoryName,
          description: this.categoryDescription
        }
      ).subscribe(
        (res: any) => {
          this.spinner.hide();
          this.getAllProductCategories();
          this.onToggleModal();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message || 'Product category updated successfully.'
          })
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message || 'An error occurred while updating the product category.'
          })
        }
      )
    }
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
